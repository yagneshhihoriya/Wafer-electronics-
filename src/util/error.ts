import {Request,Response,NextFunction, RequestHandler} from 'express'
async function errorWrapper(fun:any){
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
           await fun(req,res,next)
        }catch(ex){
            next(ex)
        }
    }
}

const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(ex=>{
    return res.status(500).json({success:false,error:ex})
});
export = {errorWrapper,asyncHandler}