import Joi from 'joi';
import express from 'express';
import mongoose from 'mongoose';
import debug from 'debug';

const router = express.Router();
const debugging = debug('aplicacao:database')

const DataBase = mongoose.connect('mongodb://localhost/curso')
    .then( () => debugging('Conectado ao Banco de Dados'))
    .catch( () => debugging('Erro ao Conectar ao Banco de Dados'))

const schema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        min: 5,
        max: 100
    }
});
    
const generos = mongoose.model('generos',schema);

var genders = [
    { id: 1, name: 'Ação' },
    { id: 2, name: 'Suspense' },
    { id: 3, name: 'Drama' },
];

router.get('/', (req, res) => {
    var each;
    try{
        if(!DataBase){
            throw new Error('Sem conexão com o banco de dados');
        }
        res.send(getGender());
    }
    catch(err){
        for(each in err.errors){
            debugging(err.errors[each].message)
        }
        res.status(404).send('Sem conexão com o banco de dados');
    }
});

router.get('/:id', (req, res) => {
    const gender = getGenderbyId(req.params.id)
    
    if(!gender){
        res.status(404).send('O gênero com o ID informado não foi encontrado.');
        return;
    }
    else{
        res.status(201).send(gender);
        return;
    }
});

router.post('/', (req, res) => {
    const { error } = validaGender(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const retorno = insertGender(req.body.name);

    if(retorno) {
        res.status(201).send(genderPost);
    }
    else{
        res.status(404).send('Não foi possível fazer a requisição POST no banco de dados.');
    }
});

router.put('/:id', (req, res) => {
    const gender = genders.find( g => g.id === parseInt(req.params.id));
    const { error } = validaGender(req.body);

    if(!gender){
        res.status(404).send('O gênero com o ID informado não foi encontrado.');
        return;
    }

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    gender.name = req.body.name;

    res.status(200).send(gender);
});

router.delete('/:id', (req, res) => {
    const gender = getGenderbyId(req.params.id);
    
    if(!gender){
        res.status(404).send('O gênero com o ID informado não foi encontrado.');
        return;
    }

    genders.splice(genders.indexOf(gender),1);
    res.status(200).send(gender);
});

export default router;

function validaGender(Gender){
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .required()
    })

    return schema.validate(Gender)
}

async function getGender(){
    const generosGet = await generos
    .find()
    return generosGet;
}

async function getGenderbyId(idGender){
    const generoGet = await generos
    .find({
        id: idGender
    })
    return generoGet;
}

async function insertGender(nome){
    var cada;
    const Gen = new generos({
        name: nome
    });

    try {
        return await Gen.save();
    }
    catch(err){
        for(each in err.errors){
            debugging(err.erros[each].message);
        }
    }
}