import s from './Dialogs.module.css';

import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { addMessageAC } from '../../redux/reducers/dialogs-reducer';
import AuthRedirect from '../../hoc/AuthRedirect';
import { Field, reduxForm, reset } from 'redux-form';
import { maxLength } from './../../utilities/validators/validators';
import { CreateControlFormEl } from '../common/FormControls/FormControls';

const maxLength15 = maxLength(15);
const Textarea = CreateControlFormEl('textarea');

let AddMessageForm = (props) => {
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

AddMessageForm = reduxForm({ form: 'dialogsAddMessageForm' })(AddMessageForm);

const Dialogs = (props) => {
  const dialogsEls = props.dialogs.map((item) => (
    <DialogItem name={item.name} id={item.id} />
  ));

  const messagesEls = props.messages.map((item) => (
    <Message text={item.text} id={item.id} />
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

        <AddMessageForm onSubmit={submit} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (text) => {
      dispatch(addMessageAC(text));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
  // AuthRedirect
)(Dialogs);
