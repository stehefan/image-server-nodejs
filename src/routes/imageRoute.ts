import {Router, Request, Response, NextFunction} from "express";
import {CustomError} from "../middleware/error";
import {getImage} from "../service/image";

const router = Router({ mergeParams: true })

router.get('/:imageId', async (req: Request, res: Response, _next: NextFunction) => {
    const {imageId} = req.params;
    const id = Number.parseInt(imageId);

    if (Number.isNaN(id)) {
        throw new CustomError('id needs to be a number', 400);
    }

    const image = await getImage(id);
    res.send(image);
})

export default router;