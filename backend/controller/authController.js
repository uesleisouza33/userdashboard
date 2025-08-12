const User = require("../model/User");
const bcrypt = require("bcrypt");
const { error } = require("console");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
}

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ where: email });
    if (userExists) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const newUser = await User.create({ name, email, password });
    const token = generateToken(newUser);

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erro ao criar usuário",
      details: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: email });
    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Senha inválida" });
    }

    const token = generateToken(user)

    res.status(201).json({
      message: "Login realizado com sucesso",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erro ao fazer login",
      details: error.message,
    });
  }
};
