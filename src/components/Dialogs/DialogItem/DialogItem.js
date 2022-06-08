import s from './DialogItem.module.css';

import { Link } from 'react-router-dom';

const DialogItem = (props) => {
  return (
    <div className={s.dialog}>
      <Link to={`/dialogs/${props.id}`}>{props.name}</Link>
    </div>
  );
};

export default DialogItem;
