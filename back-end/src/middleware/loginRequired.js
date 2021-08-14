import jwt from 'jsonwebtoken';

import connect from '../database/connect';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ errors: ['Favor logar'] });
  }

  const [, token] = authorization.split(' ');

  try {
    const { id } = jwt.verify(token, process.env.TOKEN_SECRET);

    const query = 'select * from usuarios where id = $1';
    const { rowCount, rows } = await connect.query(query, [id]);

    if (!rowCount) {
      return res.status(400).json({ errors: ['Usuário não encontrado'] });
    }
    const { senha, ...rest } = rows[0];

    req.user = rest;

    return next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
