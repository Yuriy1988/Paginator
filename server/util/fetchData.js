/**
 * Utility function to fetch required data for component to render in server side.
 * This was inspired from https://github.com/caljrimmer/isomorphic-redux-app/blob/73e6e7d43ccd41e2eb557a70be79cebc494ee54b/src/common/api/fetchComponentDataBeforeRender.js
 * @flow
*/
import { sequence } from './promiseUtils';

export function fetchComponentData(store: Object, components: Array<Object>, params: Object, isAuthenticated: boolean) {
  let needs = components.reduce((prev, current) => {
    return (current.need || [])
      .concat((current.WrappedComponent && (current.WrappedComponent.need !== current.need) ? current.WrappedComponent.need : []) || [])
      .concat(prev);
  }, []);

  if (isAuthenticated) {
    needs = needs.concat(components.reduce((prev, current) => {
      return (current.authNeed || [])
        .concat((current.WrappedComponent && (current.WrappedComponent.authNeed !== current.authNeed) ? current.WrappedComponent.authNeed : []) || [])
        .concat(prev);
    }, []));
  }

  return sequence(needs, need => store.dispatch(need(params, store.getState())));
}
