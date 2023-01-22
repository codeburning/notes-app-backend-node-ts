export interface UserRegister{
    email:string ;
    firstName:string ;
    lastName?:string ;
    password:string
}
export interface UserLogin{
    email:string ; 
    password:string
}

export interface NotesCreationBody{
    title:string ;
    description:string ;
    images:Array<string>
}
export interface AuthTokenPayload{
    id:string;
    email:string
}