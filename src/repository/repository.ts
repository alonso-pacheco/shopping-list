import { TABLE_PENDING, TABLE_SHOPPING } from "../constants/database";
import { SortEnum } from "../constants/enumerates";
import { getDB } from "../database/db";
import { PendingDTO, ShoppingDTO } from "../database/models/shopping";
import { getSortOption } from "../services/storage";

export class ShoppingRepository{

    async getAll(order: string) {
        try{
            if(order == ""){
                let localOrder = await getSortOption();
                order = localOrder != null ? localOrder : SortEnum.CREATED
            }

            const db = await getDB();
            let query = `SELECT * FROM ${TABLE_SHOPPING} `
            query += `ORDER BY checked ASC, `;
            if (order === SortEnum.ASC || order === SortEnum.DESC) {
                query += `name ${order === SortEnum.ASC ? "ASC" : "DESC"}`;
            }else if (order === SortEnum.CREATED){
                query += `id`
            }
            
            const allRows = await db.getAllAsync<ShoppingDTO>(query);
            
            return allRows.map(row => {
                return new ShoppingDTO({
                    id: row.id,
                    name: row.name,
                    checked: row.checked,
                });
            });
        }catch(e){
            console.error("get shopping", e);
            throw e;
        }
    }

    async save(name:string){
        try{
            const db = await getDB();
            await db.runAsync(`INSERT INTO ${TABLE_SHOPPING} (name, checked) VALUES (?, ?)`,
                [name, 0])
        }catch(e){
            console.error("save shopping", e);
            throw e;
        }
    }

    async check(id:number, is_checked: boolean){
        try{
            let checked = is_checked ? "1" : "0"; 
            const db = await getDB();
            await db.runAsync(`UPDATE ${TABLE_SHOPPING} SET checked=? WHERE id=?`, [checked, id]);

        }catch(e){
            // console.error("check shopping", e);
            throw e;
        }
    }

    async clear(){
        try{
            const db = await getDB();
            await db.runAsync(`DELETE FROM ${TABLE_SHOPPING} WHERE checked=1`);
        }catch(e){
            // console.error("clear shopping", e);
            throw e;
        }
    }
}

export class PendingRepository{

    async getAll() {
        try{
            const db = await getDB();
            const allRows = await db.getAllAsync<PendingDTO>(`SELECT * FROM ${TABLE_PENDING} ORDER BY name and checked;`);
            return allRows.map(row => {
                return new PendingDTO({
                    id: row.id,
                    name: row.name,
                    checked: row.checked,
                });
            });
        }catch(e){
            console.error("get pending", e);
            throw e;
        }
    }

    async save(name:string){
        try{
            const db = await getDB();
            await db.runAsync(`INSERT INTO ${TABLE_PENDING} (name, checked) VALUES (?, ?)`,
                [name, 0])


        }catch(e){
            // console.error("save pending", e);
            throw e;
        }
    }

    async check(id:number, is_checked: boolean){
        try{
            let checked = is_checked ? "1" : "0"; 
            const db = await getDB();
            await db.runAsync(`UPDATE ${TABLE_PENDING} SET checked=? WHERE id=?`, [checked, id]);

        }catch(e){
            // console.error("check pending", e);
            throw e;
        }
    }

    async clear(){
        try{
            const db = await getDB();
            await db.runAsync(`DELETE FROM ${TABLE_PENDING} WHERE checked=1`);
        }catch(e){
            // console.error("clear pending", e);
            throw e;
        }
    }
}