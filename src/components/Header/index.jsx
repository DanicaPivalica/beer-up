import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';


class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header--small">{this.props.smallText}</div>
        <div className="header--big">{this.props.bigText}</div>
        <div className="header__beer">
          <img src="/images/illustration.svg" alt="Kiwi standing on oval" />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  smallText: PropTypes.string.isRequired,
  bigText: PropTypes.string.isRequired,
};

export default Header;

