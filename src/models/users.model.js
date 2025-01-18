import { sequelize } from '../database/db.js'
import { DataTypes } from 'sequelize'
import bcrypt from "bcryptjs";

const User = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

User.beforeCreate(async (user) => {
  user.password = await
    bcrypt.hash(user.password, 8);
});


export default User;