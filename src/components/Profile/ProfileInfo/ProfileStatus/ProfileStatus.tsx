import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';

type PropsT = {
  isOwner: boolean;
  userStatus: string;
  updateUserStatus: (statusText: string) => void;
};

const ProfileStatus: FunctionComponent<PropsT> = (props) => {
  const [aditMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.userStatus);

  useEffect(() => {
    setStatus(props.userStatus);
    console.log('Use Effect');
  }, [props.userStatus]);

  const activateAditMode = () => {
    setEditMode(true);
  };

  const deactivateAditMode = () => {
    setEditMode(false);

    props.updateUserStatus(status);
  };

  const onTextareaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      {props.isOwner ? (
        <div>
          {!aditMode && (
            <div>
              <span onClick={activateAditMode} style={{ cursor: 'pointer' }}>
                {props.userStatus || 'Status: ----'}
              </span>
            </div>
          )}

          {aditMode && (
            <div>
              <input
                value={status}
                autoFocus={true}
                onChange={onTextareaChange}
                onBlur={deactivateAditMode}
              />
            </div>
          )}
        </div>
      ) : (
        <span>{props.userStatus || 'Status: ----'}</span>
      )}
    </div>
  );
};

export default ProfileStatus;
