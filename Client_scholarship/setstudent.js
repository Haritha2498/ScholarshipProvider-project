const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "university",
    "mychannel",
    "scholarship",
    "ScholarshipContract",
    "invokeTxn",
    "",
    "setstudent",
    
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("student details created")
})