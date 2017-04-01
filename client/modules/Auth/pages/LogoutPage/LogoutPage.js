import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../AuthActions';
import { getIsAuthenticated } from '../../AuthReducer';

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
class LogoutPage extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
  };
  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.logout();
    }
    this.context.router.push('/');
  }

  render() {
    return null;
  }
}

export default LogoutPage;
