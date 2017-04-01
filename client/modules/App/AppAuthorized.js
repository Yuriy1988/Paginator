import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import EasyTransition from 'react-easy-transition';

import { logout } from '../Auth/AuthActions';
import { getIsAuthenticated } from '../Auth/AuthReducer';

const mapStateToProps = (state) => {
  return {
    isAuthenticated: getIsAuthenticated(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};


@connect(mapStateToProps, mapDispatchToProps)
export class AppAuthorized extends PureComponent { // eslint-disable-line
  static propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func,
  };

  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.props.logout();
      this.props.history.push('/login');
    }
  }

  render() {
    const { children, location } = this.props;
    return (
      <div>
        <EasyTransition
          path={location.pathname}
          initialStyle={{ opacity: 0 }}
          transition="opacity 0.2s ease-in-out"
          finalStyle={{ opacity: 1 }}
        >
          {children}
        </EasyTransition>
      </div>
    );
  }
}

export default AppAuthorized;
