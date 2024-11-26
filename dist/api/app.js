"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get("/image/:id", (req, res) => {
    const { method, params } = req;
    const { id: imageId } = params;
    if (Number.isNaN(imageId)) {
        res
            .status(400)
            .send({
            status: 400,
            msg: 'id needs to be a number'
        });
        return;
    }
    switch (method) {
        case "GET":
            const image = {
                id: Number.parseInt(imageId),
                defaultDimension: {
                    name: 'portrait',
                    width: 1024,
                    height: 768,
                    href: "https://test.my"
                }
            };
            res.send(image);
            break;
        default:
            res.status(405).send();
    }
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
