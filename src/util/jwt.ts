import jwt from 'jsonwebtoken'
const secretKey = process.env.SECRETKEY || '12345gdhjhbasjkhfklsjflkjsdalkfjsldkfj'

const genToken = (value:any) =>{
    const token = jwt.sign(value, secretKey, {
        expiresIn: 1000 * 60 * 60
    })
    return token
}

const verifyToken = (token:any) =>{
    try {
        const decoded = jwt.verify(token, secretKey)
        return decoded
    } catch (ex) {
        return false
    }
}

export = {genToken,verifyToken}
