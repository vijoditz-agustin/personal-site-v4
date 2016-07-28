import React, {PropTypes} from 'react';

import throttle from 'lodash.throttle';

import {getYears} from '../../../plugins/helper.js';
import * as onScreen from '../../../plugins/onScreen.js';
import * as skills from '../../../plugins/skills.js';

class Skill extends React.Component {
	static propTypes = {
		data: PropTypes.shape({
			date: PropTypes.string,
			label: PropTypes.string
		})
	};
	getYears () {
		return getYears(this.props.data.date);
	}
	render () {
		return (
			<div className="skill col-xs-6 col-md-3" data-date={this.props.data.date}>
				<h3 dangerouslySetInnerHTML={{__html: this.props.data.label}}></h3>
				<div className="skill-canvas-wrapper">
					<canvas width="110" height="110"></canvas>
					<div className="skill-label">
						<div className="skill-year">{this.getYears()}</div>
						<div className="skill-year-label">years</div>
					</div>
				</div>
			</div>
		);
	}
}

export default class Main extends React.Component {
	static propTypes = {
		skills: PropTypes.array
	};
	static defaultProps = {
		skills: []
	};
	componentDidMount () {
		this.handleScrollWrapper = throttle(() => {
			if (this.props.skills.length && onScreen.test('.skills .skill:first')) {
				skills.run();
			}
		}, 100);

		window.addEventListener('scroll', this.handleScrollWrapper);
	}
	componentWillUnmount () {
		window.removeEventListener('scroll', this.handleScrollWrapper);
	}
	render () {
		const skills = this.props.skills.map((skill, i) => {
			return (
				<Skill key={i} data={skill} />
			);
		});
		return (
			<div className="container content-block">
				<h2>Skills</h2>
				<div className="skills">
					<div className="row">
						{skills}
					</div>
				</div>
			</div>
		);
	}
}