import {Router} from 'express';
import {registerUser,loginUser,urlShortner,getUrlByShortCode} from '../controllers/user.controller.js';
const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/shortUrl').post(urlShortner);
router.route('/:shortUrl').get(getUrlByShortCode);
export default router;