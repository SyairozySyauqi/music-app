const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');

class UserAlbumLikesService {
  constructor() {
    this._pool = new Pool();
  }

  async postLikeToAlbum(userId, albumId) {
    const userAlbumLikesId = `likes-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO user_album_likes VALUES($1, $2, $3) RETURNING id',
      values: [userAlbumLikesId, userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Like gagal ditambahkan. Id tidak ditemukan');
    }

    return result.rows[0].id;
  }

  async deleteLikeFromAlbum(userId, albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Like gagal dibatalkan');
    }
  }

  async getUserLikesCount(albumId) {
    //    try {
  //    const result = await this._cacheService.get(`user_album_likes: ${albumId}`);
    //
  //    return {
    //    count: JSON.parse(result),
    //  source: 'cache',
    //     };
    //    } catch (error) {
    const query = {
      text: 'SELECT * FROM user_album_likes WHERE album_id = $1',
      values: [albumId],
    };

    const result = await this._pool.query(query);

    return {
      count: result.rows.length,
      source: 'db',
    };
  }
  // }

  async verifyAlbumLikeByUser(userId, albumId) {
    const query = {
      text: 'SELECT * FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    return result.rows.length;
  }
}

module.exports = UserAlbumLikesService;
