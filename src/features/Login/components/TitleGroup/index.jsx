import React from 'react';

import PropTypes from 'prop-types';

class TitleGroup extends React.Component {
  render() {
    return (
      <div style={{ flexBasis: '100%', marginTop: '10px' }}>
        <h3 className="login__title">{this.props.title}</h3>
        {this.props.children}
        <hr style={{ width: '100%' }} />
      </div>
    );
  }
}

TitleGroup.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default TitleGroup;
