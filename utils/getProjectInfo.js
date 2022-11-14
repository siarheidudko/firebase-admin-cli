"use strict";
const { readFileSync, existsSync } = require("fs");
const { join } = require("path");

/**
 * ServiceAccount type definition
 * @typedef {Object} ServiceAccount
 * @property {string} type
 * @property {string} project_id
 * @property {string} private_key_id
 * @property {string} private_key
 * @property {string} client_email
 * @property {string} client_id
 * @property {string} auth_uri
 * @property {string} token_uri
 * @property {string} auth_provider_x509_cert_url
 * @property {string} client_x509_cert_url
 */

/**
 * Parse service account file
 * @param {string} str - file data as string
 * @returns {ServiceAccount}
 */
const parseServiceAccount = (str) => {
  let obj, err;
  try {
    obj = JSON.parse(str);
  } catch (e) {
    err = err;
  } finally {
    if (!obj) throw new Error(`Service account file parsing error: ${err}`);
    return obj;
  }
};

/**
 * ProjectSettings type definition
 * @typedef {Object} ProjectSettings
 * @property {string} serviceAccountKeyPath
 * @property {ServiceAccount} serviceAccount
 */

/**
 * Get project settings from GOOGLE_APPLICATION_CREDENTIALS
 *
 * @returns {ProjectSettings}
 */
const getProjectInfo = () => {
  const serviceAccountKeyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (typeof serviceAccountKeyPath !== "string")
    throw new Error(
      "The environment variable $GOOGLE_APPLICATION_CREDENTIALS is set incorrectly (this should be the absolute path to the service account)."
    );
  if (!existsSync(serviceAccountKeyPath))
    throw new Error(
      `The service account file was not found at ${serviceAccountKeyPath}`
    );
  const serviceAccountTxt = readFileSync(serviceAccountKeyPath).toString();
  const serviceAccount = parseServiceAccount(serviceAccountTxt);
  console.info("The following settings are loaded:");
  console.info(`Service Account from file: ${serviceAccountKeyPath}`);
  console.info(`Project id: ${serviceAccount.project_id}`);

  return {
    serviceAccount,
    serviceAccountKeyPath,
  };
};

module.exports = { getProjectInfo };
