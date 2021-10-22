const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

const readFile = async () => {
  try {
    const getheredContacts = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(getheredContacts);
  } catch (err) {
    console.error(`There is no such file directory!`);
    console.error(err.message);
  }
};

const writeToFile = async (data) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Wrong path to file!`);
    console.error(err.message);
  }
};

const listContacts = async () => {
  const data = await readFile();

  return data;
};

const getContactById = async (contactId) => {
  const contacts = await readFile();
  const neededContact = contacts.find((el) => Number(el.id) === contactId);

  if (neededContact) {
    return neededContact;
  }
  return null;
};

const removeContact = async (contactId) => {
  const contacts = await readFile();
  const contactToDelete = contacts.find((el) => el.id === contactId);

  if (contactToDelete) {
    const filteredContacts = contacts.reduce((acc, el) => {
      Number(el.id) !== contactId ? acc.push(el) : acc;
      return acc;
    }, []);
    await writeToFile(filteredContacts);
    return filteredContacts;
  }

  return console.log(`there is no contact with such id`);
};

const addContact = async (name, email, phone) => {
  const contacts = await readFile();
  const id = contacts.length;
  const newContact = { id: id + 1, name, email, phone };

  contacts.push(newContact);
  
  await writeToFile(contacts);
  return contacts;
};

module.exports = {
  removeContact,
  addContact,
  getContactById,
  listContacts,
};
