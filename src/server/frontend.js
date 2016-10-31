'use strict';

import koa from 'koa';
import Router from 'koa-router';




const app = koa();

const router = new Router();

router.get('*',function *() {
    console.log('frontend')
    this.body = `<!DOCTYPE html>
                        <html>
                          <head>
                            <meta charset="utf-8">
                            <title>Node + React Starter</title>
                          </head>
                          <body>
                            <div id='react-content'/>
                          </body>
                          <script src="/frontend.js"></script>
                        </html>`;
});


app.use(router.routes());




export default app;







// Routes





