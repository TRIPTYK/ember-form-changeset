export default function (server) {
  server.create('article', {
    comments: server.createList('comment', 2),
    author: server.create('user', 1),
    image: server.create('image', 1),
  });
}
