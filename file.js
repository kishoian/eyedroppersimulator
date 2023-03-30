"use strict";

let colorBlock = document.getElementById("color-block");
let intervalId = setInterval(changeColor, 100);

colorBlock.addEventListener("click", stopColorChange);

function changeColor() {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  let color = "#" + rgbToHex(red, green, blue);
  let colorrgb = "RGB: " + red + ", " + green + ", " + blue;
  colorBlock.style.backgroundColor = color;
}

function rgbToHex(r, g, b) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function stopColorChange() {
  clearInterval(intervalId);
  let color = colorBlock.style.backgroundColor;
  let hexColor = rgbToHexColor(color);
  // colorBlock.textContent = hexColor;
  colorBlock.textContent = colorrgb;
}

function rgbToHexColor(rgbColor) {
  let match = rgbColor.match(/rgb\((\d+), (\d+), (\d+)\)/);
  if (match) {
    let red = parseInt(match[1]);
    let green = parseInt(match[2]);
    let blue = parseInt(match[3]);
    return "#" + rgbToHex(red, green, blue);
  }
  return null;
}
