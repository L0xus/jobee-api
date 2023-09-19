import { Router } from 'express';
const router = Router();

import { getJobs, newJob, getJobsInRadius } from '../controllers/jobsController.js';

router.route('/jobs').get(getJobs);
router.route('/job/new').post(newJob);
router.route('/jobs/:zipcode/:distance').get(getJobsInRadius);

export default router;