const { hash } = require("bcryptjs");
const { v4: generateId } = require("uuid");
const { readData, writeData } = require("../utils/fsHelper");

async function add(data) {
  const storedData = await readData();
  const userId = generateId();
  const hashedPwd = await hash(data.password, 10);
  if (!storedData.users) {
    storedData.users = [];
  }
  storedData.users.push({ ...data, password: hashedPwd, id: userId });
  await writeData(storedData);
  return { id: userId, email: data.email };
}

async function get(email) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new Error("Could not find any users.");
  }
  const user = storedData.users.find((userData) => userData.email === email);
  if (!user) {
    throw new Error("Could not find user registered with " + email);
  }

  return user;
}

exports.add = add;
exports.get = get;
