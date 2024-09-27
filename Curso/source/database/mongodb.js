import mongoose from 'mongoose';
import debug from 'debug';

export const debugDb = debug('aplicacao:database')

async function connectDataBase(){
    const DataBase = mongoose.connect('mongodb://localhost/curso')

    const TimeOut = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Tempo esgotado ao tentar conectar ao Banco de Dados'));  
        }, 4000);
    });
    
    try{
        await Promise.race([DataBase, TimeOut]);
        debugDb('Conexão com o Banco de Dados estabelecida');
        return DataBase;
    }
    catch(err){
        debugDb(err.message);
        return;
    }
}

const DataBase = await connectDataBase();

// Exportando o módulo DataBase
export { DataBase};