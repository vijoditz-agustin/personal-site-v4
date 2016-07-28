import React, {PropTypes} from 'react';
import classNames from 'classnames';

class CardTag extends React.Component {
	static propTypes = {
		type: PropTypes.string,
		label: PropTypes.string
	};
	render () {
		return (
			<li className={'label'+(this.props.type ? ' label-'+this.props.type : '')}>{this.props.label}</li>
		);
	}
}

class Card extends React.Component {
	static propTypes = {
		data: PropTypes.shape({
			size: PropTypes.shape({
				lg: PropTypes.number,
				sm: PropTypes.number
			}),
			img: PropTypes.string,
			title: PropTypes.string,
			text: PropTypes.string,
			tags: PropTypes.array
		})
	};
	render () {
		const tags = this.props.data.tags.map((tag, i) => {
			return (
				<CardTag key={i} type={tag.type} label={tag.label} />
			);
		});
		const cardClasses = ['card', 'card-inverse', 'col-xs-12',
			[`col-sm-${this.props.data.size.sm}`],
			[`col-lg-${this.props.data.size.lg}`],
			[`col-xs-order-${this.props.data.order.xs}`]
		];
		if (this.props.data.order.lg) {
			cardClasses.push([`col-lg-order-${this.props.data.order.lg}`]);
		}
		return (
			<div className={classNames(...cardClasses)}>
				<span className="card-img" style={{backgroundImage:'url(\'img/work/'+this.props.data.img+'\')'}}></span>
				<div className="card-img-overlay">
					<div className="card-img-overlay-content">
						<div className="card-title">{this.props.data.title}</div>
						<p className="card-text">{this.props.data.text}</p>
						<ul className="card-tags">
							{tags}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default class Grid extends React.Component {
	static propTypes = {
		projects: PropTypes.array
	};
	static defaultProps = {
		projects: []
	};
	render () {
		const cards = this.props.projects.map((data, i) => {
			return (
				<Card key={i} data={data} />
			);
		});
		return (
			<div className="work-grid container-fluid">
				<div className="row">
					{cards}
				</div>
			</div>
		);
	}
}