import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import languages from './languages';
import './index.scss';


class Navigation extends React.Component {
  constructor() {
    super();
    this.setFavourites = this.setFavourites.bind(this);
    this.unsetFavourites = this.unsetFavourites.bind(this);
  }

  setFavourites() {
    this.props.setActive(true);
  }

  unsetFavourites() {
    this.props.setActive(false);
  }

  render() {
    return (
      <div className="menu">
        <div className="menu__brand">
          <Link href="a" to="/">
            <span className="icon-symbol">
              <span className="path1" />
              <span className="path2" />
              <span className="path3" />
              <span className="path4" />
              <span className="path5" />
            </span>
            <span className="icon-logo"><span className="path1" /><span className="path2" /></span>
          </Link>
        </div>
        <div className={this.props.active === 0 ? 'menu__link--active' : 'menu__link'}>
          <Link onClick={this.unsetFavourites} href="a" to="/">{languages[this.props.language].home}</Link>
        </div>
        <div className={this.props.active === 1 ? 'menu__link--active' : 'menu__link'}>
          <Link onClick={this.setFavourites} href="a" to="/favourites">{languages[this.props.language].favourites}</Link>
        </div>
        <div className={this.props.active === 2 ? 'menu__button--active' : 'menu__button'}>
          <Link onClick={this.props.setJoin} href="a" to="/join">{languages[this.props.language].join}</Link>
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  language: PropTypes.string,
  active: PropTypes.number.isRequired,
  setActive: PropTypes.func.isRequired,
  setJoin: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
  language: 'en',
};

export default Navigation;
