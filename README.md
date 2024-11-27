# 🎓 Scholarship Distribution Platform

# 📜 Project Overview

The Scholarship Distribution Platform is a blockchain-based solution built on Hyperledger Fabric to streamline and automate the process of scholarship distribution. 
This platform ensures transparency, security, and efficiency in the way scholarships are managed, 
verified, and disbursed to deserving students. By leveraging blockchain technology, the platform enhances trust among participating organizations and eliminates 
manual errors and fraud.


## 🏢 Organizations Involved ##

The platform involves the following key stakeholders:
### 1. Universities/Educational Institutions ###

 :eight_pointed_black_star:Role: Represents educational institutions responsible for nominating students for scholarships.</br>
   :eight_pointed_black_star: Responsibilities:</br>
        :black_medium_small_square:Submit student applications for scholarship consideration.</br>
        :black_medium_small_square:Verify student eligibility (academic performance, financial need, etc.).</br>
        :black_medium_small_square:Manage communication with students regarding scholarship status.</br>
    :eight_pointed_black_star:Chaincode Actions: Submit applications, update student status, verify academic data.</br>


   
### 2. Scholarship Providers/Funding Agencies ###

:eight_pointed_black_star:Role: Organizations (private, governmental, or non-profit) providing the funds for scholarships.</br>
   :eight_pointed_black_star: Responsibilities:</br>
        :black_medium_small_square:Review and validate student applications submitted by universities.</br>
        :black_medium_small_square:Allocate and disburse funds to approved students using smart contracts.</br>
        :black_medium_small_square:Automate the disbursement process based on predefined conditions (e.g., maintaining a certain GPA).</br>
    :eight_pointed_black_star:Chaincode Actions: Smart contract initiation, fund allocation, automated payments.</br>

### 3. Regulatory Body ###

:eight_pointed_black_star:Role: Ensures compliance, transparency, and fairness in the scholarship distribution process.</br>
   :eight_pointed_black_star: Responsibilities:</br>
        :black_medium_small_square:Monitor the platform to detect fraud or discrepancies.</br>
       :black_medium_small_square: Audit all blockchain transactions for regulatory compliance.</br>
       :black_medium_small_square: Ensure scholarships are awarded to eligible candidates without bias.</br>
    :eight_pointed_black_star:Chaincode Actions: Auditing transactions, maintaining compliance logs, approvals for fund disbursements.</br>

### 4. Students/Applicants ###
:eight_pointed_black_star:Role: Represents students applying for scholarships.</br>
    :eight_pointed_black_star:Responsibilities:</br>
       :black_medium_small_square: Submit applications with academic and financial details.</br>
       :black_medium_small_square: Receive notifications regarding application status (approved, pending, or rejected).</br>
        :black_medium_small_square:Access scholarship funds upon approval.</br>
    :eight_pointed_black_star:Chaincode Actions: Access scholarship status, receive updates, confirm fund receipt.</br>




## 🔄 Workflow of the Scholarship Distribution Platform ##
### 1. Application Submission ###
Students submit their scholarship applications through the platform.
    Universities review applications and verify academic and eligibility details.
    Verified applications are submitted to the blockchain for secure storage.

### 2. Application Review and Approval ###
Scholarship Providers access student applications on the blockchain.
    Smart contracts evaluate eligibility criteria and automatically approve or reject applications based on predefined rules (e.g., GPA, income threshold).

### 3. Scholarship Fund Allocation ###

 Upon approval, Scholarship Providers initiate fund allocation.
    The Regulatory Body reviews transactions for compliance before funds are released.
    Smart contracts execute the payment process, transferring funds to the student's digital wallet.

### 4. Compliance and Auditing ###
The Regulatory Body continuously monitors the blockchain for transparency and compliance.
    Any disputes or discrepancies are flagged, ensuring the integrity of the scholarship distribution.


# 🛠 **Built With**


![Hyperledger Fabric](https://img.icons8.com/fluency/48/000000/hyperledger.png)
![CouchDB](https://img.icons8.com/fluency/48/000000/couchdb.png)

![Docker](https://img.icons8.com/fluency/48/000000/docker.png)
![NodeJS](https://img.icons8.com/color/48/000000/nodejs.png) 
![JavaScript](https://img.icons8.com/color/48/000000/javascript.png) 
![ReactJS](https://img.icons8.com/color/48/000000/react-native.png) 
![Vite](https://img.icons8.com/fluency/48/000000/vite.png) 
![Git](https://img.icons8.com/color/48/000000/git.png)
![Express](https://img.icons8.com/fluency/48/000000/express-js.png)

# ⚙️ Run Locally #


### Prerequisites ###
:black_medium_small_square:Node.js<br/>
:black_medium_small_square:Docker <br/>
:black_medium_small_square:Git <br/>
:black_medium_small_square:Hyperledger Fabric <br/>

Clone the Project 

```bash
https://github.com/Haritha2498/ScholarshipProvider-project.git
```
#### For setup the network####

move onto scholarship_project folder

In terminal

```bash
./startNetwork.sh
```

This will ask for password: provide the password 

Network setup is complete—you're all set with  your chaincode in scholarship folder!

#### For setting up the user interface and backend server####

Change the  directory into the scholarship App folder

For setting the Frodend end:

Open a terminal in ui folder inside scholarship App folder:

install dependecies

```bash
cd ui
npm i
```
For settin up the backend:

Open a terminal in server folder inside scholarship App folder:

install dependencies

```bash
cd server
npm i
node app.js
```


to run the UI in ui terminal

```bash
npm run dev
```
Follow the link 

Follow the below provided demo vedio for futher usage of the application:


 #### For stopping the network ####   

 ```bash
./stopNetwork.sh
```
This will prune all the related docker containers 


## :video_camera: Demo ##
Watch demo vedio:<br>


https://youtu.be/gx-gmohMHxE?si=ujun2PirVRjUIyKr


## :ribbon: Contributing ##
The open source community thrives on the contributions of its members, making it a remarkable space for learning, inspiration, and innovation. Every contribution you offer is deeply valued.

Should you have ideas to enhance this, kindly fork the repository and initiate a pull request. Alternatively, you can open an issue and tag it with enhancement. Remember to star the project! Many thanks!

Fork the Project
Create your Feature Branch (git checkout -b feature/<feature_name>)
Commit your Changes (git commit -m '<feature_name>_added')
Push to the Branch (git push origin feature/<feature_name>)
Open a Pull Request
## :page_with_curl:License ##
This project is licensed under the MIT license - see the [LICENSE.md](https://github.com/Haritha2498/ScholarshipProvider-project/blob/main/LICENSE) file for details.




























