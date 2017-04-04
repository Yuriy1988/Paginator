export const INITIALIZE = 'REDUX-PAGINATOR/INITIALIZE';
export const SET = 'REDUX-PAGINATOR/SET_PAGE';
export const SET_FIRST = 'REDUX-PAGINATOR/SET_FIRST_PAGE';
export const SET_LAST = 'REDUX-PAGINATOR/SET_LAST_PAGE';
export const NEXT = 'REDUX-PAGINATOR/OPEN_NEXT_PAGE';
export const PREV = 'REDUX-PAGINATOR/OPEN_PREV_PAGE';
export const UPDATE = 'REDUX-PAGINATOR/UPDATE';

export const initialize = (name, itemsPerPage, items, isLooped) => {
  return {
    type: INITIALIZE,
    payload: { name, itemsPerPage, items, isLooped },
  };
};

export const setPage = (name, pageNumber) => {
  return {
    type: SET,
    payload: { name, pageNumber },
  };
};

export const toNextPage = (name) => {
  return {
    type: NEXT,
    payload: { name },
  };
};

export const toPrevPage = (name) => {
  return {
    type: PREV,
    payload: { name },
  };
};

export const update = ({ name, itemsPerPage, items, isLooped }) => {
  return {
    type: UPDATE,
    payload: { name, itemsPerPage, items, isLooped },
  };
};

export const toFirstPage = (name) => {
  return {
    type: SET_FIRST,
    payload: { name },
  };
};

export const toLastPage = (name) => {
  return {
    type: SET_LAST,
    payload: { name },
  };
};
