import connect from '../database/connect';

export const getAllStores = async (req, res) => {
  try {
    const query = 'select id,nome_loja from usuarios u';
    const { rows } = await connect.query(query);

    return res.status(200).json(rows);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

export const getItemsFromStore = async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'select * from produtos p where p.usuario_id = $1';

    const { rows } = await connect.query(query, [id]);

    return res.status(200).json(rows);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};
