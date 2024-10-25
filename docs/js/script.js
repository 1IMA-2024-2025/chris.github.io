
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

var button = document.getElementById("test");
var MainImg = document.getElementById("MainImage");
let text = "url(";

const Send = async () => {
    x.disabled = true;
    //for (let i = 0; i < 3; i++) {

    //    window.alert(button.type);
        MainImg.style.backgroundImage = text.concat(button.name, ")");
        await sleep(100);
    //}
    x.disabled = false;
}

function Click() {
    Send();
}

    
