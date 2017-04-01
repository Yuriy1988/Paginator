import React, { Component, PropTypes } from 'react';
import Paginator from '../../Paginator/App';

const pages = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,2,7,8,9,9,2,2,3,34,234,2]

class Test extends Component {
  render() {
    const {currentPageNumber = [], currentPageItems, pagesQuantity} = this.props;
    return (
      <div>
        {pages.map((d, i) => <div key={i}>{i}</div>)}
      </div>
    );
  }
}

export default Paginator({
  name: 'test',
  items: pages,
  itemsPerPage: 4,
  shouldRenderIfEmpty: true,
}, Test);
