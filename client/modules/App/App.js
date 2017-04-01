import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { StickyContainer } from 'react-sticky';
import { RouteTransition } from 'react-router-transition';

import DevTools from './components/DevTools';

export class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isMounted: false,
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <StickyContainer>
          <Helmet
            title="Home - Boilerplate"
            titleTemplate="%s - Boilerplate"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
                ,
              },
            ]}
          />
          <RouteTransition
            pathname={this.props.location.pathname}

            atEnter={{ opacity: (typeof window !== 'undefined') ? 1 : 1 }}
            atLeave={{ opacity: (typeof window !== 'undefined') ? 1 : 1 }}
            atActive={{ opacity: (typeof window !== 'undefined') ? 1 : 1 }}
            mapStyles={(transitionStyles) => {
              if (!(typeof window !== 'undefined')) {
                return { opacity: 1 };
              }
              return { opacity: transitionStyles.opacity };
            }}
          >
            <div>
              {this.props.children}
            </div>
          </RouteTransition>
        </StickyContainer>
      </div>
    );
  }
}

export default App;
