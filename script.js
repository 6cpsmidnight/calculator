let firstIn = "";
let secondIn = "";
let operatorId = 0;

const calcArea = document.getElementById("calculation-area");

function input(e) {
    if (e > 0 && e <= 9 && firstIn.length === 0 || e <= 9 && firstIn.length > 0) {
        if (operatorId === 0) {
            firstIn += e.toString();
            calcArea.innerHTML = firstIn;
        } else {
            secondIn += e.toString();
            calcArea.innerHTML = secondIn;
        }
    } else if (e === 10) {
        if (operatorId === 0) {
            firstIn += ".";
            calcArea.innerHTML = firstIn;
        } else {
            secondIn += ".";
            calcArea.innerHTML = secondIn;
        }
    } else if (firstIn.length > 0 && secondIn.length === 0 && e >= 11 && e <= 14) {
        switch (e){
            case 11:
                operatorId = 1;
                calcArea.innerHTML = "+";
                break;
            case 12:
                operatorId = 2;
                calcArea.innerHTML = "-";
                break;
            case 13:
                operatorId = 3;
                calcArea.innerHTML = "*";
                break;
            case 14:
                operatorId = 4;
                calcArea.innerHTML = "/";
                break;
        }
    } else if (e === 15) {
        if (operatorId === 0) {
            firstIn = firstIn.slice(0, -1);
            calcArea.innerHTML = firstIn;
        } else if (secondIn.length !== 0) {
            secondIn = secondIn.slice(0, -1);
            calcArea.innerHTML = secondIn;
        }
    } else if (e === 16) {
        switch (operatorId) {
            case 1:
                calcArea.innerHTML = Number(firstIn) + Number(secondIn);
                break;
            case 2:
                calcArea.innerHTML = Number(firstIn) - Number(secondIn);
                break;
            case 3:
                calcArea.innerHTML = Number(firstIn) * Number(secondIn);
                break;
            case 4:
                calcArea.innerHTML = Number(firstIn) / Number(secondIn);
                break;
            default:
                calcAreaHTML = "Err";
        }
        firstIn = "";
        secondIn = "";
        operatorId = 0;
    }
}