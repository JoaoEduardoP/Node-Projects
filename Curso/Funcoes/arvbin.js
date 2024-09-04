/* eslint-disable no-unused-vars */

class Bst{
    constructor(valor, direita = null, esquerda = null){
    this.valor = valor;
    this.direita = direita;
    this.esquerda = esquerda;
    }
    
    insert(valor){
        if(valor > this.valor){
            if(this.direita === null){
                this.direita = new Bst(valor);
            }
            else{
                this.direita.insert(valor);
            }
        }
        else{
            if(this.esquerda === null){
                this.esquerda = new Bst(valor);
            }
            else{
                this.esquerda.insert(valor);
            }
        }
    }
    contains(valor){
        if(valor === this.valor){
            return true;
        }
        if(valor > this.valor){
            if(this.direita === null){
                return false;
            }
            else{
                return this.direita.contains(valor);
            }
        }
        else{
            if(this.esquerda === null){
                return false;
            }
            if(valor < this.valor){
                return this.esquerda.contains(valor);
            }
        }
    }

    min(){ 
        if(this.esquerda === null){
            return this.valor;
        }
        else{
            return this.esquerda.min();
        }
    }

    remove(valor, parente = null){
        if(valor > this.valor){
            if(this.direita !== null){
                this.direita.remove(valor, this);
            }
        }
        else if(valor < this.valor){
            if(this.esquerda !== null){
                this.esquerda.remove(valor, this);
            }
        }
        else{
            if(this.direita !== null && this.esquerda !== null){
                this.valor = this.direita.min();
                this.direita.remove(this.valor, this);
            }
            else if(parente === null){
                if(this.direita !== null){
                    this.valor = this.direita.valor;
                    this.esquerda = this.direita.esquerda;
                    this.direita = this.direita.direita;
                }
                else if(this.esquerda !== null){
                    this.valor = this.esquerda.valor;
                    this.direita = this.esquerda.direita;
                    this.esquerda = this.esquerda.esquerda;
                }
                else{
                    this.valor = null;
                }
            }
            else if(parente.direita === this){
                parente.direita = this.direita !== null ? this.direita : this.esquerda;
            }
            else if(parente.esquerda === this){
                parente.esquerda = this.direita !== null ? this.direita : this.esquerda;
            }
        }
    }
    
    invert(){
        let temp = this.direita;
        this.direita = this.esquerda;
        this.esquerda = temp;
        if(this.direita !== null){
            this.direita.invert();
        }
        if(this.esquerda !== null){
            this.esquerda.invert();
        }
    }
}

