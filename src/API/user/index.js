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
    const query = "/waiting_sessions"

    return userAPI.get(query)
}

const getTransactionHistory = () => {
    const query = "/transaction_history"

    return userAPI.get(query)
}

const getAvailablePrinters = () => {
    const query = "/get_available_printers"

    return userAPI.get(query)
}

// POST APIs
const printFile = (fileName, pages, printer, copies) => {
    const query = "/print_document"
    const payload = {
        fileName: fileName,
        pages: pages,
        printer: printer,
        copies: copies,
    }

    console.log(payload);

    return userAPI.post(query, payload)
}

const confirmPrinting = (session_id) => {
    const query = "/confirm_printing"
    const payload = {
        fileId: session_id,
    }

    return userAPI.post(query, payload)
}

const createTransaction = (quantity, price) => {
    const query = "/create_transaction"
    const payload = {
        quantity: quantity,
        price: price,
    }

    console.log(payload);

    return userAPI.post(query, payload);
}

// DELETE 
const cancelPrintingSession = (session_id) => {
    const query = "/cancel_printing_session"
    const payload = {
        session_id: session_id
    }

    return userAPI.delete(query, payload)
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