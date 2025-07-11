import { createRouter } from 'next-connect';
import { updateUser, deleteUser } from '@/controller/authHandler';

const router = createRouter();

router
    .put(updateUser)

router
    .delete(deleteUser)

export default router.handler();



