import { createRouter } from 'next-connect';
import { getAllUsers } from '@/controller/authHandler'
import { isAuthenticatedUser, authorizeRoles } from '@/middelwares/auth'

const router = createRouter();

router
    .use(isAuthenticatedUser)
    .get(authorizeRoles('admin'), getAllUsers);

export default router.handler();



