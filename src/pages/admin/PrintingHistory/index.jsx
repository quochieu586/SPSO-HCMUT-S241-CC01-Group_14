import React, { useCallback, useEffect, useState } from "react";
import Header from "../../../components/Header";

import { ReactComponent as LookupSvg } from "../../../assets/svgs/lookup.svg";
import { ReactComponent as PersonalSvg } from "../../../assets/svgs/personal_icon.svg";
import { ReactComponent as PrinterSvg } from "../../../assets/svgs/printer.svg";
import { ReactComponent as BookSvg } from "../../../assets/svgs/book.svg";
import { ReactComponent as CopySvg } from "../../../assets/svgs/copy.svg";

import AdminPrintingHistoryItem from "../../../components/AdminPrintingHistoryItem";
import AdminService from "../../../API/admin";
import { hard_code_admin_printing_history } from "../../../hardData";

const filterModeList = ["By area", "By printer", "All"];
const filterAreaList = ["B1", "A4", "B4", "C4", "C6", "B10"];
const filterPrinterList = ["B1-01", "B1-02", "B1-03", "B1-04", "B1-05", 
                            "A4-01", "A4-02", "A4-03", 
                            "B4-01", "B4-02", 
                            "C4-01", "C4-02", 
                            "C6-01", "B10-01"];
const filterTimeList = ["All", "Since 1 day", "Since 1 week", "Since 1 month", "Since 3 month", "Since 1 year"]

