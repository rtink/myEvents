import React from 'react';
import { Segment, Header, Form, Divider, Label, Button, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
  matchesField
} from 'revalidate'
import TextInput from '../../../app/common/form/TextInput';

const validate = combineValidators({
  newPassword1: composeValidators(
    isRequired({message: 'Please enter a new password'}),
    hasLengthGreaterThan(8)({message: 'Password must be greater than 8 characters'})
  )(),
  newPassword2: composeValidators(
    isRequired({message: 'Please confirm new password'}),
    matchesField('newPassword1')({message: 'Passwords do not match'}),
    hasLengthGreaterThan(8)({message: 'Password must be greater than 8 characters'})
  )(),
});

const AccountPage = ({ error, invalid, submitting, handleSubmit, updatePassword, providerId }) => {
  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      {providerId && providerId === 'password' &&
      <div>
        <Header color="teal" sub content="Change password" />
        <p>Use this form to update your account settings</p>
        <Form onSubmit={handleSubmit(updatePassword)}>
          <Field
            width={8}
            name="newPassword1"
            type="password"
            pointing="left"
            inline={true}
            component={TextInput}
            basic={true}
            placeholder="New Password"
          />
          <Field
            width={8}
            name="newPassword2"
            type="password"
            inline={true}
            basic={true}
            pointing="left"
            component={TextInput}
            placeholder="Confirm Password"
          />
          {error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
          <Button 
            size="large" 
            positive 
            content="Update Password" 
            disabled={invalid || submitting}
          />
        </Form>
      </div>}
        <Divider />
        {providerId && providerId === 'google.com' &&
      <div>
        <Header color="teal" sub content="Google Account" />
        <p>Please visit Google to update your account settings</p>
        <Button type="button" color="google plus">
          <Icon name="google plus" />
          Go to Google
        </Button>
      </div>}
    </Segment>
  );
};

export default reduxForm({ form: 'account', validate })(AccountPage);