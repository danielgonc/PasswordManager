import { Request, Response } from 'express';
import NodeCache from 'node-cache';
import { PasswordModel } from '../models/passwordModel';
import { BadRequest, NotFound } from '../extensions/errorExtensions';

const myCache = new NodeCache();

export const fetchPasswords = async (req: Request, res: Response) => {
    const existingPasswords = myCache.get<PasswordModel[]>('passwords');
    return res.status(200).json(existingPasswords ? existingPasswords : []);
}

export const addPassword = async (req: Request, res: Response) => {

    try {
        if (!isAddOrUpdatePasswordRequest(req.body)) {
            throw new BadRequest('missing required parameters in request');
        }

        const body = req.body as PasswordModel;
        body.id = crypto.randomUUID();

        const existingPasswords = myCache.get<PasswordModel[]>('passwords');

        if (existingPasswords && existingPasswords.length > 0) {
            existingPasswords.push(body);
            myCache.set('passwords', existingPasswords);
        }
        else {
            myCache.set('passwords', [body]);
        }

        return res.status(200).json(body);
    } catch (err) {
        if (err instanceof BadRequest) {
            return res.status(400).json({ message: err.message });
        }

        return res.status(500);
    }
}

export const updatePassword = (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        if (!isAddOrUpdatePasswordRequest(req.body)) {
            throw new BadRequest('missing required parameters in request');
        }

        const passwords = myCache.get<PasswordModel[]>('passwords');

        if(!passwords || !passwords.some(f => f.id === id)){
            throw new NotFound('id not found');
        }

        const passwordIndex = passwords.findIndex(f => f.id === id);

        passwords[passwordIndex].url = req.body.url;
        passwords[passwordIndex].name = req.body.name;
        passwords[passwordIndex].username = req.body.username;
        passwords[passwordIndex].password = req.body.password;

        myCache.set('passwords', passwords);

        return res.status(200).json(passwords[passwordIndex]);
    } catch (err) {
        if (err instanceof BadRequest) {
            return res.status(400).json({ message: err.message });
        }
        else if (err instanceof NotFound) {
            return res.status(404).json({ message: err.message });
        }

        return res.status(500);
    }
}


export const deletePassword = (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        let passwords = myCache.get<PasswordModel[]>('passwords');

        if(!passwords || !passwords.some(f => f.id === id)){
            throw new NotFound('id not found');
        }

        passwords = passwords.filter(f => f.id !== id);
        myCache.set('passwords', passwords);

        return res.status(200).json({message: 'success'});
    } catch (err) {
        if (err instanceof BadRequest) {
            return res.status(400).json({ message: err.message });
        }
        else if (err instanceof NotFound) {
            return res.status(404).json({ message: err.message });
        }

        return res.status(500);
    }
}

const isAddOrUpdatePasswordRequest = (obj: any): obj is PasswordModel => {
    return 'url' in obj &&
        'name' in obj &&
        'username' in obj &&
        'password' in obj;
}