export * from "./logger.js";

import * as Events from "events";

var url = "http://mylogger.io/log";

export class Class_Logger extends Events.EventEmitter{          // Cria uma classe que herda de EventEmitter
    logg(message){
        console.log(message+" - "+url);

        this.emit(`Message Logged`, {Id: 200, Url: 'http://'}); // Raise an event 

        this.emit(`Logging`, {Data: `Mensagem de Log`});        // Raise an event
    }
}

export function teste2(){
    console.log("Teste - 2");
}

export const teste = "Teste variável";
