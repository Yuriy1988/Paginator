import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initialize, update, toNextPage, toPrevPage, setPage, toFirstPage, toLastPage } from './PaginatorActions';
import {
  getCurrentPageNumber, getIsNextPageAvailable, getIsPrevPageAvailable,
  getPagesQuantity, getCurrentPageItems, getIsInitialized,
  getIsLooped, getItemsPerPage, getPaginatorItems,
} from './PaginatorReducer';

const Paginator = (options = {}) => {
  console.log(1, arguments);
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
        items: getPaginatorItems(state, _name),
      };
    };

    const mapDispatchToProps = (dispatch) => {
      return {
        initializePaginator: (name, itemsPerPage, items, isLooped) => dispatch(initialize(name, itemsPerPage, items, isLooped)),
        setPageNumber: (name, pageNumber) => dispatch(setPage(name, pageNumber)),
        openNextPage: name => dispatch(toNextPage(name)),
        openPrevPage: name => dispatch(toPrevPage(name)),
        updatePaginator: (name, items) => dispatch(update(name, items)),
        setFirstPage: name => dispatch(toFirstPage(name)),
        setLastPage: name => dispatch(toLastPage(name)),
      };
    };
    class _Paginator extends Component {
      static propTypes = {
        currentPageNumber: PropTypes.number.isRequired,
        itemsPerPage: PropTypes.number.isRequired,
        pagesQuantity: PropTypes.number.isRequired,
        currentPageItems: PropTypes.arrayOf(PropTypes.any),
        items: PropTypes.arrayOf(PropTypes.any),
        isNextPageAvailable: PropTypes.bool.isRequired,
        isPrevPageAvailable: PropTypes.bool.isRequired,
        isInitialized: PropTypes.bool.isRequired,
        isLooped: PropTypes.bool.isRequired,
        initializePaginator: PropTypes.func.isRequired,
        setPageNumber: PropTypes.func.isRequired,
        openNextPage: PropTypes.func.isRequired,
        openPrevPage: PropTypes.func.isRequired,
        setFirstPage: PropTypes.func.isRequired,
        setLastPage: PropTypes.func.isRequired,
        updatePaginator: PropTypes.func.isRequired,
      };

      static defaultProps = {
        currentPageNumber: 1,
        itemsPerPage: 1,
        pagesQuantity: 0,
        currentPageItems: [],
        items: [],
        isNextPageAvailable: false,
        isPrevPageAvailable: false,
        isInitialized: false,
        isLooped: false,
        initializePaginator() {},
        setPageNumber() {},
        openNextPage() {},
        openPrevPage() {},
        setFirstPage() {},
        setLastPage() {},
        updatePaginator() {},
      };

      constructor(props) {
        super(props);

        this._openPrevPage = this._openPrevPage.bind(this);
        this._openNextPage = this._openNextPage.bind(this);
        this._setPageNumber = this._setPageNumber.bind(this);
        this._setFirstPage = this._setFirstPage.bind(this);
        this._setLastPage = this._setLastPage.bind(this);
        this._update = this._update.bind(this);
      }

      componentWillMount() {
        const { itemsPerPage = 1, items = [], isLooped = false } = options;
        const { isInitialized } = this.props;
        if (_name && !isInitialized) this.props.initializePaginator(_name, itemsPerPage, items, isLooped);
      }

      _setPageNumber(pageNumber) {
        const { currentPageNumber, setPageNumber, pagesQuantity } = this.props;
        const _pageNumber = parseInt(pageNumber, 10);
        if (_pageNumber > 0 && _pageNumber !== currentPageNumber && _pageNumber <= pagesQuantity) {
          setPageNumber(_name, _pageNumber);
        }
      }

      _openNextPage() {
        const { isNextPageAvailable, openNextPage, pagesQuantity, setFirstPage, isLooped } = this.props;
        if (isNextPageAvailable) openNextPage(_name);
        if (isLooped && !isNextPageAvailable && pagesQuantity > 1) setFirstPage(_name);
      }

      _openPrevPage() {
        const { isPrevPageAvailable, openPrevPage, pagesQuantity, setLastPage, isLooped } = this.props;
        if (isPrevPageAvailable) openPrevPage(_name);
        if (isLooped && !isPrevPageAvailable && pagesQuantity > 1) setLastPage(_name);
      }

      _setFirstPage() {
        const { pagesQuantity, setFirstPage, currentPageNumber } = this.props;
        if (pagesQuantity && currentPageNumber !== 1) setFirstPage(_name);
      }

      _setLastPage() {
        const { pagesQuantity, setLastPage } = this.props;
        if (pagesQuantity) setLastPage(_name);
      }

      _update({ name, itemsPerPage, items, isLooped }) {
        const { itemsPerPage: _itemsPerPage, items: _items, isLooped: _isLooped, updatePaginator } = this.props;
        updatePaginator({
          name: name || _name,
          itemsPerPage: itemsPerPage || _itemsPerPage,
          items: items || _items,
          isLooped: typeof isLooped === 'undefined' ? _isLooped : isLooped,
        });
      }

      render() {
        const {
          currentPageItems, currentPageNumber, isNextPageAvailable,
          isPrevPageAvailable, pagesQuantity, isLooped,
          itemsPerPage,
        } = this.props;
        const { shouldRenderIfEmpty } = options;

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
                setPageNumber={this._setPageNumber}
                openNextPage={this._openNextPage}
                openPrevPage={this._openPrevPage}
                setFirstPage={this._setFirstPage}
                setLastPage={this._setLastPage}
                isLooped={isLooped}
                itemsPerPage={itemsPerPage}
                update={this._update}
              />}
          </div>
        );
      }
    }
    return connect(mapStateToProps, mapDispatchToProps)(_Paginator);
  };
};

export default Paginator;
