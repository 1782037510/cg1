import pymysql
conn=pymysql.connect(host="localhost",port=3306,user="root",password="123456",database="demo01",charset="utf8mb4")

def con_my_sql(sql_code):
    try:
        conn.ping(reconnect=True)
        print(sql_code)
        cursor=conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute(sql_code)
        conn.commit()
        conn.close()
        return cursor
    except pymysql.MySQLError as err_massage:
        conn.rollback()
        conn.close()
        return type(err_massage),err_massage
