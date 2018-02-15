import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextFieldGroup from './TextFieldGroup';
import { userSignupRequest } from '../actions/signupActions';
import { addFlashMessage } from '../actions/flashMessagesActions';


class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  isValid(data) {
    let errors = {};

    if (!validateEmail(data.email)) {
      errors.email = 'Invalid email';
    }
    if (data.password.length < 4) {
      errors.password = 'Password too short';
    }
    if (data.password !== data.passwordConfirmation) {
      errors.passwordConfirmation = 'Password Confirmation is different'
    }
    if (Object.keys(errors).length !== 0 && errors.constructor === Object) {
      this.setState({ errors });
      return false;
    }
    return true;
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.isValid(this.state)) {
      this.props.userSignupRequest(this.state).then(function(response) {
        this.props.addFlashMessage({
          type: 'success',
          text: 'You signed up successfully. Welcome!',
        });
        this.context.router.push('/');
      }.bind(this),function(object) {
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
    let errorsBlock = null;
    if (errors.error) {
      errorsBlock = <div className="alert alert-danger">
        Error: {errors.error}
      </div>
    }
    return (
      <div className="">
        <form onSubmit={this.onSubmit}>
          {errorsBlock}
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

          <TextFieldGroup
            error={errors.passwordConfirmation}
            label="Password Confirmation"
            onChange={this.onChange}
            value={this.state.passwordConfirmation}
            field="passwordConfirmation"
            type="password"
          />
          <div className="form-group">
            <button className="btn btn-success">Go !</button>
          </div>
        </form>
      </div>
    );
  }
}

function validateEmail(email) {
    var exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return exp.test(email);
}

function mapDispatchToProps(dispatch) {
  return {
    userSignupRequest: bindActionCreators(userSignupRequest, dispatch),
    addFlashMessage: bindActionCreators(addFlashMessage, dispatch)
   }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
};

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

export default connect(null, mapDispatchToProps)(SignupForm);
