import express from 'express';  
import { deleteUser, test, updateUser, signout, getUsers, getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);   
router.delete('/delete/:userId', verifyToken, deleteUser); 
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);   


export default router;






// import express from 'express';
// import { deleteUser, test, updateUser, signout, getUsers, getUser } from '../controllers/user.controller.js';
// import { verifyToken } from '../utils/verifyUser.js';
// import authorize from '../utils/authorize.js';

// const router = express.Router();

// router.get('/test', test);
// router.put('/update/:userId', verifyToken, authorize(['admin']), updateUser);
// router.delete('/delete/:userId', verifyToken, authorize(['admin']), deleteUser);
// router.post('/signout', signout);
// router.get('/getusers', verifyToken, authorize(['admin']), getUsers);
// router.get('/:userId', verifyToken, getUser);

// export default router;
