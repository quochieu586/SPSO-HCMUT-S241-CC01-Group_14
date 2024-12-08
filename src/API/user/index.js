import userAPI from "../../config/user"

// GET APIs
const getPersonalInformation = () => {
    const query = "/personal_information"

    return userAPI.get(query)
}

const getPrintingHistory = async () => {
    const query = "/printing_history"

    return userAPI.get(query)
} 

const getWaitingSession = async () => {
    const query = "/waiting_session"

    return userAPI.get(query)
}

const getTransactionHistory = () => {
    const query = "/transaction_history"

    return userAPI.get(query)
}

const getAvailablePrinters = () => {
    const query = "/available_printers"

    return userAPI.get(query)
}

// POST APIs
const printFile = (fileName, pages, printer, copy) => {
    const query = "/print_document"
    const payload = {
        fileName: fileName,
        pages: pages,
        printer: printer,
        copy: copy,
    }

    return userAPI.get(query, payload)
}

const confirmPrinting = (session_id) => {
    const query = "/available_printers"
    const payload = {
        session_id: session_id,
    }

    return userAPI.get(query, payload)
}

const createTransaction = (numberOfPages) => {
    const query = "/available_printers"
    const payload = {
        numberOfPages: numberOfPages,
    }

    return userAPI.get(query, payload)
}

// DELETE 
const cancelPrintingSession = (session_id) => {
    const query = "/cancel_printing_session"
    const payload = {
        session_id: session_id
    }

    return userAPI.get(query, payload)
}

const UserService = {
    getPersonalInformation,
    getPrintingHistory,
    getWaitingSession,
    getTransactionHistory,
    getAvailablePrinters,
    printFile,
    confirmPrinting,
    createTransaction,
    cancelPrintingSession,
}

export default UserService;