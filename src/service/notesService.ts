import notes from "../schema/notes"

export class NotesService{
   /**
    * 
    * @param option 
    * @returns 
    */
    async newNote(option:{[key:string]:any}){
        try{
            const x = new notes(option)
            return await x.save()
        }catch(e){
            throw e
        }
    }
}