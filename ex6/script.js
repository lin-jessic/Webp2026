var container = document.getElementById("container");

// 產生隨機 a-z 字元
function randomChar() {
    var chars = "abcdefghijklmnopqrstuvwxyz";
    var index = Math.floor(Math.random() * 26);
    return chars[index];
}

// 亂數產生 count 個字元字串
function randomString(count) {
    var str = "";
    for (var i = 0; i < count; i++) {
        str += randomChar();
    }
    return str;
}

// 在後面新增 1~3 個亂數字元
function add_new_chars() {
    var num = Math.floor(Math.random() * 3) + 1; // 1~3
    container.textContent += randomString(num);
}

// window.onload 時先產生 0~2 個字元
window.onload = function () {
    var num = Math.floor(Math.random() * 3); // 0~2
    container.textContent = randomString(num);
};

// keyup 事件
window.addEventListener("keyup", function (e) {
    console.log(e.key);

    // 只處理 a-z 單一字元輸入
    if (e.key.length === 1 && e.key >= "a" && e.key <= "z") {
        if (container.textContent.length > 0 && e.key === container.textContent[0]) {
            container.textContent = container.textContent.substring(1);
        }
        add_new_chars();
    }
});