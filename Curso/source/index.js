import * as _ from "underscore";
import express from 'express';
import Joi from 'joi';

const aplicacao = express();
const porta = process.env.PORT || 3000;

var result = _.contains([1, 2, 3], 3);
var genders = [
    { id: 1, name: 'Ação' },
    { id: 2, name: 'Suspense' },
    { id: 3, name: 'Drama' },
];

console.log(result);

aplicacao.use(express.json());

aplicacao.get('/', (req, res) => {
    res.send('Bem Vindo!');
});

aplicacao.get('/api/genders', (req, res) => {
    res.send(genders);    
});

aplicacao.get('/api/genders/:id', (req, res) => {
    const gender = genders.find( g => g.id === parseInt(req.params.id));

    if(!gender){
        res.status(404).send('O gênero com o ID informado não foi encontrado.');
        return;
    }
    else{
        res.status(201).send(gender);
        return;
    }
});

aplicacao.post('/api/genders', (req, res) => {
    const { error } = validaGender(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const genderPost = {
        id: genders.length + 1,
        name: req.body.name
    }

    genders.push(genderPost);
    res.status(201).send(genderPost);
});

aplicacao.put('/api/genders/:id', (req, res) => {
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

aplicacao.delete('/api/genders/:id', (req, res) => {
    const gender = genders.find( g => g.id === parseInt(req.params.id));

    if(!gender){
        res.status(404).send('O gênero com o ID informado não foi encontrado.');
        return;
    }

    genders.splice(genders.indexOf(gender),1);
    res.status(200).send(gender);
});

function validaGender(Gender){
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .required()
    })

    return schema.validate(Gender)
}

aplicacao.listen(porta, () => {
    console.log(`Aplicação rodando na porta ${porta}...`);
});