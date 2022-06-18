import { Field, reduxForm } from 'redux-form';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name="login" component="input" type="text" placeholder="Login" />
      </div>
      <div>
        <Field
          name="password"
          component="input"
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
