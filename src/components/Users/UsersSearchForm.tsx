import { Formik, Form, Field } from 'formik';
import React, { FunctionComponent } from 'react';
import { FilterType } from '../../redux/reducers/users-reducer';

type PropsT = {
  onFilterChanged: (filter: FilterType) => void;
};

const UsersSearchForm: FunctionComponent<PropsT> = (props) => {
  const submit = (values: FilterType) => {
    props.onFilterChanged(values);
  };

  return (
    <Formik initialValues={{ term: '', friend: null }} onSubmit={submit}>
      {(formik) => (
        <Form>
          <Field name="term" type="text" />
          <Field as="select" name="friend">
            <option value="null">All</option>
            <option value="true">Only Followed</option>
            <option value="false">Not Followed</option>
          </Field>
          <button type="submit">search</button>
        </Form>
      )}
    </Formik>
  );
};

export default UsersSearchForm;
