document.addEventListener('DOMContentLoaded', function () {
    // 如果音频没有加载过，创建一个音频元素
    let audio = document.getElementById('backgroundAudio');
    if (!audio) {
        audio = document.createElement('audio');
        audio.id = 'backgroundAudio';
        audio.src = 'music/网易云.mp3';  // 音乐文件路径
        audio.preload = 'auto';
        audio.loop = true;
        audio.volume = 1.0;  // 设置音量为最大
        document.body.appendChild(audio);
    }

    // 检查是否已有播放状态
    const audioPlayed = localStorage.getItem('audioPlayed');
    const audioCurrentTime = localStorage.getItem('audioCurrentTime');

    if (audioPlayed === 'true') {
        // 如果音频已播放，恢复播放状态
        if (audioCurrentTime) {
            audio.currentTime = parseFloat(audioCurrentTime);  // 恢复播放进度
        }
        audio.play().catch(err => {
            console.error('音频播放失败: ', err);
        });
    }

    // 监听用户点击事件来播放音频
    window.addEventListener('click', function () {
        if (audio.paused) {
            audio.play().then(() => {
                console.log('音频播放成功');
                localStorage.setItem('audioPlayed', 'true');
            }).catch(err => {
                console.error('音频播放失败:', err);
            });
        }
    });

    // 监听音频的播放进度
    audio.addEventListener('timeupdate', function () {
        localStorage.setItem('audioCurrentTime', audio.currentTime);
    });

    // 监听音频播放结束事件
    audio.addEventListener('ended', function () {
        localStorage.removeItem('audioCurrentTime');  // 清除进度
    });
});
