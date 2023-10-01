let firstIn = "";
let secondIn = "";
let operatorId = 0;
let operator = "";
let answer = 0;

const tCalcArea = document.getElementById("top-calc-area");
const bCalcArea = document.getElementById("bottom-calc-area");

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const del = document.getElementById("del");
const clr = document.getElementById("clr");
const output = document.getElementById("output");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clrData() {
    firstIn = "";
    secondIn = "";
    optrChg(0);
}

function optrChg(optr) {
    switch (optr){
        case 0:
            operatorId = 0;
            operator = "";
            break;
        case 1:
            operatorId = 1;
            operator = "+";
            btnClickAnim(plus);
            break;
        case 2:
            operatorId = 2;
            operator = "-";
            btnClickAnim(minus);
            break;
        case 3:
            operatorId = 3;
            operator = "*";
            btnClickAnim(multiply);
            break;
        case 4:
            operatorId = 4;
            operator = "/";
            btnClickAnim(divide);
            break;
    }
}

function origTxtClear() {
    if (tCalcArea.innerHTML === "Made by") {
        clrCalcDisp();
    }
}

function defNumInDisp(i) {
    if (bCalcArea.innerHTML === "0") {
        i = "";
    }
    i += e.toString();
    bCalcArea.innerHTML = i;
}

function rmvUnccsryZrosOnHead(i) {
    if (bCalcArea.innerHTML === "0") {
        i = "";
    }
    return i;
}

function rmvUnccsryZrosOnTail(i) {
    if (i.includes(".") && i.slice(-1) !== ".") {
        while (i.slice(-1) === "0") {
            i = i.slice(0, -1);
        }
    }
    return i;
}

function clrCalcDisp() {
    tCalcArea.innerHTML = "‎ ";
    bCalcArea.innerHTML = "‎ ";
}

function clrOutcome() {
    if (firstIn.length === 0) {
        tCalcArea.innerHTML = "‎ ";
    }
}

function toggleBtn(btn, o) {
    switch (o) {
        case 0:
            btn.style.opacity = "0.5";
            btn.style.cursor = "not-allowed";
            break;
        case 1:
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";
    }
}

function btnClickAnim(btn) {
    btn.classList.add("btn-click-anim");
    sleep(100).then(() => { btn.classList.remove("btn-click-anim"); });
}

function toggleOperators(o) {
    switch (o) {
        case 0:
            toggleBtn(plus, 0);
            toggleBtn(minus, 0);
            toggleBtn(multiply, 0);
            toggleBtn(divide, 0);
            break;
        case 1:
            toggleBtn(plus, 1);
            toggleBtn(minus, 1);
            toggleBtn(multiply, 1);
            toggleBtn(divide, 1);
            break;
    }
}

toggleOperators(0);
toggleBtn(del, 0);
toggleBtn(output, 0);

function input(e) {
    if (e <= 9) {
        if (operatorId === 0) {
            origTxtClear();
            
            clrOutcome() 

            firstIn = rmvUnccsryZrosOnHead(firstIn);
            firstIn += e.toString();
            bCalcArea.innerHTML = firstIn;

            toggleOperators(1);
            toggleBtn(clr, 1);
        } else {
            if (secondIn.length === 0) {
                tCalcArea.innerHTML = firstIn + operator;
                
                toggleOperators(0);
                toggleBtn(output, 1);
            }

            secondIn = rmvUnccsryZrosOnHead(secondIn);
            secondIn += e.toString();
            bCalcArea.innerHTML = secondIn;
        }



        toggleBtn(del, 1);
    } else if (e === 10) {
        if (operatorId === 0) {
            origTxtClear();

            clrOutcome() 

            firstIn += ".";
            bCalcArea.innerHTML = firstIn;

            toggleOperators(1);
            toggleBtn(del, 1);
            toggleBtn(clr, 1);
        } else {
            if (secondIn.length === 0) {
                tCalcArea.innerHTML += operator;
                
                toggleOperators(0);
                toggleBtn(output, 1);
            }

            secondIn += ".";
            bCalcArea.innerHTML = secondIn;
        }
    } else if (firstIn.length > 0 && secondIn.length === 0 && e >= 11 && e <= 14) {
        firstIn = rmvUnccsryZrosOnTail(firstIn);

        tCalcArea.innerHTML = firstIn;

        switch (e) {
            case 11:
                optrChg(1);
                bCalcArea.innerHTML = operator;
                break;
            case 12:
                optrChg(2);
                bCalcArea.innerHTML = operator;
                break;
            case 13:
                optrChg(3);
                bCalcArea.innerHTML = operator;
                break;
            case 14:
                optrChg(4);
                bCalcArea.innerHTML = operator;
                break;
        }
        bCalcArea.innerHTML = operator;
    } else if (e === 15) {
        if (tCalcArea.innerHTML !== "Made by" && bCalcArea.length !== 0 && firstIn.length !== 0) {
            btnClickAnim(del);

            if (operatorId === 0) {
                firstIn = firstIn.slice(0, -1);
                bCalcArea.innerHTML = firstIn;

                if (firstIn.length === 0) {
                    toggleOperators(0);
                    toggleBtn(del, 0);
                    toggleBtn(clr, 0);
                    toggleBtn(output, 0);
                }
            } else if (operatorId !== 0 && secondIn.length === 0) {
                optrChg(0);

                tCalcArea.innerHTML = "‎ ";
                bCalcArea.innerHTML = firstIn;
            } else if (secondIn.length !== 0) {
                secondIn = secondIn.slice(0, -1);
                bCalcArea.innerHTML = secondIn;

                if (secondIn.length === 0) {
                    tCalcArea.innerHTML = firstIn;
                    bCalcArea.innerHTML = operator;
                    
                    toggleOperators(1);
                    toggleBtn(output, 0);
                }
            }
        }
    } else if (e === 16) {
        if (bCalcArea.innerHTML.length !== 0) {
            clrCalcDisp();

            toggleOperators(0);
            toggleBtn(del, 0);
            toggleBtn(clr, 0);

            clrData();

            btnClickAnim(clr);
        }
    } else if (e === 17) {
        if (secondIn.length !== 0) {
            secondIn = rmvUnccsryZrosOnTail(secondIn);
            
            tCalcArea.innerHTML = firstIn + operator + secondIn + "=";

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

            bCalcArea.classList.add("scale-animation");
            sleep(100).then(() => { bCalcArea.classList.remove("scale-animation"); });

            toggleBtn(del, 0);
            toggleBtn(output, 0);

            clrData();
        }
    }
}