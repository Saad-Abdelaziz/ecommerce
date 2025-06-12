import express, { Request, Response } from 'express';
import { getActiveCartForUser } from '../services/cartService';
import validateJWT from '../middlewares/validateJWT';
import { IUser } from '../models/userModel';

interface AuthenticatedRequest extends Request {
    user?: IUser;
}

const router = express.Router();

router.get("/", validateJWT, async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        res.status(401).send({ error: "Unauthorized: User not found" });
        return;
    }
    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send({ cart });
});

export default router;
