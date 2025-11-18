import { Router } from 'express';
import * as contactFormController from '@/api/v1/external/contact-form/controller';

const router = Router();

router.post('/contact-form', contactFormController.postHandler);

export default router;
