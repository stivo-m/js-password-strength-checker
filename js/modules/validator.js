const validateLength = (password) => {
	// check the length of the password and return various deductions
	// the deductions will be removed from the meter'
	return matchPattern("password", password, null, 40);
};

const validateNumbers = (password) => {
	const regx = /\d/g;
	return matchPattern("numbers", password, regx, 10);
};
const validateUpperCaseLetters = (password) => {
	const regx = /[A-Z]/g;
	return matchPattern("uppercase letters", password, regx, 10);
};

const validateSpecialCharacters = (password) => {
	const regx = /[^a-zA-Z0-9]+$/;
	return matchPattern("special characters", password, regx, 15);
};

const matchPattern = (name, input, pattern, deduction) => {
	if (name == "special characters") {
		const pass = input.value.split("");
		const matches = [];
		pass.forEach((element) => {
			if (element.match(pattern) != null) matches.push(element);
		});

		const match = matches;
		console.log(match.length);

		if (match.length < 2) {
			return {
				message: `Your have few ${name} in your password`,
				deduction,
			};
		} else {
			return {
				message: "",
				deduction: 0,
			};
		}
	}
	if (name !== "password") {
		const match = input.value.match(pattern) || [];
		if (match <= 0) {
			return {
				message: `Your have few ${name} in your password`,
				deduction,
			};
		}
		if (match.length == 1) {
			return {
				message: `Your have few ${name} in your password`,
				deduction: deduction * 0.75,
			};
		} else if (match.length == 2) {
			return {
				message: `Your can add more ${name} in your password`,
				deduction: deduction * 0.55,
			};
		} else if (match.length > 2) {
			return {
				message: "",
				deduction: 0,
			};
		}
	} else {
		if (input.value.length < 5) {
			return {
				message: `Your ${name} is too short`,
				deduction,
			};
		} else if (input.value.length > 4 && input.value.length < 10) {
			return {
				message: `Your ${name} could be longer`,
				deduction: 0.35 * deduction,
			};
		} else if (input.value.length > 9) {
			return {
				message: "",
				deduction: 0,
			};
		}
	}
};

export {
	validateLength,
	validateNumbers,
	validateUpperCaseLetters,
	validateSpecialCharacters,
};
