import React from 'react';

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

export default ProfileStatusClass;
