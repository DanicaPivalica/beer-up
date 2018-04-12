/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';


class Button extends React.Component {
  render() {
    return (
      <div className={this.props.isActive ? 'button--active' : 'button'} onClick={this.props.onClick}>
        {this.props.title}
      </div>
    );
  }
}
Button.propTypes = {
  isActive: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  isActive: true,
};

export default Button;
