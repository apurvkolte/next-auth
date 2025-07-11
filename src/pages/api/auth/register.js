import { createRouter } from 'next-connect';
import { register } from '@/controller/authHandler'

const router = createRouter();

router
    .post(register)

export default router.handler();



