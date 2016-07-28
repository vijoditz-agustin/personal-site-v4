import $ from '../vendor/jquery-2.1.4';

// config
const interval = 20;
const fillColor = 'rgba(255, 0, 255, 1)';

// private vars
const progress = [];
const circles = [];
let started = false;
let $skills;
let minDate = false;
let maxExp = 0;

export function run () {
	if (!started) {
		started = true;
		_loadSkills();
		_start();
	}

}
function _loadSkills () {
	$skills = $('.skills .skill');

	// Load dates
	$skills.each((index, element) => {
		const $skill = $(element);

		$skill.data('date', new Date($skill.data('date')));
		if (!minDate || $skill.data('date') < minDate) {
			minDate = $skill.data('date');
		}
	});

	// Calculate max experience
	maxExp = _getExpInDays(minDate);

	// Calculate durations and create circles
	$skills.each((index, element) => {
		const duration = 700 + Math.floor(Math.random() * 3) * 300;
		const $skill = $(element);
		const circle = new window.ProgressCircle({
			canvas: $skill.find('canvas')[0],
			minRadius: 40,
			arcWidth: 8
		});
		const limit = _getExpInDays($skill.data('date')) / maxExp;

		progress[index] = {
			progress: 0,
			limit,
			pase: limit / (duration / interval)
		};

		circle.addEntry({
			fillColor,
			progressListener () {
				return progress[index].progress;
			}
		});

		circles.push(circle);
	});
}

function _start () {
	circles.map(circle => circle.start(interval));
	_updateCircles();
}

function _stop () {
	circles.map(circle => circle.stop());
}

function _updateCircles () {
	let i;
	let runAgain = false;

	for (i in progress) {
		progress[i].progress += progress[i].pase;

		if (progress[i].progress < progress[i].limit) {
			runAgain = true;
		} else {
			progress[i].progress = progress[i].limit;
		}
	}

	if (runAgain) {
		window.setTimeout(_updateCircles, interval);
	} else {
		_stop();
	}
}

function _getExpInDays (date) {
	return (new Date() - date) / 1000 / 60 / 60 / 24;
}