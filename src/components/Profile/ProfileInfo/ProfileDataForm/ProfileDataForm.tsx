import s from './../ProfileInfo.module.css';
import React, { FunctionComponent } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { FormControlWithInputTag } from '../../../common/FormControls/FormControls';
import { ContactsT, ProfileDataT } from '../../../../types/types';

type FormOwnPropsT = {
  initialValues: ProfileDataT;
};
export type PforileFormDataT = {
  fullName: string;
  aboutMe: string | null;
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
  contacts: ContactsT;
};

const ProfileFormRedux: FunctionComponent<
  InjectedFormProps<PforileFormDataT, FormOwnPropsT> & FormOwnPropsT
> = (props) => {
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
        {Object.keys(props.initialValues.contacts).map((key) => {
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

const ProfileDataForm = reduxForm<PforileFormDataT, FormOwnPropsT>({
  form: 'profileDataForm',
})(ProfileFormRedux);

export default ProfileDataForm;
