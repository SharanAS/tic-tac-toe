//To get list of all boxes and reset button
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let turn= document.querySelector("#turn");
let turnO = true;

let moveCount = 0;
//Winning patterns
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//Gets player names
let player1 = prompt("Enter Player 1 name (O):");
let player2 = prompt("Enter Player 2 name (X):");

//If player name is left empty, it is initialized to player O and player X
if(!player1) player1 = "Player O";
if(!player2) player2 = "Player X";

turn.innerText=player1+"'s turn"

//Loads scores from local storage
let score1 = localStorage.getItem(player1) || 0;
let score2 = localStorage.getItem(player2) || 0;
score1 = Number(score1);
score2 = Number(score2);

//Display score
let player1Score = document.querySelector("#player1");
let player2Score = document.querySelector("#player2");
player1Score.innerText=player1+" : "+score1;
player2Score.innerText=player2+" : "+score2;

//Detect button click and check if a player won
boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if(turnO){
            box.innerText = "O";
			turn.innerText=player2+"'s turn"
            turnO = false;
        } else {
            box.innerText = "X";
			turn.innerText=player1+"'s turn"
            turnO = true;
        }

        box.disabled = true;

        //checkWinner();
		moveCount++;

        let winnerFound = checkWinner();

        if(!winnerFound && moveCount === 9){
            alert("It's a Tie!");
			moveCount=0;
        }
		

    });
});

//Check if a player has won
function checkWinner(){

    for(let pattern of winPatterns){

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
			boxes[pattern[0]].style.backgroundColor = "green";
            boxes[pattern[1]].style.backgroundColor = "green";
            boxes[pattern[2]].style.backgroundColor = "green";
                showWinner(pos1);
                return;
            }
        }
    }
}

//Display the winner and update their score
function showWinner(winner){

    if(winner === "O"){
        alert(player1 + " wins!");
        score1++;
        localStorage.setItem(player1, score1);
    }
    else{
        alert(player2 + " wins!");
        score2++;
        localStorage.setItem(player2, score2);
    }

    disableBoxes();
}

//Function to disable boxes after the game has completed
function disableBoxes(){
    boxes.forEach((box)=>{
        box.disabled = true;
    });
	moveCount=0;
	turn.innerText=player1+"'s turn"
}



//Reset game when reset button is pressed
resetBtn.addEventListener("click", resetGame);

function resetGame(){

    turnO = true;

    boxes.forEach((box)=>{
        box.innerText = "";
        box.disabled = false;
    });
	boxes.forEach((box)=>{
        box.style.backgroundColor = "#ffff80";
    });
	moveCount=0;
	//Update score
	player1Score.innerText=player1+" : "+score1;
	player2Score.innerText=player2+" : "+score2;
	
	turn.innerText=player1+"'s turn"
}


//Update score
player1Score.innerText=player1+" : "+score1;
player2Score.innerText=player2+" : "+score2;