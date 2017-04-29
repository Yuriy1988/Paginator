import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initialize, update, toNextPage, toPrevPage, setPage, toFirstPage, toLastPage } from './PaginatorActions';
import {
  getCurrentPageNumber, getIsNextPageAvailable, getIsPrevPageAvailable,
  getPagesQuantity, getCurrentPageItems, getIsInitialized,
  getIsLooped, getItemsPerPage,
} from './PaginatorReducer';

const Paginator = (options = {}) => {
  const _name = options.name;
  return (WrappedComponent) => {
    const mapStateToProps = (state) => {
      return {
        currentPageNumber: getCurrentPageNumber(state, _name),
        currentPageItems: getCurrentPageItems(state, _name),
        isNextPageAvailable: getIsNextPageAvailable(state, _name),
        isPrevPageAvailable: getIsPrevPageAvailable(state, _name),
        pagesQuantity: getPagesQuantity(state, _name),
        isInitialized: getIsInitialized(state, _name),
        isLooped: getIsLooped(state, _name),
        itemsPerPage: getItemsPerPage(state, _name),
      };
    };

    const mapDispatchToProps = (dispatch) => {
      return {
        _initializePaginator: (name, itemsPerPage, paginatorItems, isLooped) => dispatch(initialize(name, itemsPerPage, paginatorItems, isLooped)),
        _setPageNumber: (name, pageNumber) => dispatch(setPage(name, pageNumber)),
        _openNextPage: name => dispatch(toNextPage(name)),
        _openPrevPage: name => dispatch(toPrevPage(name)),
        _updatePaginator: (name, paginatorItems) => dispatch(update(name, paginatorItems)),
        _setFirstPage: name => dispatch(toFirstPage(name)),
        _setLastPage: name => dispatch(toLastPage(name)),
      };
    };
    class _Paginator extends Component {
      static propTypes = {
        currentPageNumber: PropTypes.number.isRequired,
        itemsPerPage: PropTypes.number.isRequired,
        pagesQuantity: PropTypes.number.isRequired,
        currentPageItems: PropTypes.arrayOf(PropTypes.any),
        paginatorItems: PropTypes.arrayOf(PropTypes.any),
        isNextPageAvailable: PropTypes.bool.isRequired,
        isPrevPageAvailable: PropTypes.bool.isRequired,
        isInitialized: PropTypes.bool.isRequired,
        isLooped: PropTypes.bool.isRequired,
        _initializePaginator: PropTypes.func.isRequired,
        _setPageNumber: PropTypes.func.isRequired,
        _openNextPage: PropTypes.func.isRequired,
        _openPrevPage: PropTypes.func.isRequired,
        _setFirstPage: PropTypes.func.isRequired,
        _setLastPage: PropTypes.func.isRequired,
        _updatePaginator: PropTypes.func.isRequired,
      };

      static defaultProps = {
        currentPageNumber: 1,
        itemsPerPage: 1,
        pagesQuantity: 0,
        currentPageItems: [],
        paginatorItems: [],
        isNextPageAvailable: false,
        isPrevPageAvailable: false,
        isInitialized: false,
        isLooped: false,
        _initializePaginator() {},
        _setPageNumber() {},
        _openNextPage() {},
        _openPrevPage() {},
        _setFirstPage() {},
        _setLastPage() {},
        _updatePaginator() {},
      };

      componentWillMount() {
        this.isInitializeIfNecessary(this.props);
      }

      componentWillReceiveProps(nextProps) {
        this.isInitializeIfNecessary(nextProps.paginatorItems);
      }

      setPageNumber = (pageNumber) => {
        const { currentPageNumber, _setPageNumber, pagesQuantity } = this.props;
        const _pageNumber = parseInt(pageNumber, 10);
        if (_pageNumber > 0 && _pageNumber !== currentPageNumber && _pageNumber <= pagesQuantity) {
          _setPageNumber(_name, _pageNumber);
        }
      }

      setLastPage = () => {
        const { pagesQuantity, _setLastPage } = this.props;
        if (pagesQuantity) _setLastPage(_name);
      }

      setFirstPage = () => {
        const { pagesQuantity, _setFirstPage, currentPageNumber } = this.props;
        if (pagesQuantity && currentPageNumber !== 1) _setFirstPage(_name);
      }

      isInitializeIfNecessary = (props) => {
        if (props.paginatorItems.length) {
          const { itemsPerPage = 1, isLooped = false } = options;
          const paginatorItems = this.props.paginatorItems || options.paginatorItems;
          const { isInitialized } = this.props;
          if (_name && !isInitialized) this.props._initializePaginator(_name, itemsPerPage, paginatorItems, isLooped);
        }
      }

      openPrevPage = () => {
        const { isPrevPageAvailable, _openPrevPage, pagesQuantity, _setLastPage, isLooped } = this.props;
        if (isPrevPageAvailable) _openPrevPage(_name);
        if (isLooped && !isPrevPageAvailable && pagesQuantity > 1) _setLastPage(_name);
      }

      openNextPage = () => {
        const { isNextPageAvailable, _openNextPage, pagesQuantity, _setFirstPage, isLooped } = this.props;
        if (isNextPageAvailable) _openNextPage(_name);
        if (isLooped && !isNextPageAvailable && pagesQuantity > 1) _setFirstPage(_name);
      }

      update = ({ name, itemsPerPage, paginatorItems, isLooped }) => {
        const { itemsPerPage: _itemsPerPage, paginatorItems: _paginatorItems, isLooped: _isLooped, _updatePaginator } = this.props;
        _updatePaginator({
          name: name || _name,
          itemsPerPage: itemsPerPage || _itemsPerPage,
          items: paginatorItems || _paginatorItems,
          isLooped: typeof isLooped === 'undefined' ? _isLooped : isLooped,
        });
      }

      render() {
        const {
          currentPageItems, currentPageNumber, isNextPageAvailable,
          isPrevPageAvailable, pagesQuantity, isLooped,
          itemsPerPage, ...restProps
        } = this.props;
        const { shouldRenderIfEmpty } = options;

        const shouldRender = Boolean(currentPageItems.length || shouldRenderIfEmpty);
        return (
          <div>
            {shouldRender &&
              <WrappedComponent
                {...restProps}
                currentPageNumber={currentPageNumber}
                currentPageItems={currentPageItems}
                isNextPageAvailable={isNextPageAvailable}
                isPrevPageAvailable={isPrevPageAvailable}
                pagesQuantity={pagesQuantity}
                setPageNumber={this.setPageNumber}
                openNextPage={this.openNextPage}
                openPrevPage={this.openPrevPage}
                setFirstPage={this.setFirstPage}
                setLastPage={this.setLastPage}
                isLooped={isLooped}
                itemsPerPage={itemsPerPage}
                update={this.update}
              />}
          </div>
        );
      }
    }
    return connect(mapStateToProps, mapDispatchToProps)(_Paginator);
  };
};

export default Paginator;
