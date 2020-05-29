import React, { useState, Fragment } from 'react';
import { register } from '../../utils/register';
import './Form.css';

const Form = () => {
  // init state
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  const [msg, setMsg] = useState({
    message: ''
  });

  // destructure state
  const { first_name, last_name, email } = formData;
  const { message } = msg;

  // on change handler
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // on submit handler
  const onSubmit = async e => {
    e.preventDefault();

    // submit form to api route
    const request = await register(first_name, last_name, email);
    const response = await request;

    // set message and remove after timeout
    setMsg({ ...msg, message: response.data.message });
    removeMessage(response);
  };

  // set message and timeout message
  const removeMessage = response => {
    setTimeout(() => {
      setMsg({ ...msg, message: '' });
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
            onChange={e => onChange(e)}
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
            onChange={e => onChange(e)}
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
            onChange={e => onChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-warning">
          Get Email
        </button>
      </form>
    </Fragment>
  );
};

export default Form;
