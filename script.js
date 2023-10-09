let firstIn = "";
let secondIn = "";
let operatorId = 0;
let operator = "";
let answer = 0;

const calcEl = document.getElementById("calculator");

const tCalcDisp = document.getElementById("topCalcDisp");
const bCalcDisp = document.getElementById("bottomCalcDisp");

const allNumBtn = document.querySelectorAll(".btn-num");
const decimalBtn = document.getElementById("decimalBtn");
const plusBtn = document.getElementById("plusBtn");
const minusBtn = document.getElementById("minusBtn");
const multiplyBtn = document.getElementById("multiplyBtn");
const divideBtn = document.getElementById("divideBtn");
const delBtn = document.getElementById("delBtn");
const clrBtn = document.getElementById("clrBtn");
const outputBtn = document.getElementById("outputBtn");

const mathConstantsBtn = document.getElementById("mathConst");
const mathConstantsDropdown = document.getElementById("mathConstantsDropdown");
const mathConstsDropdownSummary = document.querySelector("#mathConstantsDropdown>summary");
const mathConstsDropdownChildDiv = document.querySelector("#mathConstantsDropdown>div");

function calculate(e) {
    if (e <= 9) {
        if (Number(answer) !== 0) {
            if (secondIn.length === 0) {
                tCalcDisp.textContent = firstIn + operator;

                answer = 0;

                toggleOperators(0);
                toggleBtn(outputBtn, 1);
            }

            secondIn = rmvUnccsryZrosOnHead(secondIn);
            secondIn += e.toString();
            bCalcDisp.textContent = secondIn;

            toggleOperators(1);
        } else {
            if (operatorId === 0) {
                origTxtClr();
                clrTop();

                firstIn = rmvUnccsryZrosOnHead(firstIn);
                firstIn += e.toString();
                bCalcDisp.textContent = firstIn;

                toggleOperators(1);
                toggleBtn(delBtn, 1);
                toggleBtn(clrBtn, 1);
            } else {
                if (secondIn.length === 0) {
                    tCalcDisp.textContent = firstIn + operator;

                    toggleBtn(outputBtn, 1);
                }

                secondIn = rmvUnccsryZrosOnHead(secondIn);
                secondIn += e.toString();
                bCalcDisp.textContent = secondIn;
            }
        }
    } else if (e === 10) {
        if (Number(answer) !== 0) {
            if (secondIn.length === 0) {
                tCalcDisp.textContent = firstIn + operator;

                answer = 0;

                toggleOperators(0);
                toggleBtn(outputBtn, 1);
            }

            secondIn = rmvUnccsryZrosOnHead(secondIn);
            secondIn += ".";
            bCalcDisp.textContent = secondIn;

            toggleOperators(1);
        } else {
            answer = 0;
            if (operatorId === 0) {
                origTxtClr();
                clrTop();

                firstIn += ".";
                bCalcDisp.textContent = firstIn;

                toggleOperators(1);
                toggleBtn(clrBtn, 1);

                btnClickAnim(decimalBtn);
            } else {
                if (secondIn.length === 0) {
                    tCalcDisp.textContent += operator;

                    toggleOperators(0);
                    toggleBtn(outputBtn, 1);
                }

                secondIn += ".";
                bCalcDisp.textContent = secondIn;
                btnClickAnim(decimalBtn);
            }
        }
    } else if (e >= 11 &&
        e <= 14) {
        if (firstIn.length !== 0) {
            if (secondIn.length === 0) {
                firstIn = rmvUnccsryZrosAndDecsOnTail(firstIn);
                tCalcDisp.textContent = firstIn;

                optrChg(e);
                bCalcDisp.textContent = operator;
            } else {
                calc();
                firstIn = answer.toString();
                tCalcDisp.textContent = firstIn;

                optrChg(e);
                bCalcDisp.textContent = operator;
            }
        }
    } else if (e === 15) {
        if (tCalcDisp.textContent !== "Made by" &&
            bCalcDisp.length !== 0 &&
            firstIn.length !== 0 &&
            tCalcDisp.textContent.slice(-1) !== "=") {
            btnClickAnim(delBtn);

            if (operatorId === 0) {
                firstIn = firstIn.slice(0, -1);
                bCalcDisp.textContent = firstIn;

                if (firstIn.length === 0) {
                    toggleOperators(0);
                    toggleBtn(delBtn, 0);
                    toggleBtn(clrBtn, 0);
                    toggleBtn(outputBtn, 0);
                }
            } else if (operatorId !== 0 &&
                secondIn.length === 0) {
                optrChg(0);

                tCalcDisp.textContent = "‎ ";
                bCalcDisp.textContent = firstIn;
            } else if (secondIn.length !== 0) {
                secondIn = secondIn.slice(0, -1);
                bCalcDisp.textContent = secondIn;

                if (secondIn.length === 0) {
                    tCalcDisp.textContent = firstIn;
                    bCalcDisp.textContent = operator;

                    toggleOperators(1);
                    toggleBtn(outputBtn, 0);
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
        if (bCalcDisp.textContent.length !== 0 &&
            bCalcDisp.textContent !== "‎ ") {
            clrCalcDisp();

            toggleOperators(0);
            toggleBtn(delBtn, 0);
            toggleBtn(clrBtn, 0);
            toggleBtn(outputBtn, 0);

            clrData();

            btnClickAnim(clrBtn);
        }
    } else if (e === 18) {
        btnClickAnim(outputBtn);
        if (Number(answer) === 0) {
            calc();
        }
    }
}

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
            btnClickAnim(plusBtn);
            break;
        case 12:
            operatorId = 2;
            operator = "-";
            btnClickAnim(minusBtn);
            break;
        case 13:
            operatorId = 3;
            operator = "*";
            btnClickAnim(multiplyBtn);
            break;
        case 14:
            operatorId = 4;
            operator = "/";
            btnClickAnim(divideBtn);
            break;
    }
}

function origTxtClr() {
    if (tCalcDisp.textContent === "Made by") {
        clrCalcDisp();
    }
}

function defNumInDisp(i) {
    if (bCalcDisp.textContent === "0") {
        i = "";
    }
    i += e.toString();
    bCalcDisp.textContent = i;
}

function rmvUnccsryZrosOnHead(i) {
    if (bCalcDisp.textContent === "0") {
        i = "";
    }
    return i;
}

function rmvUnccsryZrosAndDecsOnTail(i) {
    if ((i.toString().match(/\./g) || []).length === 1) {
        while (i.toString().slice(-1) === "0" ||
            i.toString().slice(-1) === ".") {
            if (i === ".") {
                i = "0";
                return i;
            }
            if (i.length === 1) {
                return i;
            } else {
                i = i.slice(0, -1);
            }
        }
    }
    return i;
}

function clrCalcDisp() {
    tCalcDisp.textContent = "‎ ";
    bCalcDisp.textContent = "‎ ";
}

function clrTop() {
    if (firstIn.length === 0) {
        tCalcDisp.textContent = "‎ ";
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
            toggleBtn(plusBtn, 0);
            toggleBtn(minusBtn, 0);
            toggleBtn(multiplyBtn, 0);
            toggleBtn(divideBtn, 0);
            break;
        case 1:
            toggleBtn(plusBtn, 1);
            toggleBtn(minusBtn, 1);
            toggleBtn(multiplyBtn, 1);
            toggleBtn(divideBtn, 1);
            break;
    }
}

toggleOperators(0);
toggleBtn(delBtn, 0);
toggleBtn(outputBtn, 0);

function calc() {
    if (tCalcDisp.textContent !== "Made by" &&
        secondIn.length !== 0 &&
        Number(answer) === 0) {
        secondIn = rmvUnccsryZrosAndDecsOnTail(secondIn);

        tCalcDisp.textContent = firstIn + operator + secondIn + "=";

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

        if (isNaN(answer)) {
            answer = "Err";
        }

        answer = rmvUnccsryZrosAndDecsOnTail(answer);
        bCalcDisp.textContent = answer;
        bCalcDisp.classList.add("scale-animation");
        sleep(100).then(() => {
            bCalcDisp.classList.remove("scale-animation");
        });

        toggleBtn(outputBtn, 0);

        secondIn = "";
        optrChg(0);
    }
}

let calculatorYPosition = calcEl.getBoundingClientRect().top;
let calculatorHeight = calcEl.offsetHeight;
let mathConstantsDropdownHeight = mathConstantsDropdown.offsetHeight;
let mathConstsDropdownSummaryHeight = mathConstsDropdownSummary.offsetHeight;

function setMathConstY() {
    calculatorYPosition = calcEl.getBoundingClientRect().top;
    calculatorHeight = calcEl.offsetHeight;

    mathConstantsDropdown.style.top = (calculatorYPosition + calculatorHeight + 25) + "px";
    mathConstsDropdownChildDiv.style.top = mathConstsDropdownSummaryHeight + "px";
}

setMathConstY();

let numKeyInput;

document.addEventListener("keydown", function (e) {
    if (Number(e.key) <= 10) {
        numKeyInput = Number(e.key);

        calculate(numKeyInput);

        for (let i = 0; i < 10; i++) {
            if (Number(allNumBtn[i].textContent) === numKeyInput) {
                btnClickAnim(allNumBtn[i]);
            }
        }
    } else if (e.key === "Backspace") {
        calculate(15);
    } else if (e.key === "Delete") {
        calculate(17);
    } else if (e.key === "Enter") {
        calculate(18);
    } else {
        switch (e.key) {
            case ".":
                calculate(10);
                break;
            case "+":
                calculate(11);
                break;
            case "-":
                calculate(12);
                break;
            case "*":
                calculate(13);
                break;
            case "/":
                calculate(14);
                break;

        }
    }
});