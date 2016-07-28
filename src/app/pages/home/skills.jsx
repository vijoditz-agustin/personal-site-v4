import React, {PropTypes} from 'react';

import Main from './skills/main.jsx';
import Technologies from './skills/technologies.jsx';

export default class Skills extends React.Component {
	static propTypes = {
		technologies: PropTypes.array,
		skills: PropTypes.array
	};
	constructor (props) {
		super(props);
	}
	render () {
		return (
			<section id="skills" className="text-xs-center">
				<Main skills={this.props.skills} />
				<Technologies technologies={this.props.technologies} />
			</section>
		);
	}
}