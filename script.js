let pals = [];

function getPalKey(pokeName) {
    var result = false;
    for (var pal of pals) {
        if (pal.name.toLowerCase() != pokeName.toLowerCase()) continue;
        result = pal;
    }
    return result;
};

function fetchJSONFile(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', path, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };
    xhr.send(null);
}


function init() {
    fetchJSONFile('pals.json', function (data) {
        pals = data;
    });
};


const search = (pal) => {
    let palName = (pal).toLowerCase();
    let palObj = getPalKey(palName);
    document.getElementById("error").innerText = "";
    if (!palObj) {
        document.getElementById("error").innerText = "Nome Inválido!";
        return;
    };
    let card = document.createElement("div");
    card.innerHTML = `
    <h1>${palObj.name}</h1>
    <img src="${palObj.imageWiki}" alt="">
    <p style="margin:auto;width: 150px">${palObj.description}</p>
    `

    document.getElementById("card").innerHTML = "";
    document.getElementById("card").appendChild(card);
}