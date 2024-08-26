import express from 'express';
import MyUserController from '../controllers/MyUserController';
import { jwtCheck, jwtParse } from '../middlewares/authMiddleware';
import { validateMyUserRequest } from '../middlewares/validation';

const router = express.Router();

// /api/my/user
router.get('/', jwtCheck, jwtParse, MyUserController.getCurrentUser);
router.post('/', jwtCheck, MyUserController.createCurrentUser);
router.put('/', jwtCheck, jwtParse, validateMyUserRequest, MyUserController.updateCurrentUser);


export default router;