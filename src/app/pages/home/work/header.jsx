import React from 'react';

export default class Header extends React.Component {
	render () {
		return (
			<header className="container content-block">
				<h2 className="text-xs-center">Featured Work</h2>
				<div className="row">
					<div className="col-xs-12 col-md-8 col-md-offset-2 text-xs-center">
						<p>A few of my favorite projects I was lucky to be part of.</p>
					</div>
				</div>
			</header>
		);
	}
}