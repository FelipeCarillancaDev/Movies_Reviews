import { sequelize } from '../database/db.js'
import { DataTypes } from 'sequelize'

const Movie = sequelize.define('movies', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: { type: DataTypes.STRING },
  year: { type: DataTypes.STRING },
  genre: { type: DataTypes.JSON },
  director: { type: DataTypes.STRING },
  synopsis: { type: DataTypes.TEXT },
  average_rating: {
    type: DataTypes.DECIMAL(3, 2),
    validate: {
      min: 1.0,
      max: 10.0
    }
  },
}, { timestamps: true });

export default Movie;