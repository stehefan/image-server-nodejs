import {Request, Response, Router} from "express";
import {CustomError} from "../middleware/error";
import {getImage, getImages} from "../service/image";

const router = Router({ mergeParams: true })

router.get('/', async (_req: Request, res: Response) => {
    const images = await getImages();
    res.send(images);
})

router.get('/:imageId', async (req: Request, res: Response) => {
    const {imageId} = req.params;
    const id = Number.parseInt(imageId);

    if (Number.isNaN(id)) {
        throw new CustomError('id needs to be a number', 400);
    }

    const image = await getImage(id);
    res.send(image);
})

export default router;