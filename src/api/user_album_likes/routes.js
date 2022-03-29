const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums/{id}/likes',
    handler: handler.postLikeToAlbumHandler,
    options: {
      auth: 'albums_jwt',
    },
  },
  {
    method: 'GET',
    path: '/albums/{id}/likes',
    handler: handler.getUserLikesHandler,
  },
];

module.exports = routes;
