import {Router} from 'express'
import { createUser, deleteUser, findUser, updateUser, userApiInfo, userList } from '../controllers/user.controller';

const router = Router();

router.get('/',userApiInfo);
router.get('/:id',findUser);
router.get('/list',userList);
router.post('/create',createUser);
router.put('/update/:id',updateUser);
router.delete('/delete/:id',deleteUser);

export default router;