import { Link } from 'react-router-dom';
import s from './Dialogs.module.css';

const DialogItem = (props) => {
  return (
    <div className={s.dialog}>
      <Link to={`/dialogs/${props.id}`}>{props.name}</Link>
    </div>
  );
};

const Message = (props) => {
  return <div>{props.text}</div>;
};

const Dialogs = (props) => {
  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>
        <DialogItem name="Jack" id="1" />
        <DialogItem name="Nick" id="2" />
        <DialogItem name="Jessica" id="3" />
        <DialogItem name="Sam" id="4" />
      </div>

      <div className={s.messages}>
        <Message text="Hello how are you?" />
        <Message text="Bla bla bla " />
        <Message text="Hi Hi hI Hi hi" />
      </div>
    </div>
  );
};

export default Dialogs;
