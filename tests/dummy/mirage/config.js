export default function () {
  // These comments are here to help you get started. Feel free to delete them.
  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing
  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */

  this.namespace = 'api';

  this.get('/articles');
  this.post('/articles');
  this.get('/articles/:id');
  this.patch('/articles/:id');

  this.get('/comments');
  this.get('/comments/:id');
  this.post('/comments');
  this.patch('/comments/:id');

  this.get('/images');
  this.post('/images');
  this.get('/images/:id');
  this.patch('/images/:id');

  this.get('/users');
  this.get('/users/:id');
}
