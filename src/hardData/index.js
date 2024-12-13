import { formatDateTime } from "../utils/functions"

export const defaultPersonalData = {
    name: "Default user",
    studentId: "9999999",
    email: "default@hcmut.edu.vn",
    faculty: "Default",
    numberOfA4: 0,
    numberOfPrintedDocs: 0,
}

export const hard_code_transaction_history = [
    {time: "20:41PM 1/12/2024", transaction_id: "1733060483637", title: "Buying Papers (50 papers)", payment: "10.000"},
    {time: "20:41PM 1/12/2024", transaction_id: "1732804798450", title: "Buying Papers (100 papers)", payment: "20.000"},
    {time: "20:41PM 1/12/2024", transaction_id: "1733060483637", title: "Buying Papers (200 papers)", payment: "40.000"},
    {time: "20:41PM 1/12/2024", transaction_id: "1732804789273", title: "Buying Papers (50 papers)", payment: "10.000"},
    {time: "20:41PM 1/12/2024", transaction_id: "1733060483637", title: "Buying Papers (100 papers)", payment: "10.000"},
]

export const sampleAdminPrintedFiles = [
  { docName: "Capstone_Project_Autumn_2023.pdf", printTime: "20:16PM 13/10/2024", 
    studentName: "Tran Quoc Trung", copies: 10, place: "B1-01", studentId: "2252859" },
  { docName: "HK241-Assignment-2-Network-Design-For-A-Company.pdf", printTime: "20:16PM 13/10/2024", 
      studentName: "Tran Quoc Trung", copies: 10, place: "B1-01", studentId: "2252859" },
  { docName: "01-convexhull.pdf", printTime: "20:16PM 13/10/2024", 
      studentName: "Tran Quoc Hieu", copies: 1, place: "B1-03", studentId: "2252217" },
  { docName: "09_Ch9 Software Testing_ny.pdf", printTime: "20:16PM 13/10/2024", 
      studentName: "Truong Tuan Anh", copies: 10, place: "B1-01", studentId: "2252850" },
  { docName: "08_Ch8 Implementation.pdf", printTime: "20:16PM 13/10/2024", 
      studentName: "Tran Quoc Trung", copies: 10, place: "B1-01", studentId: "2252859" },
  { docName: "07_Ch7 Architectural Design.pdf", printTime: "20:16PM 13/10/2024", 
      studentName: "Tran Quoc Trung", copies: 7, place: "B1-01", studentId: "2252859" },
  { docName: "06_Ch6 System Modeling.pdf", printTime: "20:16PM 13/10/2024", 
      studentName: "Tran Quoc Hieu", copies: 10, place: "B1-01", studentId: "22522859" },
  { docName: "05_Ch5_Introduction_OOP.pdf", printTime: "20:16PM 13/10/2024", 
      studentName: "Tran Quoc Trung", copies: 10, place: "B1-01", studentId: "2252859" },
  { docName: "03_Ch3_4 Requirements Engineering.pdf", printTime: "20:16PM 13/10/2024", 
      studentName: "Tran Quoc Trung", copies: 10, place: "B1-01", studentId: "2252859" },
  { docName: "Capstone_Project_Autumn_2023.pdf", printTime: "20:16PM 13/10/2024", 
      studentName: "Tran Quoc Trung", copies: 10, place: "B1-01", studentId: "2252859" },
    { docName: "Capstone_Project_Autumn_2023.pdf", printTime: "20:16PM 13/10/2024", 
      studentName: "Tran Quoc Trung", copies: 10, place: "B1-01", studentId: "2252859" },
    { docName: "HK241-Assignment-2-Network-Design-For-A-Company.pdf", printTime: "20:16PM 13/10/2024", 
        studentName: "Tran Quoc Trung", copies: 10, place: "B1-01", studentId: "2252859" },
    { docName: "01-convexhull.pdf", printTime: "20:16PM 13/10/2024", 
        studentName: "Tran Quoc Hieu", copies: 1, place: "B1-03", studentId: "2252217" },
    { docName: "09_Ch9 Software Testing_ny.pdf", printTime: "20:16PM 13/10/2024", 
        studentName: "Truong Tuan Anh", copies: 10, place: "B1-01", studentId: "2252850" },
    { docName: "08_Ch8 Implementation.pdf", printTime: "20:16PM 13/10/2024", 
        studentName: "Tran Quoc Trung", copies: 10, place: "B1-01", studentId: "2252859" },
    { docName: "07_Ch7 Architectural Design.pdf", printTime: "20:16PM 13/10/2024", 
        studentName: "Tran Quoc Trung", copies: 7, place: "B1-01", studentId: "2252859" },
    { docName: "06_Ch6 System Modeling.pdf", printTime: "20:16PM 13/10/2024", 
        studentName: "Tran Quoc Hieu", copies: 10, place: "B1-01", studentId: "22522859" },
    { docName: "05_Ch5_Introduction_OOP.pdf", printTime: "20:16PM 13/10/2024", 
        studentName: "Tran Quoc Trung", copies: 10, place: "B1-01", studentId: "2252859" },
    { docName: "03_Ch3_4 Requirements Engineering.pdf", printTime: "20:16PM 13/10/2024", 
        studentName: "Default user", copies: 10, place: "B1-01", studentId: "101" },
    { docName: "Capstone_Project_Autumn_2023.pdf", printTime: "20:16PM 13/10/2024", 
        studentName: "Default user", copies: 10, place: "B1-01", studentId: "101" },    
]

