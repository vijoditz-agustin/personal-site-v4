import React from 'react';
import $ from '../vendor/jquery-2.1.4';

import {getExpYears} from '../plugins/helper.js';

import Theater from './home/theater.jsx';
import Work from './home/work.jsx';
import Skills from './home/skills.jsx';
import Testimonials from './home/testimonials.jsx';
import AboutMe from './home/about-me.jsx';
import HireMe from './home/hire-me.jsx';

export default class Home extends React.Component {
	constructor (props) {
		super(props);
		this.state = {loading: true, data: {}, expYears: 0};
	}
	componentDidMount () {
		$.getJSON('/data/home.json', function (data) {
			const expYears = getExpYears(data.skills);

			this.setState({
				loading: false,
				expYears,
				data
			});
			
		}.bind(this) );
	}
	render () {
		if (this.state.loading) {
			return (
				<div className="loading">Loading...</div>
			);
		} else {
			return (
				<div className="home">
					<Theater />
					<AboutMe expYears={this.state.expYears} />
					<Work projects={this.state.data.projects} />
					<Skills technologies={this.state.data.technologies} skills={this.state.data.skills} />
					<Testimonials testimonials={this.state.data.testimonials} />
					<HireMe />
				</div>
			);
		}
	}
}