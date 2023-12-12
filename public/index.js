"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// config();
const app = (0, express_1.default)();
const port = 5000 || 8000 || 8080;
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
app.get('/', (req, res) => {
    res.send('Express + TS server');
});
//# sourceMappingURL=index.js.map