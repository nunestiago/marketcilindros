import bcrypt from 'bcrypt';

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
  res.json('Hello world again!');
};
