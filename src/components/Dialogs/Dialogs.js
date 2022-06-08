import { Link } from 'react-router-dom';
import s from './Dialogs.module.css';

const Dialogs = (props) => {
  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>
        <div>
          <Link to={`/dialogs/1`}>Andrew</Link>
        </div>
        <div>
          <Link to={`/dialogs/2`}>Jack</Link>
        </div>
        <div>
          <Link to={`/dialogs/3`}>Nick</Link>
        </div>
      </div>

      <div className={s.messages}>
        <div>Hello, how are you</div>
        <div>Message 2</div>
        <div>Lorem ipsum tuta caloboka</div>
      </div>
    </div>
  );
};

export default Dialogs;
