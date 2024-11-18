const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "university",
    "mychannel",
    "scholarship",
    "ScholarshipContract",
    "invokeTxn",
    "",
    "createUniversityApplication",
    "1234",
    "001",
    "UNI123",
    "scholarship1"
    
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Student Application Created")
})