import job from '../models/jobs.js'
import geoCoder from '../utils/geocoder.js'

// api/v1/jobs
export async function getJobs(req, res, next) {
    const jobs = await job.find();

    res.status(200).json({
        success : true,
        results : jobs.length,
        data : jobs
    })
}

// api/v1/job/new
export async function newJob(req, res, next) {
    const jobInfo = await job.create(req.body);
    res.status(200).json({
        success : true,
        message : 'Job Created.',
        data : job
    })
}

// api/v1/jobs:zipcode/:distance
export async function getJobsInRadius(req, res, next) {
    const {zipCode, distance} = req.params;
    
    // Getting lattitude and longitude from geocoder with zipcode
    const loc = await geoCoder.geocode(zipCode);
    const latitude = loc[0].latitude;
    const longitude = loc[0].longitude;

    const radius = distance / 3963;

    const jobs = await job.find({
        location : {$geoWithin : {$centerSphere: [[longitude, latitude], radius]
        }}
    });

    res.status(200).json({
        success : true,
        results : jobs.length,
        data : jobs
    });
}