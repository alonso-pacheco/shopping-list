export interface IShopping{
    id?: number;
    name: string;
    checked: boolean;
}

export interface IPending{
    id?: number;
    name: string;
    checked: boolean;
}

export class ShoppingDTO implements IShopping{

    id: number;
    name: string;
    checked: boolean;

    constructor(data: Partial<IShopping> = {}){
        this.id = data.id || 0;
        this.name = data.name || "";
        this.checked = data.checked ?? false;
    }
}

export class PendingDTO implements IPending{

    id: number;
    name: string;
    checked: boolean;

    constructor(data: Partial<IPending> = {}){
        this.id = data.id || 0;
        this.name = data.name || "";
        this.checked = data.checked ?? false;
    }
}