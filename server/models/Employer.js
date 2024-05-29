const { Schema, model } = require('mongoose');

// schema for creating an employer model with email validation
const employerSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String, 
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format'
        },
        password: {
            type: String,
            required: true
        },
        jobs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Job'
            }
        ]
    }
)

const Employer = model('Employer', employerSchema);

module.exports = Employer;