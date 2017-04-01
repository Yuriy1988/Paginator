import { configure } from '@kadira/storybook';

const loadStories = () => {
  require('../client/components/stories/columnnrange-chart');
  require('../client/components/stories/horizontal-bar-chart');
  require('../client/components/stories/material-ui-test');
  require('../client/components/stories/negative-bar-chart');
  require('../client/components/stories/spline-chart');
  require('../client/components/stories/vertical-bar-chart');
};

configure(loadStories, module);
