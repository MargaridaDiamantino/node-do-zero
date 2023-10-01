import { randomUUID } from "node:crypto";
export class DatabaseMemory {
    // o cardinal indica que a variavel so vai ser visivel aqui dentro

    #videos = new Map()

    list(search) {
        return Array.from(this.#videos.entries())
            .map((videoArrary) => {
                const id = videoArrary[0]
                const data = videoArrary[1]

                return( {
                    id,
                    ...data
                })
            }) .filter(video=>{
                if(search){
                    return video.title.includes(search)
                }
                return true
            })
        // converte uma estrutura de dados em array
    }
    create(video) {
        const videoId = randomUUID()
        this.#videos.set(videoId, video)
    }
    update(id, video) {

        this.#videos.set(id, video)
    }
    delete(id) {

        this.#videos.delete(id)
    }

}