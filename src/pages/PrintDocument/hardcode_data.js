const samplePrintedFiles = [
    {
        page: 1,
        place: "B4-01",
        copies: 5,
        date: new Date("11-12-2024"),
        fileName: "example_1.txt",
        lastModified: new Date(),
    },
    {
        page: 1,
        place: "B4-01",
        copies: 5,
        date: new Date("11-12-2024"),
        fileName: "example_2.txt",
        lastModified: new Date(),
    },
    {
        page: 1,
        place: "B4-01",
        copies: 5,
        date: new Date("11-12-2024"),
        fileName: "example_3.txt",
        lastModified: new Date(),
    },
    {
        page: 1,
        place: "B4-01",
        copies: 5,
        date: new Date("11-12-2024"),
        fileName: "example_4.txt",
        lastModified: new Date(),
    },
    {
        page: 1,
        place: "B4-01",
        copies: 5,
        date: new Date("11-12-2024"),
        fileName: "example_5.txt",
        lastModified: new Date(),
    },
    ]

const sampleWaitingFiles = [
    {
        page: 5,
        place: "B4-01",
        copies: 1,
        uploaded_date: new Date("11-12-2024"),
        is_printed: true,
        waiting_minutes: null,
        printed_time: new Date(),
        fileName: "Capstone_Project_Autumn_2023.pdf",
        lastModified: new Date(),
    },
    {
        page: 5,
        place: "B4-01",
        copies: 1,
        uploaded_date: new Date("11-12-2024"),
        is_printed: true,
        waiting_minutes: null,
        printed_time: new Date(),
        fileName: "Capstone_Project_Autumn_2023.pdf",
        lastModified: new Date(),
    },
    {
        page: 5,
        place: "B4-01",
        copies: 1,
        uploaded_date: new Date("11-12-2024"),
        is_printed: false,
        waiting_minutes: 10,
        printed_time: null,
        fileName: "Capstone_Project_Autumn_2023.pdf",
        lastModified: new Date(),
    },
    {
        page: 5,
        place: "B4-01",
        copies: 1,
        uploaded_date: new Date("11-12-2024"),
        is_printed: false,
        waiting_minutes: 5,
        printed_time: null,
        fileName: "Capstone_Project_Autumn_2023.pdf",
        lastModified: new Date(),
    },
    ]

const sampleAllowedFormats = ["pdf", "ppt", "pptx", "doc", "docx", "image", "png", "jpeg", "jpg", "txt"];

export {samplePrintedFiles, sampleWaitingFiles, sampleAllowedFormats}