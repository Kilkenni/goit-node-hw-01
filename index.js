const contactAPI = require("./contacts.js");

const argv = require("yargs")
  .help()
  .argv;


function getContacts(_) {
  contactAPI.getContacts().then((contacts) => {
    console.table(contacts);
  })
  .catch((error) => {
    console.error(error);
  });
}

function getContactByID({ id }) {
  if (!id) {
    console.warn("Please provide a contact <id>");
    return false;
  }

  contactAPI.getContactByID(id).then((contact) => {
    if (contact === false) {
      console.log(`Can't find the contact with id <${id}>`);
      return false;
    }
    else if (contact) { //can be undefined as well
      console.table(contact);
    }
  })
  .catch((error) => {
    console.error(error);
  });
}

function addContact({ name, email, phone }) {
  if (!name && !email && !phone) {
    console.warn("You did not provide any info for the contact. A contact needs a <name>, an <email> and a <phone>.")
    return false;
  }

  contactAPI.addContact({name, email, phone}).then((contacts) => {
    if (contacts) {
      console.log("Contact added.")
    }
  })
  .catch((error) => {
    console.error(error);
  });
}

function deleteContact({ id }) {
  if (!id) {
    console.warn("Please provide a contact <id>");
    return false;
  }

  contactAPI.deleteContact(id).then((deletedContact) => {
    if (deletedContact) {
      console.log("Contact deleted successfully:");
      console.table(deletedContact);
    }
    else if (deletedContact === false) {
      console.log(`Can't find the contact with id <${id}> to delete it.`);
    }
  })
    .catch((error) => {
      console.error(error);
    });
}

function updateContact({ id, name, email, phone }) {
  if (!id) {
    console.warn("Please provide a contact <id>");
    return false;
  }

  if (!name && !email && !phone) {
    console.warn("You did not provide any new info to update the contact with.")
    return false;
  }
  const updateSlice = {};
  if (name) {
    updateSlice.name = name;
  }
  if (email) {
    updateSlice.email = email;
  }
  if (phone) {
    updateSlice.phone = phone;
  }

  contactAPI.updateContact(id, updateSlice).then((updatedContact) => {
    if (updatedContact === false) {
      console.log(`Can't find the contact with id <${id}> to update it.`);
    }
    else if (updatedContact) {
      console.log("Contact updated successfully:");
      console.table(updatedContact);
    }
  })
    .catch((error) => {
      console.error(error);
    });
}


function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      getContacts();
      break;
    case "get":
      getContactByID({ id });
      break;

    case "add":
      addContact({name, email, phone})
      break;

    case "remove":
      deleteContact({ id });
      break;
    
    case "update":
      updateContact({ id, name, email, phone });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);