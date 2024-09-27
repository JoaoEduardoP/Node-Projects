import { DataBase } from '../database/mongodb.js';
import * as genero from '../models/gender.js';
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        if(DataBase === undefined){
            throw new Error('Sem conexão com o banco de dados');
        }
        const Genders = await genero.getGender()
        if(!Genders){
            throw new Error('Não foi possível fazer a requisição GET no banco de dados ou não há registros cadastrados.');}
        genero.debugging("Requisição GET realizada com sucesso.");
        res.status(200).send(Genders);
        return;
    }
    catch(err){
        genero.debugging(err.message);
        res.status(404).send(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        if(DataBase === undefined){
            throw new Error('Sem conexão com o banco de dados');
        }
        const genderId = await genero.getGenderbyId(req.params.id)
        if(!genderId){
            throw new Error('Não foi possível fazer a requisição GET no banco de dados ou não há este registro cadastrado.');}
        genero.debugging("Requisição GET realizada com sucesso.");   
        res.status(200).send(genderId);
        return;
    }
    catch(err){
        genero.debugging(err.message);
        res.status(404).send(err.message);
    }
});

router.post('/',  async (req, res) => {
    try{
        if(DataBase === undefined){
            throw new Error('Sem conexão com o banco de dados');
        }

        const { error } = genero.validaGender(req.body);

        if(error){
            throw new Error(error);
        }

        const retorno = await genero.insertGender(req.body.name);

        if(!retorno) {
            throw new Error('Não foi possível fazer a requisição POST no banco de dados.');
        }
        genero.debugging("Requisição POST realizada com sucesso.\n", retorno);
        res.status(201).send(retorno);
    }
    catch(err){
        genero.debugging(err.message);
        res.status(400).send(err.message);
    }
});

router.put('/:id', async (req, res) => {
    try{
        if(DataBase === undefined){
            throw new Error('Sem conexão com o banco de dados');
        }
        const gender = await genero.getGenderbyId(req.params.id);

        if(!gender){
            throw new Error('O gênero com o ID informado não foi encontrado.');
        }
        const { error } = genero.validaGender(req.body);

        if(error){
            throw new Error(error.message);
        }

        const retorno = await genero.updateGender(req.params.id,req.body.name);

        if(!retorno) {
            throw new Error('Não foi possível fazer a requisição PUT no banco de dados.');
        }

        genero.debugging("Requisição PUT realizada com sucesso.\n");
        res.status(200).send(retorno);
    }
    catch(err){
        genero.debugging(err.message);
        res.status(400).send(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try{
        if(DataBase === undefined){
            throw new Error('Sem conexão com o banco de dados');
        }
        const gender = await genero.getGenderbyId(req.params.id);

        if(!gender){
            throw new Error('O gênero com o ID informado não foi encontrado.');
        }
        const { error } = genero.validaGender(req.body);

        if(error){
            throw new Error(error.message);
        }

        const retorno = await genero.deleteGender(req.params.id);

        if(!retorno) {
            throw new Error('Não foi possível fazer a requisição DELETE no banco de dados.');
        }
        genero.debugging("Requisição DELETE realizada com sucesso.\n");
        res.status(200).send(retorno);
    }
    catch(err){
        genero.debugging(err.message);
        res.status(400).send(err.message);
    }
});

export default router;