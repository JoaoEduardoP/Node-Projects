import Joi from 'joi';
import express from 'express';

const router = express.Router();

var genders = [
    { id: 1, name: 'Ação' },
    { id: 2, name: 'Suspense' },
    { id: 3, name: 'Drama' },
];

router.get('/', (req, res) => {
    res.send(genders);    
});

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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
    const gender = genders.find( g => g.id === parseInt(req.params.id));

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