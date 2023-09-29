let firstIn = "";
let secondIn = "";
let operatorId = 0;
let operator = "";
let equal = "="
let answer = 0;

const tCalcArea = document.getElementById("top-calc-area");
const bCalcArea = document.getElementById("bottom-calc-area");

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function rst() {
    tCalcArea.innerHTML = "‎ ";
    bCalcArea.innerHTML = "‎ ";
    toggleOperators(1);
}

function toggleOperators (o) {
    switch (o) {
        case 0:
            plus.style.opacity = "0.5";
            minus.style.opacity = "0.5";
            multiply.style.opacity = "0.5";
            divide.style.opacity = "0.5";
            plus.style.cursor = "not-allowed";
            minus.style.cursor = "not-allowed";
            multiply.style.cursor = "not-allowed";
            divide.style.cursor = "not-allowed";
            break;
        case 1:
            plus.style.opacity = "1";
            minus.style.opacity = "1";
            multiply.style.opacity = "1";
            divide.style.opacity = "1";
            plus.style.cursor = "pointer";
            minus.style.cursor = "pointer";
            multiply.style.cursor = "pointer";
            divide.style.cursor = "pointer";
            break;
    }
}

toggleOperators(0);

function clrData() {
    firstIn = "";
    secondIn = "";
    operatorId = 0;
    operator = "";
    equal = "";
}

function input(e) {
    if (e > 0 && e <= 9 && firstIn.length === 0 || e <= 9 && firstIn.length > 0) {
        if (operatorId === 0) {
            if (firstIn.length === 0 && secondIn.length === 0 && operatorId === 0 && operator.length === 0 && equal.length === 0) {
                tCalcArea.innerHTML = "‎ ";
            }
            firstIn += e.toString();
            bCalcArea.innerHTML = firstIn;
            toggleOperators(1);
        } else {
            if (secondIn.length === 0) {
                tCalcArea.innerHTML += operator;
                toggleOperators(0);
            }
            secondIn += e.toString();
            bCalcArea.innerHTML = secondIn;
        }
        equal = "=";
    } else if (e === 10) {
        if (operatorId === 0) {
            firstIn += ".";
            bCalcArea.innerHTML = firstIn;
        } else {
            if (secondIn.length === 0) {
                tCalcArea.innerHTML += operator;
                toggleOperators(0);
            }
            secondIn += ".";
            bCalcArea.innerHTML = secondIn;
        }
    } else if (firstIn.length > 0 && secondIn.length === 0 && e >= 11 && e <= 14) {
        tCalcArea.innerHTML = firstIn;
        switch (e){
            case 11:
                operatorId = 1;
                operator = "+";
                bCalcArea.innerHTML = "+";
                break;
            case 12:
                operatorId = 2;
                operator = "-";
                bCalcArea.innerHTML = "-";
                break;
            case 13:
                operatorId = 3;
                operator = "*";
                bCalcArea.innerHTML = "*";
                break;
            case 14:
                operatorId = 4;
                operator = "/";
                bCalcArea.innerHTML = "/";
                break;
        }
    } else if (e === 15) {
        if (firstIn.length === 0 && secondIn.length === 0 && operatorId === 0 && operator.length === 0 && equal.length === 0) {
            tCalcArea.innerHTML = firstIn;
            bCalcArea.innerHTML = firstIn;
        } else if (operatorId === 0) {
            firstIn = firstIn.slice(0, -1);
            bCalcArea.innerHTML = firstIn;
        } else if (secondIn.length !== 0) {
            secondIn = secondIn.slice(0, -1);
            bCalcArea.innerHTML = secondIn;
        }
    } else if (e === 16) {
        tCalcArea.innerHTML = "‎ ";
        bCalcArea.innerHTML = "‎ ";
        toggleOperators(0);
        clrData();
    } else if (e === 17) {
        if (firstIn.length === 0 && secondIn.length === 0 && operatorId === 0 && operator.length === 0) {
            tCalcArea.innerHTML = "‎ ";
            bCalcArea.innerHTML = "‎ ";
        } else if (secondIn.length !== 0) {
            tCalcArea.innerHTML = firstIn + operator + secondIn + equal;
            switch (operatorId) {
                case 1:
                    answer = Number(firstIn) + Number(secondIn);
                    break;
                case 2:
                    answer = Number(firstIn) - Number(secondIn);
                    break;
                case 3:
                    answer = Number(firstIn) * Number(secondIn);
                    break;
                case 4:
                    answer = Number(firstIn) / Number(secondIn);
                    break;
                default:
                    answer = "Err";
            }
            if (answer.toString().length > 8) {
                bCalcArea.innerHTML = answer.toString().slice(0, 8) + "…";
            } else {
                bCalcArea.innerHTML = answer;
            }

            bCalcArea.classList.add("scale-animation")
            sleep(100).then(() => { bCalcArea.classList.remove("scale-animation"); });

            clrData()
        }
    }
}