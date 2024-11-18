const { clientApplication } = require('./client')

let userClient = new clientApplication()
userClient.submitTxn(
    "user",
    "mychannel",
    "scholarship",
    "ScholarshipContract",
    "queryTxn",
    "",
    "readApplication",
    "1234",
).then(result => {
            // Decode the Uint8Array to a string
            const decodedString = new TextDecoder().decode(result);
    
            // Parse the string as JSON
            const jsonObject = JSON.parse(decodedString);
            
            console.log(" Application details submitted by University: ")
            // Log the JSON object
            console.log(jsonObject);
});