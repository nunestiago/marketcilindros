import { Router } from 'express';

import { addProduct, deleteProduct, getProduct, myProducts } from '../controllers/productsController';
import { login, register, userEdit, userProfile } from '../controllers/userController';
import loginRequired from '../middleware/loginRequired';

const router = new Router();

router.post('/cadastro', register);
router.post('/login', login);

router.use(loginRequired);

router.get('/perfil', userProfile);
router.put('/perfil', userEdit);

router.get('/produtos', myProducts);
router.get('/produtos/:id', getProduct);
router.post('/produtos', addProduct);
router.delete('/produto/:id', deleteProduct);
router.put('/produto/:id', addProduct);

export default router;
