import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authourizationToken = req.get('authorization')

    if(!authourizationToken) {
        res.status(403).send({
            message: 'Authorization token is missing'
        });
        return;
    }

    const token = authourizationToken.split(' ')[1];

    if(!token) {
        res.status(403).send({
            message: 'Authorization token is invalid'
        });
        return;
    }    jwt.verify(token,'iGgyU7ux87VjLyTPFtNiFQAxrfOV0zIJ',async (err,payload)=>{
        if(err){
            res.status(403).send({
                message: 'Authorization token is invalid'
            });
            return;
        }
        if(!payload) {
            res.status(403).send("invalid token payload");
            return;
        }
        console.log('Token payload:', payload);
        const userPayliad = payload as {email: string; firstName: string; lastName: string};

        //fetch user from payload
        const user = await userModel.findOne({email: userPayliad.email});
        if (!user) {
            res.status(403).send({
                message: 'User not found '+userPayliad.email
            });
            return;
        }
        req.user = user;
        next();
    })
}

export default validateJWT;