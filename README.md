Welcome to Quickhitch! 
This application is created with NodeJS, AngularJS, and MongoDB.

--------

To run this application run "npm start" in the command line.

To create a new route, do the following:
1. Add "app.use(...xy...)" to app.js, where the other ones are.
2. Create a xy.js file in the routes folder. Have the filename correspond to where the route is going. Add "var xy = require('./routes/xy');" to app.js where the rest of them are.
3. Create a xy.jade file in the views folder. The jade code will need to start with a 
"extends layout
block content" 
to maintain the inheritance.

To play with the Angular, navigate to the public/javascripts folder.

Initial application created using the following tutorial:
http://blog.ijasoneverett.com/2013/03/a-sample-app-with-node-js-express-and-mongodb-part-1/

Additionally helpful:
http://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular

To configure login and other cool features:
https://docs.angularjs.org/guide