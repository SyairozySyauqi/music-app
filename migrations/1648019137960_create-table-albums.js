/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('albums', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    year: {
      type: 'INTEGER',
      notNull: true,
    },
  });

  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    year: {
      type: 'INTEGER',
      notNull: true,
    },
    genre: {
      type: 'TEXT',
      notNull: true,
    },
    performer: {
      type: 'TEXT',
      notNull: true,
    },
    duration: {
      type: 'INTEGER',
    },
    albumId: {
      type: 'VARCHAR(50)',
    },
  });

  pgm.addConstraint('songs', 'fk_songs.albumId_albums.id', 'FOREIGN KEY ("albumId") REFERENCES albums(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('songs', 'fk_songs.albumId_albums.id');

  pgm.dropTable('albums');
  pgm.dropTable('songs');
};
