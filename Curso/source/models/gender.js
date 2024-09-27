import mongoose from 'mongoose';
import Joi from 'joi';
import debug from 'debug';

export const debugging = debug('aplicacao:database-Gender')

export const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 100
    }
});

export const generos = mongoose.model('generos',schema);


export function validaGender(Gender){
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .required()
    })

    return schema.validate(Gender)
}

export async function getGender(){
    const generosGet = await generos
        .find()
        .sort('name');
    return generosGet;
}

export async function getGenderbyId(idGender){
    const generoGetId = await generos
    .find({
        _id: idGender
    })
    return generoGetId.length>0 ? generoGetId : null;
}

export async function insertGender(nome){
    const Gen = new generos({
        name: nome
    });

    try {
        return await Gen.save();
    }
    catch(err){
        debugging("Função insertGender: ", err.message);
        return;
    }
}

export async function updateGender(id, nome){
    try {
        const Gen = await generos.findByIdAndUpdate(id,{   
            $set:{
                name: nome
            },
        },{new : true});
        return Gen;
    }
    catch(err){
        debugging("Função updateGender: ", err.message);
        return;
    }
}

export async function deleteGender(id){
    try {
        const Gen = await generos.findOneAndDelete(id);
        return Gen;
    }
    catch(err){
        debugging("Função deleteGender: ", err.message);
        return;
    }
}

export * from "./gender.js";