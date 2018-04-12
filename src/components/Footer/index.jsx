import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import languages from './languages';
import './index.scss';


class Footer extends React.Component {
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
      <div className="footer">
        <div className="footer__group">
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
        <div className="footer__group">
          <div className="footer__link">
            <Link onClick={this.unsetFavourites} href="a" to="/">{languages[this.props.language].home}</Link>
          </div>
          <div className="footer__link">
            <Link onClick={this.setFavourites} href="a" to="/favourites">{languages[this.props.language].favourites}</Link>
          </div>
          <div className="footer__link">
            <Link onClick={this.props.setJoin} href="a" to="/join">{languages[this.props.language].join}</Link>
          </div>
        </div>
        <div className="footer__group">
          <div className="footer__link">
            <Link href="a" to="/">
              <span className="icon-pininterest" />
            </Link>
          </div>
          <div className="footer__link">
            <Link href="a" to="/">
              <span className="icon-Linked-In" />
            </Link>
          </div>
          <div className="footer__link">
            <Link href="a" to="/">
              <span className="icon-twitter" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  language: PropTypes.string,
  setActive: PropTypes.func.isRequired,
  setJoin: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  language: 'en',
};

export default Footer;
