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
      stock,
      price,
      description,
      image,
    ]);
    if (!newProduct) {
      return res
        .status(400)
        .json({ error: 'Não foi possível registrar o produto' });
    }
    return res.status(200).json('Produto registrado');
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const { id: userId } = req.user;

  try {
    const queryProduct =
      'select * from produtos where id = $1 and usuario_id = $2';
    const { rowCount: isProduct } = await connect.query(queryProduct, [
      productId,
      userId,
    ]);

    if (!isProduct) {
      return res.status(400).json({ error: 'Produto não encontrado' });
    }

    const queryDelete = 'delete from produtos where id = $1';
    const { rowCount: isDeleted } = await connect.query(queryDelete, [
      productId,
    ]);

    if (!isDeleted) {
      return res
        .status(400)
        .json({ error: 'Não foi possível apagar o produto' });
    }

    return res.status(200).json('Produto excluído');
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};
