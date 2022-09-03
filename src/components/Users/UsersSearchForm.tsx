import { Formik, Form, Field } from 'formik';
import React, { FunctionComponent } from 'react';
import { FilterType } from '../../redux/reducers/users-reducer';

type PropsT = {
  onFilterChanged: (filter: FilterType) => void;
  filter: FilterType;
};

type SearchUsersValuesT = {
  term: string;
  friend: 'null' | 'true' | 'false';
};

const UsersSearchForm: FunctionComponent<PropsT> = (props) => {
  const submit = (values: SearchUsersValuesT) => {
    const filter: FilterType = {
      term: values.term,
      friend:
        values.friend === 'null'
          ? null
          : values.friend === 'true'
          ? true
          : false,
    };

    props.onFilterChanged(filter);
  };

  return (
    <Formik
      initialValues={{
        term: props.filter.term,
        friend: props.filter.friend as never,
      }}
      onSubmit={submit}
    >
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
