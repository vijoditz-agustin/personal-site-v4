import '../assets/scss/app.scss';

import React from 'react';
import {render} from 'react-dom';

import './vendor/ProgressCircle.js';
import './vendor/device.js';

import Promise from  'es6-promise';
Promise.polyfill();

import Header from './partials/header.jsx';
import Footer from './partials/footer.jsx';
import Home from './pages/home.jsx';

class App extends React.Component {
	render () {
		return (
			<div>
				<Header />
				<Home />
				<Footer />
			</div>
		);
	}
}

render(<App/>, document.getElementById('app'));