export const samplePrintedFiles = [
    {
        pages: 10,
        printer: "B4-01",
        copy: 5,
        date: formatDateTime(new Date("11-12-2024")),
        fileName: "example_1.txt",
        time: "9:07AM 12/12/2024",
    },
    {
        pages: 5,
        printer: "B4-01",
        copy: 5,
        date: formatDateTime(new Date("11-12-2024")),
        fileName: "example_2.txt",
        time: formatDateTime(new Date()),
    },
    {
        pages: 1,
        printer: "B4-01",
        copy: 5,
        date: formatDateTime(new Date("11-12-2024")),
        fileName: "example_3.txt",
        time: formatDateTime(new Date()),
    },
    {
        pages: 1,
        printer: "B4-01",
        copy: 5,
        date: formatDateTime(new Date("11-12-2024")),
        fileName: "example_4.txt",
        time: formatDateTime(new Date()),
    },
    {
        pages: 1,
        printer: "B4-01",
        copy: 5,
        date: formatDateTime(new Date("11-12-2024")),
        fileName: "example_5.txt",
        time: formatDateTime(new Date()),
    },
]

export const sampleWaitingFiles = [
    {
       fileName: "Đăng ký môn học.pdf",
       pages: 3,
       printer: "C4-02", 
       place: "C4-02", 
       copies: 1,
       status: "COMPLETE", 
       submission_time: "03:32PM 12/12/2024",
       completion_time: "03:43PM 12/12/2024",
       expected_time: "03:43PM 12/12/2024",
    },
    {
       fileName: "Slide_1.pdf",
       pages: 3,
       printer: "C4-02", 
       place: "C4-02", 
       copies: 1,
       status: "WAITING", 
       submission_time: "03:32PM 12/12/2024",
       completion_time: "03:43PM 12/12/2024",
       expected_time: "03:43PM 12/12/2024",
    },
    {
       fileName: "Đăng ký môn học 2024.pdf",
       pages: 3,
       printer: "C4-02", 
       place: "C4-02", 
       copies: 1,
       status: "COMPLETE", 
       submission_time: "03:32PM 12/12/2024",
       completion_time: "03:43PM 12/12/2024",
       expected_time: "03:43PM 12/12/2024",
    },
    {
       fileName: "Đăng ký môn học 2025.pdf",
       pages: 3,
       printer: "C4-02", 
       place: "C4-02", 
       copies: 1,
       status: "COMPLETE", 
       submission_time: "03:32PM 12/12/2024",
       completion_time: "03:43PM 12/12/2024",
       expected_time: "03:43PM 12/12/2024",
    },
    {
       fileName: "New file.pdf",
       pages: 10,
       printer: "A1-02", 
       place: "A1-02", 
       copies: 3,
       status: "COMPLETE", 
       submission_time: "03:32PM 12/12/2024",
       completion_time: formatDateTime(new Date()),
       expected_time: "03:43PM 12/12/2024",
    },
    ]

export const sampleFilterPrinterList = ["B1-01", "B1-02", "B1-03", "B1-04", "B1-05", "A4-01", "A4-02", 
                                        "A4-03", "B4-01", "B4-02", "C4-01", "C4-02", "C6-01", "B10-01", 
                                        "B9-01", "B9-02", "B8-01", "B8-02", "B8-03"];

export const sampleTransactionData = [
    {
        payment: "20000 VND",
        time: "05:37PM 09/12/2024",
        title: "Bought 100 papers",
        transaction_id: "6756d0aa59061272449e8cfb",
    },
    {
        payment: "40000 VND",
        time: "05:37PM 09/12/2024",
        title: "Bought 200 papers",
        transaction_id: "6756c95059061272449e8cfa",
    },
    {
        payment: "10000 VND",
        time: "05:37PM 09/12/2024",
        title: "Bought 50 papers",
        transaction_id: "6756c95059061272449e8cfa",
    },
]

export const sampleAllowedFormats = ["pdf", "ppt", "pptx", "doc", "docx", "image", "png", "jpeg", "jpg", "txt"];

export const sampleMaintenancelans = [
  { title: "Periodic maintenance", startTime: "20:00PM 12/11/2024", 
    duration: "2", description: "Fix error", status: "Complete", createdBy: "Tran Quoc Hieu" },
  { title: "Periodic maintenance", startTime: "20:00PM 12/11/2024", 
    duration: "2", description: "Fix error", status: "Complete", createdBy: "Truong Tuan Anh" },
  { title: "Periodic maintenance", startTime: "20:00PM 12/11/2024", 
    duration: "2", description: "Fix error", status: "Not start", createdBy: "Tran Quoc Hieu" },
]

// export {samplePrintedFiles, sampleWaitingFiles, sampleAllowedFormats}