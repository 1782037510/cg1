from flask import Flask,render_template,request,redirect,url_for,session
import test
con_my_sql = test.con_my_sql
app=Flask(__name__)
app.secret_key='123456'
@app.route("/")
def index_login():
    return render_template('login.html')

@app.route("/register")
def index_register():
    return render_template('register.html')

@app.route("/index_new")
def index_new():
    if "username" in session:
        return render_template('index_new.html')
    else:
        return redirect(url_for(("index_login")))

login_data={
    "陈广":"123456"
}

@app.route("/login",methods=["post"])
def login():
    name=request.form.get("username")
    pwd=request.form.get("password")
    code="select * from login_user where username='%s'" % (name)
    cursor_ans=con_my_sql(code)
    cursor_select=cursor_ans.fetchall()
    if len(cursor_select)>0:
        if pwd==cursor_select[0]['password']:
            session["username"]=name
            return redirect(url_for(("index_new")))
        else:
            return '密码错误 <a href="/">返回登录</a>'
    else:
        return '用户不存在 <a href="/">返回登录</a>'

@app.route("/register",methods=["post"])
def register():
    name=request.form.get("username")
    pwd=request.form.get("password")
    pwd2= request.form.get("confirmPassword")
    if pwd2!=pwd:
        return '两回注册不一致 <a href="/register">返回注册</a>'
    code="INSERT INTO `login_user`(`username`,`password`) VALUES ('%s','%s')" % (name,pwd)
    print(con_my_sql(code))

    code = "select * from login_user where username='%s'" % (name)
    cursor_ans = con_my_sql(code)
    cursor_select = cursor_ans.fetchall()
    if len(cursor_select)>0:
        return '成功 <a href="/">返回登录</a>'
    else:
        code = "INSERT INTO `login_user`(`username`,`password`) VALUES ('%s','%s')" % (name, pwd)
        con_my_sql(code)
        return '注册成功 <a href="/">返回登录</a>'

if __name__ == '__main__':
    app.run(debug=True)