import home from './routes/home.js'
import gender from './routes/gender.js'
import * as logger from './middlewares/logger.js'
import * as autenticator from './middlewares/autenticator.js'
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import config from 'config';
import debug from 'debug';

const aplicacao = express();
const porta = process.env.PORT || 3000;
const debugging = debug('aplicacao:startup')

if(aplicacao.get('env') === 'development'){
    aplicacao.use(morgan('tiny'));
    debugging('Morgan habilitado...');
};

// Configuração de view engine
aplicacao.set('view engine', 'pug');
aplicacao.set('views', './views');

// Configuração de ambiente
console.log(`Curso: ${config.get('name')}`);
console.log(`Mail: ${config.get('mail.host')}`);
console.log(`Senha da Aplicação: ${config.get('mail.password')}`);

aplicacao.use(express.json());
aplicacao.use(helmet());
aplicacao.use(morgan('tiny'));
aplicacao.use(express.json());
aplicacao.use(express.urlencoded({ extended: true }));
aplicacao.use('/static',express.static('../public'));
aplicacao.use(logger.logging);
aplicacao.use(autenticator.autenticating);

// Definindo rota para a homepage
aplicacao.use('/', home);

// Definindo rota para os gêneros
aplicacao.use('/api/genders', gender)

aplicacao.listen(porta, () => {
    console.log(`Aplicação rodando na porta ${porta}...`);
});