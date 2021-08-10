import { Router } from 'express';

import { addProduct, deleteProduct, editProduct, getProduct, myProducts } from '../controllers/productsController';
import { getAllStores, getItemsFromStore } from '../controllers/storesController';
import { login, register, userEdit, userProfile } from '../controllers/userController';
import loginRequired from '../middleware/loginRequired';

const router = new Router();

router.post('/cadastro', register);
router.post('/login', login);
router.get('/lojas', getAllStores);
router.get('/lojas/:id', getItemsFromStore);

router.use(loginRequired);

router.get('/perfil', userProfile);
router.put('/perfil', userEdit);

router.get('/produtos', myProducts);
router.get('/produtos/:id', getProduct);
router.post('/produtos', addProduct);
router.put('/produto/:id', editProduct);
router.delete('/produto/:id', deleteProduct);

export default router;
