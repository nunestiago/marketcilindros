import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import connect from '../database/connect';

export const register = async (req, res) => {
  const { username, storename, email, password } = req.body;

  if (!username || !storename || !email || !password) {
    return res.status(400).json('Todos os campos são obrigatórios');
  }

  try {
    const query = 'select * from usuarios where email = $1';
    const user = await connect.query(query, [email]);
    if (user.rowCount > 0) {
      return res.status(400).json(`O email: ${email}, já está cadastrado`);
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }

  try {
    const hash = await bcrypt.hash(password, 8);
    const registerStore = await connect.query(
      'insert into usuarios (nome, nome_loja, email, senha) values ($1,$2,$3,$4) ',
      [username, storename, email, hash],
    );
    if (registerStore.rowCount === 0) {
      return res.status(400).json('Não foi possivel cadastrar usuário');
    }
    return res.status(200).json([
      {
        message: `Usuário ${username} registrado com a loja ${storename} e o e-mail ${email}`,
      },
    ]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('E-mail e senha obrigatórios');
  }

  try {
    const query = 'select * from usuarios where email = $1';
    const isUser = await connect.query(query, [email]);

    if (isUser.rowCount === 0) {
      return res.status(400).json('E-mail ou senha inválidos');
    }

    const user = isUser.rows[0];
    const hash = user.senha;
    const isPassword = await bcrypt.compare(password, hash);

    if (!isPassword) {
      return res.status(400).json('E-mail ou senha inválidos');
    }

    const jwtSecret = process.env.TOKEN_SECRET;
    const token = jwt.sign(
      { id: user.id, email, storename: user.storename },
      jwtSecret,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    );

    const { senha, ...rest } = user;

    return res.status(200).json({ user: rest, token });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
