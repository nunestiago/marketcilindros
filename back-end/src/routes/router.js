import { Router } from 'express';

import { login, register, userProfile } from '../controllers/userController';
import loginRequired from '../middleware/loginRequired';

const router = new Router();

router.post('/cadastro', register);
router.post('/login', login);
router.get('/perfil', loginRequired, userProfile);

export default router;
