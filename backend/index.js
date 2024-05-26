import app from './app';
import mongoose from 'mongoose';
import config from 'config/config';
import { logger } from 'config/logger';

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    logger.info('Connected to MongoDB');
    server = app.listen(config.port, () => {
        logger.info(`Server listening on port ${config.port}`);
    });
}).catch(error => logger.error(`Failed while connecting to mongoDb - ${error}`));

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
})