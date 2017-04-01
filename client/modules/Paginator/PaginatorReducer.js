import { INITIALIZE, SET, NEXT, PREV, UPDATE } from './PaginatorActions';

const initialState = {};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE: {
      const { name, itemsPerPage, items } = action.payload;
      if (state[name]) return { ...state };

      const currentPageNumber = 1;
      const pagesQuantity = Math.ceil(items.length / itemsPerPage);
      const begin = (currentPageNumber - 1) * itemsPerPage;
      const end = (itemsPerPage * currentPageNumber);
      const currenPageItems = items && items.length && items.slice(begin, end);

      return {
        ...state,
        [name]: {
          itemsPerPage,
          pagesQuantity,
          currentPageNumber,
          currenPageItems,
          items,
        }
      };
    }

    case SET: {
      const { name, pageNumber } = action.payload;
      const { itemsPerPage, items } = state[name];
      const begin = (pageNumber - 1) * itemsPerPage;
      const end = (itemsPerPage * pageNumber);
      const currenPageItems = items && items.length && items.slice(begin, end);

      return {
        ...state,
        [name]: {
          ...state[name],
          currentPageNumber: pageNumber,
          currenPageItems,
        }
      };
    }

    case NEXT: {
      const { name } = action.payload;
      const { itemsPerPage, items, currentPageNumber } = state[name];
      const pageNumber = currentPageNumber + 1;
      const begin = (pageNumber - 1) * itemsPerPage;
      const end = (itemsPerPage * pageNumber);
      const currenPageItems = items && items.length && items.slice(begin, end);

      return {
        ...state,
        [name]: {
          ...state[name],
          currentPageNumber: pageNumber,
          currenPageItems,
        }
      };
    }

    case PREV: {
      const { name } = action.payload;
      const { itemsPerPage, items, currentPageNumber } = state[name];
      const pageNumber = currentPageNumber - 1;
      const begin = (pageNumber - 1) * itemsPerPage;
      const end = (itemsPerPage * pageNumber);
      const currenPageItems = items && items.length && items.slice(begin, end);

      return {
        ...state,
        [name]: {
          ...state[name],
          currentPageNumber: pageNumber,
          currenPageItems,
        }
      };
    }

    case UPDATE: {
      const { name, items } = action.payload;
      const { itemsPerPage, currentPageNumber } = state[name];

      const begin = (currentPageNumber - 1) * itemsPerPage;
      const end = (itemsPerPage * currentPageNumber);
      const currenPageItems = items && items.length && items.slice(begin, end);

      return {
        ...state,
        [name]: {
          ...state[name],
          currenPageItems,
        }
      };
    }

    default: {
      return state;
    }
  }
};

export const getCurrentPageNumber = (state, name) => state.paginator[name].currentPageNumber;
export const getIsNextPageAvailable = (state, name) => state.paginator[name].currentPageNumber !== state.paginator[name].pagesQuantity;
export const getIsPrevPageAvailable = (state, name) => state.paginator[name].currentPageNumber !== 1;
export const getPagesQuantity = (state, name) => state.paginator[name].pagesQuantity;
export const getCurrentPageItems = (state, name) => state.paginator[name].currenPageItems;
export default AppReducer;
