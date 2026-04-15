// 取得 id 為 container 的 div 元素
var container = document.getElementById('container');

// 頁面載入完成後先執行
window.onload = function () {
    // 一開始先加入 1~3 個亂數字元
    container.textContent = add_new_chars(3);
};

// 產生新的亂數字串
// x = 最大字元數
// b = 是否隨機決定數量
// b 為 true 時：產生 1~x 個字元
// b 為 false 時：固定產生 x 個字元
function add_new_chars(x, b = true) {
    // 預設字元數量先設成 x
    var n = x;

    // 如果 b 為 true，則隨機決定要產生幾個字元
    if (b) {
        n = Math.floor(Math.random() * x) + 1;
    }

    // 用來存放最後產生的亂數字串
    var str = '';

    // 依照 n 的數量，逐一產生小寫英文字母
    for (let i = 0; i < n; i++) {
        // 97 是 a 的 ASCII，往後加 0~25 就會是 a~z
        str += String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }

    // 回傳產生好的字串
    return str;
}

// 用來記錄「連續打錯幾次」
var counter = 0;

// 監聽鍵盤放開按鍵的事件
window.addEventListener("keyup", function (e) {
    // 取出目前 container 內第一個字元
    var firstone = container.textContent.substring(0, 1);

    // 如果使用者按的鍵剛好等於第一個字元
    if (e.key == firstone) {
        // 就把第一個字元刪掉
        container.textContent = container.textContent.substring(1, container.textContent.length);

        // 因為這次打對了，所以連續打錯次數歸零
        counter = 0;
    } else {
        // 如果打錯了，先把錯的字元也加到後面
        // 這是照老師簡報原本的邏輯
        container.textContent += e.key;

        // 連續打錯次數加 1
        counter++;

        // 如果已經連續打錯 3 次
        if (counter >= 3) {
            // 額外再固定增加 3 個亂數字元
            container.textContent += add_new_chars(3, false);

            // 加完後把連續打錯次數重設
            counter = 0;
        }
    }

    // 不管打對或打錯，每次按鍵後都再增加 1~3 個亂數字元
    container.textContent += add_new_chars(3);
});