import $ from '../vendor/jquery-2.1.4';
const $window = $(window);

export function test (selector) {
	const $el = $(selector);
	const t = $el.get(0);
	const vpHeight = $window.height();

	if (typeof t.getBoundingClientRect === 'function') {

		// Use this native browser method, if available.
		const rect = t.getBoundingClientRect();

		return rect.top >= 0 && rect.top < vpHeight;
	} else {

		const viewTop = $window.scrollTop();
		const viewBottom = viewTop + vpHeight;
		const offset = $el.offset();
		const _top = offset.top;
		const _bottom = _top + $el.height();

		return (_bottom <= viewBottom) && (_top >= viewTop);
	}
}

