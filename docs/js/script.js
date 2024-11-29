
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

var icon = document.getElementById("icon");
var nameTag = document.getElementById("name");
var favicon = document.getElementById("favicon");

const userTag = nameTag.innerHTML;

var background = document.getElementById("main");
let height = screen.height;
let backheight = background.scrollHeight;
let state = false;

function FGtick() {
    height = screen.height;
    backheight = background.scrollHeight;
    if (state) {
        if (backheight < height) {
            state = false;
            background.style.height = "100vh";
        }
    } else {
        if (backheight > height+10) {
            state = true;
            background.style.height = "100%";
        }
    }
}

function gotoWeb(link) {
    let tmp = window.location.href;
    tmp = tmp.replace("/index.html", "");
    console.log(tmp + "/" + link + "/index.html")
    window.open(tmp + "/" + link + "/index.html", "_self");
}

const fixBackground  = async () => {

    const data = await axios('https://api.github.com/users/' + userTag);
    favicon.href = (data.data.avatar_url);
    icon.src = (data.data.avatar_url);

    while (true) {
        FGtick();
        await sleep(100);
    }
}

fixBackground();

