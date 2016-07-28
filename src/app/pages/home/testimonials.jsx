import React, {PropTypes} from 'react';
import Carousel from 'nuka-carousel';

class Testimonial extends React.Component {
	static propTypes = {
		quote: PropTypes.string,
		endorser: PropTypes.string
	};
	render () {
		return (
			<div>
				<p>"{this.props.quote}"</p>
				<span className="endorser">- {this.props.endorser}</span>
			</div>
		);
	}
} 

export default class Testimonials extends React.Component {
	static propTypes = {
		testimonials: PropTypes.array
	};
	static defaultProps = {
		testimonials: []
	};
	mixins: [Carousel.ControllerMixin]
	render () {
		const carouselItems = this.props.testimonials.map((testimonial, i) => {
			return (
				<Testimonial key={i} quote={testimonial.quote} endorser={testimonial.endorser} />
			);
		});
		const decorators = [
			{
				component: React.createClass({
					render () {
						const self = this;
						const indexes = this.getIndexes(self.props.slideCount);
						return (
							<ul className="bullets">
								{
								indexes.map((i) => {
									return (
										<li className="bullet" key={i}>
											<button className={'button'+(self.props.currentSlide === i ? ' active' : '')}
											onClick={self.props.goToSlide.bind(null, i)}>
												<span className="icon-circle" />
												<span className="icon-circle-o" />
											</button>
										</li>
									);
								})
								}
							</ul>
						);
					},
					getIndexes (count) {
						const arr = [];
						let i = 0;

						for (; i < count;) {
							arr.push(i++);
						}
						
						return arr;
					}
				}),
				position: 'BottomCenter'
			}
		];

		return (
			<section id="testimonials" className="testimonials content-block text-xs-center">
				<h2>Testimonials</h2>
				<Carousel decorators={decorators}>
					{carouselItems}
				</Carousel>
			</section>
		);
	}
}