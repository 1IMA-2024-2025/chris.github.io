
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))


var MainImg = document.getElementById("MainImage");
let text = 'url("';

const Send  = async (id) => {
    var button = document.getElementById(id);
    button.disabled = true;

    MainImg.style.backgroundImage = text.concat(button.name, '")');
    button.style.border = "solid rgb(15, 32, 59) 10px" 
    await sleep(100);
 
    button.disabled = false;

    while (MainImg.style.backgroundImage == text.concat(button.name, '")')) {
        await sleep(30)
    }
    button.style.border = "solid rgb(2, 15, 40) 10px" 
}

function Click(id) {
    Send(id);
}

    
