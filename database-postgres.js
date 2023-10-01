import { randomUUID } from "node:crypto";
import {sql} from './db.js'
export class DatabasePostgres {
    // o cardinal indica que a variavel so vai ser visivel aqui dentro

   

   async list(search) {
        let videos 
        if(search){
        return    videos =  await sql`select * from videos where title ilike ${'%'+search+'%'}`
        }else{
           return videos=  await sql`select * from videos`
        }
        // converte uma estrutura de dados em array
    }
 async create(video) {
         const videoId= randomUUID()
         const {title,description,duration}= video
         await sql `insert into videos(id, title,description,duration) values (${videoId},${title},${description},${duration})`
    }
   async update(id, video) {
        const {title,description,duration}= video
       await sql` UPDATE videos set title = ${title},description= ${description},duration = ${duration} where id = ${id}`
        
    }
   async delete(id) {
 await sql` delete from videos where id=${id} `
        
    }

}