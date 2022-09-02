import { Formik, Form, Field } from 'formik';
import React, { FunctionComponent } from 'react';

const UsersSearchForm: FunctionComponent<any> = (props) => {
  const onFormSubmit = (values) => {
    props.onFormSubmit(values.term);
  };

  return (
    <Formik initialValues={{ term: '' }} onSubmit={onFormSubmit}>
      {(formik) => (
        <Form>
          <Field name="term" type="text" />
          <button type="submit">search</button>
        </Form>
      )}
    </Formik>
  );
};

export default UsersSearchForm;
