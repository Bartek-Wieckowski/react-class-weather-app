import React from 'react';
class Input extends React.Component {
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Write location"
          value={this.props.location}
          onChange={this.props.onChangeLocation}
        />
      </div>
    );
  }
}
export default Input;
