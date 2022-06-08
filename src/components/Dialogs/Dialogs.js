import s from './Dialogs.module.css';

import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {
  const dialogsEls = props.state.dialogs.map((item) => (
    <DialogItem name={item.name} id={item.id} />
  ));

  const messagesEls = props.state.messages.map((item) => (
    <Message text={item.text} id={item.id} />
  ));

  const onTextareaChange = (e) => {
    let text = e.target.value;
    props.updateNewMessageText(text);
  };

  const onButtonClick = () => {
    props.addMessage();
  };

  return (
    <div className={s.dialogsWrapper}>
      <div className={s.dialogItems}>{dialogsEls}</div>

      <div className={s.messages}>
        {messagesEls}

        <div>
          <textarea
            value={props.state.newMessageText}
            onChange={onTextareaChange}
          />
        </div>
        <div>
          <button onClick={onButtonClick}>Add Message</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
