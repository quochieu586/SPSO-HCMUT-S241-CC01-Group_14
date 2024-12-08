import adminAPI from "../../config/admin";

// GET API
const getPrintingHistory = ({ printer, area, studentId }) => {
    const query = `/printing_history?
    ${printer ? `printer=${printer}&` : ''}
    ${area ? `area=${area}&` : ''}
    ${studentId ? `studentId=${studentId}&` : ''}`

    return adminAPI.get(query)
}

const getPersonalInformation = (studentId) => {
    const query = `/student_information?studentId=${studentId}`

    return adminAPI.get(query)
}

const getPrinters = () => {
    const query = "/get_printers_status"

    return adminAPI.get(query)
}

const getListOfFileTypes = () => {
    const query = "/get_list_of_file_type"

    return adminAPI.get(query)
}

const getMaintenanceList = (ended) => {
    const query = `/get_maintenances?ended=${ended}`
}

// POST APIs
const togglePrinterStatus = (printerId) => {
    const query = "/toggle_status"
    const payload = {
        printerId: printerId
    }

    return adminAPI.get(query, payload)
}

const addFileType = (fileType) => {
    const query = "/add_file_fype"
    const payload = {
        fileType: fileType
    }

    return adminAPI.get(query, payload)
}

const addMaintenanceSchedule = (fileType) => {
    const query = "/add_file_fype"
    const payload = {
        fileType: fileType
    }

    return adminAPI.get(query, payload)
}

// DELETE
const removeFileType = (fileType) => {
    const query = "/remove_file_type"
    const payload = {
        fileType: fileType
    }

    return adminAPI.get(query, payload)
}

const AdminService = {
    getPrintingHistory,
    getPersonalInformation,
    getPrinters,
    getListOfFileTypes,
    getMaintenanceList,
    togglePrinterStatus,
    addFileType,
    addMaintenanceSchedule,
    removeFileType
}

export default AdminService;