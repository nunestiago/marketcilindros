import { Router } from 'express';

import { login, register, userEdit, userProfile } from '../controllers/userController';
import loginRequired from '../middleware/loginRequired';

const router = new Router();

router.post('/cadastro', register);
router.post('/login', login);

router.use(loginRequired);

router.get('/perfil', userProfile);
router.put('/perfil', userEdit);

export default router;
