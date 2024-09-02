import express from 'express';
import Joi from 'joi';

const router = express.Router();

const courses = [
    { id: 1, name: 'curso1' },
    { id: 2, name: 'curso2' }, 
    { id: 3, name: 'curso3' },
];

router.get('/', (req, res) => {
    res.send(courses);    
});

router.get('/:id', (req, res) => {
    var course = courses.find(c => c.id === parseInt(req.params.id));    
    if(!course)
        res.status(404).send('O curso com o ID informado não foi encontrado.');
    else
        res.status(201).send(course);
});

router.post('/', (req, res) => {
    const { error } = validaDados(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.status(201).send(course);
});

router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));    
    const { error } = validaDados(req.body);

    if(!course){
        res.status(404).send('O curso com o ID informado não foi encontrado.');
        return;
    }

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;

    res.status(201).send(course);
});

router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));    

    if(!course){
        res.status(404).send('O curso com o ID informado não foi encontrado.');
        return;
    }

    courses.splice(courses.indexOf(course), 1);
    res.status(201).send(course);
});

export default router;

function validaDados(course){
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .required()
    });

    return schema.validate(course);
}