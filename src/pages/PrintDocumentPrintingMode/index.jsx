import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header.jsx";
import DocumentPreview from "./DocumentPreview.jsx";

import { ReactComponent as CloseSvg } from "../../assets/svgs/close-circle.svg"
import { set } from "date-fns";

const filterPrinterList = [
  "B1-01", "B1-02", "B1-03", "B1-04", "B1-05", 
  "A4-01", "A4-02", "A4-03", 
  "B4-01", "B4-02", 
  "C4-01", "C4-02", 
  "C6-01", "B10-01"
];

const areas = [...new Set(filterPrinterList.map(item => item.split("-")[0]))];
areas.push("All")

const PrintPagePrintingMode = () => {
  const [selectedPageRange, setSelectedPageRange] = useState([2, 5]);
  const [selectedPageSize, setSelectedPageSize] = useState("A4");
  const [ChooseSide, setChooseSide] = useState("1");
  const [selectedCopies, setSelectedCopies] = useState(1);
  const [selectedBuilding, setSelectedBuilding] = useState("All");
  const [printerList, setPrinterList] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState("B1-01");
  const [numberOfPage, setNumberOfPage] = useState(null);
  const [neededA4, setNeededA4] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // const { file } = location.state || null;
  const [file, setFile] = useState(null);
  const [isLoadingPDF, setLoadingPDF] = useState(true);

  useEffect(() => {
    if (selectedBuilding === "All") {
      setPrinterList(filterPrinterList)
    } else {
      setPrinterList(filterPrinterList.filter((x) => x.split("-")[0] === selectedBuilding))
    }
  }, [selectedBuilding])

  useEffect(() => {
    if (!file && location.state?.file) {
      setLoadingPDF(true);

      setNumberOfPage(6)
      const { file: newFile, numPages: numPages } = location.state || null;

      setNumberOfPage(numPages);
      setSelectedPageRange([1, numPages]);
      setNeededA4(numPages);
      setFile(newFile);
      setLoadingPDF(false)
    }
  }, [])

  useEffect(() => {
    setNeededA4(selectedCopies * numberOfPage);
  }, [selectedCopies])

  const handlePrint = () => {
    const printedFile = {
      page: numberOfPage,
      place: selectedPrinter,
      copies: selectedCopies,
      uploaded_date: new Date("11-12-2024"),
      is_printed: true,
      waiting_minutes: null,
      printed_time: new Date(),
      fileName: file.name,
      lastModified: new Date(),
    }

    const prevData = JSON.parse(localStorage.getItem("waiting_sessions"));
    localStorage.setItem("waiting_sessions", JSON.stringify([printedFile, ...prevData]));

    navigate("/user/print_document");
  };

  if (isLoadingPDF) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-3xl font-extrabold text-blue">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-5 bg-gray-100 p-6 w-full overflow-y-auto h-screen max-h-screen ">
      {/* Header */}
      <Header pageName="Print Document" description="Uploaded document for printing."/>
      {/* Main Content */}
      <div className="flex h-full space-x-4 rounded-lg justify-start">
        {/* File Preview Section */}
        <div className="flex flex-col w-[58%] bg-white p-4 rounded-md shadow-md overflow-hidden">
          <div className="w-full flex justify-between flex-row items-center">
            <p className="text-blue font-bold text-2xl ">Preview documents</p>
            <CloseSvg className="w-8 h-8 cursor-pointer" fill="#0388B4" onClick={() => navigate("/user/print_document")}/>
          </div>
          <p className="text-black font-semibold text-xl">{file.name}</p>
          <div className="w-full h-screen bg-gray-100 mt-4">
            <div>
              {file != null && <DocumentPreview document={URL.createObjectURL(file)} />}
            </div>
          </div>
        </div>

        {/* File Attributes and Printing Details */}
        <div className="flex flex-col gap-2 h-[100vh] w-2/5 space-y-2">
          {/* File Attributes */}
          <div className="bg-white p-4 rounded-md drop-shadow flex flex-col space-y-2">
            <h2 className="text-blue font-bold text-2xl mb-2">File Attributes</h2>
            <div className="flex flex-col space-y-[6px]">
              <p className="font-bold text-black text-base"><span>File name:</span> <span className="font-normal text-gray-dark text-base">{file.name}</span></p>
              <div className="bg-gray h-[1px] w-full"/>
            </div>
            <div className="flex flex-col space-y-[6px]">
              <p className="font-bold text-black text-base"><span>Size:</span> <span className="font-normal text-gray-dark text-base">{parseFloat((file.size / 1024 ** 2).toFixed(2))} MB</span></p>
              <div className="bg-gray h-[1px] w-full"/>
            </div>
            <div className="flex flex-col space-y-[6px]">
              <p className="font-bold text-black text-base"><span>Number of Pages:</span> <span className="font-normal text-gray-dark text-base">{numberOfPage}</span></p>
              <div className="bg-gray h-[1px] w-full"/>
            </div>
          </div>

          {/* Printing Info */}
          <div className="flex flex-col space-y-2 bg-white p-4 rounded-md shadow-md">
            <h2 className="text-blue font-bold text-2xl mb-2">Properties</h2>
              {/* 1 page or both side */}
              <div className="flex flex-col space-y-[6px]">
                <div className="flex items-center space-x-2">
                  <h2 className="font-bold text-lg min-w-32">Printed side:</h2>
                  <div className="flex items-center mt-2 space-x-4">
                    <button
                      className={`px-5 py-1 rounded-md text-base ${
                        ChooseSide === "1"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => setChooseSide("1")}
                    >
                      1
                    </button>
                    <button
                      className={`px-5 py-1 rounded-md ${
                        ChooseSide === "2"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => setChooseSide("2")}
                    >
                      2
                    </button>
                  </div>
                </div>
                <div className="h-[1px] bg-gray w-full"/>
              </div>
              {/* Print From */}
              <div className="flex flex-col space-y-[6px]">
                <div className="flex items-center space-x-2">
                  <h2 className="font-bold text-lg min-w-32">Starting from:</h2>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={selectedPageRange[0]}
                      onChange={(e) => setSelectedPageRange([e.target.value, selectedPageRange[1]])}
                      className="w-16 p-1 border rounded-md mr-8 text-center"
                    />
                    <h2 className="font-bold text-lg min-w-8">To:</h2>
                    <input
                      type="number"
                      value={selectedPageRange[1]}
                      onChange={(e) => setSelectedPageRange([selectedPageRange[0], e.target.value])}
                      className="w-16 p-1 border rounded-md mr-8 text-center"
                    />
                  </div>
                </div>
                <div className="h-[1px] bg-gray w-full"/>
              </div>
              {/* Page Size */}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <h2 className="font-bold text-lg min-w-32">Type of pages:</h2>
                  <div className="flex items-center mt-2 space-x-4">
                    <button
                      className={`px-5 py-1 rounded-md ${
                        selectedPageSize === "A3"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => setSelectedPageSize("A3")}
                    >
                      A3
                    </button> 
                    
                    <button
                      className={`px-5 py-1 rounded-md ${
                        selectedPageSize === "A4"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => setSelectedPageSize("A4")}
                    >
                      A4
                    </button>
                  </div>
                </div>
                <div className="h-[1px] bg-gray w-full"/>
              </div>

              {/* Copies */}
              <div className="flex flex-col space-y-1">
                <div className="flex flex-row space-x-2">
                  <label className="font-bold text-lg min-w-32">Copies:</label>
                  <input
                    type="number"
                    value={selectedCopies}
                    onChange={(e) => setSelectedCopies(Number(e.target.value))}
                    className="w-16 p-1 border rounded-md text-center"
                    min={1}
                  />
                </div>
                <div className="h-[1px] bg-gray w-full"/>
              </div>
            </div>
            {/* Printer Selection */}
            <div className="bg-white p-4 rounded-md shadow-md flex flex-col space-y-2">
              <h2 className="text-blue font-bold text-2xl ">Specified printer</h2>
              <div className="flex items-center space-x-4">
                <h2 className="font-bold text-lg">Choose area:</h2>
                <select
                  value={selectedBuilding}
                  onChange={(e) => setSelectedBuilding(e.target.value)}
                  className="py-1 px-6 border rounded-md"
                >
                  {areas.map((building) => (
                    <option key={building} value={building}>
                      {building}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-4 gap-x-2 gap-y-2">
                {printerList.map((item) => 
                  <button className={`py-1 shadow-md rounded-lg flex items-center justify-center font-medium ${selectedPrinter === item ? "bg-blue-100 text-blue" : "bg-gray-100 text-gray-dark"}`} onClick={() => setSelectedPrinter(item)}>
                    {item}
                  </button>
                )}
              </div> 
            </div>

            {/* Print Action */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-red-500">Number of needed A4: {neededA4}</p>
              <button
                className="px-6 py-2 bg-blue text-white rounded-md shadow-md"
                onClick={handlePrint}
              >
                Print Document
              </button>
            </div>
          </div>
        </div>
          </div>
  );
};

export default PrintPagePrintingMode;
