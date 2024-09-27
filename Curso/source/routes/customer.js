import { DataBase } from '../database/mongodb.js';
import * as customer from '../models/customer.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        if(DataBase === undefined){
            throw new Error('Sem conexão com o banco de dados');
        }
        const Customer = await customer.getCustomer()
        if(!Customer){
            throw new Error('Não foi possível fazer a requisição GET no banco de dados ou não há registros cadastrados.');}
        customer.debugging("Requisição GET realizada com sucesso.");
        res.status(200).send(Customer);
        return;
    }
    catch(err){
        customer.debugging(err.message);
        res.status(404).send(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        if(DataBase === undefined){
            throw new Error('Sem conexão com o banco de dados');
        }
        const customerId = await customer.getCustomerbyId(req.params.id)
        if(!customerId){
            throw new Error('Não foi possível fazer a requisição GET no banco de dados ou não há este registro cadastrado.');}
        customer.debugging("Requisição GET realizada com sucesso.");   
        res.status(200).send(customerId);
        return;
    }
    catch(err){
        customer.debugging(err.message);
        res.status(404).send(err.message);
    }
});

router.post('/',  async (req, res) => {
    try{
        if(DataBase === undefined){
            throw new Error('Sem conexão com o banco de dados');
        }

        const { error } = customer.validaCustomer(req.body);

        if(error){
            throw new Error(error);
        }

        const retorno = await customer.insertCustomer(req.body.name, req.body.isGold, req.body.phone);

        if(!retorno) {
            throw new Error('Não foi possível fazer a requisição POST no banco de dados.');
        }
        customer.debugging("Requisição POST realizada com sucesso.\n", retorno);
        res.status(201).send(retorno);
    }
    catch(err){
        customer.debugging(err.message);
        res.status(400).send(err.message);
    }
});

router.put('/:id', async (req, res) => {
    try{
        if(DataBase === undefined){
            throw new Error('Sem conexão com o banco de dados');
        }
        const customer = await customer.getCustomerbyId(req.params.id);

        if(!customer){
            throw new Error('O gênero com o ID informado não foi encontrado.');
        }
        const { error } = customer.validaCustomer(req.body);

        if(error){
            throw new Error(error.message);
        }

        const retorno = await customer.updateCustomer(req.params.id, req.body.name, req.body.isGold, req.body.phone);

        if(!retorno) {
            throw new Error('Não foi possível fazer a requisição PUT no banco de dados.');
        }

        customer.debugging("Requisição PUT realizada com sucesso.\n");
        res.status(200).send(retorno);
    }
    catch(err){
        customer.debugging(err.message);
        res.status(400).send(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try{
        if(DataBase === undefined){
            throw new Error('Sem conexão com o banco de dados');
        }
        const customer = await customer.getCustomerbyId(req.params.id);

        if(!customer){
            throw new Error('O gênero com o ID informado não foi encontrado.');
        }
        const { error } = customer.validaCustomer(req.body);

        if(error){
            throw new Error(error.message);
        }

        const retorno = await customer.deleteCustomer(req.params.id);

        if(!retorno) {
            throw new Error('Não foi possível fazer a requisição DELETE no banco de dados.');
        }
        customer.debugging("Requisição DELETE realizada com sucesso.\n");
        res.status(200).send(retorno);
    }
    catch(err){
        customer.debugging(err.message);
        res.status(400).send(err.message);
    }
});

export default router;