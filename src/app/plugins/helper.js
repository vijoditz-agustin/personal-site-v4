
export let getYears = function (date, decimals=1) {
	const now = new Date();
	const since = new Date(date);

	const dateDiff = now - since;
	const decimalFactor = decimals > 0 ? decimals * 10 : 1;
	const secondsToYears = 60 * 60 * 24 * 365;
	
	return Math.round(dateDiff * decimalFactor / 1000 / secondsToYears) / decimalFactor;
};

export let getExpYears = function (skills) {
	let years = 0;
	
	skills.map(skill => {
		const skillYears = Math.floor(getYears(skill.date));
		
		if (years < skillYears) {
			years = skillYears;
		}
	});
	
	return years;
};