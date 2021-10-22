const {
  removeContact,
  addContact,
  getContactById,
  listContacts,
} = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await listContacts();
      console.table(list);
      break;

    case "get":
      const contactById = await getContactById(id);

      if (contactById !== void 0 && contactById) {
        console.table(contactById);
      } else {
        console.log(`There is no contact with that id`);
      }

      break;

    case "add":
      const newContactsList = await addContact(name, email, phone);
      console.table(newContactsList);
      break;

    case "remove":
      const newList = await removeContact(id);
      if (newList) {
        console.table(newList);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction({action: 'list'});
// invokeAction({action: 'get', id: 6});
// invokeAction({action: 'add', name: 'Mango', email: "mango12@gmail.com", phone: '322-22-22'});
// invokeAction({ action: "remove", id: 5 });
