import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import {
  loadedBeersSelector,
  loadNextPage,
  BeerList,
  toggleFavouritesFilter,
  goToJoin,
  selectActive,
} from '../features/BeerList';
import { Login } from '../features/Login';

import { Navigation, Footer } from '../components';
import { NotFound } from '../features/NotFound';

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Navigation
          setActive={this.props.setActive}
          active={this.props.activePage}
          setJoin={this.props.setJoin}
        />
        <Switch>
          <Route exact path="/" component={BeerList} />
          <Route path="/favourites" component={BeerList} />
          <Route path="/join" component={Login} />
          <Route component={NotFound} />
        </Switch>
        <Footer setActive={this.props.setActive} setJoin={this.props.setJoin} />
        <ReduxToastr
          timeOut={30000}
          newestOnTop={false}
          preventDuplicates
          position="top-center"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  activePage: selectActive(state),
  beers: loadedBeersSelector(state),
});

const mapDispatchToProps = dispatch => ({
  loadPage: (page) => {
    dispatch(loadNextPage(page));
  },
  setActive: (value) => {
    dispatch(toggleFavouritesFilter(value));
  },
  setJoin: () => dispatch(goToJoin()),
});

Routes.propTypes = {
  setActive: PropTypes.func.isRequired,
  activePage: PropTypes.string.isRequired,
  setJoin: PropTypes.string.isRequired,
};

const routes = withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
export default routes;
exports.Routes = routes;
