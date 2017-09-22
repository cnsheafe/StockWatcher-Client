import { createServerRenderer, RenderResult } from 'aspnet-prerendering';
import { renderToString } from 'react-dom/server';

import { Index } from "./src/Index";


export default createServerRenderer(params => {
  return new Promise<RenderResult>((resolve, reject) => {

    const appString = renderToString(Index(true, params));

    params.domainTasks.then(() => {
      resolve({
        html: appString,
      });
    }, reject); // Also propagate any errors back into the host application
  });
});
