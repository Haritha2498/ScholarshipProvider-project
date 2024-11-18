const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "user",
    "mychannel",
    "scholarship",
    "ScholarshipContract",
    "invokeTxn",
    "",
    "createStudentApplication",
    "001",
    "ABI",
    "scholership1"
    
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Student Application Created")
})