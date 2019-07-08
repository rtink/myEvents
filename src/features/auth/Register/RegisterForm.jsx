import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
// import { combineValidators, isRequired } from 'revalidate';
import {
  createValidator,
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
} from 'revalidate'
import TextInput from '../../../app/common/form/TextInput';
import { registerUser } from '../authActions';
import SocialLogin from '../SocialLogin/SocialLogin';

const actions = {
  registerUser
};

const isValidEmail = createValidator(
  message => value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message
    }
  },
  'Invalid email address'
)

const validate = combineValidators({
  displayName: isRequired('Please enter a displayName'),
  email: composeValidators(
    isRequired('Please enter an email'),
    isValidEmail
  )(),
  password: composeValidators(
    isRequired({message: 'Please enter a password'}),
    hasLengthGreaterThan(8)({message: 'Password must be greater than 8 characters'})
  )(),
});

const RegisterForm = ({
  handleSubmit,
  registerUser,
  error,
  invalid,
  submitting
}) => {
  return (
    <div>
      <Form
        size='large'
        autoComplete='off'
        onSubmit={handleSubmit(registerUser)}
      >
        <Segment>
          <Field
            name='displayName'
            type='text'
            component={TextInput}
            placeholder='Display Name'
          />
          <Field
            name='email'
            type='text'
            component={TextInput}
            placeholder='Email'
          />
          <Field
            name='password'
            type='password'
            component={TextInput}
            placeholder='Password'
          />
          {error && (
            <Label basic color='red'>
              {error}
            </Label>
          )}
          <Button
            disabled={invalid || submitting}
            fluid
            size='large'
            color='teal'
          >
            Register
          </Button>
          <Divider horizontal>Or</Divider>
          <SocialLogin />
        </Segment>
      </Form>
    </div>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'registerForm', validate })(RegisterForm));