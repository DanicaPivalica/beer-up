/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint react/jsx-boolean-value:0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { Button, Tooltip } from '../../../../components';
import './index.scss';


class CardModal extends React.Component {
  constructor(props) {
    super(props);
    this.addBeer = this.addBeer.bind(this);
    this.removeBeer = this.removeBeer.bind(this);
  }

  addBeer() {
    this.props.addBeer(this.props.title);
  }

  removeBeer() {
    this.props.removeBeer(this.props.title);
  }
  render() {
    return (
      <div className="card__modal">
        <div onClick={this.props.isFavourite ? this.removeBeer : this.addBeer} className="card__modal__favourite">
          {
                this.props.isFavourite &&
                <Tooltip label="Remove from favourites">
                  <span className="icon-heart-solid" />
                </Tooltip>
            }
          {
                !this.props.isFavourite &&
                <Tooltip label="Add to favourites">
                  <span className="icon-heart-outline" />
                </Tooltip>
            }
        </div>
        <span className="icon-Close-icon" onClick={this.props.close} />
        <img className="card__modal__img" alt={this.props.image.alt} src={this.props.image.src} />
        <div className="card__modal__property__holder">
          <div className="card__modal__title">{this.props.title}</div>
          <div className="card__modal__property--first">
            <span className="card__modal__property__name">description</span>{this.props.description}
          </div>
          <div className="card__modal__property">
            <span className="card__modal__property__name">ph</span>{this.props.ph}
          </div>
          <div className="card__modal__property">
            <span className="card__modal__property__name">first brewed</span>{this.props.first_brewed}
          </div>
          <div className="card__modal__property">
            <Button onClick={() => toastr.warning('Oops!', 'Sorry this feature is not available yet!')} isActive={true} title="Add to crate" />
          </div>
        </div>
      </div>
    );
  }
}

CardModal.propTypes = {
  image: PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
  }).isRequired,
  isFavourite: PropTypes.bool.isRequired,
  ph: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  first_brewed: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  addBeer: PropTypes.func.isRequired,
  removeBeer: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default CardModal;
