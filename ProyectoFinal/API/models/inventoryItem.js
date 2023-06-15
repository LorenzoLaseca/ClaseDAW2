
import { Schema, model } from 'mongoose'

const inventoryItemSchema = Schema({
    characterId: {
        type: String,
        require: true,
    },
    itemId: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    }
})

export default model('InventoryItem', inventoryItemSchema)