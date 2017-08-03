# REACT-REDUX-PAGINATOR

**Lightweight library for client-side collection splitting (pagination) in declarative way**

## Installation

`$ npm install react-redux-paginator -S`
or
`$ yarn add react-redux-paginator`

## Implementation Guide
You have to give the paginatorReducer to Redux.

```
import { createStore, combineReducers } from 'redux'
import { paginatorReducer } from 'react-redux-paginator'

const reducers = {
  paginator: paginatorReducer,
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)
```

Then decorate your component with Paginator
```
...
import Paginator from 'react-redux-paginator';
...

const mapStateToProps = (state) => {
  return {
    paginatorItems: getEntities(),
  };
};

@connect(mapStateToProps, {})
@Paginator({
  name: 'Entities',
  collectionName: 'entities',
  itemsPerPage: 4,
  isLooped: true,
  shouldRenderIfEmpty: false,
  initialPage: 3,
})
export class WrappedComponent extends React.Component {

  render() {
    const { paginator } = this.props;
    
    const {
      currentPageItems, currentPageNumber, isNextPageAvailable, isPrevPageAvailable,
      pagesQuantity, isLooped, itemsPerPage, totalItemsCount, setPageNumber, openNextPage,
      openPrevPage, setFirstPage, setLastPage, update,
    } = paginator;
    return ...
  }
}

```
You can find more examples here: //TODO

## Usage
Paginator is a High Order Component that can split collection into chunks, and provides decorated component with useful props for you to be able use them for your UI as you wish.
Compatible with server-side rendering.

### You can setup Paginator with such options (as arguments for decorator or props for parent component):

 - `name: String (required)` or `paginatorName: String (required)`
  For Redux to initialize Paginator properly.
  Use `name` with decorator. If you want to define Paginator name dynamically with props - use `paginatorName` prop instead.

- `collectionName: String`
  then you will receive current page items as your collection named in props.
  
- `dynamicNameWith: String`
  to initiate paginator with dynamic name, you should pass it in options and name will be given using prop with `dynamicNameWith` value.

- `itemsPerPage: Number (1 as default)`
  Defines the max number of items that are visible on the page.

- `isLooped: Boolean (false as default)`
  Defines is it possible to use `openNextPage` and `openPrevPage` methods if the current page is the first or the last one respectively

- `shouldRenderIfEmpty: Boolean (true as default)`
  Defines whether the component should be rendered if the collection is empty.

- `initialPage: Number (1 as default)`
  The page that will be initial rendered

- `paginatorItems: Array (required)`
  collection of items that will be devided into chunks

### Methods available within decorated component within paginator prop:
 - `openNextPage`
  Opens next page.

 - `openPrevPage`
  Opens previous page.

 - `setFirstPage`
  Opens first page.

 - `setLastPage`
  Opens last page.

 - `setPageNumber`
  Sets the current page  `this.props.setPageNumber(Number)`

 - `update`
  You can dynamically update props:  `itemsPerPage`, `items`, `isLooped` in this way: `this.props.update({ isLooped: Boolean, itemsPerPage: Number, items: Array })`
  You can always update the only one prop: `this.props.update({ itemsPerPage: Number })`
  In this case the other props will not be changed.

### Props available within decorated component within paginator prop:

 - `paginatorItems: Array`
  This is the collection to be split by Paginator.

 - `currentPageNumber: Number`
  Current page number.

 - `currentPageItems: Array`
  Current page items - part of divided collection.

 - `pagesQuantity: Number`
  Pages quantity.
  
- `totalItemsCount: Number`
  Items quantity

 - `isNextPageAvailable: Boolean`
  Defines if the next page is available. If you set up `isLooped` prop to `true` it will be `true`. In the case when collection consists of only one page it will be always `false`.

 - `isPrevPageAvailable: Boolean`
  Defines if the previous page is available. If you set up `isLooped` prop to `true` it will be `true`. In the case when collection consists of only one page it will be always `false`.

 - `isLooped: Boolean`
  if `true` you can call `openNextPage` even if the current page is the last page, then the first page will be set up. The same logic for `openPrevPage` method. `isNextPageAvailable`, `isPrevPageAvailable` are `true`.
