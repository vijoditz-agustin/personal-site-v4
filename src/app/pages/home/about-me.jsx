import React, {PropTypes} from 'react';

export default class AboutMe extends React.Component {
	static propTypes = {
		expYears: PropTypes.number
	};
	render () {
		return (
			<section id="about-me" className="about-me content-block">
				<div className="container">
					<h2 className="text-xs-center">About me</h2>
					<div className="row">
						<div className="col-xs-12 col-lg-10 col-lg-offset-1 col-xl-8 col-xl-offset-2">
							<p>Hi there! I'm Agustin Vijoditz, a Denver based full stack web developer with more than {this.props.expYears} years of experience. I started coding in school when I was 12 years old, in January 2005 I got my first job as a full-time web developer, and since then I've been completely involved this amazing never-ending process of learning new languages, libraries, tools and methodologies every day.</p>

							<p>During my career as a web developer, I have had the opportunity to work with a variety of companies in different industries, allowing me to become very versatile in my work. These projects have also allowed me to become familiar with the companies' workings and thereby create applications that facilitate and accelerate their processes.</p>

							<p>As both a personal and professional characteristic, I'm able to analyze and solve problems quickly and efficiently; I'm a quick learner, I enjoy mentoring and teaching other developers, and I've always found a good way to transmit ideas with developers, management, and clients.</p>
							
							<p>Apart from this, I love to work for social causes and I'm currently involved with a two non-profit organizations. I use my technical and non-technical skills to help solve the issues in our society. </p>
						</div>
					</div>
				</div>
			</section>
		);
	}
}