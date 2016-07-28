import React, {PropTypes} from 'react';

class ProgressBar extends React.Component {
	static propTypes = {
		type: PropTypes.string,
		perc: PropTypes.number
	};
	render () {
		return (
			<progress className={'progress'+(this.props.type ? ' progress-'+this.props.type : '')} ref={
				(bar) => {
					// IE fix
					if (bar.getAttribute('value') != this.props.perc) {
						bar.setAttribute('value', this.props.perc);
					}
				}
			} value={this.props.perc} max="100">{this.props.perc}%</progress>
		);
	}
}

class ProgressItem extends React.Component {
	static propTypes = {
		label: PropTypes.string,
		type: PropTypes.string,
		perc: PropTypes.number
	};
	render () {
		return (
			<li>
				<span dangerouslySetInnerHTML={{__html: this.props.label}}></span>
				<ProgressBar type={this.props.type} perc={this.props.perc} />
			</li>
		);
	}
}

class ProgressList extends React.Component {
	static propTypes = {
		data: PropTypes.arrayOf(PropTypes.shape(ProgressItem.propTypes))
	};
	render () {
		const progressItems = this.props.data.map((progress, i) => {
			return (
				<ProgressItem key={i} label={progress.label} type={progress.type} perc={progress.perc} />
			);
		});
		return (
			<ul className="text-xs-left">
				{progressItems}
			</ul>
		);
	}
}

class ProgressColumn extends React.Component {
	static propTypes = {
		lists: PropTypes.array,
		label: PropTypes.string
	};
	render () {
		const progressLists = this.props.lists.map((list, i) => {
			return (
				<ProgressList key={i} data={list} />
			);
		});
		return (
			<div className="col-xs-12 col-md-4">
				<h4>{this.props.label}</h4>
				{progressLists}
			</div>
		);
	}
}

export default class Technologies extends React.Component {
	static propTypes = {
		technologies: PropTypes.array
	};
	static defaultProps = {
		technologies: []
	};
	render () {
		const progressColumns = this.props.technologies.map((column, i) => {
			return (
				<ProgressColumn key={i} label={column.label} lists={column.lists} />
			);
		});
		return (
			<div className="container content-block technologies" id="technologies">
				<div className="row">
					{progressColumns}
				</div>
			</div>
		);
	}
}