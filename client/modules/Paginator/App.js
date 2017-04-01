import React, { Component, PropTypes } from 'react';
import connect from 'react-redux';
import { initializePaginator, updatePaginator } from './PaginatorActions';
import {
   getCurrentPageNumber, getIsNextPageAvailable, getIsPrevPageAvailable,
   getPagesQuantity, getCurrentPageItems
 } from './PaginatorReducer';

const mapStateToProps = (state, props) => {
  const { name } = props;
  return {
    currentPageNumber: getCurrentPageNumber(state, name),
    currentPageItems: getCurrentPageItems(state, name),
    isNextPageAvailable: getIsNextPageAvailable(state, name),
    isPrevPageAvailable: getIsPrevPageAvailable(state, name),
    pagesQuantity: getPagesQuantity(state, name),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initializePaginator: (name, itemsPerPage) => dispatch(initializePaginator(name, itemsPerPage)),
    setPageNumber: (name, pageNumber) => dispatch(initializePaginator(name, pageNumber)),
    openNextPage: name => dispatch(initializePaginator(name)),
    openPrevPage: name => dispatch(initializePaginator(name)),
    update: (name, items) => dispatch(updatePaginator(name, items)),
  };
};


const Paginator = (test, WrappedComponent) => {
  class _Paginator extends Component {
    static propTypes = {
      currentPageNumber: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.any),
      currentPageItems: PropTypes.arrayOf(PropTypes.any),
      itemsPerPage: PropTypes.number.isRequired,
      shouldRenderIfEmpty: PropTypes.bool.isRequired,
      isNextPageAvailable: PropTypes.bool.isRequired,
      isPrevPageAvailable: PropTypes.bool.isRequired,
      pagesQuantity: PropTypes.number.isRequired,
      initializePaginator: PropTypes.func.isRequired,
      setPageNumber: PropTypes.func.isRequired,
      openNextPage: PropTypes.func.isRequired,
      openPrevPage: PropTypes.func.isRequired,
      update: PropTypes.func.isRequired,
    };

    static defaultProps = {
      currentPageNumber: 1,
      name: PropTypes.string,
      items: [],
      currentPageItems: [],
      itemsPerPage: 5,
      pagesQuantity: 0,
      initializePaginator() {},
      isNextPageAvailable: false,
      isPrevPageAvailable: false,
      shouldRenderIfEmpty: false,
      setPageNumber() {},
      openNextPage() {},
      openPrevPage() {},
      update() {},
    };

    componentWillMount() {
      const { name, itemsPerPage, items } = this.props;
      this.props.initializePaginator(name, itemsPerPage, items)
    }

    componentWillReceiveProps({ items: prevItems }) {
      const { name, items, update } = this.props;
      if (prevItems !== items) {
        update(name, items);
      }
    }

    render() {
      const {
        shouldRenderIfEmpty, currentPageItems, currentPageNumber,
        isNextPageAvailable, isPrevPageAvailable, pagesQuantity,
        setPageNumber, openNextPage, openPrevPage
      } = this.props;
      console.log('test', test);
      console.log('WrappedComponent', WrappedComponent);

      const shouldRender = Boolean(currentPageItems.length || shouldRenderIfEmpty);

      return (
        <div>
          {shouldRender &&
            <WrappedComponent
              currentPageNumber={currentPageNumber}
              currentPageItems={currentPageItems}
              isNextPageAvailable={isNextPageAvailable}
              isPrevPageAvailable={isPrevPageAvailable}
              pagesQuantity={pagesQuantity}
              setPageNumber={setPageNumber}
              openNextPage={openNextPage}
              openPrevPage={openPrevPage}
            />}
        </div>
      )
    }
  }
  return connect(mapStateToProps, mapDispatchToProps)(_Paginator);
}

export default Paginator;
