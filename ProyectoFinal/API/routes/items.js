import express from 'express';
import Item from '../models/item.js';
import Joi from '@hapi/joi';


const router = express.Router();

router.get('/', async (req, res) => {
    const items = await Item.find();
    res.json({
        error: null,
        data: items
    });
})

router.get('/random', async (req, res) => {
    const items = await Item.find();
    const randomItem = items[Math.floor(Math.random() * items.length)];
    res.json({
        error: null,
        data: randomItem
    });
});

router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findOne({ _id: req.params.id });
        if (item == undefined) {
            return res.status(400).json(
                { error: `No existe el item con id ${req.params.id}` }
            )
        }
        res.json({
            error: null,
            data: item
        });
    } catch (error) {
        //res.json({ Error: error.message });
        res.status(400).json({ error: error })
    }
});

router.post('/', async (req, res) => {
    const itemExists = await Item.findOne({ name: req.body.name });
    if (itemExists) {
        return res.status(400).json(
            { error: `El item con el name ${req.body.name} ya existe` }
        )
    }
    const item = new Item({
        name: req.body.name,
    });
    try {
        const savedItem = await item.save()
        res.json({
            error: null,
            data: savedItem
        })
    } catch (error) {
        res.status(400).json({ error: error })
    }
});



router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const itemDatabase = await Item.findOne({ _id: id });
    if (!itemDatabase) {
        return res.status(400).json(
            { error: `El item con id ${id} no existe` }
        )
    }
    itemDatabase.name = req.body.name;

    try {
        const itemSaved = await itemDatabase.save();
        res.json({
            error: null,
            data: itemSaved
        })
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deleteResponse = await Item.deleteOne({ _id: id });
        if (deleteResponse.deletedCount == 1) {
            res.json({
                error: null,
                data: "Item deleted"
            })
            return;
        }
        res.status(404).json({ error: 'Item not found' });

    } catch (error) {
        res.status(400).json({ error: error })
    }
});



export default router
