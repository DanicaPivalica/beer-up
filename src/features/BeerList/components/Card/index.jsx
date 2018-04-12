/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '../../../../components';
import languages from './languages';
import './index.scss';


class CardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.addBeer = this.addBeer.bind(this);
    this.removeBeer = this.removeBeer.bind(this);
  }

  handleOpenModal() {
    this.props.openModal(this.props.title);
  }

  addBeer(e) {
    e.stopPropagation();
    this.props.addBeer(this.props.title);
  }

  removeBeer(e) {
    e.stopPropagation();
    this.props.removeBeer(this.props.title);
  }

  render() {
    return (
      <div className="card" onClick={this.handleOpenModal} >
        <div className="card__favourite">
          {
            this.props.isFavourite &&
            <Tooltip label={languages[this.props.language].removeBeerFromFavourites}>
              <span onClick={this.removeBeer} className="icon-heart-solid" />
            </Tooltip>
          }
          {
            !this.props.isFavourite &&
            <Tooltip label={languages[this.props.language].addBeerToFavourites}>
              <span onClick={this.addBeer} className="icon-heart-outline" />
            </Tooltip>
          }

        </div>
        <img className="card__img" alt={this.props.image.alt} src={this.props.image.src} />
        <div className="card__title">{this.props.title}</div>
        <div className="card__property--first">
          <span className="card__property__name">abv</span>{this.props.abv}
        </div>
        <div className="card__property">
          <span className="card__property__name">ibu</span>{this.props.ibu}
        </div>
      </div>
    );
  }
}

CardComponent.propTypes = {
  image: PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
  }).isRequired,
  isFavourite: PropTypes.bool,
  language: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  abv: PropTypes.number.isRequired,
  ibu: PropTypes.number.isRequired,
  addBeer: PropTypes.func.isRequired,
  removeBeer: PropTypes.func.isRequired,
};

CardComponent.defaultProps = {
  language: 'en',
  isFavourite: false,
};

export default CardComponent;
