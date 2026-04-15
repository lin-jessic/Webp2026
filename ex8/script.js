var openUrl =
    "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";

var xhr = new XMLHttpRequest();
xhr.open("GET", openUrl, true);
xhr.send();

xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var dataset = JSON.parse(this.responseText);
        addNewData(dataset);
    }
};

function addNewData(dataset) {
    var myTableBody = document.querySelector("#csie tbody");

    dataset.forEach(function (data) {
        var row = myTableBody.insertRow(-1);

        row.insertCell(0).innerHTML = data["title"];
        row.insertCell(1).innerHTML = data["showInfo"][0]["location"];
        row.insertCell(2).innerHTML = data["showInfo"][0]["price"];
    });
}

function delOldData() {
    var myTableBody = document.querySelector("#csie tbody");
    var rowCount = myTableBody.rows.length;

    if (rowCount > 0) {
        myTableBody.deleteRow(rowCount - 1);
    }
}