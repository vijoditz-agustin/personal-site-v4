import React from 'react';
import $ from '../vendor/jquery-2.1.4';

export default class Header extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			open: false
		};
	}
	toggleMenu (e) {
		e.preventDefault();
		this.setState({open: !this.state.open});
	}
	handleClick (e) {
		e.preventDefault();

		const $link = $(e.target);
		if ($link.length) {
			const $target = $($link.attr('href'));

			if ($target.length) {
				$('html, body').animate({
					scrollTop: $target.offset().top
				}, 750);
			}
		}
	}
	render () {
		return (
			<header>
				<nav className="navbar navbar-light">
					<div className="container-fluid">
						<a className="navbar-toggler text-xs-center hidden-md-up" href="" onClick={this.toggleMenu.bind(this)}>
							<span className="icon-menu"></span>
						</a>
						<div className="row">
							<span className="navbar-brand text-uppercase">Agustin Vijoditz</span>
							<div className={'nav-container navbar-toggleable-sm' + (this.state.open ? ' active' : '') }>
								<ul className="nav navbar-nav text-uppercase">
									<li className="nav-item">
										<a className="nav-link" href="#about-me" onClick={this.handleClick}>About me</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="#work" onClick={this.handleClick}>Work</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="#skills" onClick={this.handleClick}>Skills</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="#technologies" onClick={this.handleClick}>Technologies</a>
									</li>
									{/*<li className="nav-item">
										<a className="nav-link" href="#testimonials" onClick={this.handleClick}>Testimonials</a>
									</li>*/}
									<li className="nav-item">
										<a className="btn btn-primary-outline" href="#hire-me" onClick={this.handleClick}>Hire me</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</nav>
			</header>
		);
	}
}