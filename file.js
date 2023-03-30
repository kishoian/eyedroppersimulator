		"use strict";

		let colorBlock = document.getElementById("color-block");
		let answer = document.getElementById("text");
		let startButton = document.getElementById("start");
		let colorrgb = '';
		let count = 0;
		let score = 0;
		let lastTenValues = [];
		let arr = [];

		startButton.addEventListener("click", startGame);

		function rgbToHex(r, g, b) {
			return componentToHex(r) + componentToHex(g) + componentToHex(b);
		}

		function componentToHex(c) {
			let hex = c.toString(16);
			return hex.length == 1 ? "0" + hex : hex;
		}

		function startGame() {
			document.getElementById('red-input').value = '';
			document.getElementById('green-input').value = '';
			document.getElementById('blue-input').value = '';
			document.getElementById('popup__text').innerHTML = `&nbsp`;


			let red = Math.floor(Math.random() * 256);
			let green = Math.floor(Math.random() * 256);
			let blue = Math.floor(Math.random() * 256);
			let color = "#" + rgbToHex(red, green, blue);
			colorBlock.style.background = color;
			colorrgb = "RGB: " + red + ", " + green + ", " + blue;
			document.querySelector(".user-input").classList.remove("inactive");
			document.querySelector("#start").classList.add("inactive");
			// document.querySelector(".answer").classList.add("inactive");
			document.getElementById('answer').textContent = '';
			document.getElementById('mislead').textContent = '';
		}

		let checkColorBtn = document.getElementById("check-color-btn");
		checkColorBtn.addEventListener("click", checkColor);

		function checkColor() {
			let redInput = document.getElementById("red-input").value;
			let greenInput = document.getElementById("green-input").value;
			let blueInput = document.getElementById("blue-input").value;
			document.getElementById('score').style.color = 'rgb(256, 256, 256)';

			if (!(0 <= redInput && redInput <= 255) || !(0 <= greenInput && greenInput <= 255) || !(0 <= blueInput && blueInput <= 255) || (redInput == '') || (greenInput == '') || (blueInput == '')) {
				document.getElementById('score').innerHTML = 'ВВЕДИТЕ ЧИСЛО 0 ДО 255<br>:(';
				document.getElementById('score').style.color = 'rgb(239, 21, 11)';
				return false;
			}



			let currentColor = colorBlock.style.backgroundColor;
			let match = currentColor.match(/rgb\((\d+), (\d+), (\d+)\)/);
			let currentRed = match[1];
			let currentGreen = match[2];
			let currentBlue = match[3];

			let deltaRed = Math.abs(redInput - currentRed);
			let deltaGreen = Math.abs(greenInput - currentGreen);
			let deltaBlue = Math.abs(blueInput - currentBlue);

			let distance = Math.sqrt(deltaRed ** 2 + deltaGreen ** 2 + deltaBlue ** 2);
			addValue(distance);

			const avgTen = lastTenValues.reduce((acc, value) => acc + value, 0) / lastTenValues.length;

			let answer = colorrgb;
			let mislead = 'ПРОМАХ НА ' + distance.toFixed(2);

			document.getElementById('answer').innerHTML = answer;
			document.getElementById('mislead').innerHTML = mislead;

			document.querySelector(".answer").classList.remove("inactive");
			document.querySelector("#start").classList.remove("inactive");
			document.querySelector(".user-input").classList.add("inactive");
			// answer.style.color = `rgb(${256 - currentRed}, ${256 - currentGreen}, ${256 - currentBlue})`;
			count++;
			score = (score * (count - 1) + distance) / count;
			document.getElementById('score').innerHTML = 'ПОПЫТОК: ' + count + '. СРЕДНИЙ ПРОМАХ: ' + score.toFixed(2) + '.<br>СРЕДНИЙ ПРОМАХ ЗА 10 ПОПЫТОК: ' + avgTen.toFixed(2);

			popup();
		}



		function popup() {

			fetch('assets/data/data.md')
				.then(response => response.text())
				.then(data => {
					// Разделите содержимое на отдельные строки и создайте массив
					arr = data.split('\n');
				})

			document.getElementById('popup__text').innerHTML = `&nbsp`;

			if (count % 16 == 4) {
				let randomFact = getRandomFact(arr);
				document.getElementById('popup__text').innerHTML = `${randomFact}`;
			}

			if ((count > 5) && (count < 20) && (score < 70)) {
				document.getElementById('popup__text').innerHTML = `Nooo waaay! Я ДУМАЮ, ТЫ ЧИТЕР<br>КАК ТЕБЕ УДАЛОСЬ НАБРАТЬ ТАКОЙ СЧЕТ ТАК БЫСТРО?`;
			}

			// if ((count > ) && (score < 70)) {
			// 	document.getElementById('popup__text').innerHTML = `Nooo waaay! I think you are a cheater.<br>How did you manage to reach such a score so quickly?`;
			// }

			if (count == 52) {
				document.getElementById('popup__text').innerHTML = `ТЫ УЖЕ СДЕЛАЛ ТАК МНОГО ПОПЫТОК.<br>ТЕБЕ ЧТО, ПОНРАВИЛСЯ МОЙ ТРЕНАЖЕР?<br><a href="https://t.me/doublethinking00" target="_blank">https://t.me/doublethinking00<a><br>ДАВАЙТЕ ЗНАКОМИТЬСЯ И ДРУЖИТЬ,<br>ПОДПИСЫВАЙТЕСЬ НА МОЙ КАНАЛ :)`;
			}
			if (count == 84) {
				document.getElementById('popup__text').innerHTML = `О, ТЫ ДО СИХ ПОР ТУТ?<br>В ТАКОМ СЛУЧАЕ, МОЖЕТ БЫТЬ, ТЫ ЕЩË И<br>ПОДПИШЕШЬСЯ НА МОЙ ИНСТАГРАМ?<br>><a href="https://www.instagram.com/kishoyan_rs/" target="_blank">https://www.instagram.com/kishoyan_rs/<a>`;
			}
		}

		function getRandomFact(arr) {
			return arr[Math.floor(Math.random() * arr.length)];
		}

		function addValue(value) {
			// Если в массиве уже 10 значений, удаляем первое значение
			if (lastTenValues.length >= 10) {
				lastTenValues.shift();
			}
			// Добавляем новое значение в конец массива
			lastTenValues.push(value);
		}


		// Сохраняем значение в localStorage перед закрытием страницы
		window.addEventListener('beforeunload', () => {
			localStorage.setItem('score', score);
			localStorage.setItem('count', count);
			localStorage.setItem('lastTenValues', JSON.stringify(lastTenValues));

		});

		// Восстанавливаем значение счета из localStorage при загрузке страницы
		window.addEventListener('load', () => {
			score = parseInt(localStorage.getItem('score') || 0);
			count = parseInt(localStorage.getItem('count') || 0);
			const savedLastTenValues = JSON.parse(localStorage.getItem('lastTenValues')) || [];

			if (savedLastTenValues) {
				lastTenValues = [...savedLastTenValues];
			}
		});