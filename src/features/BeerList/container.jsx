import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { CardModal, CardList, Crate } from './components';
import { Header, Button } from '../../components';
import {
  loadedBeersSelector,
  currentPageSelector,
  loadNextPage,
  selectActive,
  addBeerToFavourites,
  removeBeerFromFavourites,
  toggleSortByABV,
  toggleSortByName,
  selectSortByName,
  selectSortByABV,
} from './duck';
import './index.scss';

const style = {
  content: {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.08)',
    border: '0',
    borderRadius: '4px',
    bottom: 'auto',
    minHeight: '10rem',
    left: '50%',
    padding: '2rem',
    position: 'fixed',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    minWidth: '20rem',
    width: '80%',
    maxWidth: '60rem',
    overflow: 'visible',
  },
};

class BeerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.fetchData = this.fetchData.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggleABV = this.toggleABV.bind(this);
    this.toggleName = this.toggleName.bind(this);
    this.fetchData();
  }

  open(beerTitle) {
    this.setState({ open: true, name: beerTitle });
  }

  close() {
    this.setState({ open: false });
  }

  fetchData() {
    this.props.loadPage(this.props.activePage + 1);
  }

  refreshData() {
    this.props.loadPage(1);
  }

  toggleABV() {
    this.props.toggleABV(!this.props.abvSort);
  }

  toggleName() {
    this.props.toggleName(!this.props.nameSort);
  }

  render() {
    const selectedBeer = this.props.beers.find(b => b.name === this.state.name);
    return (
      <div className="beerList">
        <div className="beerList__header">
          <Header smallText="Something 3.4" bigText="Why don't you join us?" />
          Sort by:&nbsp;
          <Button title="ABV" onClick={this.toggleABV} isActive={this.props.abvSort} />
          <Button title="Name" onClick={this.toggleName} isActive={this.props.nameSort} />
        </div>
        <div className="beerList__list">
          <CardList
            beers={this.props.beers}
            activePage={this.props.activePage}
            fetchData={this.fetchData}
            openModal={this.open}
            addBeer={this.props.addBeer}
            removeBeer={this.props.removeBeer}
            isFavouritesActive={this.props.isFavouritesActive}
            hasMore={this.props.isFavouritesActive ? false : this.props.activePage <= 4}
            refreshData={this.refreshData}
          />
        </div>
        <div className="beerList__cart">
          <Crate />
        </div>
        {
          this.state.open &&
          <ReactModal
            style={style}
            isOpen={this.state.open}
          >
            <CardModal
              close={this.close}
              ph={selectedBeer.ph}
              first_brewed={selectedBeer.first_brewed}
              title={selectedBeer.name}
              isFavourite={selectedBeer.isFavourite}
              addBeer={this.props.addBeer}
              removeBeer={this.props.removeBeer}
              description={selectedBeer.description}
              image={{ alt: selectedBeer.name, src: selectedBeer.image_url }}
            />
          </ReactModal>
        }
      </div>
    );
  }
}
BeerList.propTypes = {
  beers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  activePage: PropTypes.number.isRequired,
  isFavouritesActive: PropTypes.bool.isRequired,
  loadPage: PropTypes.func.isRequired,
  addBeer: PropTypes.func.isRequired,
  removeBeer: PropTypes.func.isRequired,
  toggleABV: PropTypes.func.isRequired,
  toggleName: PropTypes.func.isRequired,
  abvSort: PropTypes.bool.isRequired,
  nameSort: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  activePage: currentPageSelector(state),
  beers: loadedBeersSelector(state),
  isFavouritesActive: selectActive(state) === 1,
  abvSort: selectSortByABV(state),
  nameSort: selectSortByName(state),
});

const mapDispatchToProps = dispatch => ({
  loadPage: (page) => {
    dispatch(loadNextPage(page));
  },
  addBeer: (name) => {
    dispatch(addBeerToFavourites(name));
  },
  removeBeer: (name) => {
    dispatch(removeBeerFromFavourites(name));
  },
  toggleABV: value => dispatch(toggleSortByABV(value)),
  toggleName: value => dispatch(toggleSortByName(value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BeerList));
