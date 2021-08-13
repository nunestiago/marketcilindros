import connect from '../database/connect';

/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
export const myProducts = async (req, res) => {
  const { id } = req.user;

  try {
    const query = 'select * from produtos p where p.usuario_id = $1';
    const products = await connect.query(query, [id]);

    return res.status(200).json(products.rows);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

export const getProduct = async (req, res) => {
  const { id: productId } = req.params;

  try {
    const query = 'select * from produtos p where p.id = $1';
    const { rowCount: isProduct, rows } = await connect.query(query, [
      productId,
    ]);

    if (!isProduct) {
      return res.status(200).json({ error: 'Produto não encontrado' });
    }

    return res.status(200).json(rows[0]);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

export const editProduct = async (req, res) => {
  const { nome, estoque, preco, descricao, imagem } = req.body;
  const { id: productId } = req.params;
  const { id: userId } = req.user;

  if (!nome && !estoque && !preco && !descricao && !imagem) {
    return res.status(400).json('Algum campo deve ser informado.');
  }

  try {
    const queryProduct =
      'select * from produtos where id = $1 and usuario_id = $2';
    const { rowCount, rows } = await connect.query(queryProduct, [
      productId,
      userId,
    ]);

    if (rowCount === 0) {
      return res.status(404).json('Produto não encontrado');
    }

    const myProduct = rows[0];

    const query =
      'update produtos set nome = $1, estoque = $2, preco = $3, descricao = $4, imagem = $5 where id = $6';

    const values = [
      nome ?? myProduct.nome,
      estoque ?? myProduct.estoque,
      preco ?? myProduct.preco,
      descricao ?? myProduct.descricao,
      imagem ?? myProduct.imagem,
      myProduct.id,
    ];

    const { rowCount: updatedProduct } = await connect.query(query, values);

    if (!updatedProduct) {
      return res.status(400).json('Não foi possível atualizar o produto.');
    }

    return res.status(200).json('Produto atualizado com sucesso.');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const addProduct = async (req, res) => {
  const { id } = req.user;
  const { nome, estoque, preco, categoria, descricao, imagem } = req.body;

  try {
    const query =
      'insert into produtos (usuario_id, nome, estoque, preco, categoria, descricao, imagem) values ($1,$2,$3,$4,$5,$6,$7)';

    const { rowCount: newProduct } = await connect.query(query, [
      id,
      nome,
      estoque,
      preco,
      categoria,
      descricao,
      imagem,
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
