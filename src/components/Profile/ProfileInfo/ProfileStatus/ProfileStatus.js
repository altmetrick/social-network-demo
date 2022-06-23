import React, { useEffect, useState } from 'react';

const ProfileStatus = (props) => {
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

  const onTextareaChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      {!aditMode && (
        <div>
          <span onClick={activateAditMode}>
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
  );
};

class ProfileStatusClass extends React.Component {
  state = {
    status: this.props.userStatus,
    aditMode: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userStatus !== prevProps.userStatus) {
      this.setState({ status: this.props.userStatus });
    }

    console.log('com was updated');
  }

  activateAditMode = () => {
    this.setState({ aditMode: true });
  };

  deactivateAditMode = () => {
    this.setState({ aditMode: false });
    this.props.updateUserStatus(this.state.status);
  };

  onTextareaChange = (e) => {
    let text = e.target.value;

    this.setState({ status: text });
  };

  render() {
    console.log('render');
    return (
      <div>
        {!this.state.aditMode && (
          <div>
            <span onClick={this.activateAditMode}>
              {this.props.userStatus || 'Status: ----'}
            </span>
          </div>
        )}

        {this.state.aditMode && (
          <div>
            <input
              value={this.state.status}
              autoFocus={true}
              onChange={this.onTextareaChange}
              onBlur={this.deactivateAditMode}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
