import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { ReactComponent as AvtSvg } from "../../../assets/svgs/Avatar.svg";
import { ReactComponent as PrinterSvg } from "../../../assets/svgs/printer.svg";
import { ReactComponent as BookSvg } from "../../../assets/svgs/book.svg";
import { ReactComponent as CloseSvg } from "../../../assets/svgs/close-circle.svg"

import PrintingHistoryItem from "../../../components/PrintingHistoryItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdminService from "../../../API/admin";
import { hard_code_personal_data, hard_code_printing_history_item } from "../../../hardData";

const AdminPersonalInformationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const studentId = searchParams.get("studentId");
  
  const [isLoading, setIsLoading] = useState(true)
  const [personalInfo, setPersonalInfo] = useState(null)
  const [printingHistory, setPrintingHistory] = useState([])
  const [AvatarImage, setAvatarImage] = useState(AvtSvg)

  const getPersonalInformation = async () => {
    AdminService.getPersonalInformation(studentId)
    .then((res) => {
      const fetchPersonalInfo = res.data.payload;
      setPersonalInfo(fetchPersonalInfo);
    }).catch((error) => {
      console.log(error)
      setPersonalInfo(hard_code_personal_data)
    })
  }

  const getPrintingHistory = async () => {
    AdminService.getPrintingHistory()
    .then((res) => {
      const fetchPrintingHistory = res.data.payload;
      setPrintingHistory(fetchPrintingHistory)
    }).catch((error) => {
      console.log(error)
      setPrintingHistory(hard_code_printing_history_item)
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch data here
        // getPersonalInformation();
        // getPrintingHistory();

        const personalData = hard_code_personal_data;
        const printHistory = hard_code_printing_history_item;

        setPersonalInfo(personalData)
        setPrintingHistory(printHistory)
        setAvatarImage(AvtSvg)

        console.log("personalData: ", personalData)
      } catch (error) {
        console.error("Error when loading page:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData();
  }, [])

  // Loading page
  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p className="font-bold text-4xl text-blue">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-5 bg-gray-100 p-6 w-full h-full">
      <Header pageName="Personal Information" description="This is your main page."/>
      <div className="flex flex-row space-x-6 w-full">
        <div className="flex flex-col space-y-8 w-[42%]">
          <div className="flex flex-col space-y-3 p-4 w-full items-center bg-white rounded-lg drop-shadow">
            <div className="flex flex-row w-full justify-between items-start">
              <div className="flex flex-row space-x-3 w-full justify-start items-center">
                <AvatarImage fill="#679F38" className="w-28 h-28"/>
                <p className="text-2xl font-bold text-blue">{personalInfo.name}</p>
              </div>
              <CloseSvg className="w-8 h-8 cursor-pointer" fill="#0388B4" onClick={() => navigate("/admin/printing_history")}/>
            </div>
            <div className="flex flex-col w-full justify-start space-y-2">
              <p className="text-xl font-bold text-black">Student Id</p>
              <text className="bg-gray rounded-lg text-gray-dark font-normal px-3 py-[10px] w-full justify-start text-base">
                {studentId}
              </text>
            </div>
            
            <div className="flex flex-col w-full justify-start space-y-2">
              <p className="text-xl font-bold text-black">Email</p>
              <text className="bg-gray rounded-lg text-gray-dark font-normal px-3 py-[10px] w-full justify-start text-base">
                {personalInfo.email}
              </text>
            </div>
            
            <div className="flex flex-col w-full justify-start space-y-2">
              <p className="text-xl font-bold text-black">Falculty</p>
              <text className="bg-gray rounded-lg text-gray-dark font-normal px-3 py-[10px] w-full justify-start text-base">
                {personalInfo.faculty}
              </text>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center p-6 w-full bg-white rounded-lg drop-shadow" >
            <PrinterSvg className="w-20 h-20" fill="#0388B4" />
            <div className="flex flex-col space-y-[6px] items-end">
              <p className="text-xl font-bold text-blue">Number of A4 left</p>
              <p className="text-3xl font-bold text-black">{personalInfo.numberOfA4}</p>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center p-6 w-full bg-white rounded-lg drop-shadow" >
            <div className="flex flex-col space-y-[6px] items-start">
              <p className="text-xl font-bold text-blue">Number of printed documents</p>
              <p className="text-3xl font-bold text-black">{personalInfo.numberOfPrintedDocs}</p>
            </div>
            <BookSvg className="w-20 h-20" fill="#0388B4" />
          </div>
        </div>

        <div className="flex flex-col space-y-6 items-start h-[740px] flex-nowrap overflow-y-scroll w-[58%] p-4 bg-white rounded-lg drop-shadow">
          <p className="text-2xl font-bold text-blue">Printing History</p>
          {printingHistory.map((item) => {
            return (
              <PrintingHistoryItem printTime={item.time} docName={item.file_name} page={item.pages.toString()} 
                                  place={item.printer} copies={item.copy.toString()}/>
            )})} 
        </div>
      </div>
    </div>
  );
};

export default AdminPersonalInformationPage;