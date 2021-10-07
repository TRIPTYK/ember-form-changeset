export default function (server) {
  server.create('article', {
    comments: server.createList('comment', 5),
    author: server.create('user', 1),
  });
}
