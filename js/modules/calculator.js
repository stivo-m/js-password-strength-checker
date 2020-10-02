export default function calculateDeductions(deductions) {
	let amount = 0;

	deductions.forEach((value) => {
		amount += value;
	});

	return amount;
}
