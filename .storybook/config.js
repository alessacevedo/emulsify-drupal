import { configure, addDecorator, addParameters } from '@storybook/react';
import { useEffect } from "@storybook/client-api";
import { withA11y } from '@storybook/addon-a11y';

// Theming
import emulsifyTheme from './emulsifyTheme';

addParameters({
  options: {
    theme: emulsifyTheme,
  },
});

// GLOBAL CSS
import '../components/style.scss';

// Global Data
import globalData from '../components/00-base/00-data/global.yml';

// If in a Drupal project, it's recommended to import a symlinked version of drupal.js.
import './_drupal.js';

// Global Emulsify decorator.
addDecorator(storyFn => {
  // Attach any Drupal behavior scripts.
  useEffect(() => Drupal.attachBehaviors(), []);
  return storyFn()
});

addDecorator(withA11y);

const Twig = require('twig');
const twigDrupal = require('twig-drupal-filters');
const twigBEM = require('bem-twig-extension');
const twigAddAttributes = require('add-attributes-twig-extension');

Twig.cache();

twigDrupal(Twig);
twigBEM(Twig);
twigAddAttributes(Twig);

// automatically import all files ending in *.stories.js
configure(require.context('../components', true, /\.stories\.js$/), module);

// Below is for if Emulsify Gatsby style guide is being used 
// // Gatsby's Link overrides:
// // Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
// global.___loader = {
//   enqueue: () => {},
//   hovering: () => {},
// };
// // Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
// global.__PATH_PREFIX__ = '';
// // This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
// window.___navigate = pathname => {
//   action('NavigateTo:')(pathname);
// };
