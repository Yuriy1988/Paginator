export const INITIALIZE = 'REDUX-PAGINATOR/INITIALIZE';
export const SET = 'REDUX-PAGINATOR/SET_PAGE';
export const NEXT = 'REDUX-PAGINATOR/OPEN_NEXT_PAGE';
export const PREV = 'REDUX-PAGINATOR/OPEN_PREV_PAGE';
export const UPDATE = 'REDUX-PAGINATOR/UPDATE'

export const initializePaginator = (name, itemsPerPage, items) => {
  return {
    type: INITIALIZE,
    payload: { name, itemsPerPage, items }
  };
};

export const setPageNumber = (name, pageNumber) => {
  return {
    type: SET,
    payload: { name, pageNumber }
  };
}

export const openNextPage = (name, pageNumber) => {
  return {
    type: NEXT,
    payload: { name, pageNumber }
  };
}

export const openPrevPage = (name, pageNumber) => {
  return {
    type: PREV,
    payload: { name, pageNumber }
  };
}

export const updatePaginator = (name, items) => {
  return {
    type: UPDATE,
    payload: { name, items },
  }
}
