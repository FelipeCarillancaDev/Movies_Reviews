import { sequelize } from '../database/db.js'
import { DataTypes } from 'sequelize'
import Movie from "./movies.model.js";
import User from "./users.model.js";

const Reviews = sequelize.define('reviews', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  review_text: {
    type: DataTypes.TEXT
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'movie_id'], // Evita que un usuario haga más de una reseña por película
    },
  ],
  timestamps: true,
});

// se definen las relaciones que tendran las tablas

//hasMany de uno a mucho
Movie.hasMany(Reviews, {
  foreignKey: 'movie_id',
  sourceKey: 'id',
  onDelete: 'CASCADE', // Borra las reseñas si la película se elimina
  onUpdate: 'CASCADE', // Actualiza las claves foráneas si cambian los IDs
});

Reviews.belongsTo(Movie, {
  foreignKey: "movie_id",
  target_id: "id",
});

User.hasMany(Reviews, {
  foreignKey: 'user_id',
  sourceKey: 'id',
  onDelete: 'CASCADE', // Borra las reseñas si el usuario se elimina
  onUpdate: 'CASCADE',
});

Reviews.belongsTo(User, {
  foreignKey: "user_id",
  target_id: "id",
});

export default Reviews;