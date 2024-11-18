import React, { useState, useEffect } from "react";

// Sample data to simulate a list of student applications
// const sampleApplications = [
//   { id: 1, studentId: "S123", name: "John Doe", scholarshipId: "SCH001" },
//   { id: 2, studentId: "S124", name: "Jane Smith", scholarshipId: "SCH002" },
//   // Add more applications as needed
// ];

function UniversityDashboard() {
  const [statusMessage, setStatusMessage] = useState("");
  const [applicationdetails, setApplicationdetails] = useState([]);
  const [stdId, setStdId] = useState();
  const [applicationdetailsuni, setApplicationdetailsuni] = useState([]);
  const [stdIduni, setStdIduni] = useState();
  const [showPopup, setShowPopup] = useState(false);

const [showDeletePopup, setShowDeletePopup] = useState(false);
const [deleteApplicationId, setDeleteApplicationId] = useState("");




  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [historyData, setHistoryData] = useState(null);

  const [formDetails, setFormDetails] = useState({
    universityId: "",
    applicationId: "",
  });
  const [currentApplication, setCurrentApplication] = useState({});

  // Function to initialize student details
  const initializeStudentDetails = async () => {
    try {
      const response = await fetch("/api/setstudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ init: true }),
      });

      if (response.ok) {
        setStatusMessage("Student details initialized successfully.");
      } else {
        setStatusMessage("Failed to initialize student details.");
      }
    } catch (error) {
      setStatusMessage("An error occurred. Please try again.");
    }
  };

  // Function to handle viewing student details
  const viewStudentDetails = async () => {
    try {
      const response = await fetch("/api/viewapplications");
      const data = await response.json();
      setStdId(data.data.jsonObject[0]);
      setApplicationdetails(data.data.jsonObject.map((obj) => obj.Record));

      if (response.ok) {
        setStatusMessage("Student details fetched successfully.");
      } else {
        setStatusMessage("Failed to fetch student details.");
      }
    } catch (error) {
      setStatusMessage("An error occurred. Please try again.");
    }
  };

  const handleApprove = (application) => {
    setCurrentApplication(application);
    setShowPopup(true);
  };

  const handleSubmit = async () => {
    const { universityId, applicationId } = formDetails;
    const { scholarshipId, studentId } = currentApplication;

    try {
      const response = await fetch("/api/approveApplication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          universityId,
          applicationId,
          scholarshipId,
          studentId,
        }),
      });

      if (response.ok) {
        setStatusMessage("Application verified and approved.");
        setShowPopup(false);
      } else {
        setStatusMessage("Failed to approve the application.");
      }
    } catch (error) {
      setStatusMessage("An error occurred. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log("Updated application details:", applicationdetails);
    console.log("Updated student ID:", stdId);
  }, [applicationdetails, stdId]);

 const viewapplicationdetail = async () => {
   try {
    console.log("ghj")
     const response = await fetch("/api/viewuniapplications");
     const data = await response.json();
     setStdIduni(data.data.jsonObject[0].Key);
     console.log(data.data.jsonObject);
     setApplicationdetailsuni(data.data.jsonObject.map((obj) => obj.Record));

     if (response.ok) {
       setStatusMessage("Student details fetched successfully.");
     } else {
       setStatusMessage("Failed to fetch student details.");
     }
   } catch (error) {
     setStatusMessage("An error occurred. Please try again.");
   }
 };

 const approveScholarshipAmount = async (applicationId, studentId) => {
   try {
     const response = await fetch("/api/updateStudentApplication", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ applicationId, studentId }),
     });

     if (response.ok) {
       setStatusMessage("Scholarship amount approved for student.");
       // Optional: refresh application details or update UI
     } else {
       setStatusMessage("Failed to approve scholarship amount.");
     }
   } catch (error) {
     setStatusMessage("An error occurred. Please try again.");
   }
 };


