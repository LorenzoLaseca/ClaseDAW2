
import { Schema, model } from 'mongoose'

const itemSchema = Schema({
    name: {
        type: String,
        require: true,
    }
})

export default model('Item', itemSchema)