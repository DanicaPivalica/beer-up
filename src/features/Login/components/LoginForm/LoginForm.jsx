/* eslint jsx-a11y/label-has-for:0 */
import React from 'react';
import { Form, Checkbox } from 'react-form';
import './index.scss';
import { InputGroup, RadioGroup, TitleGroup } from '..';
import { Button } from '../../../../components';

const validate = (value) => {
  let emailMessage = null;
  if (value.email && !(/^\S+@\S+$/).test(value.email)) {
    emailMessage = 'Invalid e-mail format';
  }
  return {
    username: {
      error: !value.username ? 'Username is a required field.' : null,
    },
    email: {
      error: !value.email ? 'E-mail is a required field' : emailMessage,
    },
    number: {
      error: value.number && !(/^[0-9()-]+$/).test(value.number) ? 'Invalid phone number format' : null,
    },
    rsvp: {
      error: !value.rsvp ? 'RSVP is a required field.' : null,
    },
  };
};

const rsvpOptions = [
  { id: 'rsvp-coming', value: 'coming', labelText: 'I\'m coming!' },
  { id: 'rsvp-maybe', value: 'maybe', labelText: 'Maybe' },
  { id: 'rsvp-nope', value: 'nope', labelText: 'Nope!' },
];

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(submittedValues) {

  }

  render() {
    return (
      <div className="login__card">
        <Form onSubmit={this.submitForm} validateOnSubmit validate={validate}>
          {formApi => (
            <form className="login__form" onSubmit={formApi.submitForm} id="form2">
              <TitleGroup title="Personal information">
                <InputGroup
                  field="username"
                  id="username"
                  labelText="Username"
                  error={formApi.errors ? formApi.errors.username : null}
                />
              </TitleGroup>
              <TitleGroup title="Contact information">
                <InputGroup
                  field="email"
                  id="email"
                  labelText="Email"
                  error={formApi.errors ? formApi.errors.email : null}
                />
                <InputGroup
                  field="number"
                  id="number"
                  labelText="Phone number"
                  error={formApi.errors ? formApi.errors.number : null}
                />
              </TitleGroup>
              <TitleGroup title="RVSP">
                <RadioGroup
                  field="rsvp"
                  values={rsvpOptions}
                  error={formApi.errors ? formApi.errors.rvsp : null}
                />
                <InputGroup field="bio" id="bio" labelText="Bio" isSmall={false} />
              </TitleGroup>
              <Checkbox field="let-me-know" id="checkbox1" />
              <label htmlFor="checkbox-input-future" className="mr-2">Let me know about future beerups!</label>
              <hr style={{ borderColor: 'transparent' }} />
              <Checkbox field="remind-me" id="checkbox2" />
              <label htmlFor="checkbox-input-remind" className="mr-2">Remind me one day before this beerup!</label>
              <Button onClick={formApi.submitForm} title="Submit" />
            </form>
    )}
        </Form>
      </div>
    );
  }
}

export default LoginForm;
