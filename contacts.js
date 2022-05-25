const nodeFileSys = require("fs").promises;
const nodePathModule = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = nodePathModule.resolve("./db/contacts.json");

async function getContacts() {
  try {
    const contactsRaw = await nodeFileSys.readFile(contactsPath, { encoding: "utf-8" });
    const contacts = JSON.parse(contactsRaw);
    return contacts;
  }
  catch (error) {
    console.error(error);
    return undefined;
  };
}

async function getContactByID(id = "0") {
  let contacts = [];
  try {
    contacts = await getContacts();
  }
  catch (error) {
    console.error(error);
    return undefined;
  };

  if (!contacts || !contacts.length || contacts.length === 0) {
    return false; //no contacts, search fails
  }

  const idString = id.toString();
  
  const foundContact = contacts.find((contact) => {
    return contact.id === idString;
  });

  if (foundContact) {
    return foundContact; //gotcha
  }
  else {
    return false;
  } 
}

async function addContact(newContact) {
  let contacts = [];
  try {
    contacts = await getContacts();
  }
  catch (error) {
    console.error(error);
    return undefined;
  };

  if (!contacts) {
    contacts = [];
  }
  const contactWithId = { id: uuidv4(), ...newContact };
  contacts.push(contactWithId);
  nodeFileSys.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");
  return contacts; //return new array of contacts
}

async function deleteContact(id) {
  //id is a String

  let contacts = [];
  try {
    contacts = await getContacts();
  }
  catch (error) {
    console.error(error);
    return undefined;
  };

  if (!contacts || contacts.length === 0) {
    return false; //no contacts, deletion failed
  }

  const idString = id.toString();

  const contactForDeletion = contacts.find((contact) => contact.id === idString);

  if (!contactForDeletion) {
    return false; //no contact found to delete
  }

  const contactsAfterDeletion = contacts.filter((contact) => {
    return contact.id !== idString; //keep all contacts with IDs != delID
  });

  nodeFileSys.writeFile(contactsPath, JSON.stringify(contactsAfterDeletion, null, 2), "utf-8");
  return contactForDeletion; //deletion successful, returning deleted contact
}

async function updateContact(id, updatedContact) {
  let contacts = [];
  try {
    contacts = await getContacts();
  }
  catch (error) {
    console.error(error);
    return undefined;
  };

  if (!contacts || contacts.length === 0) {
    return false; //no contacts, nothing to edit
  }

  const idString = id.toString();

  const updateIndex = contacts.findIndex((contact) => contact.id === idString);

  if (updateIndex < 0) {
    return false; //contact not found
  }

  const prevContact = contacts[updateIndex];

  contacts[updateIndex] = { ...prevContact, ...updatedContact };
  //allow for incomplete "updating" objects, overwriting only some properties. The rest stays the same

  const nextContact = contacts[updateIndex];

  nodeFileSys.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");

  return nextContact;
}


module.exports = {
  getContacts,
  getContactByID,
  addContact,
  deleteContact,
  updateContact,
};