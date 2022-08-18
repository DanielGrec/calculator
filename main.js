// General
let currentNumber = "";
let previousNumber = "";
let operator = "";
const screen = document.querySelector("#screen");
const topHalf = document.querySelector("#topHalf");
const bottomHalf = document.querySelector("#bottomHalf");
const clearBtn = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const equalsBtn = document.querySelector(".equalsBtn");
const pointBtn = document.querySelector(".pointBtn");
const numberBtn = document.querySelectorAll("[data-number]");
const operatorBtn = document.querySelectorAll("[data-operator]");
//

// On click events
window.addEventListener("keypress", handleKeyPress);

numberBtn.forEach((button) =>
	button.addEventListener("click", (e) => {
		handleNumber(e.target.textContent);
	})
);

operatorBtn.forEach((button) =>
	button.addEventListener("click", (e) => {
		handleOperator(e.target.textContent);
	})
);

clearBtn.addEventListener("click", () => {
	topHalf.textContent = "";
	bottomHalf.textContent = "";
	currentNumber = "";
	previousNumber = "";
	operator = "";
});

deleteBtn.addEventListener("click", handleDelete);

equalsBtn.addEventListener("click", () => {
	if (currentNumber != "" && previousNumber != "") {
		operate();
	}
});

pointBtn.addEventListener("click", () => {
	addDecimal();
});

//

function addDecimal() {
	if (!currentNumber.includes(".")) {
		currentNumber += ".";
		bottomHalf.textContent = currentNumber;
	}
}

function handleNumber(number) {
	if (previousNumber !== "" && currentNumber !== "" && operator === "") {
		previousNumber = "";
		bottomHalf.textContent = currentNumber;
	}
	if (currentNumber.length <= 15) {
		currentNumber += number;
		bottomHalf.textContent = currentNumber;
	}
}

function handleOperator(op) {
	if (previousNumber === "") {
		previousNumber = currentNumber;
		operatorCheck(op);
	} else if (currentNumber === "") {
		operatorCheck(op);
	} else {
		operate();
		operator = op;
		bottomHalf.textContent = "0";
		topHalf.textContent = previousNumber + " " + operator;
	}
}

function handleDelete() {
	if (currentNumber != "") {
		currentNumber = currentNumber.slice(0, -1);
		bottomHalf.textContent = currentNumber;
		if (currentNumber === "") {
			bottomHalf.textContent = "";
		}
	}
	if (currentNumber === "" && previousNumber !== "" && operator !== "") {
		bottomHalf.textContent = previousNumber;
	}
}

function handleKeyPress(e) {
	e.preventDefault();
	if (e.key >= 0 && e.key <= 9) {
		handleNumber(e.key);
	}
	if (
		e.key === "Enter" ||
		(e.key === "=" && currentNumber != "" && previousNumber == "")
	) {
		operate();
	}
	if (e.key === "+" || e.key === "-" || e.key === "/") {
		handleOperator(e.key);
	}
	if (e.key === "*") {
		handleOperator("x");
	}
	if (e.key === ".") {
		addDecimal();
	}
	if (e.key === "Backspace" || e.key === "Delete") {
		handleDelete();
	}
}

function operatorCheck(text) {
	operator = text;
	topHalf.textContent = previousNumber + " " + operator;
	bottomHalf.textContent = "";
	currentNumber = "";
}

// Calculator functions

function operate() {
	previousNumber = Number(previousNumber);
	currentNumber = Number(currentNumber);

	if (operator === "+") {
		previousNumber += currentNumber;
	} else if (operator === "-") {
		previousNumber -= currentNumber;
	} else if (operator === "x") {
		previousNumber *= currentNumber;
	} else if (operator === "/") {
		if (currentNumber <= 0) {
			previousNumber = "ERROR";
			displayResults();
			return;
		}
		previousNumber /= currentNumber;
	}
	previousNumber = previousNumber.toString();
	displayResults();
}

function roundNumber(num) {
	return Math.round(num * 100000) / 100000;
}

function displayResults() {
	if (previousNumber.length <= 14) {
		bottomHalf.textContent = previousNumber;
	} else {
		bottomHalf.textContent = previousNumber.slice(0, 14) + "...";
	}
	topHalf.textContent = "";
	operator = "";
	currentNumber = "";
}
