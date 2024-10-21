const { tools } = require("../lib");
// const { tools } = require("firebase-admin-cli");

/**
 * Print a GCS file data
 *
 * Example `ext.printFile("users/test_file.json");`
 * @param {String} path - file path
 */
const printFile = async (path) => {
  console.log(
    await tools.bucket
      .file(path)
      .download()
      .then(([buf]) => buf.toString())
  );
};

module.exports = { printFile };
