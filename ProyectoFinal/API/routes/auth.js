"use strict"
import express from 'express';
import User from '../models/user.js'
import Joi from '@hapi/joi'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router();
const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    pass: Joi.string().min(6).max(1024).required()
})

// Esquema del login
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    pass: Joi.string().min(6).max(1024).required()
})

// LOGIN
router.post('/login', async (req, res) => {
    // Validaciones de login
    const { error } = schemaLogin.validate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })

    // Validaciond e existencia
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' })

    // Validacion de password en la base de datos
    const validPassword = await bcrypt.compare(req.body.pass, user.pass)
    if (!validPassword) return res.status(400).json({ error: 'Contraseña invalida' })

    // Creando token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "superPassword")

    // Colocando el token en el header y el cuerpo de la respuesta
    res.json({
        error: null,
        data: user
    })
})


// REGISTER
router.post('/register', async (req, res) => {

    const { error } = schemaRegister.validate(req.body)

    if (error) {
        return res.status(400).json(
            { error: error.details[0].message }
        )
    }

    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            { error: 'Email ya registrado' }
        )
    }

    const salt = await bcrypt.genSalt(10)
    const pass = await bcrypt.hash(req.body.pass, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        pass: pass
    });
    try {
        const savedUser = await user.save()
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({ error })
    }
})

export default router