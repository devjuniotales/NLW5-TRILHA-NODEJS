import {Request, Response} from 'express'
import {UserService} from '../services/UserServices'

class UserController {
    async create (req : Request , res : Response ): Promise<Response>{
        const { email } = req.body

        const usersServices = new UserService();

        const user = await usersServices.create(email)
   
        return res.json(user)
    }
}

export { UserController}