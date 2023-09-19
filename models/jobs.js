import mongoose from 'mongoose';
import validator from 'validator';
import slugify from 'slugify';
import geoCoder from '../utils/geocoder.js'

const jobSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Please enter job title.'],
        trim : true,
        maxlength : [100, 'Job title cannot exceed 100 characters.'],
    },
    slug : String,
    description : {
        type : String,
        required : [true, 'Please enter job description.'],
        maxlength : [1000, 'Job description cannot exceed 1000 characters.']
    },
    email : {
        type: String,
        validate : [validator.isEmail, 'Please enter a valid email address.'],
    },
    address : {
        type : String,
        required : [true, 'Please add an address']
    },
    location : {
        type : {
            type : String,
            enum : ['Point']
        },
        coordinates : {
            type : [Number],
            index : '2dsphere'
        },
        formattedAddress : String,
        city : String,
        state : String,
        zipCode : String,
        country : String,
    },
    company : { 
        type : String,
        required : [true, 'Please add company name']
    },
    industry : {
        type : [String],
        required : true,
        enum : {
            values : [
                'Business',
                'Information Technology',
                'Banking',
                'Education/Training',
                'Telecommunication'
            ],
            message : 'Please select correct options for the industry.'
        }
    },
    jobType : {
        type : String,
        required : true,
        enum : { 
            values : [
                'Permanent',
                'Contract',
                'Internship'
            ],
            message : 'Please select correct options for the job type.'
        }
    },
    minEducation : {
        type : String,
        required : true,
        enum : {
            values : [
                'Bachelors',
                'Masters',
                'phd'
            ],
            message : 'Please select correct options for the minimum education'
        }
    },
    positions : {
        type : Number,
        default : 1
    },
    experience : {
        type : String,
        required : true,
        enum : {
            values : [
                'No experience',
                '1 Year - 2 Years',
                '2 Years - 5 Years',
                '5+ Years'
            ],
            message : 'Please select correct options for experience'
        }
    },
    salary : {
        type : Number,
        required : [true, 'Please enter the expected salary for this job.']
    },
    postingDate : {
        type : Date,
        default : Date.now
    },
    lastDate : {
        type : Date,
        default : new Date().setDate(new Date().getDate() + 7)
    },
    applicants : {
        type : [Object],
        select : false,
    }
});

// Creating job slug before saving
jobSchema.pre('save', function(next) {
    this.slug = slugify(this.title, {lower : true});
    next();
});

// Setting up location
jobSchema.pre('save', async function(next) {
    const loc = await geoCoder.geocode(this.address)
    this.location = {
        type : 'Point',
        coordinates : [loc[0].longitude, loc[0].latitude],
        formattedAddress : loc[0].formattedAddress,
        city : loc[0].city,
        state : loc[0].stateCode,
        zipCode : loc[0].zipcode,
        country : loc[0].countryCode
    }
    next();
});

export default mongoose.model('job', jobSchema)