// Switcher
let play_with = 'computer';
let span_moved = document.querySelector('.spanmoved');
let switcher = document.querySelector('.switcher');
let game_btns = document.querySelectorAll('.game__footer div');
let changeSymbol = true;
let arr = ['', '', '', '', '', '', '', '', ''];
let gameIndexes = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let indexArr; // will be full of [0,1,3,4,5,6,7,8];
let winnerIs = document.getElementById('winnerIs');
let win_box = document.getElementById('win-box');
let restart = document.getElementById('restart');
let text;
let players = document.querySelectorAll('.players');
let player2 = 'computer';
[...players][1].textContent = player2;
let switchTurn = document.querySelector('.turn-icon');
let stopComputerTurn = false;
let score1 = 0;
let score2 = 0;
let scores = document.querySelectorAll('.scores');
let leader = document.querySelector('.leader');
// Change turn function
function changeTurn() {
  switchTurn.classList.toggle('right');
}
// Score
function score(firstOne) {
  if (firstOne === 'x') {
    score2++;
    [...scores][1].textContent = score2;
  } else if (firstOne === 'o') {
    score1++;
    [...scores][0].textContent = score1;
  }

  if (score2 > score1) {
    leader.textContent = player2;
  } else if (score2 < score1) {
    leader.textContent = 'player1';
  } else {
    leader.textContent = 'tie';
  }
}
switcher.addEventListener('click', (e) => {
  let value = e.target.textContent;
  if (value === 'player') {
    play_with = value;
    span_moved.style.left = '50%';
    player2 = 'player2';
  } else if (value === 'computer') {
    play_with = value;
    span_moved.style.left = '0px';
    player2 = 'computer';
  }

  [...players][1].textContent = player2;
});
// toggle Win_box
function win_boxToggle(whoWins) {
  win_box.classList.add('show');
  text = whoWins === 'x' ? player2 : whoWins === 'o' ? 'player1' : 'No one ';
  winnerIs.textContent = `The winner is ${text}`;
  stopComputerTurn = true;
  changeSymbol = true;
  score(whoWins);
}
//  Restart
restart.addEventListener('click', () => {
  win_box.classList.remove('show');
  switchTurn.classList.remove('right');
});

function testResult(sign) {
  gameIndexes.map((item) => {
    if (item.every((elem) => arr[elem] === sign)) {
      arr = ['', '', '', '', '', '', '', '', ''];
      setTimeout(
        () => [...game_btns].map((divE) => (divE.textContent = '')),
        2000
      );
      win_boxToggle(sign);
    }
  });
  if (arr.every((item) => item)) {
    win_boxToggle();
    arr = ['', '', '', '', '', '', '', '', ''];
    [...game_btns].map((divE) => (divE.textContent = ''));
  }
}
// Play with computer
function withComputer() {
  indexArr = arr
    .map((el, b) => {
      if (!el) return b;
    })
    .filter((ele) => ele != undefined);
}

// player choice
[...game_btns].map(function (item, i) {
  item.addEventListener('click', function () {
    if (!this.textContent) {
      if (changeSymbol) {
        stopComputerTurn = false;
        this.textContent = 'o';
        arr[i] = 'o';
        withComputer();
        changeSymbol = false;
        changeTurn();
        testResult('o');
        if (play_with === 'computer' && !stopComputerTurn) {
          setTimeout(() => {
            let index = indexArr[Math.floor(Math.random() * indexArr.length)];
            [...game_btns][index].textContent = 'x';
            arr[index] = 'x';
            changeSymbol = true;
            testResult('x');
            changeTurn();
          }, 100);
        }
      } else if (play_with !== 'computer') {
        this.textContent = 'x';
        arr[i] = 'x';
        changeSymbol = true;
        testResult('x');
        changeTurn();
      }
    }
  });
});
