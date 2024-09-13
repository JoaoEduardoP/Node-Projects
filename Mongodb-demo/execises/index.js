import mongoose from 'mongoose';

const conexao = mongoose.connect('mongodb://localhost/mongo-exercises')      // 'mongo-exercises' é o nome do banco de dados
    .then(() => console.log('Conectado ao MongoDB...'))
    .catch(err => console.error('Não foi possível conectar ao MongoDB...', err));

const schema = new mongoose.Schema({
    tags: [String],
    date: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
    __v: Number
});

const Exercicio = mongoose.model('courses', schema);                          // 'courses' é o nome da coleção

async function lerExercicio(){
    const exercicio = await Exercicio
        //.find({isPublished: true, tags: { $in: ['backend', 'frontend'] }})  // Filtra os cursos que estão publicados e que tem as tags 'backend' ou 'frontend'
        //.or([{tags: 'backend'}, {tags: 'frontend'}], {price: { $gte: 15 }}) // Filtra os cursos que tem as tags 'backend' ou 'frontend' e que tem o preço maior ou igual a 15
        .find({isPublished: true})
        .or([{price: { $gte: 15}},{ name: /.*by.*/i}])                         
        .sort({ price: 1 })
        .select('name author price');
    console.log(exercicio);
}

lerExercicio();