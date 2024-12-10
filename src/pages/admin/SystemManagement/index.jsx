import React, { useState } from "react";
import Header from "../../../components/Header";
import { ReactComponent as PrinterIcon } from "../../../assets/svgs/printer.svg"
import AdminService from "../../../API/admin";

const SystemManagementPage = () => {
  // State to manage file types
  const [fileTypes, setFileTypes] = useState([
    "*.pdf",
    "*.doc",
    "*.docx",
    "*.jpeg",
    "*.png",
    "*.txt",
    "*.md",
  ]);

  const [periodicTime, setPeriodicTime] = useState("monthly");
  const [newFileType, setNewFileType] = useState("");
  const [isLoadingFileTypes, setLoadingFileTypes] = useState(false);
  const [isloadingPrinters, setLoadingPrinters] = useState(false);


  // Function to remove a file type
  const handleRemoveFileType = async (fileType) => {
    setLoadingFileTypes(true)
    
    // Hard code
    setFileTypes(fileTypes.filter((item) => item !== fileType));

    // Call API
    AdminService.removeFileType(fileType)
    .then((res) => {
      const newFileTypes = res.data.payload;
      setFileTypes(newFileTypes);
    })
    .catch((error) => {
      alert("Error when adding new file type: " + error.message)
    })
    .finally(() => {
      setLoadingFileTypes(false)
    })
  };

  // Function to add a new file type
  const handleAddFileType = () => {
    setLoadingFileTypes(true)
    
    // Call API
    AdminService.removeFileType(newFileType)
      .then((res) => {
        const newFileTypes = res.data.payload;
        setFileTypes(newFileTypes);
      })
      .catch((error) => {
        alert("Error when adding new file type: " + error.message)
      })
      .finally(() => {
        setNewFileType(""); // Clear the input field after adding
        setFileTypes([...fileTypes, newFileType]); // Add the new file type to the list

        setLoadingFileTypes(false)
      })
  };

  // Group the file types into sets of 3
  const groupedFileTypes = [];
  for (let i = 0; i < fileTypes.length; i += 3) {
    groupedFileTypes.push(fileTypes.slice(i, i + 3));
  }

  // State to manage the A4 paper count
  const [a4Count, setA4Count] = useState(50); // Default value for A4 paper count

  const [machines, setMachines] = useState(
    Array(12).fill(null).map((_, index) => ({
      id: index + 1,
      name: `Printer ${index + 1}`,  // Dynamic printer name
      status: "Active", // Initial status is "Active"
      color: "#07C656", // Color when "Active"
      buttonText: "Stop", // Initial button text is "Stop"
    }))
  );

  // Function to toggle the machine status when the button is clicked
  const toggleMachineStatus = async (id) => {
    setLoadingPrinters(true)

    AdminService.togglePrinterStatus(id)
      .then((res) => {
        setMachines(res.data.payload)    
      })
      .catch((error) => {
        alert("Error when disabled / enabled printer: " + error.message)
      })
      .finally(() => {
        // Hard code
        setMachines((prevMachines) =>
          prevMachines.map((machine) =>
            machine.id === id
              ? {
                  ...machine,
                  status: machine.status === "Active" ? "Stop" : "Active",
                  color: machine.status === "Active" ? "#FF0000" : "#07C656", // Change color
                  buttonText: machine.status === "Active" ? "Activate" : "Stop", // Change button text
                }
              : machine
          )
        );

        setLoadingPrinters(false)
      })
  };

  return (
    <div className="flex flex-col space-y-5 bg-gray-100 p-6 w-full">
      <Header
        pageName="System Management Page"
        description="Configure, manage and track the printing system."
      />
      
      {/* Flex container for the sections */}
      <div className="flex space-x-8">
        {/* Section 1: Print Setup */}
        {isLoadingFileTypes ? 
          <div className="h-full w-[58%] bg-white rounded-lg drop-shadow flex justify-center items-center">
            <p className="font-bold text-4xl text-blue">Loading...</p>
          </div> 
        :
        <div className="w-[50%] bg-white shadow-lg rounded-lg flex flex-col space-y-4 p-4">
          <p className="text-2xl font-bold text-blue">Print Setup</p>

          {/* File Types Section */}
          <div className="w-full h-full p-2 flex flex-col space-y-3">
            <p className="text-lg font-bold">Printable File Types</p>
            
            {/* File Types List */}
            <div className="overflow-auto max-h-28 flex flex-col space-y-2">
              <div className="grid grid-cols-3 gap-3">
                {fileTypes.map((fileType, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex justify-between items-center">
                      {/* File Type */}
                      <p className="text-[16px] italic">{fileType}</p>
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveFileType(fileType)}
                        className="text-red-500 hover:text-red-700 text-[16px]"
                      >
                        &times;
                      </button>
                    </div>
                    {/* Horizontal Line */}
                    <hr className="border-t-0.5 border-[#D9D9D9] mb-px" />
                  </div>
                ))}
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between items-center">
                    <input
                      type="text"
                      value={newFileType}
                      onChange={(e) => setNewFileType(e.target.value)}
                      className="text-[16px] px-2 focus:outline-none w-full"
                      placeholder="New file type"
                    />
                    <button
                      onClick={handleAddFileType}
                      disabled={newFileType === ""}
                      className="text-green-500 hover:text-green-700 text-[16px]"
                    >
                      +
                    </button>
                  </div>
                  <div className="w-full h-[1px] bg-gray" />
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray" />
            </div>

            {/* Add File Type Input and Button */}
            {/* Underline for "Add File Type" */}

            {/* </div> */}

            {/* A4 Paper Quantity Section */}
            <div className="w-full flex flex-col space-y-1">
              <div className="flex flex-row space-x-4 justify-start items-center">
                <p className="text-lg font-bold">Periodcally A4 Receive:</p>
                <input
                  type="number"
                  value={a4Count}
                  onChange={(e) => setA4Count(e.target.value)}
                  className="text-center border border-gray-300 rounded-md text-base"
                />
              </div>
              <div className="w-full h-[1px] bg-gray"/>
            </div>
          
          {/* Thời gian nhận định kỳ Section */}
            <div className="flex flex-col space-y-1">
              <div className="flex flex-row justify-start items-center space-x-4">
                <p className="text-lg font-bold">Reset page mock:</p>
                <select
                  value={periodicTime}
                  onChange={(e) => setPeriodicTime(e.target.value)}
                  className="text-center text-[#808080] border border-gray-300 rounded-md text-base py-1 px-2"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="h-[1px] w-full bg-gray"/>

            </div>
          </div>
        </div>
        }

        {/* Section 2: System Status */}
        <div className="w-[50%] h-full bg-white shadow-lg rounded-lg p-4 flex flex-col space-y-2">
          <p className="text-2xl font-bold text-blue mb-2">System Status</p>
          
          {/* Maintenance Title */}
          <h2 className="text-2xl font-bold mb-4 text-center">Maintenance</h2>
          
          {/* "Code" and value in the same row */}
          <div className="flex flex-row space-x-4 justify-start items-center mb-1">
            <p className="text-xl font-bold">Code:</p>
            <p className="text-base">BTDK-T10-2024</p>
          </div>
          <hr className="border-t-0.5 border-[#D9D9D9] mb-px" />

          {/* "Reason" and value in the same row */}
          <div className="flex justify-start flex-row space-x-4 items-center mb-1">
            <p className="text-xl font-bold">Reason:</p>
            <p className="text-base">Scheduled system maintenance</p>
          </div>
          <hr className="border-t-0.5 border-[#D9D9D9] mb-px" />

          {/* "Created At" and value in the same row */}
          <div className="flex flex-row space-x-4 justify-start items-center mb-1">
            <p className="text-xl font-bold">Created At:</p>
            <p className="text-base">21:00 13/10/2024</p>
          </div>
          <hr className="border-t-0.5 border-[#D9D9D9] mb-px" />

          {/* "Completion Time" and value in the same row */}
          <div className="flex flex-row space-x-4 justify-start items-center mb-1">
            <p className="text-xl font-bold">Completion Time:</p>
            <p className="text-base">21:00 13/10/2024</p>
          </div>
          <hr className="border-t-0.5 border-[#D9D9D9] mb-px" />

          {/* "Complete Early" Button */}
          <div className="flex justify-end items-center mt-[30px]">
            <div className="flex justify-center items-center bg-blue rounded-md px-8 py-2">
              <p className="text-base text-white">Complete Early</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Printer Configuration */}
      {isloadingPrinters ? 
        <div className="w-full h-96 bg-white rounded-lg drop-shadow flex justify-center items-center">
          <p className="font-bold text-4xl text-blue">Loading...</p>
        </div> 
      :
        <div className="w-full flex flex-col space-y-4 bg-white drop-shadow rounded-lg mt-[30px] p-4">
          <p className="text-2xl font-bold text-blue">Printer Setup</p>

          {/* Printer Layers, max 4 printers per row */}
          <div className="w-full grid grid-cols-4 gap-x-6 gap-y-6">
            {machines.map((machine) => (
              <div
                key={machine.id}
                className="flex items-center flex-row justify-between w-full bg-gray-50 border border-gray-300 rounded-lg p-2"
              >
                {/* Icon */}
                <PrinterIcon className="w-20 h-20" fill="#0388B4" />

                {/* Printer Info */}
                <div className="flex flex-col justify-between h-full p-2">
                  <div className="flex">
                    <p className="text-sm font-bold pr-2 w-16">Printer: </p>
                    <p className="text-sm text-[#808080]">{machine.name}</p> {   }
                  </div>
                  <hr className="border-t-[0.5px] border-[#D9D9D9] mb-2" />

                  <div className="flex">
                    <p className="text-sm font-bold pr-2 w-16">Status: </p>
                    <p className="text-sm" style={{ color: machine.color }}>
                      {machine.status}
                    </p>
                  </div>
                  <hr className="border-t-[0.5px] border-[#D9D9D9] mb-2" />

                  <div className="flex">
                    <p className="text-sm font-bold pr-2 w-16">Notes: </p>
                    <p className="text-sm text-[#808080]">None</p>
                  </div>
                  <hr className="border-t-[0.5px] border-[#D9D9D9] mb-2" />

                  <div className="flex pl-[77px]">
                    <button
                      onClick={() => toggleMachineStatus(machine.id)}
                      className={`w-[92px] h-[32px] text-[14px] font-bold text-white rounded-lg ${machine.color === "#07C656" ? "bg-blue" : "bg-[#808080]"}`}
                    >
                      {machine.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default SystemManagementPage;
