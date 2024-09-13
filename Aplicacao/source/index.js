import * as logger from './middlewares/logger.js';
import * as autenticating from './middlewares/autenticator.js';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import config from 'config';
import debug from 'debug';
import router from './routes/courses.js';
import homepage from './routes/homepage.js';

const aplicacao = express();
const porta = process.env.PORT || 3000;
const debugging = debug('aplicacao:startup');
const dbDebugging = debug('aplicacao:db');

// Configuração de ambiente
console.log(`Aplicação: ${config.get('name')}`);
console.log(`Mail: ${config.get('mail.host')}`);
console.log(`Senha da Aplicação: ${config.get('mail.password')}`);
console.log(`Ambiente: ${aplicacao.get('env')}`);

aplicacao.set('view engine', 'pug');
aplicacao.set('views', './views');

if(aplicacao.get('env') === 'development'){
    aplicacao.use(morgan('tiny'));
    debugging('Morgan habilitado...');
}

aplicacao.use(express.json());
aplicacao.use(express.urlencoded({ extended: true }));
aplicacao.use(express.static('../public'));
aplicacao.use(helmet());
aplicacao.use(logger.logging);
aplicacao.use(autenticating.autenticating);

dbDebugging("Banco de dados habilitado...");

// Definindo rotas para a view de cursos
aplicacao.use('/api/courses', router);
// Definindo rotas para a view da home
aplicacao.use('/', homepage)

aplicacao.listen(porta, () => {
    console.log(`Aplicação rodando na porta ${porta}...`);
});