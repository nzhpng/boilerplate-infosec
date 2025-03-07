const express = require('express');
const app = express();
const helmet = require('helmet');
 
// Hackers can exploit known vulnerabilities in Express/Node if they see that your site is powered by Express. 
// X-Powered-By: Express is sent in every request coming from Express by default. 
app.use(helmet.hidePoweredBy()); 

// Prevent Clickjacking that tricks users into interacting with a page different from what the user thinks it is. 
// This can be obtained by executing your page in a malicious context, by means of iframing. 
app.use(helmet.frameguard({ action: 'deny' }));

// Cross-site scripting (XSS) injects malicious scripts into vulnerable pages to steal sensitive data.
// With this, the browser detects a potential injected script using a heuristic filter, changes and neitralizes the script code.
app.use(helmet.xssFilter());












































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
