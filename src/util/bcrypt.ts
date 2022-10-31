import bcrypt from 'bcrypt'

async function GenerateHash(plainText:string){
    return await bcrypt.hash(plainText.toString(),10);
}

async function CompareHash(plainText:string,hash:any){
    return await bcrypt.compare(plainText.toString(),hash);
}

export = {GenerateHash , CompareHash}