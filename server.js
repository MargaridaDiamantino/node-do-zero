// import { createServer} from 'node:http'
// const server = createServer((req,res)=>{
//     console.log("hello world")
//     res.end()
// })
// server.listen(3333)

import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";
//const database = new DatabaseMemory()
const database= new DatabasePostgres()
const server = fastify()

server.get('/videos',async (request) => {
const search= request.query.search

   const videos = await database.list(search)
   return videos
})

server.post('/videos', async (request, reply) => {

    const {title,description,duration}= request.body
 await   database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
    // o status 201 indica que algo foi criado no nosso servidor
})
server.put('/videos/:id', async(request, reply) => {
 const videoId= request.params.id
    const {title,description,duration}= request.body
  await database.update(videoId,{
        title,
        description,
        duration,
    })

    return reply.status(204).send()
    // o status 204 indica que algo que teve sucesso, mas nao tem nenhum retorno 
})
server.delete('/videos/:id',async (res,response) => {
    const videosId= res.params.id
  await  database.delete(videosId)

    return response.status(204).send()
})
server.listen({
     port: process.env.PORT ??  3333 })