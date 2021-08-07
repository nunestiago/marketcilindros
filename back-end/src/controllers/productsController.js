import connect from '../database/connect';

export const myProducts = async (req, res) => {
  const { id } = req.body;
  try {
    const query = 'select * from produtos where usuario_id = $1';
    const products = await connect.query(query, [id]);

    res.status(200).json(products);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const addProduct = async (req, res) => {
  res.status(200).json('ok');
};
