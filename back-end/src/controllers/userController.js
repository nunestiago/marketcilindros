/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import connect from '../database/connect';

export const register = async (req, res) => {
  const { nome, nome_loja, email, senha } = req.body;

  if (!nome || !nome_loja || !email || !senha) {
    return res.status(400).json('Todos os campos são obrigatórios');
  }

  try {
    const query = 'select * from usuarios where email = $1';
    const { rowCount: isEmail } = await connect.query(query, [email]);

    if (isEmail) {
      return res.status(400).json(`O email: ${email}, já está cadastrado`);
    }
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }

  try {
    const hash = await bcrypt.hash(senha, 8);

    const registerQuery =
      'insert into usuarios (nome, nome_loja, email, senha) values ($1,$2,$3,$4) ';

    const { rowCount: isRegister } = await connect.query(registerQuery, [
      nome,
      nome_loja,
      email,
      hash,
    ]);

    if (!isRegister) {
      return res.status(400).json('Não foi possivel cadastrar usuário');
    }

    return res
      .status(200)
      .json(
        `Usuário ${nome} registrado com a loja ${nome_loja} e o e-mail ${email}`,
      );
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

export const login = async (req, res) => {
  const { email, senha: password } = req.body;

  if (!email || !password) {
    return res.status(400).json('E-mail e senha obrigatórios');
  }

  try {
    const query = 'select * from usuarios where email = $1';

    const { rowCount: isUser, rows } = await connect.query(query, [email]);

    if (!isUser) {
      return res.status(400).json('E-mail ou senha inválidos');
    }

    const user = rows[0];
    const hash = user.senha;
    const isPassword = await bcrypt.compare(password, hash);

    if (!isPassword) {
      return res.status(400).json('E-mail ou senha inválidos');
    }

    const jwtSecret = process.env.TOKEN_SECRET;

    const token = jwt.sign(
      {
        id: user.id,
        name: user.nome,
        storename: user.nome_loja,
        email,
      },
      jwtSecret,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    );

    const { senha, ...rest } = user;

    return res.status(200).json({ user: rest, token });
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

export const userProfile = async (req, res) => {
  res.json(req.user);
};

export const userEdit = async (req, res) => {
  const {
    nome: newNome,
    nome_loja: newLoja,
    email: newEmail,
    senha: newPassword,
  } = req.body;

  const { id, nome, nome_loja, email } = req.user;

  if (newEmail !== email) {
    try {
      const queryEmail = 'select * from usuarios where email = $1';
      const { rowCount: isEmail } = await connect.query(queryEmail, [newEmail]);
      console.log(isEmail);

      if (isEmail) {
        return res.status(400).json('E-mail já existe');
      }
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
  const { rows: oldHash } = await connect.query(
    'select senha from usuarios where id = $1',
    [id],
  );

  let newHash;
  if (newPassword) {
    newHash = await bcrypt.hash(newPassword, 8);
  }

  const updatedName = newNome ?? nome;
  const updatedStore = newLoja ?? nome_loja;
  const updatedEmail = newEmail ?? email;
  const updatedPassword = newHash ?? oldHash;

  try {
    const query =
      'update public.usuarios set nome = $1,nome_loja = $2,email = $3, senha=$4 where id = $5';
    const updatedUser = await connect.query(query, [
      updatedName,
      updatedStore,
      updatedEmail,
      updatedPassword,
      id,
    ]);

    if (!updatedUser.rowCount) {
      return res.status(400).json({ error: ['Liga pro gerente!'] });
    }

    return res.status(200).json({
      id,
      nome: updatedName,
      nome_loja: updatedStore,
      email: updatedEmail,
    });
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};
