import { createRouter } from 'next-connect';
import { login } from '@/controller/authHandler';

const router = createRouter();

router
    .post(login)

export default router.handler();



