import React from 'react';

export default class Footer extends React.Component {
	render () {
		const year = new Date().getFullYear();
		return (
			<footer className="text-md-right">
				&copy; {year} Agustin Vijoditz
			</footer>
		);
	}
}