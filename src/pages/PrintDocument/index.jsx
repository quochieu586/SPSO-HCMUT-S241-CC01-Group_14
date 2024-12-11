import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import { ReactComponent as UploadSvg } from "../../assets/svgs/upload.svg"
import { formatDateTime } from "../../utils/functions"
import PrintingHistoryItem from "../../components/PrintingHistoryItem"
import WaitingItem from "../../components/WaitingItem";
import ConfirmModal from "./modal";
import { sampleWaitingFiles, samplePrintedFiles, sampleAllowedFormats } from "./hardcode_data";
import { useNavigate } from "react-router-dom";

import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const PrintDocumentPage = () => {
  const fileInputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [waitingFiles, setWaitingFiles] = useState([]);
  const [currentWaitingFile, setCurrentWaitingFile] = useState(null);
  const navigate = useNavigate();
  const [printingHistory, setPrintingHistory] = useState([]);
  
  const handleOpenFile = () => {
    fileInputRef.current.click();
  }

  const isAllowedFormat = (file_name) => {
    console.log(typeof(file_name));
    let file_extension = file_name.split(".").pop().toLowerCase();

    return sampleAllowedFormats.includes(file_extension);
  }

  const handleFileUpload = (e) => {
    return handleFileChosen(e.target.files[0]);
  }

  const handleFileChosen = (file) => {
    if (!file) return;

    if (isAllowedFormat(file.name)) {
      try {
        const reader = new FileReader();

        reader.onload = async (e) => {
          const arrayBuffer = e.target.result;
  
          // Load the PDF document
          const pdfDocument = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          
          const numPages = pdfDocument.numPages;
          console.log(`Number of pages: ${numPages}`);
  
          navigate("printing_mode", { state: { file: file, numPages: numPages } });
        };
  
        reader.readAsArrayBuffer(file);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("File not supported");
    }
  }

  const openModal = (current_waiting_file) => {
    setShowModal(true);
    setCurrentWaitingFile(current_waiting_file);
    setIsDeleteConfirm(!current_waiting_file.is_printed);
  }
  
  const closeModal = () => setShowModal(false);

  const onConfirmFileClick = () => {
    if (currentWaitingFile != null) {
      let file = {
        page: currentWaitingFile.page,
        place: currentWaitingFile.place,
        copies: currentWaitingFile.copies,
        date: new Date("11-12-2024"),
        fileName: currentWaitingFile.fileName,
        lastModified: new Date(),
      };

      let new_waiting_list = waitingFiles.filter((file) => file !== currentWaitingFile);
      let new_printing_history = [file, ...printingHistory];

      localStorage.setItem("waiting_sessions", JSON.stringify(new_waiting_list));
      localStorage.setItem("printing_history", JSON.stringify(new_printing_history));
      setWaitingFiles(new_waiting_list);
      setPrintingHistory(new_printing_history);
    }
    closeModal();
  }

  useEffect(() => {
    const waitingSessions = JSON.parse(localStorage.getItem("waiting_sessions")) || sampleWaitingFiles;
    const printingHistoryData = JSON.parse(localStorage.getItem("printing_history")) || samplePrintedFiles;

    console.log(waitingSessions)
  
    setWaitingFiles(waitingSessions);
    setPrintingHistory(printingHistoryData);
  }, [])


  return (
    <div className="flex flex-col space-y-5 bg-gray-100 p-6 w-full overflow-y-auto max-h-screen h-screen">
      <Header pageName="Print Document" description="Upload and print document here."/>
      <div className="flex h-full space-x-4 rounded-lg justify-start">
        <div className="flex flex-col w-[55%] gap-4">
          <div className="bg-white flex flex-col p-6 gap-6 rounded-lg shadow-md">
            <h2 className="text-blue font-bold text-xl">Upload Document</h2>
            <div 
              className="flex flex-col bg-[#D9D9D9] p-4 rounded-lg h-full w-full items-center justify-center cursor-pointer border-2 border-dashed border-[#808080]"
              onClick={handleOpenFile}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileUpload}
              />
              <UploadSvg fill="#808080" className="w-24 h-24"/>
              <h2 className="text-[#808080] font-bold text-xl text-center">Upload document or choose from printing history</h2>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h2 className="text-blue font-bold text-xl">Printing history</h2>
            <div className="flex flex-col gap-2 max-h-[40vh] h-[40vh] overflow-y-scroll">
              {printingHistory.map((print_log) => (
                <button onClick={() => handleFileChosen(print_log.file)}>
                  <PrintingHistoryItem 
                    printTime={formatDateTime(print_log.date)}
                    docName={print_log.fileName}
                    page={print_log.page} place={print_log.place} copies={print_log.copies}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm w-[45%]">
          <h2 className="text-blue font-bold text-xl">Waiting Session</h2>
          <p className="font-normal text-gray-dark text-sm">List of printing documents</p>
          <div className="flex flex-col gap-2 max-h-80vh h-[80vh] overflow-y-scroll">
              {waitingFiles.map((waiting_file) => (
              <div>
                <WaitingItem
                registerTime={formatDateTime(waiting_file.uploaded_date)}
                docName={waiting_file.fileName}
                page={waiting_file.page}
                place={waiting_file.place}
                copies={waiting_file.copies}
                isPrinted={waiting_file.is_printed}
                waitingTime={waiting_file.waiting_minutes}
                printedTime={formatDateTime(waiting_file.printed_time)}
                onButtonClick={() => openModal(waiting_file)}
                onConfirmClick={() => onConfirmFileClick(waiting_file)}
                />
              </div>
              ))}
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <ConfirmModal 
          closeModal={closeModal}
          isDelete={isDeleteConfirm}
          confimMessage={isDeleteConfirm ? 
            "Are you sure you want to delete this item?"
            : "Confirm receiving the printed document?"
          }
          onConfirmClick={onConfirmFileClick}
        />
      )}
    </div>
  );
};

export default PrintDocumentPage;