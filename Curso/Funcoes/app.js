/* eslint-disable no-unused-vars */
import * as Logger from "./logger.js";
import * as _ from "underscore";
import * as Path from "path";
import * as Os from "os";
import * as Fs from "fs";
import * as Http from "http";

const __filename = import.meta.filename;          // Retorna o caminho do arquivo atual
const __dirname = Path.dirname(__filename);       // Retorna o diretório do arquivo atual
const files = Fs.readdirSync('./')                // Lista os arquivos do diretório atual
const files_async = Fs.readdir('./', function(err, files){
    if(err) console.log('Error', err);
    else console.log('Arquivos (Async): \n', files);
})                                                // Lista os arquivos do diretório atual de forma assíncrona 
const logger_class = new Logger.Class_Logger();   // Cria um objeto da classe Logger
const server = Http.createServer((req, res) =>{
    if(req.url === '/'){
        res.write('Hello World');
        res.end();
    }
    if(req.url === '/api/courses'){
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});                                               // Cria um servidor HTTP

var path_objetct = Path.parse(__filename);        // Retorna um objeto com informações do caminho do arquivo atual
var tot_mem  = Os.totalmem();                     // Retorna a quantidade total de memória do sistema
var free_mem = Os.freemem();                      // Retorna a quantidade de memória livre do sistema

var result = _.contains([1, 2, 3], 3);            // Verifica se o array contém o valor 3

console.log(`Resultado Underscore: ${result}`);

logger_class.on(`Message Logged`, (arg) => {
    console.log(`Listener Called: \n`, arg);
});                                               // Cria um listener para o evento Message Logged    

logger_class.on(`Logging`, (arg) => {
    console.log(`Logged: \n`, arg);
});                                               // Cria um listener para o evento Logging

console.log(`Objeto do caminho do diretório:\n`, path_objetct);

console.log(`Diretório: ${__dirname}`);

console.log(`Memória Total: ${tot_mem}`);

console.log(`Memória Livre: ${free_mem}`);

console.log(`Arquivos (Sync): ${files}`);



function digaola(nome){
    console.log("Olá " + nome)
}

setTimeout(function(){
    digaola("Teste");

    console.log(Logger.teste);

    logger_class.logg("Teste");

    Logger.teste2();

    server.listen(3000);

    console.log("Executou após 2 segundos, Fim do Programa");
}, 2000);