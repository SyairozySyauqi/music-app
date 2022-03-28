const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists/{playlistId}/songs',
    handler: handler.postPlaylistSongsHandler,
    options: {
      auth: 'albums_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{playlistId}/songs',
    handler: handler.getPlaylistSongsHandler,
    options: {
      auth: 'albums_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}/songs',
    handler: handler.deletePlaylistSongsHandler,
    options: {
      auth: 'albums_jwt',
    },
  },
];

module.exports = routes;
