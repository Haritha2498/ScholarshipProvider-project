const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "govAgency",
    "mychannel",
    "scholarship",
    "ScholarshipContract",
    "invokeTxn",
    "",
    "allocateFund",
    "scholarship1",
    "1234"
    
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Scholarship Provider Approved the application")
})