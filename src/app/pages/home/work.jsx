import React, {PropTypes} from 'react';

import Header from './work/header.jsx';
import Grid from './work/grid.jsx';

export default class Work extends React.Component {
	static propTypes = {
		projects: PropTypes.array
	};
	static defaultProps = {
		projects: []
	};
	render () {
		return (
			<section id="work">
				<Header />
				<Grid projects={this.props.projects} />
			</section>
		);
	}
}