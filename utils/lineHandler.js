/**
 * Replace string before evaluation in context
 *
 * @param {string} str - string of the code
 * @param {string} constants - constants
 * @param {string} globalKeys - global keys (variables and libraries)
 * @returns {string}
 */
function lineHandler(str, constants, globalKeys) {
  // delete space
  str = str.replace(/^ +/, "");
  // search let/var/const
  if (str.search(/^(let|const|var) +[a-zA-Z]+\d* *=/) !== -1) {
    const _str = str.replace(/^(let|const|var) +/, "");
    const _match = _str.match(/^[a-zA-Z]+\d* *=/);
    if (_match === null || typeof _match[0] !== "string")
      throw new Error("lineHandler error, please see you regexp.");
    // get variable name
    const _var = _match[0].replace(/ *=$/, "");
    if (
      _var.search(/(let|var|const)/gi) !== -1 ||
      globalKeys.indexOf(_var) !== -1
    )
      throw new TypeError("Please don't use this variable name.");
    if (this[_var])
      throw new TypeError("Variable " + _var + " already declared.");
    // add to constants
    if (str.search(/^const +/) !== -1) constants.push(_var);
    str = "this." + _str;
  } else if (str.search(/^[a-zA-Z]+\d* *=/) !== -1) {
    const _match = str.match(/^[a-zA-Z]+\d* *=/);
    if (_match === null || typeof _match[0] !== "string")
      throw new Error("lineHandler error, please see you regexp.");
    // get variable name
    const _var = _match[0].replace(/ *=$/, "");
    // chek constants
    if (constants.indexOf(_var) !== -1)
      throw new TypeError("Assignment to constant variable.");
    if (this[_var]) str = "this." + str;
  }
  return str;
}

module.exports = { lineHandler };
