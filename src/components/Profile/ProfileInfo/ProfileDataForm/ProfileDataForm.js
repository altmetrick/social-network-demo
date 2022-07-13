import { reduxForm, Field } from 'redux-form';
import { FormControlWithInputTag } from '../../../common/FormControls/FormControls';

const ProfileFormRedux = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <button>save</button>

      <div>
        Full Name:
        <Field
          name="fullName"
          component={FormControlWithInputTag}
          inputTag={'input'}
          type="text"
          placeholder="full name"
        />
      </div>

      <div>
        About me:
        <Field
          name="aboutMe"
          component={FormControlWithInputTag}
          inputTag={'input'}
          type="text"
          placeholder="about me"
        />
      </div>

      <div>
        Looking for a job:
        <Field name="lookingForAJob" component="input" type="checkbox" />
      </div>

      <div>
        Skills :{' '}
        <Field
          name="lookingForAJobDescription"
          component={FormControlWithInputTag}
          inputTag={'textarea'}
          type="text"
          placeholder="your skills"
        />
      </div>
    </form>
  );
};

const ProfileDataReduxForm = reduxForm({ form: 'profileDataForm' })(
  ProfileFormRedux
);

const ProfileDataForm = (props) => {
  const submit = (formData) => {
    console.log('FORM DATA', formData);
  };

  return (
    <ProfileDataReduxForm onSubmit={submit} initialValues={props.userData} />
  );
};

export default ProfileDataForm;
