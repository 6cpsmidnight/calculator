let firstIn = "";
let secondIn = "";
let operatorId = 0;
let operator = "";
let answer = 0;

const tCalcDisp = document.getElementById("topCalcDisp");
const bCalcDisp = document.getElementById("bottomCalcDisp");

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const del = document.getElementById("del");
const clr = document.getElementById("clr");
const output = document.getElementById("output");

const mathConstantsDropdown = document.getElementById("mathConstantsDropdown");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clrData() {
    firstIn = "";
    secondIn = "";
    optrChg(0);
}

function optrChg(optr) {
    switch (optr) {
        case 0:
            operatorId = 0;
            operator = "";
            break;
        case 11:
            operatorId = 1;
            operator = "+";
            btnClickAnim(plus);
            break;
        case 12:
            operatorId = 2;
            operator = "-";
            btnClickAnim(minus);
            break;
        case 13:
            operatorId = 3;
            operator = "*";
            btnClickAnim(multiply);
            break;
        case 14:
            operatorId = 4;
            operator = "/";
            btnClickAnim(divide);
            break;
    }
}

function origTxtClr() {
    if (tCalcDisp.innerHTML === "Made by") {
        clrCalcDisp();
    }
}

function defNumInDisp(i) {
    if (bCalcDisp.innerHTML === "0") {
        i = "";
    }
    i += e.toString();
    bCalcDisp.innerHTML = i;
}

function rmvUnccsryZrosOnHead(i) {
    if (bCalcDisp.innerHTML === "0") {
        i = "";
    }
    return i;
}

function rmvUnccsryZrosAndDecsOnTail(i) {
    if (i.includes(".")) {
        while (i.slice(-1) === "0" || i.slice(-1) === ".") {
            i = i.slice(0, -1);
        }
    }
    return i;
}

function clrCalcDisp() {
    tCalcDisp.innerHTML = "‎ ";
    bCalcDisp.innerHTML = "‎ ";
}

function clrOutcome() {
    if (firstIn.length === 0) {
        tCalcDisp.innerHTML = "‎ ";
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
    sleep(100).then(() => {
        btn.classList.remove("btn-click-anim");
    });
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

// document.addEventListener("keydown", (e) => {
//     if (e.code === "ArrowUp") playerSpriteX += 10
//     else if (e.code === "ArrowDown") playerSpriteX -= 10

//     document.getElementById('test').innerHTML = 'playerSpriteX = ' + playerSpriteX;
// });

function input(e) {
    if (e <= 9) {
        if (operatorId === 0) {
            origTxtClr();
            clrOutcome()

            firstIn = rmvUnccsryZrosOnHead(firstIn);
            firstIn += e.toString();
            bCalcDisp.innerHTML = firstIn;

            toggleOperators(1);
            toggleBtn(clr, 1);
        } else {
            if (secondIn.length === 0) {
                tCalcDisp.innerHTML = firstIn + operator;

                toggleOperators(0);
                toggleBtn(output, 1);
            }

            secondIn += e.toString();
            bCalcDisp.innerHTML = secondIn;
        }

        toggleBtn(del, 1);
    } else if (e === 10) {
        if (operatorId === 0) {
            origTxtClr();
            clrOutcome()

            firstIn += ".";
            bCalcDisp.innerHTML = firstIn;

            toggleOperators(1);
            toggleBtn(del, 1);
            toggleBtn(clr, 1);
        } else {
            if (secondIn.length === 0) {
                tCalcDisp.innerHTML += operator;

                toggleOperators(0);
                toggleBtn(output, 1);
            }

            secondIn += ".";
            bCalcDisp.innerHTML = secondIn;
        }
    } else if (firstIn.length > 0 && secondIn.length === 0 && e >= 11 && e <= 14) {
        firstIn = rmvUnccsryZrosAndDecsOnTail(firstIn);
        tCalcDisp.innerHTML = firstIn;

        optrChg(e);
        bCalcDisp.innerHTML = operator;
    } else if (e === 15) {
        if (tCalcDisp.innerHTML !== "Made by" && bCalcDisp.length !== 0 && firstIn.length !== 0) {
            btnClickAnim(del);

            if (operatorId === 0) {
                firstIn = firstIn.slice(0, -1);
                bCalcDisp.innerHTML = firstIn;

                if (firstIn.length === 0) {
                    toggleOperators(0);
                    toggleBtn(del, 0);
                    toggleBtn(clr, 0);
                    toggleBtn(output, 0);
                }
            } else if (operatorId !== 0 && secondIn.length === 0) {
                optrChg(0);

                tCalcDisp.innerHTML = "‎ ";
                bCalcDisp.innerHTML = firstIn;
            } else if (secondIn.length !== 0) {
                secondIn = secondIn.slice(0, -1);
                bCalcDisp.innerHTML = secondIn;

                if (secondIn.length === 0) {
                    tCalcDisp.innerHTML = firstIn;
                    bCalcDisp.innerHTML = operator;

                    toggleOperators(1);
                    toggleBtn(output, 0);
                }
            }
        }
    } else if (e === 16) {
        mathConstantsDropdown.setAttribute("open", "true");
        mathConstantsDropdown.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    } else if (e === 17) {
        if (bCalcDisp.innerHTML.length !== 0) {
            clrCalcDisp();

            toggleOperators(0);
            toggleBtn(del, 0);
            toggleBtn(clr, 0);

            clrData();

            btnClickAnim(clr);
        }
    } else if (e === 18) {
        if (secondIn.length !== 0) {
            secondIn = rmvUnccsryZrosAndDecsOnTail(secondIn);

            tCalcDisp.innerHTML = firstIn + operator + secondIn + "=";

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
                bCalcDisp.innerHTML = answer.toString().slice(0, 8) + "…";
            } else {
                bCalcDisp.innerHTML = answer;
            }

            bCalcDisp.classList.add("scale-animation");
            sleep(100).then(() => {
                bCalcDisp.classList.remove("scale-animation");
            });

            toggleBtn(del, 0);
            toggleBtn(output, 0);

            clrData();
        }
    }
}