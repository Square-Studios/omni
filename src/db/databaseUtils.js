const { readFileSync, writeFileSync } = require("fs");
/**
 * Internal helper to read and parse JSON file
 * @returns {Object} The parsed JSON data (empty object if file doesn't exist)
 */
const readData = () => {
  try {
    const data = readFileSync("db.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw new Error(`Error reading database: ${error.message}`);
  }
};
/**
 * Internal helper to write to JSON file
 * @param {Object} data - Data to write
 */
const writeData = (data) => {
  writeFileSync("database.json", JSON.stringify(data, null, 2), "utf8");
};
/**
 * Resolves a dot-notation key path (same as previous implementation)
 */
const resolveKeyPath = (obj, keyPath, createIfMissing = false) => {
  const keys = keyPath.split(".");
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    if (!current[key] && createIfMissing) {
      current[key] = {};
    }

    if (typeof current[key] !== "object" || current[key] === null) {
      return null;
    }

    current = current[key];
  }
  return {
    parent: current,
    finalKey: keys[keys.length - 1],
  };
};
// CRUD Operations ==============================================
const getKey = (keyPath) => {
  const data = readData();
  const resolved = resolveKeyPath(data, keyPath);
  return resolved?.parent[resolved.finalKey];
};
const addKey = (keyPath, value) => {
  const data = readData();
  const resolved = resolveKeyPath(data, keyPath, true);
  if (!resolved) {
    throw new Error(
      `Cannot create path '${keyPath}' - conflicts with existing non-object values`
    );
  }

  if (resolved.finalKey in resolved.parent) {
    throw new Error(`Key '${keyPath}' already exists`);
  }
  resolved.parent[resolved.finalKey] = value;
  writeData(data);
  return data;
};
const updateKey = (keyPath, newValue) => {
  const data = readData();
  const resolved = resolveKeyPath(data, keyPath);

  if (!resolved || !(resolved.finalKey in resolved.parent)) {
    throw new Error(`Key '${keyPath}' not found`);
  }
  resolved.parent[resolved.finalKey] = newValue;
  writeData(data);
  return data;
};
const removeKey = (keyPath) => {
  const data = readData();
  const resolved = resolveKeyPath(data, keyPath);

  if (!resolved || !(resolved.finalKey in resolved.parent)) {
    return false;
  }
  delete resolved.parent[resolved.finalKey];
  writeData(data);
  return true;
};
module.exports = { getKey, addKey, updateKey, removeKey };
