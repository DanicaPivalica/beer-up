import React from 'react';
import { withRouter } from 'react-router';
import { LoginForm } from './components';
import { Header } from '../../components';
import './index.scss';

class Login extends React.Component {
  render() {
    return (
      <div className="flexbox__container">
        <div className="login__header">
          <Header smallText="" bigText="Join up!" />
        </div>
        <div className="login__form__holder">
          <h3 className="login_title"> Quick drink up until all the beer is gone! </h3>
          <LoginForm />
        </div>
      </div>
    );
  }
}
Login.propTypes = {
};


export default withRouter(Login);
