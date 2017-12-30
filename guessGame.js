var colors = generateRandomColors(6);
var squares = document.querySelectorAll(".square");
var messageDisplay = document.querySelector("#message");
var pickedColor = pickColor();
var resetButton = document.querySelector("#reset");
var colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor;
resetButton.addEventListener("click", function(){
  colors = generateRandomColors(6);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
})

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
      this.style.backgroundColor = "#232323";
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
