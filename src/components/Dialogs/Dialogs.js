import s from './Dialogs.module.css';
import { createRef } from 'react';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {
  const dialogsEls = props.state.dialogs.map((item) => (
    <DialogItem name={item.name} id={item.id} />
  ));

  const messagesEls = props.state.messages.map((item) => (
    <Message text={item.text} id={item.id} />
  ));

  const newMessageEl = createRef();

  const addMessage = () => {
    let text = newMessageEl.current.value;
    alert(text);
  };

  return (
    <div className={s.dialogsWrapper}>
      <div className={s.dialogItems}>{dialogsEls}</div>

      <div className={s.messages}>
        {messagesEls}

        <div>
          <textarea ref={newMessageEl} />
        </div>
        <div>
          <button onClick={addMessage}>Add Message</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
