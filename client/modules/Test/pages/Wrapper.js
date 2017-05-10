import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TestPageProps from './TestPageProps';
import { getAllPages } from '../TestReducer';

const Button = styled.div`
  width: 100px;
  background: ${props => (props.isActive ? 'green' : 'gray')};
  cursor: ${props => (props.isActive ? 'pointer' : 'initial')};
`;


const mapStateToProps = (state) => {
  return {
    paginatorItems: getAllPages(),
  };
};

@connect(mapStateToProps, {})
export class AnotherTest extends Component {
  render() {
    return (
      <div>
        <TestPageProps
          paginatorName="nameFromProps"
          itemsPerPage={7}
          initialPage={3}
          isLooped
          shouldRenderIfEmpty
          paginatorItems={this.props.paginatorItems}
        />
      </div>
    );
  }
}

export default AnotherTest;
