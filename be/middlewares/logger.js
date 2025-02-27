const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const logDirectory = path.join(__dirname, '../logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const logStream = fs.createWriteStream(path.join(logDirectory, 'requests.log'), { flags: 'a' });

const logger = morgan('combined', { stream: logStream });

module.exports = logger;