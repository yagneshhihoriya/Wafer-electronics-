declare namespace Express{
    export interface Request{
        decoded:any,
        isAdmin:any,
        adminRoute:boolean
    }
}