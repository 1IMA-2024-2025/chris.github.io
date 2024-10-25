
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))


var MainImg = document.getElementById("MainImage");
let text = "url(";

const Send  = async (id) => {
    var button = document.getElementById(id);
    button.disabled = true;
    //for (let i = 0; i < 3; i++) {

    //    window.alert(button.type);
        MainImg.style.backgroundImage = text.concat(button.name, ")");
        await sleep(100);
    //}
    
    button.disabled = false;
}

function Click(id) {
    Send(id);
}

    
