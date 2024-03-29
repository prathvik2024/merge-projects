var player1 = prompt("Enter first Player name: ");
var player2 = prompt("Enter Second Player name: ");
function countdown(time) {
    document.getElementById('timer').innerHTML = time;
    document.getElementById('outertable').style.display = "none";
    if (time > 0) {
        setTimeout(function () { countdown(time - 1) }, 1000);
    }else{
        document.getElementById('timer').innerHTML = "";
        document.getElementById('outertable').style.display = "flex";
    };
}
countdown(3);

// starting is O
document.getElementById("restartBtn").style.display = "none";

let stepCount = 1;
let cross = [];
let zeros = [];
function checkNextMove() {
    if (stepCount % 2 == 0) {
        stepCount++;
        return 'X';
    } else {
        stepCount++;
        return 'O';
    }
}
function game(boxNum) {
    document.getElementById(boxNum).innerText = checkNextMove();
    document.getElementById(boxNum).removeAttribute('onclick');
    if (document.getElementById(boxNum).innerText == "X") {
        cross.push(boxNum);
    } else {
        zeros.push(boxNum);
    }
    if (winCheck() == 0 && stepCount == 10) {
        document.getElementById('result').innerHTML = "Draw The Match!!";
    } else if (winCheck() == 1) {
        document.getElementById('result').innerHTML = "Win The Match!!";
    }
}
function winCheck() {
    flag = 0;
    const winArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7], [1, 4, 7], [2, 5, 8], [3, 6, 9]];
    if ((document.getElementById("box1").innerText == 'X' && document.getElementById("box2").innerText == 'X' && document.getElementById("box3").innerText == 'X')
        || (document.getElementById("box1").innerText == 'O' && document.getElementById("box2").innerText == 'O' && document.getElementById("box3").innerText == 'O') && flag == 0) {
        var tds = document.querySelectorAll("td").forEach((td) => td.removeAttribute("onclick"));
        document.getElementById("restartBtn").style.display = "block";
        flag = 1;
        return 1;
    } else if ((document.getElementById("box4").innerText == 'X' && document.getElementById("box5").innerText == 'X' && document.getElementById("box6").innerText == 'X')
        || (document.getElementById("box4").innerText == 'O' && document.getElementById("box5").innerText == 'O' && document.getElementById("box6").innerText == 'O') && flag == 0) {
        var tds = document.querySelectorAll("td").forEach((td) => td.removeAttribute("onclick"));
        document.getElementById("restartBtn").style.display = "block";
        flag = 1;
        return 1;
    } else if ((document.getElementById("box7").innerText == 'X' && document.getElementById("box8").innerText == 'X' && document.getElementById("box9").innerText == 'X')
        || (document.getElementById("box7").innerText == 'O' && document.getElementById("box8").innerText == 'O' && document.getElementById("box9").innerText == 'O') && flag == 0) {
        var tds = document.querySelectorAll("td").forEach((td) => td.removeAttribute("onclick"));
        document.getElementById("restartBtn").style.display = "block";
        flag = 1;
        return 1;
    } else if ((document.getElementById("box1").innerText == 'X' && document.getElementById("box5").innerText == 'X' && document.getElementById("box9").innerText == 'X')
        || (document.getElementById("box1").innerText == 'O' && document.getElementById("box5").innerText == 'O' && document.getElementById("box9").innerText == 'O') && flag == 0) {
        var tds = document.querySelectorAll("td").forEach((td) => td.removeAttribute("onclick"));
        document.getElementById("restartBtn").style.display = "block";
        flag = 1;
        return 1;
    } else if ((document.getElementById("box3").innerText == 'X' && document.getElementById("box5").innerText == 'X' && document.getElementById("box7").innerText == 'X')
        || (document.getElementById("box3").innerText == 'O' && document.getElementById("box5").innerText == 'O' && document.getElementById("box7").innerText == 'O') && flag == 0) {
        var tds = document.querySelectorAll("td").forEach((td) => td.removeAttribute("onclick"));
        document.getElementById("restartBtn").style.display = "block";
        flag = 1;
        return 1;

    } else if ((document.getElementById("box1").innerText == 'X' && document.getElementById("box4").innerText == 'X' && document.getElementById("box7").innerText == 'X')
        || (document.getElementById("box1").innerText == 'O' && document.getElementById("box4").innerText == 'O' && document.getElementById("box7").innerText == 'O') && flag == 0) {
        var tds = document.querySelectorAll("td").forEach((td) => td.removeAttribute("onclick"));
        document.getElementById("restartBtn").style.display = "block";
        flag = 1;
        return 1;

    } else if ((document.getElementById("box2").innerText == 'X' && document.getElementById("box5").innerText == 'X' && document.getElementById("box8").innerText == 'X')
        || (document.getElementById("box2").innerText == 'O' && document.getElementById("box5").innerText == 'O' && document.getElementById("box8").innerText == 'O') && flag == 0) {
        var tds = document.querySelectorAll("td").forEach((td) => td.removeAttribute("onclick"));
        document.getElementById("restartBtn").style.display = "block";
        flag = 1;
        return 1;

    } else if ((document.getElementById("box3").innerText == 'X' && document.getElementById("box6").innerText == 'X' && document.getElementById("box9").innerText == 'X')
        || (document.getElementById("box3").innerText == 'O' && document.getElementById("box6").innerText == 'O' && document.getElementById("box9").innerText == 'O') && flag == 0) {
        var tds = document.querySelectorAll("td").forEach((td) => td.removeAttribute("onclick"));
        document.getElementById("restartBtn").style.display = "block";
        flag = 1;
        return 1;
    } else {
        return 0;
    }
}

const restartMatch = () => {
    stepCount = 1;
    cross = [];
    zeros = [];
    document.getElementById('result').innerHTML = "";
    document.querySelectorAll('td').forEach((td) => td.innerHTML = "");
    document.querySelectorAll('td').forEach((td, index) => td.setAttribute("onclick", "game(this.id)"));
}