import 'antd/dist/antd.css';

import { Button } from 'antd/lib/radio';
import React from 'react';

import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.firstName) {
    errors.firstName = 'required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.lastName) {
    errors.lastName = 'required';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

  return errors;
};

const MyForm = (props) => {
  return (
    <div>
      <Formik
        initialValues={{ email: '', firstName: '', lastName: '' }}
        validate={validate}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        {(formik) => (
          <Form>
            <div>
              Email:
              <Field name="email" type="email" />
              <ErrorMessage name="email" />
            </div>
            <div>
              first Name:
              <Field name="firstName" type="text" />
              <ErrorMessage name="firstName" />
            </div>
            <div>
              Last Name:
              <Field name="lastName" type="text" />
              <ErrorMessage name="lastName" />
            </div>
            <button>Submit</button>
          </Form>
        )}
      </Formik>
      <Button type="primary">Hello</Button>
    </div>
  );
};

export default MyForm;
