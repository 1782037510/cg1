// 动态生成樱花花瓣
window.onload = function() {
    var sakuraContainer = document.querySelector('.sakura-container');

    // 设置生成花瓣的数量
    var numberOfPetals = 50;

    // 生成花瓣并添加到页面
    for (var i = 0; i < numberOfPetals; i++) {
        var sakura = document.createElement('div');
        sakura.classList.add('sakura');

        // 设置花瓣的随机飘落动画时间、位置等
        sakura.style.animationDuration = Math.random() * 5 + 3 + 's'; // 随机飘落时间
        sakura.style.animationDelay = Math.random() * 2 + 's';  // 随机延迟开始时间
        sakura.style.left = Math.random() * 100 + 'vw'; // 随机水平位置
        sakura.style.fontSize = Math.random() * 10 + 15 + 'px'; // 随机大小

        // 添加到容器中
        sakuraContainer.appendChild(sakura);
    }
};
