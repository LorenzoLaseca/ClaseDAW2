import express from 'express';
import Monster from '../models/monster.js';
import {createClient} from 'redis';
import Joi from '@hapi/joi';


const router = express.Router();

router.get('/', async (req, res) => {
    const monsters = await Monster.find();
    res.json({
        error: null,
        data: monsters
    });
})

router.get('/random', async (req, res) => {
    const monsters = await Monster.find();
    const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
    res.json({
        error: null,
        data: randomMonster
    });
});

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
});

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
});



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
});



export default router
