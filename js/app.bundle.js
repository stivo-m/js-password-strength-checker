// imports
import {
	validateNumbers,
	validateLength,
	validateUpperCaseLetters,
	validateSpecialCharacters,
} from "./modules/validator.js";
import calculateDeductions from "./modules/calculator.js";

//grab all the selectors from the HTML document
const meter = document.querySelector(".card__body-strength-meter");
const password = document.querySelector(".card__body-password-input");
const commentsSection = document.querySelector(".card__comments");
let passwordStrength = 100;
let errors = [];

//function to calculate the strength of the password
const calculateStrength = () => {
	resetUI();

	// this returns an object with message, and deduction
	const validNumbers = validateNumbers(password);
	const uppercaseLetters = validateUpperCaseLetters(password);
	const validLength = validateLength(password);
	const validSpecialChars = validateSpecialCharacters(password);

	const deductionAmounts = [
		validNumbers.deduction,
		uppercaseLetters.deduction,
		validLength.deduction,
		validSpecialChars.deduction,
	];

	const deductions = calculateDeductions(deductionAmounts);

	// push messages
	setErrorMessages(validLength);
	setErrorMessages(uppercaseLetters);
	setErrorMessages(validNumbers);
	setErrorMessages(validSpecialChars);

	// calculate total deductions
	passwordStrength -= deductions;

	displayErrors();

	setPasswordStrength();
};

function resetUI() {
	//clear previous messages
	commentsSection.innerHTML = "";
	errors = [];
	passwordStrength = 100;

	if (password.value.length == 0) {
		passwordStrength = 0;
	}
}

function setErrorMessages(element) {
	element.message ? errors.push(element.message) : null;
}

function displayErrors() {
	errors.forEach((err) => {
		const comment = document.createElement("li");
		comment.innerHTML = err;
		commentsSection.appendChild(comment);
	});
}

function setPasswordStrength() {
	meter.style.setProperty("--strength", passwordStrength);
}

//validate the password based on various criterion
password.addEventListener("input", calculateStrength);
calculateStrength();
