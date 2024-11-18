const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "university",
    "mychannel",
    "scholarship",
    "ScholarshipContract",
    "invokeTxn",
    "",
    "updateStudentApplicationStatus",
    "001",
    "1234",
    
).then(result => {
    const decodedString = new TextDecoder().decode(result);
    
            // Parse the string as JSON
            const jsonObject = JSON.parse(decodedString);
            
            console.log("student Application: ")
            // Log the JSON object
            console.log(jsonObject);
})