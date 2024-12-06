
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
    background.style.height = document.height + "px";
}

function gotoWeb(link, local) {

    let tmp;

    if (local) {
        tmp = window.location.href;
        if (tmp.includes("/index.html")) {
            tmp = tmp.replace("/index.html", "/");
            tmp = tmp + link + "/index.html";
        } else {
            tmp = tmp + link;
        }
    } else {
        tmp = "https://" + link;
    }

    console.log(tmp);
    window.open(tmp, "_self");
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

