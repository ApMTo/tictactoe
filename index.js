const choose = document.querySelector(".choose");
const main = document.querySelector(".main");
const endGame = document.querySelector(".end");
const game = document.querySelector(".game");

setTimeout(() => {
  choose.classList.add("show");
}, 2300);

const btnX = document.querySelector(".btnX");
const btnY = document.querySelector(".btnY");
const title = document.querySelector(".title");
const startGame = document.querySelector(".startGame");
const startBtn = document.querySelector(".start");
const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let playerX = [];
let playerO = [];

let id = 0;
let option = true;
function chooseSymbol() {
  btnX.addEventListener("click", function () {
    title.innerHTML = `Խաղը սկսում է: <span class="material-symbols-outlined close"> close </span>`;
    startGame.innerHTML =
      '<button class="start" onclick="start()">Սկսել խաղը</button>';
    option = true;
  });

  btnY.addEventListener("click", function () {
    title.innerHTML = `Խաղը սկսում է: <span class="material-symbols-outlined circle"> circle </span>`;
    startGame.innerHTML = `<button class="start" onclick="start()">Սկսել խաղը</button>`;
    option = false;
  });
}
chooseSymbol();

function start() {
  main.classList.add("hideMain");
  endGame.classList.add("hideMain");
  setTimeout(() => {
    main.style.display = "none";
    main.classList.remove("hideMain");
    endGame.style.display = "none";
    endGame.classList.remove("hideMain");
  }, 2500);

  setTimeout(() => {
    const game = document.querySelector(".game");
    game.classList.add("starting");
    game.style.display = "block";
    const table = document.querySelector("table");
    table.innerHTML = "";

    for (let i = 0; i <= 2; i++) {
      const tr = document.createElement("tr");
      table.append(tr);
      for (let j = 0; j <= 2; j++) {
        const td = document.createElement("td");
        tr.append(td);
        td.setAttribute("n", `${id}`);
        td.setAttribute("onclick", `printSymbol(${id}, this)`);
        id++;
      }
    }
  }, 3500);
}

let attemps = 0;
function printSymbol(n, tag) {
  if (option) {
    tag.innerHTML += `<span class="material-symbols-outlined close"> close </span>`;
    option = false;
    tag.removeAttribute("onclick");
    playerX.push(n);
    console.log(playerX);
    attemps += 1;
    winner(`<span class="material-symbols-outlined close"> close </span>`, playerX);
  } else {
    tag.innerHTML += `<span class="material-symbols-outlined circle"> circle </span>`;
    option = true;
    tag.removeAttribute("onclick");
    playerO.push(n);
    console.log(playerO);
    attemps += 1;
    winner(`<span class="material-symbols-outlined circle"> circle </span>`, playerO);

  }
}

function winner(winnerName, winnerArray) {
  for (let i = 0; i <= combinations.length; i++) {
    console.log(attemps);
    let moves = 0;
    winnerArray.forEach((el) => {
      if (
        el === combinations[i][0] ||
        el === combinations[i][1] ||
        el === combinations[i][2]
      ) {
        moves++;
      }
    });
    if (moves >= 3) {
      setTimeout(() => {
      return  end(winnerName);
      }, 1000);
    } else if (attemps > 8) {
      setTimeout(() => {
       return end("draw");
      }, 1000);
    }
  }
}

function end(name) {
  playerX = [];
  playerO = [];
  id = 0;
  attemps = 0;
  game.classList.add("removeGame");
  setTimeout(() => {
    game.style.display = "none";
    game.classList.remove("removeGame");
  }, 1800);

  setTimeout(() => {
    endGame.style.display = "block";
    endGame.innerHTML = "";
    if (name === "draw") {
      return endGame.insertAdjacentHTML(
          "beforeend",
          `
        <div class="heading">
        <img
          src="https://play-lh.googleusercontent.com/xfH2BjcWES_xP8gquwD4JMRJROC7J-BvqBpTGEGwxPY2MeLa-fzGFMk05G59yC0dXYQ"
          alt=""
        />
        <h1>Խաղն ավարտվել է ոչ-ոքի</h1>
      </div>
      <button class='play' onclick="start()">Խաղալ նորից</button>

        `
        );
    }
    endGame.insertAdjacentHTML(
      "beforeend",
      `
    <div class="heading">
    <img
      src="https://play-lh.googleusercontent.com/xfH2BjcWES_xP8gquwD4JMRJROC7J-BvqBpTGEGwxPY2MeLa-fzGFMk05G59yC0dXYQ"
      alt=""
    />
    <h1>Խաղն ավարտված է. Հաղթող - ${name}</h1>
  </div>
    `
    );
    endGame.insertAdjacentHTML(
      "beforeend",
      `
        <button class='play' onclick="start()">Խաղալ նորից</button>
      `
    );
  }, 3500);
};
// End