import { TABLE_PENDING, TABLE_SHOPPING } from "../constants/database";
import { getDB } from "../database/db";
import { PendingDTO, ShoppingDTO } from "../database/models/shopping";
import { choiceSortOptionToQuery } from "../helper/utils";

export class ShoppingRepository{

    async getAll(order: string) {
        try{
            const db = await getDB();
            let query = `SELECT * FROM ${TABLE_SHOPPING} ORDER BY checked ASC, `;
            query += await choiceSortOptionToQuery(order);
            
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

    async update(name: string, id: number){
        try{
            const db = await getDB();
            await db.runAsync(`UPDATE ${TABLE_SHOPPING} SET name=? WHERE id=?`, [name, id]);
            
        }catch(e){
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

    async getAll(order: string = "") {
        try{
            const db = await getDB();
            let query = `SELECT * FROM ${TABLE_PENDING} ORDER BY checked ASC, `;
            query += await choiceSortOptionToQuery(order);
            const allRows = await db.getAllAsync<PendingDTO>(query);
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

    async update(name: string, id: number){
        try{
            const db = await getDB();
            await db.runAsync(`UPDATE ${TABLE_PENDING} SET name=? WHERE id=?`, [name, id]);
            
        }catch(e){
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