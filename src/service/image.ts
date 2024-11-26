import {CustomError} from "../middleware/error";
import {getImageFromDatabase} from "./db";

export const getImage = async (imageId: number)  => {
    const result = await getImageFromDatabase(imageId);

    if (!result) {
        throw new CustomError('image for id not found', 404);
    }

    return Promise.resolve(result);
}
