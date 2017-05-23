import { INITIALIZE, SET, NEXT, PREV, UPDATE, SET_FIRST, SET_LAST } from './PaginatorActions';

const initialState = {};

const PaginatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE: {
      const { name, itemsPerPage, items, isLooped, shouldRenderIfEmpty, initialPage } = action.payload;

      const currentPageNumber = initialPage || 1;
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
          isLooped,
          shouldRenderIfEmpty,
        },
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
        },
      };
    }

    case SET_FIRST: {
      const { name } = action.payload;
      const { itemsPerPage, items } = state[name];
      const begin = 0;
      const end = itemsPerPage;
      const currenPageItems = items && items.length && items.slice(begin, end);

      return {
        ...state,
        [name]: {
          ...state[name],
          currentPageNumber: 1,
          currenPageItems,
        },
      };
    }

    case SET_LAST: {
      const { name } = action.payload;
      const { itemsPerPage, items, pagesQuantity } = state[name];
      const begin = (pagesQuantity - 1) * itemsPerPage;
      const end = (itemsPerPage * pagesQuantity);
      const currenPageItems = items && items.length && items.slice(begin, end);

      return {
        ...state,
        [name]: {
          ...state[name],
          currentPageNumber: pagesQuantity,
          currenPageItems,
        },
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
        },
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
        },
      };
    }

    case UPDATE: {
      const { name, itemsPerPage, items, isLooped } = action.payload;

      let { currentPageNumber } = state[name];
      const pagesQuantity = Math.ceil(items.length / itemsPerPage);

      if (currentPageNumber > pagesQuantity) currentPageNumber = 1;
      const begin = (currentPageNumber - 1) * itemsPerPage;
      const end = (itemsPerPage * currentPageNumber);
      const currenPageItems = items && items.length && items.slice(begin, end);

      return {
        ...state,
        [name]: {
          ...state[name],
          itemsPerPage: parseInt(itemsPerPage, 10),
          items,
          isLooped,
          currentPageNumber,
          currenPageItems,
          pagesQuantity,
        },
      };
    }

    default: {
      return state;
    }
  }
};

const isExist = (state, name) => Boolean(state.paginatorReducer && state.paginatorReducer[name]);

export const getIsInitialized = (state, name) => isExist(state, name);
export const getIsLooped = (state, name) => isExist(state, name) && Boolean(state.paginatorReducer[name].isLooped);
export const getIsPrevPageAvailable = (state, name) => {
  const paginator = state.paginatorReducer && state.paginatorReducer[name];
  return (paginator && paginator.currentPageNumber !== 1)
  ||
  (paginator && paginator.isLooped && paginator.pagesQuantity !== 1);
};

export const getIsNextPageAvailable = (state, name) => {
  const paginator = state.paginatorReducer && state.paginatorReducer[name];
  return (paginator && paginator.currentPageNumber !== paginator.pagesQuantity)
  ||
  (paginator && paginator.isLooped && paginator.pagesQuantity !== 1);
};

export const getCurrentPageNumber = (state, name) => (isExist(state, name) && state.paginatorReducer[name].currentPageNumber) || 1;
export const getPagesQuantity = (state, name) => (isExist(state, name) && state.paginatorReducer[name].pagesQuantity) || 0;
export const getCurrentPageItems = (state, name) => (isExist(state, name) && state.paginatorReducer[name].currenPageItems) || [];
export const getItemsPerPage = (state, name) => (isExist(state, name) && state.paginatorReducer[name].itemsPerPage) || 1;
export const getPaginatorItems = (state, name) => (isExist(state, name) && state.paginatorReducer[name].items) || [];
export const getShouldRenderIfEmpty = (state, name) => Boolean((isExist(state, name) && state.paginatorReducer[name].shouldRenderIfEmpty));

export default PaginatorReducer;
