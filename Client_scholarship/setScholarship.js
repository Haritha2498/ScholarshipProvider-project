const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "scholarshipProvider",
    "mychannel",
    "scholarship",
    "ScholarshipContract",
    "invokeTxn",
    "",
    "setScholarship",
    
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("scholarship details created")
})