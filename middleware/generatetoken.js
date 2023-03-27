import jwt from 'jsonwebtoken';

export function generateJwtToken (data) 
{console.log("token to geneate data:",data)
var token = jwt.sign(data, "Augusta", { expiresIn: '2d' });
 return token;}