import s from './../common/FormControls/FormControls.module.css';

import { Field, reduxForm, reset } from 'redux-form';
import { FormControlWithInputTag } from '../common/FormControls/FormControls';
import { connect } from 'react-redux';

import { loginThC as login } from '../../redux/reducers/auth-reducer';
import { Navigate } from 'react-router-dom';

const required = (value) => (value ? undefined : 'Required Field');

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          validate={[required]}
          name="email"
          component={FormControlWithInputTag}
          inputTag={'input'}
          type="text"
          placeholder="Email"
        />
      </div>
      <div>
        <Field
          validate={[required]}
          name="password"
          component={FormControlWithInputTag}
          inputTag={'input'}
          type="password"
          placeholder="Password"
        />
      </div>
      <div>
        <Field name="rememberMe" component="input" type="checkbox" />
        remember me
      </div>
      <div>
        <button>Log In</button>
      </div>

      {props.error && (
        <div className={`${s.formControl} ${s.error}`}>
          <span>{props.error}</span>
        </div>
      )}
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: 'loginForm' })(LoginForm);

const Login = (props) => {
  const submit = (values, dispatch) => {
    const { email, password, rememberMe } = values;
    props.login(email, password, rememberMe);
    //dispatch(reset('loginForm'));
  };

  if (props.isAuth) {
    return <Navigate to={`/profile/${props.userId}`} />;
  }

  return (
    <div>
      <LoginReduxForm onSubmit={submit} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.authData.isAuth,
  userId: state.authData.userId,
});

export default connect(mapStateToProps, { login })(Login);
