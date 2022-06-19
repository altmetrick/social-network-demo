import { Field, reduxForm } from 'redux-form';
import { FormControlWithInputTag } from '../common/FormControls/FormControls';

const required = (value) => (value ? undefined : 'Required Field');

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          validate={[required]}
          name="login"
          component={FormControlWithInputTag}
          inputTag={'input'}
          type="text"
          placeholder="Login"
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
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
  const submit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <LoginReduxForm onSubmit={submit} />
    </div>
  );
};

export default Login;
