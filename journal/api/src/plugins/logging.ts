import { ElysiaLogging } from "@otherguy/elysia-logging"
import winston from 'winston'

export const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  level: process.env.LOG_LEVEL ?? 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => `${info.timestamp} ${info.level} ${info.message}`)
  ),
  transports: [
    new winston.transports.File({
      dirname: 'logs',
      filename: 'journal.log',
      maxFiles: 10,
      maxsize: 1048576,
      tailable: true
    })
  ]
})

export const logging = ElysiaLogging(logger)