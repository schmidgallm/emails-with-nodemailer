import React from 'react';
import Navbar from './components/Navbar';
import Jumbotron from './components/Jumbotron';
import Form from './components/Form';

function App() {
	return (
		<div className="App">
			<Navbar />
			<Jumbotron />
			<div className="container">
				<Form />
			</div>
		</div>
	);
}

export default App;
