import connect from '../database/connect';

export const myProducts = async (req, res) => {
  const { id } = req.user;

  try {
    const query = 'select * from produtos p where p.usuario_id = $1';
    const products = await connect.query(query, [id]);

    res.status(200).json(products.rows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const addProduct = async (req, res) => {
  const { userId, name, price, stock, description, image } = req.body;
  try {
    const query =
      'insert into produtos (usuario_id, nome, estoque, preco,  descricao, imagem) values ($1,$2,$3,$4,$5,$6)';
    const { rowCount: newProduct } = await connect.query(query, [
      userId,
      name,
      price,
      stock,
      description,
      image,
    ]);
    if (!newProduct) {
      return res
        .status(400)
        .json({ error: 'Não foi possível registrar o produto' });
    }
    return res.status(200).json('Produto registrado');
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
