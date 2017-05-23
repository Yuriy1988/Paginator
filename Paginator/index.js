import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  initialize, update, toNextPage,
  toPrevPage, setPage, toFirstPage,
  toLastPage,
} from './PaginatorActions';
import PaginatorReducer, {
  getCurrentPageNumber, getIsNextPageAvailable, getIsPrevPageAvailable,
  getPagesQuantity, getCurrentPageItems, getIsInitialized,
  getIsLooped, getItemsPerPage, getShouldRenderIfEmpty,
} from './PaginatorReducer';

const Paginator = (options = {}) => {
  let _name = options.name;
  return (WrappedComponent) => {
    const mapStateToProps = (state, props) => {
      const isInitialized = Boolean(state.paginator && state.paginator[_name]);
      return {
        currentPageNumber: getCurrentPageNumber(state, _name),
        itemsPerPage: typeof props.itemsPerPage !== 'undefined' && !isInitialized ? props.itemsPerPage : getItemsPerPage(state, _name),
        currentPageItems: getCurrentPageItems(state, _name),
        pagesQuantity: getPagesQuantity(state, _name),
        isNextPageAvailable: getIsNextPageAvailable(state, _name),
        isPrevPageAvailable: getIsPrevPageAvailable(state, _name),
        shouldRenderIfEmpty: typeof props.shouldRenderIfEmpty !== 'undefined' && !isInitialized ? props.shouldRenderIfEmpty : getShouldRenderIfEmpty(state, _name),
        isLooped: typeof props.isLooped !== 'undefined' && !isInitialized ? props.isLooped : getIsLooped(state, _name),
        _isInitialized: getIsInitialized(state, _name),
      };
    };

    const mapDispatchToProps = (dispatch) => {
      return {
        _initializePaginator: (name, itemsPerPage, paginatorItems, isLooped, shouldRenderIfEmpty, initialPage) => dispatch(
          initialize(name, itemsPerPage, paginatorItems, isLooped, shouldRenderIfEmpty, initialPage)
        ),
        _setPageNumber: (name, pageNumber) => dispatch(setPage(name, pageNumber)),
        _openNextPage: name => dispatch(toNextPage(name)),
        _openPrevPage: name => dispatch(toPrevPage(name)),
        _updatePaginator: data => dispatch(update(data)),
        _setFirstPage: name => dispatch(toFirstPage(name)),
        _setLastPage: name => dispatch(toLastPage(name)),
      };
    };
    class _Paginator extends Component {
      static propTypes = {
        currentPageNumber: PropTypes.number.isRequired,
        itemsPerPage: PropTypes.number.isRequired,
        currentPageItems: PropTypes.arrayOf(PropTypes.any),
        pagesQuantity: PropTypes.number.isRequired,
        isNextPageAvailable: PropTypes.bool.isRequired,
        isPrevPageAvailable: PropTypes.bool.isRequired,
        isLooped: PropTypes.bool.isRequired,
        paginatorItems: PropTypes.arrayOf(PropTypes.any),
        shouldRenderIfEmpty: PropTypes.bool,
        initialPage: PropTypes.number,
        _isInitialized: PropTypes.bool.isRequired,
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
        isLooped: false,
        _isInitialized: false,
        shouldRenderIfEmpty: true,
        initialPage: 1,
        _initializePaginator() {},
        _setPageNumber() {},
        _openNextPage() {},
        _openPrevPage() {},
        _setFirstPage() {},
        _setLastPage() {},
        _updatePaginator() {},
      };

      componentWillMount() {
        this.initializeIfNecessary(this.props);
      }

      componentWillReceiveProps(nextProps) {
        this.initializeIfNecessary(nextProps);
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

      initializeIfNecessary = (props) => {
        const { _isInitialized } = props;
        if (!_isInitialized) {
          const paginatorItems = options.paginatorItems || props.paginatorItems;
          const itemsPerPage = options.itemsPerPage || props.itemsPerPage || 1;
          const isLooped = Boolean(options.isLooped || props.isLooped);
          const initialPage = options.initialPage || props.initialPage || 1;
          _name = options.name || props.paginatorName;
          const shouldRenderIfEmpty = options.shouldRenderIfEmpty || this.props.shouldRenderIfEmpty;

          if (_name && !_isInitialized) props._initializePaginator(_name, itemsPerPage, paginatorItems, isLooped, shouldRenderIfEmpty, initialPage);
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
          isPrevPageAvailable, pagesQuantity, isLooped, _isInitialized,
          itemsPerPage, shouldRenderIfEmpty, ...restProps
        } = this.props;

        let _currentPageNumber;
        let _isLooped;
        let _currentPageItems;
        let _isPrevPageAvailable;
        let _isNextPageAvailable;
        let _pagesQuantity;
        let _itemsPerPage;
        let _shouldRender;
        let _shouldRenderIfEmpty;

        if (!_isInitialized) {
          const paginatorItems = options.paginatorItems || this.props.paginatorItems;
          const initialPage = options.initialPage || this.props.initialPage;
          _itemsPerPage = options.itemsPerPage || itemsPerPage;
          _isLooped = Boolean(options.isLooped) || isLooped;
          _shouldRenderIfEmpty = options.shouldRenderIfEmpty || shouldRenderIfEmpty;

          _currentPageNumber = initialPage || 1;
          _pagesQuantity = Math.ceil(paginatorItems.length / _itemsPerPage);

          const begin = (_currentPageNumber - 1) * _itemsPerPage;
          const end = (_itemsPerPage * _currentPageNumber);

          _currentPageItems = (paginatorItems && paginatorItems.length && paginatorItems.slice(begin, end)) || [];

          _isPrevPageAvailable = _currentPageNumber !== 1;
          _isNextPageAvailable = _currentPageNumber !== _pagesQuantity;
          _shouldRender = Boolean(_currentPageItems.length || _shouldRenderIfEmpty);
        } else {
          _shouldRender = Boolean(currentPageItems.length || shouldRenderIfEmpty);
        }

        return (
          <div>
            {_shouldRender &&
              <WrappedComponent
                {...restProps}
                currentPageNumber={_currentPageNumber || currentPageNumber}
                currentPageItems={_currentPageItems || currentPageItems}
                isNextPageAvailable={_isNextPageAvailable || isNextPageAvailable}
                isPrevPageAvailable={_isPrevPageAvailable || isPrevPageAvailable}
                pagesQuantity={_pagesQuantity || pagesQuantity}
                isLooped={_isLooped || isLooped}
                itemsPerPage={_itemsPerPage || itemsPerPage}

                setPageNumber={this.setPageNumber}
                openNextPage={this.openNextPage}
                openPrevPage={this.openPrevPage}
                setFirstPage={this.setFirstPage}
                setLastPage={this.setLastPage}
                update={this.update}
              />}
          </div>
        );
      }
    }
    return connect(mapStateToProps, mapDispatchToProps)(_Paginator);
  };
};

export { PaginatorReducer };
export default Paginator;