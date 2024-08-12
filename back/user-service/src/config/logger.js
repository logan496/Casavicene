// const winston = require('winston');
// const config = require('./config');
//
// const enumerateErrorFormat = winston.format((info) => {
//     if (info instanceof Error) {
//         Object.assign(info, { message: info.stack });
//     }
//     return info;
// });
//
// const logger = winston.createLogger({
//     level: config.env === 'development' ? 'debug' : 'info',
//     format: winston.format.combine(
//         enumerateErrorFormat(),
//         config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
//         winston.format.splat(),
//         winston.format.printf(({ level, message }) => `${level}: ${message}`)
//     ),
//     transports: [
//         new winston.transports.Console({
//             stderrLevels: ['error'],
//         }),
//     ],
// });
//
// module.exports = logger;

const {createLogger, format, transports} = require('winston')

const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({timestamp, level, message}) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename: 'logs/development.log'})
    ]
})

module.exports = logger