const handledeletion=async (studentId)=>{
  try {
    const response = await fetch("/api/deleteStudentApplication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId }),
    });

    if (response.ok) {
      setStatusMessage("Application deleted.");
      // Optional: refresh application details or update UI
    } else {
      setStatusMessage("Failed to delete application.");
    }
  } catch (error) {
    setStatusMessage("An error occurred. Please try again.");
  }
}


 const deleteUniversityApplication = async () => {
   try {
     const response = await fetch("/api/deleteUniversityApplication", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ applicationId: deleteApplicationId }),
     });

     if (response.ok) {
       setStatusMessage("University application deleted successfully.");
       setShowDeletePopup(false);
     } else {
       setStatusMessage("Failed to delete university application.");
     }
   } catch (error) {
     setStatusMessage("An error occurred. Please try again.");
   }
 };




 const getHistory = async (appId) => {
   try {
    console.log(appId)
    const applicationId=appId
     const response = await fetch("/api/gethistory", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ applicationId }),
     });;
     const data = await response.json();
     setHistoryData(data.data.jsonObject);
     setIsModalOpen(false); // Close modal after fetching data
   } catch (error) {
     console.error("Error fetching history:", error);
   }
 };

 // Function to handle "View Application History" click
 const handleOpenModal = () => {
   setIsModalOpen(true);
   setApplicationId(""); // Reset ID field
   setHistoryData(null); // Clear previous data
 };











  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">
        University Dashboard
      </h1>

      {statusMessage && (
        <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded-lg">
          {statusMessage}
        </div>
      )}

      <div className="space-y-4 mb-10">
        <button
          onClick={initializeStudentDetails}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200 mr-4"
        >
          Initialize Student Details
        </button>
        <button
          onClick={viewStudentDetails}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition duration-200"
        >
          View Application Details
        </button>
      </div>

      {applicationdetails.length > 0 && (
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl mt-10 mb-4 text-center">
            List of Student Applications
          </h1>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-100 text-gray-600 font-semibold">
                  Student ID
                </th>
                <th className="py-2 px-4 bg-gray-100 text-gray-600 font-semibold">
                  Name
                </th>
                <th className="py-2 px-4 bg-gray-100 text-gray-600 font-semibold">
                  Scholarship ID
                </th>
                <th className="py-2 px-4 bg-gray-100 text-gray-600 font-semibold">
                  Course
                </th>
                <th className="py-2 px-4 bg-gray-100 text-gray-600 font-semibold">
                  GPA
                </th>
                <th className="py-2 px-4 bg-gray-100 text-gray-600 font-semibold">
                  Status
                </th>
                <th className="py-2 px-4 bg-gray-100 text-gray-600 font-semibold">
                  Actions
                </th>
                <th className="py-2 px-4 bg-gray-100 text-red-600 font-semibold">
                  Rejection
                </th>
              </tr>
            </thead>
            <tbody>
              {applicationdetails.map((application, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4 text-center">
                    {application.studentId}
                  </td>
                  <td className="py-2 px-4 text-center">{application.name}</td>
                  <td className="py-2 px-4 text-center">
                    {application.scholarshipId}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {application.course}
                  </td>
                  <td className="py-2 px-4 text-center">{application.gpa}</td>
                  <td className="py-2 px-4 text-center">
                    {application.status}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleApprove(application)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Verify and Approve
                    </button>
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handledeletion(application.studentId)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete Application
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="space-y-4 mb-10 mt-10">
        <button
          onClick={viewapplicationdetail}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200"
        >
          Review Applied Status
        </button>
        {/* <button
          onClick={viewStudentDetails}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition duration-200"
        >
          View Application Details
        </button> */}
      </div>

      {applicationdetailsuni.length > 0 && (
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl mt-10 mb-4 text-center">
            List of University Applications
          </h1>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-100 text-gray-600 font-semibold">
                  Application ID
                </th>
                <th className="py-2 px-4 bg-gray-100 text-gray-600 font-semibold">
                  Student ID
                </th>

                <th className="py-2 px-4 bg-gray-100 text-gray-600 font-semibold">
                  Scholarship ID
                </th>
                <th className="py-2 px-4 bg-gray-100 text-gray-600 font-semibold">
                  Course
                </th>
                <th className="py-2 px-4 bg-gray-100 text-gray-600 font-semibold">
                  GPA
                </th>
                <th className="py-2 px-4 bg-gray-100 text-gray-600 font-semibold">
                  Status
                </th>
                {/* <th className="py-2 px-4 bg-gray-100 text-gray-600 font-semibold">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody>
              {applicationdetailsuni.map((application, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4 text-center">
                    {application.applicationId}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {application.studentId}
                  </td>
                  {/* <td className="py-2 px-4 text-center">{application.name}</td> */}
                  <td className="py-2 px-4 text-center">
                    {application.scholarshipId}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {application.course}
                  </td>
                  <td className="py-2 px-4 text-center">{application.gpa}</td>
                  <td className="py-2 px-4 text-center">
                    {application.status}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {(application.status === " amount 10000 granded" ||
                      application.status === " amount 15000 granded" ||
                      application.status === " amount 20000 granded") && (
                      <button
                        onClick={() =>
                          approveScholarshipAmount(
                            application.applicationId,
                            application.studentId
                          )
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Approve Scholarship Amount
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="space-y-4 mb-10 mt-10">
        <button
          onClick={() => setShowDeletePopup(true)}
          className="px-6 py-3 bg-red-400 text-white rounded-lg font-medium hover:bg-red-500 transition duration-200"
        >
          Delete University Application
        </button>
      </div>
      <div className="space-y-4 mb-10 mt-10">
        {/* <button
          onClick={() => setShowDeletePopup(true)}
          className="px-6 py-3 bg-red-400 text-white rounded-lg font-medium hover:bg-red-500 transition duration-200"
        >
          Delete University Application
        </button> */}
        <button
          onClick={handleOpenModal}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition duration-200"
        >
          View Application History
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-80">
            <h2 className="text-xl font-semibold mb-4">
              Enter Approval Details
            </h2>
            <label className="block mb-2">University ID:</label>
            <input
              type="text"
              name="universityId"
              value={formDetails.universityId}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <label className="block mb-2">Application ID:</label>
            <input
              type="text"
              name="applicationId"
              value={formDetails.applicationId}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-80">
            <h2 className="text-xl font-semibold mb-4">
              Enter Application ID to Delete
            </h2>
            <label className="block mb-2">Application ID:</label>
            <input
              type="text"
              value={deleteApplicationId}
              onChange={(e) => setDeleteApplicationId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeletePopup(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={deleteUniversityApplication}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="text-xl font-semibold mb-4">Enter Application ID</h2>
            <input
              type="text"
              value={applicationId}
              onChange={(e) => setApplicationId(e.target.value)}
              placeholder="Application ID"
              className="border border-gray-300"
            />
            <button
              onClick={() => getHistory(applicationId)}
              className="border border-gray-300"
            >
              Get History
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="border border-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {historyData && (
        // <div>
        //   <h3>Application History</h3>
        //   {/* Render history data here */}
        //   <pre>{JSON.stringify(historyData, null, 2)}</pre>
        // </div>

        <div>
          <h3>Application History</h3>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>TxId</th>
                <th>Timestamp</th>
                <th>Application ID</th>
                <th>Course</th>
                <th>GPA</th>
                <th>Scholarship ID</th>
                <th>Status</th>
                <th>Student ID</th>
                <th>University ID</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((record, index) => (
                <tr key={index}>
                  <td>{record.TxId}</td>
                  <td>
                    {new Date(record.Timestamp.seconds * 1000).toLocaleString()}
                  </td>
                  <td>{record.Record.applicationId}</td>
                  <td>{record.Record.course}</td>
                  <td>{record.Record.gpa}</td>
                  <td>{record.Record.scholarshipId}</td>
                  <td>{record.Record.status}</td>
                  <td>{record.Record.studentId}</td>
                  <td>{record.Record.universityId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UniversityDashboard;
