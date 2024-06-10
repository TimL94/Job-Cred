const { Schema, model } = require('mongoose');

const validateNameLength = (value) =>{
    return value.length<= 30;
}

// schema for making a job model
const jobSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        employer: {
            type: Schema.Types.ObjectId,
            ref: 'Employer'
        },
        worker: {
            type: Schema.Types.ObjectId,
            ref: 'Worker',
            default: null
        }
    }
);

const Job = model('Job', jobSchema);
module.exports = Job;