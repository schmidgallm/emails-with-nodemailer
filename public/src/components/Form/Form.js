import React, { useState, Fragment } from 'react';
import { register } from '../../utils/register';
import Loading from '../Loading';
import './Form.css';

const Form = () => {
	// init form state
	const [ formData, setFormData ] = useState({
		first_name: '',
		last_name: '',
		email: ''
	});

	// init message state
	const [ msg, setMsg ] = useState({
		message: ''
	});

	// init loading state
	const [ loading, setLoading ] = useState({
		load: false
	});

	// destructure state
	const { first_name, last_name, email } = formData;
	const { message } = msg;
	const { load } = loading;

	// on change handler
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	// on submit handler
	const onSubmit = async (e) => {
		e.preventDefault();

		// init loading message
		setLoading({ load: true });

		// submit form to api route
		const request = await register(first_name, last_name, email);
		const response = await request;

		if (response) {
			setLoading({ ...loading, loading: false });
		}

		// set message and remove after timeout
		setMsg({ ...msg, message: response.data.message });
		removeMessage(response);
	};

	// set message and timeout message and clear form
	const removeMessage = (response) => {
		setTimeout(() => {
			setMsg({ ...msg, message: '' });
			setFormData({
				first_name: '',
				last_name: '',
				email: ''
			});
		}, 3000);
	};

	return (
		<Fragment>
			{message ? <h3 className="text-primary">{message}</h3> : null}
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="first_name">First Name</label>
					<input
						type="text"
						className="form-control"
						id="first_name"
						aria-describedby="name"
						name="first_name"
						value={first_name}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="last_name">Last Name</label>
					<input
						type="text"
						className="form-control"
						id="last_name"
						aria-describedby="name"
						name="last_name"
						value={last_name}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Email address</label>
					<input
						type="email"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						name="email"
						value={email}
						onChange={(e) => onChange(e)}
					/>
				</div>
				{load ? <Loading /> : null}
				<button type="submit" className="btn btn-warning">
					Send Email
				</button>
			</form>
		</Fragment>
	);
};

export default Form;
