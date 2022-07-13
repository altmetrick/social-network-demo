import s from './../ProfileInfo.module.css';

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
        Skills :
        <Field
          name="lookingForAJobDescription"
          component={FormControlWithInputTag}
          inputTag={'textarea'}
          type="text"
          placeholder="your skills"
        />
      </div>
      <div>
        <h3>Contacts</h3>
        {Object.keys(props.userData.contacts).map((key) => {
          return (
            <div key={key}>
              {key}:
              <Field
                name={`contacts.${key}`}
                component={FormControlWithInputTag}
                inputTag={'input'}
                type="text"
              />
            </div>
          );
        })}
        <br />
      </div>
      {props.error && (
        <div className={`${s.formControl} ${s.error}`}>
          <span>{props.error}</span>
        </div>
      )}
    </form>
  );
};

const ProfileDataReduxForm = reduxForm({ form: 'profileDataForm' })(
  ProfileFormRedux
);

const ProfileDataForm = (props) => {
  return (
    <ProfileDataReduxForm
      onSubmit={props.onFormSubmit}
      initialValues={props.userData}
      userData={props.userData}
    />
  );
};

export default ProfileDataForm;
