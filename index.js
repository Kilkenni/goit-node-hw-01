const contactAPI = require("./contacts.js");

console.log("CLI says");
/*contactAPI.getContacts().then((contacts) => {
  console.log(`Type of contacts is ${typeof contacts}`)
  //console.log(contacts[0]);
  //console.log(contacts.find( (contact)));
}
)
  .catch((error) => {
    console.error(error);
  }
);*/
  
/*contactAPI.getContactByID("2").then((foundContact) => {
  console.log(`Contact #1 is ${foundContact ? foundContact : "not found"}`);
  console.log(foundContact);
})
.catch((error) => {
    console.error(error);
  }
);*/

// contactAPI.addContact({ name: "Alex Murphy", email: "robo@cop.us", phone: "(911) 010-1010" }).then();

/*contactAPI.deleteContact("2546070e-c32b-491b-b9c8-1385251fb6a0").then((result) => {
  if (result) {
    console.log("Robocop left");
    //console.log(result);
  }
  else {
    console.log("Can't find our Robocop!");
  }
  
});*/

contactAPI.updateContact("e4394e96-e66b-4ef0-b340-457fcc8e68ff", { email: "robocop@detroitpolice.com" });