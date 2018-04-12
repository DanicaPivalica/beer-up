import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';
import Loader from 'react-loaders';
import { Card } from '../index';
import { Tooltip } from '../../../../components';
import languages from './languages';
import './index.scss';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMobile: false };
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({
        isMobile: window.innerWidth < 1200,
      });
    }, false);
  }

  render() {
    const className = this.state.isMobile ? 'card__container dragscroll' : 'card__container';
    return (
      <InfiniteScroll
        pullDownToRefresh
        dataLength={this.props.beers.length} // This is important field to render the next data
        refreshFunction={this.props.refreshData}
        next={this.props.fetchData}
        hasMore={this.props.hasMore}
        loader={<div>{this.props.beers.length === 0 && <Loader type="ball-pulse" />}</div>}
        endMessage={
          !this.props.isFavouritesActive &&
          <Tooltip label={languages[this.props.language].notRly}>
            <p style={{ textAlign: 'center', cursor: 'pointer' }}>
              <b>{languages[this.props.language].seenItAll}</b>
            </p>
          </Tooltip>
            }
      >

        <div nochilddrag className={className} >
          <h2 className="card__header">{ this.props.isFavouritesActive ? 'My favourite beers' : 'Beers'}</h2>
          {this.props.beers.map(beer => (
            <Card
              title={beer.name}
              image={{ alt: beer.name, src: beer.image_url }}
              abv={beer.abv}
              openModal={this.props.openModal}
              ibu={beer.ibu}
              addBeer={this.props.addBeer}
              removeBeer={this.props.removeBeer}
              isFavourite={beer.isFavourite || false}
              key={beer.name}
            />
          ))}
        </div>
      </InfiniteScroll>
    );
  }
}
CardList.propTypes = {
  beers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  hasMore: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
  language: PropTypes.string,
  addBeer: PropTypes.func.isRequired,
  removeBeer: PropTypes.func.isRequired,
  isFavouritesActive: PropTypes.func.isRequired,
};

CardList.defaultProps = {
  language: 'en',
};

export default CardList;
