import { createDevTools } from 'redux-devtools';

const devToolsInner = require(__PROJECT__ + '/config/DevTools').default;

const DevTools = createDevTools(devToolsInner);

export default DevTools;