const PrintingHistoryPage = () => {
  // Filter option
  const [filterMode, setFilterMode] = useState("By area");
  const [filterOptionList, setFilterOptionList] = useState(filterAreaList);
  const [filterArea, setFilterArea] = useState("B1");
  const [filterPrinter, setFilterPrinter] = useState("B1-01");
  const [filterTime, setFilterTime] = useState("All");
  const [filterStudentId, setFilterStudentId] = useState("");

  // Printing history
  const [printedDocs, setPrintedDocs] = useState([])

  // Loading
  const [loadingPrintedDocs, setLoadingPrintedDocs] = useState(false)

  const handleOnFilterMode = (event) => {
    setFilterMode(event.target.value);
    if (event.target.value === "By area") {
      setFilterOptionList(filterAreaList);
    } else if (event.target.value === "By printer") {
      setFilterOptionList(filterPrinterList);
    } else {
      setFilterOptionList([]);
    }
  }
  
  const handleOnFilterArea = (event) => {
    setFilterArea(event.target.value);
  }

  const handleOnFilterPrinter = (event) => {
    setFilterPrinter(event.target.value);
  }
  
  const handleOnFilterTime = (event) => {
    setFilterTime(event.target.value);
  }

  const handleStudentIdFilter = (event) => {
    setFilterStudentId(event.target.value);
  }

  // Get printed Docs
  const getPrintedDocs = useCallback(async () => {
    setLoadingPrintedDocs(true)

    // const fetchData = {
    //   printer: filterMode === "By printer" ? filterArea : null,
    //   area: filterMode === "By area" ? filterMode : null,
    //   studentId: filterStudentId
    // }
    // AdminService.getPrintingHistory(fetchData)
    // .then((res) => {
    //   const data = res.data.payload
    //   setPrintedDocs(data.printHistory)
    //   // Continue
    // })
    setPrintedDocs(hard_code_admin_printing_history)

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(2000)

    setLoadingPrintedDocs(false)
  }, [])

  useEffect(() => {
    getPrintedDocs();
  }, [filterMode, filterArea, filterPrinter, getPrintedDocs])

  return (
    <div className="flex flex-col space-y-5 bg-gray-100 p-6 w-full">
      <Header pageName="Printing History Page" description="Manage the printing history."/>
      
      <div className="flex flex-row space-x-6 w-full">
        <div className="flex flex-col space-y-6 w-[42%]">
          <div className="flex flex-col space-y-[10px] p-4 w-full items-start bg-white rounded-lg drop-shadow" >
            <p className="text-2xl font-bold text-blue">Display filter</p>
            <div className="flex flex-row items-center w-full space-x-2 border-b-[1px] border-gray pb-2">
              <text className="w-[30%] flex items-start text-base font-bold text-black">
                Printer filter:
              </text>
              <div className="w-[70%] flex items-start text-sm font-normal text-gray-dark space-x-2">
                <div className="w-[50%] flex flex-row items-center justify-between py-2 px-3 drop-shadow rounded-lg bg-white">
                  <select value={filterMode} onChange={handleOnFilterMode} className="w-full focus:outline-none">
                    {filterModeList.map((item, index) => (
                      <option className="w-full py-2 px-3" value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                {
                  filterMode !== "All" &&
                  <div className="w-[50%] flex flex-row items-center justify-between py-2 px-3 drop-shadow rounded-lg bg-white">
                      <select 
                        value={filterMode === "By area" ? filterArea : filterPrinter} 
                        onChange={filterMode === "By area" ? handleOnFilterArea : handleOnFilterPrinter} 
                        className="w-full focus:outline-none"
                      >
                        {filterOptionList.map((item, index) => (
                          <option className="w-full py-2 px-3" value={item}>{item}</option>
                        ))}
                    </select>
                  </div>
                }
              </div>
            </div>

            <div className="flex flex-row items-center w-full space-x-2 border-b-[1px] border-gray pb-2">
              <text className="w-[30%] flex items-start text-base font-bold text-black">
                Filter time:
              </text>
              <div className="w-[70%] flex items-start text-sm font-normal text-gray-dark space-x-2">
                <div className="w-[50%] flex flex-row items-center justify-between py-2 px-3 drop-shadow rounded-lg bg-white">
                      <select value={filterTime} onChange={handleOnFilterTime} className="w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      {filterTimeList.map((item, index) => (
                        <option className="w-full py-2 px-3" value={item}>{item}</option>
                      ))}
                    </select>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center w-full space-x-2 border-b-[1px] border-gray pb-2">
              <text className="w-[30%] flex items-start text-base font-bold text-black">
                Filter student Id:
              </text>
              <div className="w-[70%] flex flex-row items-center justify-between py-2 px-3 bg-white rounded-lg drop-shadow">
                <input
                  onChange={handleStudentIdFilter}
                  value={filterStudentId}
                  placeholder="Enter Student Id..."
                  className="text-sm font-normal text-gray-dark focus:outline-none"
                />
                <LookupSvg className="w-5 h-5 cursor-pointer" fill="#808080" onClick={getPrintedDocs}/>
              </div>
            </div>

          </div>

          <div className="flex flex-col space-y-5 p-4 w-full items-start bg-white drop-shadow rounded-lg">
            <p className="text-2xl font-bold text-blue">Usage statistic</p>
            
            <div className="flex flex-row justify-between items-center p-6 w-full bg-white rounded-lg drop-shadow" >
              <div className="flex flex-col space-y-1 items-start">
                <p className="text-lg font-semibold text-blue">Number of users</p>
                <p className="text-xl font-bold text-black">2357</p>
              </div>
              <PersonalSvg className="w-[60px] h-[60px]" fill="#0388B4" />
            </div>
            
            <div className="flex flex-row justify-between items-center p-6 w-full bg-white rounded-lg drop-shadow" >
              <BookSvg className="w-[60px] h-[60px]" fill="#0388B4" />
              <div className="flex flex-col space-y-1 items-end">
                <p className="text-lg font-semibold text-blue">Number of upload documents</p>
                <p className="text-xl font-bold text-black">1369</p>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center p-6 w-full bg-white rounded-lg drop-shadow" >
              <div className="flex flex-col space-y-1 items-start">
                <p className="text-lg font-semibold text-blue">Number of printers</p>
                <p className="text-xl font-bold text-black">2357</p>
              </div>
              <PrinterSvg className="w-[60px] h-[60px]" fill="#0388B4" />
            </div>
            
            <div className="flex flex-row justify-between items-center p-6 w-full bg-white rounded-lg drop-shadow" >
              <CopySvg className="w-[60px] h-[60px]" fill="#0388B4" />
              <div className="flex flex-col space-y-1 items-end">
                <p className="text-lg font-semibold text-blue">Number of consumed pages</p>
                <p className="text-xl font-bold text-black">2357</p>
              </div>
            </div>
          </div>
        
        </div>

        {loadingPrintedDocs ? 
          <div className="h-[840px] w-[58%] bg-white rounded-lg drop-shadow flex justify-center items-center">
            <p className="font-bold text-4xl text-blue">Loading...</p>
          </div> 
          :
          <div className="flex flex-col space-y-3 items-start h-[840px] flex-nowrap overflow-y-scroll w-[58%] p-3 bg-white rounded-lg drop-shadow">
            <p className="text-2xl font-bold text-blue">Printing History</p>
            {printedDocs.map((item, index) => (
              <AdminPrintingHistoryItem {...item} />
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default PrintingHistoryPage;