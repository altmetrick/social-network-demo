import s from './Dialogs.module.css';

import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addMessageAC as addMessage } from '../../redux/reducers/dialogs-reducer';
import AuthRedirect from '../../hoc/AuthRedirect';
import { Field, InjectedFormProps, reduxForm, reset } from 'redux-form';
import { maxLength } from '../../utilities/validators/validators';
import { CreateControlFormEl } from '../common/FormControls/FormControls';
import { RootStateT } from '../../redux/redux-store';
import { DialogT, MessageT } from '../../types/types';

const maxLength15 = maxLength(15);
const Textarea = CreateControlFormEl('textarea');

type LoginFormDataT = {
  messageText: string;
};
type LoginFormPropsT = {};

const AddMessageForm: FunctionComponent<
  InjectedFormProps<LoginFormDataT, LoginFormPropsT> & LoginFormPropsT
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          validate={[maxLength15]}
          name="messageText"
          component={Textarea}
          type="text"
          placeholder="Write your message"
        />
      </div>
      <div>
        <button type="submit">Add Message</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm<LoginFormDataT, {}>({
  form: 'dialogsAddMessageForm',
})(AddMessageForm);

////Dialogs Component
type OwnPropsT = {};
type MapStatePropsT = {
  dialogs: Array<DialogT>;
  messages: Array<MessageT>;
};
type MapDispatchPropsT = {
  addMessage: (text: string) => void;
};

type DPropsT = OwnPropsT & MapStatePropsT & MapDispatchPropsT;

const Dialogs: FunctionComponent<DPropsT> = (props) => {
  const dialogsEls = props.dialogs.map((item) => (
    <DialogItem name={item.name} id={item.id} key={item.id} />
  ));

  const messagesEls = props.messages.map((item) => (
    <Message text={item.text} id={item.id} key={item.id} />
  ));

  const submit = (values, dispatch) => {
    console.log(values);

    props.addMessage(values.messageText);

    dispatch(reset('dialogsAddMessageForm'));
  };

  return (
    <div className={s.dialogsWrapper}>
      <div className={s.dialogItems}>{dialogsEls}</div>

      <div className={s.messages}>
        <h4>Messages</h4>
        {messagesEls}

        <AddMessageFormRedux onSubmit={submit} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootStateT) => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
  };
};

export default compose<any>(
  connect<MapStatePropsT, MapDispatchPropsT, OwnPropsT, RootStateT>(
    mapStateToProps,
    { addMessage }
  ),
  AuthRedirect
)(Dialogs);
