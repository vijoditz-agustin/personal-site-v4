import React from 'react';
import $ from '../../vendor/jquery-2.1.4';

class HireMeSent extends React.Component {
	render () {
		return (
			<div className="hire-me-sent">
				<div className="alert alert-success" role="alert">
					<strong>Hooray!</strong> Thank you for the message! I'll get back to you within 48hrs. 
				</div>
			</div>
		);
	}
}

export default class HireMe extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			sending: false,
			sent: false,
			error: false
		};
		
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount () {
		window.Skype.ui({
			'name': 'call',
			'element': 'SkypeButton_Call_agustin.vijodiz_1',
			'participants': ['agustin.vijodiz'],
			'imageSize': 24
		});
	}
	handleSubmit (e) {
		e.preventDefault();
		
		const data = {
			recaptcha: window.document.getElementById('g-recaptcha-response').value,
			name: this.refs.name.value,
			email: this.refs.email.value,
			message: this.refs.message.value
		};

		if (!data.recaptcha) {
			this.setState({error: {
				label: 'Oh snap!',
				message: 'Are you a robot? I couldn\'t find re captcha'  
			}});
			return;
		}
		
		this.setState({
			sending: true,
			error: false
		});

		$.ajax('/send-email', {
			method: 'POST',
			data,
			complete: function () {
				this.setState({sending: false});
			}.bind(this),
			success: function () {
				this.setState({sent: true});
			}.bind(this),
			error: function () {
				this.setState({error: {
					label: 'Opps... this is akward',
					message: 'Something happened on the server... please try again or shoot me an email to agustin@vijoditz.com'  
				}});
			}.bind(this)
		});
	}
	render () {
		return (
			<section id="hire-me" className="hire-me">
				<header className="text-xs-center content-block">
					<h2 className="underline-narrow">Hire me</h2>
					<p className="subtitle">Say Hello! Or get in touch, drop me a message!</p>
				</header>
				<img className="img-fluid hidden-md-up" src="img/contact-mobile.png" alt="Hire Me" />
				<div className="hire-me-bg">
					<div className="container">
						<div className="row content-block">
							<div className="col-xs-12 col-md-6 col-lg-5 col-lg-offset-1 col-xl-4 col-xl-offset-2 hire-me-form-container">
								{(() => {
									if (this.state.sent) {
										return (
											<HireMeSent />
										);
									} else {
										return (
								<form name="hire-me-form" onSubmit={this.handleSubmit}>
									<fieldset className="form-group">
										<label htmlFor="name">Name</label>
										<input type="text" className="form-control" required ref="name" name="name" id="name" placeholder="Your name" />
									</fieldset>
									<fieldset className="form-group">
										<label htmlFor="email">Email</label>
										<input type="email" className="form-control" required ref="email" name="email" id="email" placeholder="Your email" />
									</fieldset>
									<fieldset className="form-group">
										<label htmlFor="message">Message</label>
										<textarea className="form-control" ref="message" required name="message" id="message" placeholder="Your message" rows="3"></textarea>
									</fieldset>
									<fieldset className="form-group">
										<div className="g-recaptcha" data-sitekey="6LeAXiUTAAAAAGAvXQDHId5nmbl75AiFL7o5zn0f"></div>
									</fieldset>
									{(() => {
										if (this.state.error) {
											return (
									<div className="alert alert-danger" role="alert">
										<strong>{this.state.error.label}</strong> {this.state.error.message}
									</div>
											);
										}
										return;
									})()}
									<button
										type="submit"
										className="btn btn-primary btn-block"
										disabled={this.state.sending}
										>{(() => {return this.state.sending ? 'Sending...' : 'Send';})()}</button>
								</form>
										);
									}
								})()}
							</div>
							<div className="col-xs-12 col-md-6 col-lg-5 col-xl-4 hire-me-info-container">
								<div className="hire-me-contact-card">
									<h3>Direct way to reach me</h3>
									<div>
										<span className="icon-map-marker text-xs-center"></span> Denver, Colorado 80206
									</div>
									<div>
										<span className="icon-email text-xs-center"></span> <a href="mailto:agustin@vijoditz.com">agustin@vijoditz.com</a><br />
									</div>
									<div className="hire-me-skype-container">
										<div id="SkypeButton_Call_agustin.vijodiz_1">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}