import { Router } from 'express';

import { addProduct, myProducts } from '../controllers/productsController';
import { login, register, userEdit, userProfile } from '../controllers/userController';
import loginRequired from '../middleware/loginRequired';

const router = new Router();

router.post('/cadastro', register);
router.post('/login', login);

router.use(loginRequired);

router.get('/perfil', userProfile);
router.put('/perfil', userEdit);
router.get('/store', myProducts);
router.post('/addproduct', addProduct);

export default router;
