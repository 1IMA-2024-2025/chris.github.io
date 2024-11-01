
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

var icon = document.getElementById("icon");
var nameTag = document.getElementById("name")

const userTag = nameTag.innerHTML;

var background = document.getElementById("main")
let height = screen.height
let backheight = background.scrollHeight
let state = false

function FGtick() {
    height = screen.height
    backheight = background.scrollHeight
    if (state) {
        if (backheight < height) {
            state = false
            background.style.height = "100vh"
        }
    } else {
        if (backheight > height+10) {
            state = true
            background.style.height = "100%"
        }
    }
}

const fixBackground  = async () => {

    const data = await axios('https://api.github.com/users/' + userTag);
    icon.src = (data.data.avatar_url);

    while (true) {
        FGtick()
        await sleep(100)
    }
}



fixBackground()


