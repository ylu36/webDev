var numSquares = 6;
var colors = generateRandomColors(numSquares);
var colorDisplay = document.getElementById("colorDisplay");
var squares = document.querySelectorAll(".square");
var messageDisplay = document.querySelector("#message");
var pickedColor = pickColor();
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var h1 = document.querySelector("h1");

for(var i = 0; i < modeButtons.length; i ++) {
  modeButtons[i].addEventListener("click", function() {
    modeButtons[0].classList.remove("selected");
    modeButtons[1].classList.remove("selected");
    this.classList.add("selected");
    (this.textContent == "Easy")? numSquares = 3: numSquares = 6;
    reset();
  });
}

function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  this.textContent = "New Colors";
  messageDisplay.textContent = "";
  for(var i = 0; i < squares.length; i ++) {
    if(colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    }
    else {
        squares[i].style.display = "none";
      }
  }
  h1.style.background = "steelblue";
}

colorDisplay.textContent = pickedColor;
resetButton.addEventListener("click", function(){
  reset();
});

for(var i = 0; i < squares.length; i ++) {
  squares[i].style.backgroundColor = colors[i];
  squares[i].addEventListener("click", function(){
    var clickedColor = this.style.backgroundColor;
    if(clickedColor == pickedColor) {
        changeColor(clickedColor);
        messageDisplay.textContent = "Correct";
        resetButton.textContent = "Play Again?";
    }
    else {
      this.style.backgroundColor = "steelblue";
      messageDisplay.textContent = "Try Again";
    }
  });
}

function generateRandomColors(n) {
  var arr = [];
  for(var i = 0; i < n; i ++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  var r = Math.floor(Math.random()*256);
  var g = Math.floor(Math.random()*256);
  var b = Math.floor(Math.random()*256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function changeColor(color) {
  for(var i = 0; i < colors.length; i ++) {
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var c = Math.floor(Math.random()*colors.length);
  console.log(c);
  return colors[c];
}
