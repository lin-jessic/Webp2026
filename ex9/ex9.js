var imglist_Url =
'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ca370d51a054836007519a00ff4ce59e&per_page=10&format=json&nojsoncallback=1';

function getimg() {
    var gal = document.getElementById("gallery");
    gal.innerHTML = "";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", imglist_Url, true);
    xhr.send();

    xhr.onload = function () {
        var data = JSON.parse(this.responseText);
        add_new_img(data.photos.photo);
    }
}

function add_new_img(dataset) {
    var gal = document.getElementById("gallery");

    dataset.forEach(function(item) {
        console.log(item);

        var img_Url =
        'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ca370d51a054836007519a00ff4ce59e&photo_id='
        + item.id +
        '&format=json&nojsoncallback=1';

        var xhr = new XMLHttpRequest();
        xhr.open("GET", img_Url, true);
        xhr.send();

        xhr.onload = function () {
            var data = JSON.parse(this.responseText);
            console.log(data);

            var img = document.createElement("img");
            var imgsrc = data.sizes.size[data.sizes.size.length - 1].source;

            img.setAttribute("src", imgsrc);
            gal.appendChild(img);
        }
    });
}