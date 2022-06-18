import React from 'react';

class ProfileStatus extends React.Component {
  state = {
    status: '',
    aditMode: false,
  };

  activateAditMode = () => {
    this.setState({ aditMode: true });
  };

  deactivateAditMode = () => {
    this.setState({ aditMode: false });
  };

  onTextareaChange = (e) => {
    let text = e.target.value;

    this.setState({ status: text });
  };

  render() {
    return (
      <div>
        {!this.state.aditMode && (
          <div>
            <span onClick={this.activateAditMode}>
              {this.state.status ? this.state.status : 'Status: ----'}
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
