import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Paginator from '../../Paginator/index';
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
@Paginator(
  {
    name: 'test',
    itemsPerPage: 4,
    isLooped: false,
    shouldRenderIfEmpty: true,
  }
)
export class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPageNumber: props.currentPageNumber,
      itemsPerPage: props.itemsPerPage
    };
  }

  handleChange = (e) => {
    this.setState({
      currentPageNumber: e.target.value,
    });
  }

  handlePageSet = () => {
    this.props.setPageNumber(this.state.currentPageNumber);
  }

  handleIsloopedToggle = () => {
    this.props.update({ isLooped: !this.props.isLooped });
  }

  handleItemsQuantityChange = (e) => {
    this.setState({
      itemsPerPage: e.target.value,
    });
  }

  updateItemsPerPage = () => {
    console.log(2,this.state.itemsPerPage);
    this.props.update({ itemsPerPage: this.state.itemsPerPage });
  }

  render() {
    const {
      currentPageNumber, currentPageItems, pagesQuantity,
      isNextPageAvailable, isPrevPageAvailable, openNextPage, paginatorItems2,
      openPrevPage, setFirstPage, setLastPage, isLooped, update, paginatorItems,
    } = this.props;
    console.log('paginatorItems2', paginatorItems2);

    return (
      <div>
        <div>
          <div> pages: {pagesQuantity} </div>
          <div> current Page: {currentPageNumber}</div>
          {currentPageItems && currentPageItems.length && currentPageItems.map(i => <div key={Math.random()}>{i}</div>)}
          <Button
            isActive
            onClick={setFirstPage}
          >First</Button>
          <Button
            isActive={isPrevPageAvailable || isLooped}
            onClick={openPrevPage}
          >Prev</Button>
          <Button
            isActive={isNextPageAvailable || isLooped}
            onClick={openNextPage}
          >Next</Button>
        </div>
        <div>
          <div>
            <span>Set current page</span>
            <input onChange={this.handleChange} />
          </div>
          <button onClick={this.handlePageSet}>OK</button>
          <Button
            isActive
            onClick={setLastPage}
          >Last</Button>

          <div>
            <div><span>Is looped</span><input type="checkbox" onChange={this.handleIsloopedToggle} checked={this.props.isLooped} /></div>
            <div><span>items per page</span><input onChange={this.handleItemsQuantityChange} value={this.state.itemsPerPage} /></div>
            <Button
              isActive
              onClick={this.updateItemsPerPage}
            >updateItemsPerPage</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Test;
