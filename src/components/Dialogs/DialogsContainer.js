import Dialogs from './Dialogs';

import {
  addMessageAC,
  updateNewMessageTextAC,
} from '../../redux/reducers/dialogs-reducer';

const DialogsContainer = (props) => {
  let state = props.store.getState();

  const onMessageChange = (text) => {
    props.store.dispatch(updateNewMessageTextAC(text));
  };

  const addMessage = () => {
    props.store.dispatch(addMessageAC());
  };

  return (
    <Dialogs
      dialogs={state.dialogsPage.dialogs}
      messages={state.dialogsPage.messages}
      newMessageText={state.dialogsPage.newMessageText}
      onMessageChange={onMessageChange}
      addMessage={addMessage}
    />
  );
};

export default DialogsContainer;
