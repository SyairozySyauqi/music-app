class UserAlbumLikesHandler {
  constructor(userAlbumLikesService, albumsService) {
    this._userAlbumLikesService = userAlbumLikesService;
    this._albumsService = albumsService;

    this.postLikeToAlbumHandler = this.postLikeToAlbumHandler.bind(this);
    this.getUserLikesHandler = this.getUserLikesHandler.bind(this);
  }

  async postLikeToAlbumHandler(request, h) {
    const { id: albumId } = request.params;
    const { id: userId } = request.auth.credentials;

    await this._albumsService.verifyAlbum(albumId);

    const liked = await this._userAlbumLikesService.verifyAlbumLikeByUser(userId, albumId);
    if (!liked) {
      await this._userAlbumLikesService.postLikeToAlbum(userId, albumId);
      const response = h.response({
        status: 'success',
        message: 'Like berhasil ditambahkan',
      });
      response.code(201);
      return response;
    }

    await this._userAlbumLikesService.deleteLikeFromAlbum(userId, albumId);
    const response = h.response({
      status: 'success',
      message: 'Like berhasil dibatalkan',
    });
    response.code(201);
    return response;
  }

  async getUserLikesHandler(request, h) {
    const { id: albumId } = request.params;
    const likesCount = await this._userAlbumLikesService.getUserLikesCount(albumId);

    const response = h.response({
      status: 'success',
      data: {
        likes: likesCount.count,
      },
    });
    response.header('X-Data-Source', likesCount.source);
    response.code(200);
    return response;
  }
}

module.exports = UserAlbumLikesHandler;
