window.onload = function() {
    var currentIndex = 0; // 初始图片索引
    var images = document.querySelectorAll('.carousel-images img');
    var buttons = document.querySelectorAll('.btn li');
    var carousel = document.querySelector('.carousel-images');

    // 更新按钮状态
    function updateButtons(index) {
        buttons.forEach(function(button, i) {
            if (i === index) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // 切换到指定的图片
    function goToImage(index) {
        currentIndex = index;
        carousel.style.transform = 'translateX(' + (-100 * currentIndex) + 'vw)'; // 使用视口宽度进行滑动
        updateButtons(currentIndex);
    }

    // 自动轮播
    setInterval(function() {
        currentIndex = (currentIndex + 1) % images.length; // 循环播放
        goToImage(currentIndex);
    }, 3000); // 每3秒切换

    // 点击按钮切换图片
    buttons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            goToImage(index);
        });
    });

    // 页面加载时更新按钮状态
    goToImage(currentIndex);

    // 页面加载时检查是否有已选择的城市
    var selectedCity = localStorage.getItem('selectedCity');
    if (selectedCity) {
        document.getElementById('current-city').textContent = selectedCity;  // 更新城市名称
    }
};
