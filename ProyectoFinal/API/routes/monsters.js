import express from 'express';
import Joi from '@hapi/joi';
import { createClient } from 'redis';
import cors from 'cors';
import bodyParser from 'body-parser';


const client = createClient({
    url: 'redis://default:123pass@localhost:5000'
});


await client.connect();

const router = express.Router();
/*

router.get('/', async (req, res) => {
    const monsters = await Monster.find();
    res.json({
        error: null,
        data: monsters
    });
})*/

router.get('/', async (req, res) => {
    res.json(await getMonsters());
});

router.get('/random', async (req, res) => {
    //const monsters = await Monster.find();
    const monsters = await getMonsters();
    const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
    res.json(randomMonster);
});

/*
router.get('/:id', async (req, res) => {
    try {
        const monster = await Monster.findOne({ _id: req.params.id });
        if (monster == undefined) {
            return res.status(400).json(
                { error: `No existe el monster con id ${req.params.id}` }
            )
        }
        res.json({
            error: null,
            data: monster
        });
    } catch (error) {
        //res.json({ Error: error.message });
        res.status(400).json({ error: error })
    }
});*/
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const monsters = await getMonsters();
    // Sear ching books for the id
    for (let monster of monsters) {
        if (monster._id === id) {
            res.json(monster);
            return;
        }
    }
    // Sending 404 when not found something is a good practice
    res.status(404).send('Monster not found');
});
/*
router.post('/', async (req, res) => {
    const monsterExists = await Monster.findOne({ name: req.body.name });
    if (monsterExists) {
        return res.status(400).json(
            { error: `El monster con el name ${req.body.name} ya existe` }
        )
    }
    const monster = new Monster({
        name: req.body.name,
        level: req.body.level,
        defense: req.body.defense,
        attack: req.body.attack,
        health: req.body.health
    });
    try {
        const savedMonster = await monster.save()
        res.json({
            error: null,
            data: savedMonster
        })
    } catch (error) {
        res.status(400).json({ error: error })
    }
});*/

router.post('/', async (req, res) => {
    const monster = req.body;
    monster._id = Math.floor(Math.random() * 100000);
    const monsters = await getMonsters();
  
    const exists = monsters.some(element => element.name === monster.name);
    if (exists) {
      res.send('Monster with the same name already exists');
    } else {
      monsters.push(monster);
      await client.set('monsters', JSON.stringify(monsters));
      res.send('Monster is added to the database');
    }
  });
  
/*
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const monsterDatabase = await Monster.findOne({ _id: id });
    if (!monsterDatabase) {
        return res.status(400).json(
            { error: `El monster con id ${id} no existe` }
        )
    }
    monsterDatabase.name = req.body.name;
    monsterDatabase.level = req.body.level;
    monsterDatabase.attack = req.body.attack;
    monsterDatabase.defense = req.body.defense;
    monsterDatabase.health = req.body.health;

    try {
        const monsterSaved = await monsterDatabase.save();
        res.json({
            error: null,
            data: monsterSaved
        })
    } catch (error) {
        res.status(400).json({ error: error });
    }
});
*/
router.put('/:id', async (req, res) => {
    // Reading id from the URL
    const id = parseInt(req.params.id);
    const monsters = await getMonsters();
    const newMonster = req.body;
    if (newMonster._id !== id) {  
        res.send('El id tiene que ser el mismo');
        return;
    }
    // Remove item from the books array
    for (let i = 0; i < monsters.length; i++) {
        let monster = monsters[i]
        if (monster._id === id) {
            monsters[i] = newMonster;
            await client.set('monsters', JSON.stringify(monsters));
        }
    }

    res.send('Monster is edited');
});

/*
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deleteResponse = await Monster.deleteOne({ _id: id });
        if (deleteResponse.deletedCount == 1) {
            res.json({
                error: null,
                data: "Monster deleted"
            })
            return;
        }
        res.status(404).json({ error: 'Monster not found' });

    } catch (error) {
        res.status(400).json({ error: error })
    }
});*/

router.delete('/:id', async (req, res) => {
    // Reading id from the URL
    const id = parseInt(req.params.id);
    // Remove item from the monsters array
    let monsters = await getMonsters();
    monsters = monsters.filter(monster => {
        if (monster._id !== id) {
            return true;
        }
        return false;
        
    });
    //monsters = monsters.filter(monster => monster._id !== id);
    await client.set('monsters', JSON.stringify(monsters));
    res.send('Monster is deleted');
});


async function getMonsters() {
    let value = await client.get('monsters');
    if (value === undefined || value === null) {
        return [];
    }
    return JSON.parse(value);
}

export default router
