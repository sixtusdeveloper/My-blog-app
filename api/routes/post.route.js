import express from 'express';  
import { verifyToken } from '../utils/verifyUser.js';
import { create, getposts, deletepost, updatepost } from '../controllers/post.controller.js';


const router = express.Router();    

router.post('/create', verifyToken, create);
router.get('/getposts', getposts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost);  
router.put('/updatepost/:postId/:userId', verifyToken, updatepost);

export default router;








// import express from 'express';
// import { verifyToken } from '../utils/verifyUser.js';
// import authorize from '../utils/authorize.js';
// import { create, getposts, deletepost, updatepost } from '../controllers/post.controller.js';

// const router = express.Router();

// router.post('/create', verifyToken, authorize(['author', 'admin']), create);
// router.get('/getposts', getposts);
// router.delete('/deletepost/:postId/:userId', verifyToken, authorize(['admin', 'author']), deletepost);
// router.put('/updatepost/:postId/:userId', verifyToken, authorize(['admin', 'author']), updatepost);

// export default router;









