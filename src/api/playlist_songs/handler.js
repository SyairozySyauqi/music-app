class PlaylistSongsHandler {
  constructor(songsService, playlistsService, playlistSongsService, validator) {
    this._playlistSongsService = playlistSongsService;
    this._songsService = songsService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postPlaylistSongsHandler = this.postPlaylistSongsHandler.bind(this);
    this.getPlaylistSongsHandler = this.getPlaylistSongsHandler.bind(this);
    this.deletePlaylistSongsHandler = this.deletePlaylistSongsHandler.bind(this);
  }

  async postPlaylistSongsHandler(request, h) {
    this._validator.validatePlaylistSongsPayload(request.payload);
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const { songId } = request.payload;
    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._songsService.getSongById(songId);
    const playlistSongsId = await this._playlistSongsService.postSongToPlaylist(
      playlistId,
      songId,
    );

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {
        playlistSongsId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistSongsHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;
    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    const playlist = await this._playlistsService.getPlaylistForSong(playlistId, credentialId);
    const songs = await this._playlistSongsService.getSongsFromPlaylist(playlistId);

    return {
      status: 'success',
      data: {
        playlist: {
          id: playlist.id,
          name: playlist.name,
          username: playlist.username,
          songs,
        },
      },
    };
  }

  async deletePlaylistSongsHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;
    const { songId } = request.payload;
    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._playlistSongsService.deleteSongFromPlaylist(playlistId, songId);
    return {

      status: 'success',
      message: 'Playlist lagu berhasil dihapus.',

    };
  }
}

module.exports = PlaylistSongsHandler;
