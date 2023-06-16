import express from 'express';
import Joi from '@hapi/joi';
import { createClient } from 'redis';
import cors from 'cors';
import bodyParser from 'body-parser';


const client = createClient({
    url: 'redis://default:123pass@localhost:5000'
});

const router = express.Router();
await client.connect();
/*
router.get('/', async (req, res) => {
    const items = await Item.find();
    res.json({
        error: null,
        data: items
    });
})*/
router.get('/', async (req, res) => {
    res.json(await getItems());
});

/*
router.get('/random', async (req, res) => {
    const items = await Item.find();
    const randomItem = items[Math.floor(Math.random() * items.length)];
    res.json({
        error: null,
        data: randomItem
    });
});
*/
router.get('/random', async (req, res) => {
    //const monsters = await Monster.find();
    const items = await getItems();
    const randomItem = items[Math.floor(Math.random() * items.length)];
    res.json(randomItem);
});

/*
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
*/

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const items = await getItems();
    // Sear ching books for the id
    for (let item of items) {
        if (item._id === id) {
            res.json(item);
            return;
        }
    }
    // Sending 404 when not found something is a good practice
    res.status(404).send('Monster not found');
});

/*
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
*/
router.post('/', async (req, res) => {
    const item = req.body;
    item._id = Math.floor(Math.random() * 100000);
    const items = await getItems();
    items.push(item);
    await client.set('items', JSON.stringify(items));
    res.send('Items is added to the database');
});

/*
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
*/

router.put('/:id', async (req, res) => {
    // Reading id from the URL
    const id = parseInt(req.params.id);
    const items = await getItems();
    const newItem = req.body;
    if (newItem._id !== id) {
        res.send('El id tiene que ser el mismo');
        return;
    }
    // Remove item from the books array
    for (let i = 0; i < items.length; i++) {
        let monster = items[i]
        if (monster._id === id) {
            items[i] = newItem;
            await client.set('items', JSON.stringify(items));
        }
    }

    res.send('Item is edited');
});

/*
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
*/
router.delete('/:id', async (req, res) => {
    // Reading id from the URL
    const id = req.params.id;
    // Remove item from the books array
    let items = await getItems();
    items = items.filter(item => {
        if (item._id.toString() !== id) {
            return true;
        }
        return false;

    });
    await client.set('items', JSON.stringify(items));
    res.send('Item is deleted');
});



async function getItems() {
    let value = await client.get('items');
    if (value === undefined || value === null) {
        return [];
    }
    return JSON.parse(value);
}


export default router
