import express from 'express';
import 'dotenv/config';
import { bootstrap } from './app.controller.js';
import { errorHandler } from './lib/globalErrorhandler.js';
const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
await bootstrap(app);
const PORT = process.env.PORT || 3000;
app.use(errorHandler());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map