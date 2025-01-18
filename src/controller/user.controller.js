import User from "../models/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs/dist/bcrypt.js";

export const findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener Usuarios:", error);
    res.status(500).json({ message: "Error al obtener Usuarios" });
  }
};

export const createUsers = async (req, res) => {
  try {
    const users = req.body;
    await User.create(users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener Usuarios:", error);
    res.status(500).json({ message: "Error al obtener Usuarios" });
  }
};

export const findUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener Usuarios:", error);
    res.status(500).json({ message: "Error al obtener Usuarios" });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }
    const result = await User.destroy({ where: { id: userId } });
    if (result === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    console.error("Error al obtener Usuarios:", error);
    res.status(500).json({ message: "Error al obtener Usuarios" });
  }
}

export const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "ID de usuario invático" });
    }
    const user = req.body;
    const [updated] = await User.update(user, { where: { id: userId } });
    if (updated === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario actualizado con éxito" });
  } catch (error) {
    console.error("Error al obtener Usuarios:", error);
    res.status(500).json({ message: "Error al obtener Usuarios" });
  }
}

export const register = async (req, res) => {
  try {
    const { username, password, name } = req.body;
    console.log({ username, password }, process.env.JWT_SECRET)
    const user = await User.create({ username, password, name });
//     ● Este método recibe varios parámetros.
//        ○ Primero un identificador para el usuario, en este caso el id.
//        ○ Luego una cadena secreta de caracteres, la cual está almacenada como variable de entorno.
//        ○ Por último, un tiempo de expiración donde se le asigna que será de 1h. Esto asigna un tiempo
//          de vida y caducidad de token.
    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    })
    return res.status(201).json({ user, token });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    // En una constante isMatch utilizamos el método compare() de bcrypt para comparar el password
    // recibido en la consulta vs el password que se encuentra en la base de datos.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
    // en caso de que todo coincida o haga match, aplicamos el método sign() de jwt donde le
    // estamos pasando el id del usuario, el secreto como variable de entorno y la expiración. Luego de
    // esto respondemos con un json que muestra el usurario y su token.
    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.json({ user, token });
  } catch (error) {
    console.log({ message: error.message });
    return res.status(500).json({
      message: error.message,
    });
  }
};
