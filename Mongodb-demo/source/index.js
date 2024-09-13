import mongoose from "mongoose";

const connect = mongoose.connect('mongodb://localhost/aplicacao')   // 'aplicacao' é o nome do banco de dados
    .then (() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const schema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    value: Number,
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});                                                                 // Schema é a estrutura do documento

const Curso = mongoose.model('cursos', schema);                     // 'cursos' é o nome da coleção

async function criaCurso(nome, autor, tagsCurso, valor, publicado) {
    const curso = new Curso({
        name: nome,
        author: autor,
        tags: tagsCurso,
        price: valor,
        isPublished: publicado
    });
    
    const result = await curso.save();
    
    console.log(result);
}

async function listaCurso(){
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)
    // or
    // and
    
    const PageNum = 2;
    const PageSize = 10;
    
    const cursos = await Curso
        .find()                                                    // Lista todos os cursos
        //.find({author: /.*1.*/})                                 // Lista todos os cursos que tem o autor que contém '1' (".*" para qualquer caractere) 
        //.find({author: /Eduardo$/i})                             // Lista todos os cursos que tem o autor que termina com 'Eduardo' ("i" para case insensitive)
        //.find({author: /^João/ })                                // Lista todos os cursos que tem o autor que começa com 'João'
        //.find()                                              
        //    .or([{author: "João Eduardo"},{isPublished: false}]) // Filtra os cursos que tem o autor 'João Eduardo' ou que não estão publicados
        //.find({ author: 'João Eduardo', isPublished: true })     // Filtra os cursos que tem o autor 'João Eduardo' e que estão publicados
        //.find({ price: { $gte: 10, $lte: 20 } })                 // Filtra os cursos que tem o preço entre 10 e 20
        //.find({ price: { $in: [10, 15, 20]}})                    // Filtra os cursos que tem o preço 10, 15 ou 20
        //.skip((PageNum - 1) * PageSize)                          // Pula os cursos da página anterior
        .limit(PageSize)                                           // Limita a quantidade de resultados                                          
        .sort({ name: 1 })                                         // 1 para crescente e -1 para decrescente  
        //.select('name author');                                  // Seleciona os campos que serão exibidos
        //.countDocuments();                                       // Conta a quantidade que bate com a query

    console.log(cursos);
}

async function atualizaCurso(id, autor, publicado, preco){
    /* Método 1 - Usando o findById
    const curso = await Curso.findById(id);
    
    if (!curso){
        console.log('Curso não encontrado');
        return;
    }
    */

    ///* Método 2 com a alteração - Usando o updateOne
    const curso = await Curso.findByIdAndUpdate(id,{
        $set:{
            author: autor,
            isPublished: publicado,
            price: preco,
            date: Date.now()
        }
    }, { new: true });

    console.log(curso);
    //*/

    /* Método 1 de alteração - Usando o save
    curso.isPublished = publicado;
    curso.author = autor;
    curso.price = preco;

    curso.save();
    */

    /* Método 2 de alteração - Usando o set
    curso.set({
        isPublished: publicado,
        author: autor,
        price: preco
    });

    curso.save();
    */
}

async function DeletaCurso(id){
    const curso = await Curso.findByIdAndDelete(id);
    
    console.log(curso);
}

/* Preenchendo a lista de todos os cursos */

// criaCurso('Node.js Course', 'João Eduardo', ['node', 'backend'], true);

// criaCurso('Teste - 1', 'João Eduardo - 1', ['C#', 'C'], true);

// criaCurso('Teste - 2', 'João Eduardo - 2', ['Java', 'JavaScript'], true);

// atualizaCurso('66e219916d3ca6c0e62bd09a', 'João Eduardo -1', true, 20); // Atualiza o curso com o id passado

// DeletaCurso('66e219916d3ca6c0e62bd09a'); // Deleta o curso com o id passado

listaCurso();