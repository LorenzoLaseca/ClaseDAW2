
import { Schema, model } from 'mongoose'

const userSchema = Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    pass: {
        type: String,
        require: true,
    }
})

export default model('User', userSchema)