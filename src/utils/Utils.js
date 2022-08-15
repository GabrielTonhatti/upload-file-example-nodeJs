const filesize = require("filesize");

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MAX_FILE_SIZE_MB = filesize(MAX_FILE_SIZE);

module.exports = {
    MAX_FILE_SIZE,
    MAX_FILE_SIZE_MB,
};
