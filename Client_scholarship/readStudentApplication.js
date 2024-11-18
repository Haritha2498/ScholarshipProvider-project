const { clientApplication } = require('./client')

let userClient = new clientApplication()
userClient.submitTxn(
    "user",
    "mychannel",
    "scholarship",
    "ScholarshipContract",
    "queryTxn",
    "",
    "readStudentApplication",
    "001",
).then(result => {
            // Decode the Uint8Array to a string
            const decodedString = new TextDecoder().decode(result);
    
            // Parse the string as JSON
            const jsonObject = JSON.parse(decodedString);
            
            console.log("student Application: ")
            // Log the JSON object
            console.log(jsonObject);
});