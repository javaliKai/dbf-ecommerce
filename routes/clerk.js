import Express from 'express';
import { getAllClerks } from '../controller/clerk.js';

const router = Express.Router();

/**
 * @Route     /clerk/
 * @Method    GET
 * @Access    -
 * @Desc      Testing route
 */
router.get('/', getAllClerks);

/** The whole routes of the clerk module. */
export const clerkRoutes = router;
