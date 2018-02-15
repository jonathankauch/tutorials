import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextFieldGroup from './TextFieldGroup';
import { login } from '../actions/authActions';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  isValid(data) {
    let errors = {};

    if (!validateEmail(data.email)) {
      errors.email = 'Invalid email';
    }
    if (data.email.length === 0) {
      errors.email = 'Email required';
    }
    if (data.password.length < 4) {
      errors.password = 'Password too short';
    }
    if (data.password.length === 0) {
      errors.password = 'Password is required';
    }
    if (Object.keys(errors).length !== 0 && errors.constructor === Object) {
      console.log(errors);
      this.setState({ errors });
      return false;
    }
    return true;
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.isValid(this.state)) {
      this.setState({errors: {}});
      this.props.login(this.state).then(
        function(response) {
          this.context.router.push('/');
        }.bind(this), function(object) {
          if (object.response !== null && object.response !== undefined) {
            const errors = object.response.data;
            this.setState({ errors });
            return false;
          }
          this.setState({ errors: {
            error: 'Something wrong happens ...'
          }});
        }.bind(this)
      );
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <TextFieldGroup
          error={errors.email}
          label="Email"
          onChange={this.onChange}
          value={this.state.email}
          field="email"
        />

        <TextFieldGroup
          error={errors.password}
          label="Password"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          type="password"
        />

        <div className="form-group text-center">
          <button className="btn btn-success btn-lg">
            Login
          </button>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired,
};

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch)
   }
}


function validateEmail(email) {
    var exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return exp.test(email);
}

export default connect(null, mapDispatchToProps)(LoginForm);
