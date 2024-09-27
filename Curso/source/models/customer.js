import mongoose from 'mongoose';
import debug from 'debug';
import Joi from 'joi';

export const debugging = debug('aplicacao:database-Customer')

export const schema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    phone:{
        type: String,
        required: true,
        min: 10,
        max: 15
    },
    name: {
        type: String,
        required: true,
        min: 2,
        max: 100
    }
});

const customer = mongoose.model('customer',schema);

export async function getCustomer(){
    const customerGet = await customer
        .find()
        .sort('name');
    return customerGet;
}

export async function getCustomerbyId(idCustomer){
    const customerGetId = await customer
    .find({
        _id: idCustomer
    })
    return customerGetId.length>0 ? customerGetId : null;
}

export async function insertCustomer(nome, ouro, telefone){
    const Cus = new customer({
        name: nome,
        isGold: ouro,
        phone: telefone
    });

    try {
        return await Cus.save();
    }
    catch(err){
        debugging("Função insertCustomer: ", err.message);
        return;
    }
}

export async function updateCustomer(id, nome, ouro, telefone){
    try {
        const Cus = await customer.findByIdAndUpdate(id,{   
            $set:{
                name: nome,
                isGold: ouro,
                phone: telefone
            },
        },{new : true});
        return Cus;
    }
    catch(err){
        debugging("Função updateCustomer: ", err.message);
        return;
    }
}

export async function deleteCustomer(id){
    try {
        const Cus = await customer.findOneAndDelete(id);
        return Cus;
    }
    catch(err){
        debugging("Função deleteCustomer: ", err.message);
        return;
    }
}

export function validaCustomer(Customer){
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .required(),
        isGold: Joi.boolean()
        .required()
        .default(false),
        phone: Joi.string()
        .min(10)
        .max(15)
        .required()
    })

    return schema.validate(Customer)
}


export * from "./customer.js";