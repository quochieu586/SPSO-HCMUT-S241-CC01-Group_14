import adminAPI from "../../config/admin";

// GET API
const getPrintingHistory = ({ printer, area, studentId }) => {
    const query = `/printing_history?${printer ? `printer=${printer}&` : ''}${area ? `area=${area}&` : ''}${studentId ? `studentId=${studentId.toString()}&` : ''}`

    // const payload = {};
    // if (printer) { payload["printer"] = printer; }
    // if (area) { payload["area"] = area; }
    // if (studentId) { payload["studentId"] = studentId; }

    // console.log(payload);

    return adminAPI.get(query)
}

const getPersonalInformation = (studentId) => {
    const query = `/student_information?studentId=${studentId}`

    return adminAPI.get(query)
}

const getPrinters = () => {
    const query = "/get_all_printers_status"

    return adminAPI.get(query)
}

const getListOfFileTypes = () => {
    const query = "/get_list_of_file_type"

    return adminAPI.get(query)
}

const getMaintenanceList = (ended = false) => {
    const query = `/get_maintenances?ended=${ended}`

    return adminAPI.get(query)
}

// POST APIs
const togglePrinterStatus = (printerId) => {
    console.log(printerId)

    const query = "/toggle_status"
    const payload = {
        printerId: printerId
    }

    return adminAPI.post(query, payload)
}

const addFileType = (fileType) => {
    const query = "/add_file_fype"
    const payload = {
        fileType: fileType
    }

    return adminAPI.post(query, payload)
}

const addMaintenanceSchedule = ( title, description, startTime, createdBy, duration ) => {
    const query = "/add_maintenance"
    const payload = {
        title: title,
        description: description,
        startTime: startTime,
        createdBy: createdBy,
        duration: duration,
    }

    console.log(payload);

    return adminAPI.post(query, payload);
}

// DELETE
const removeFileType = (fileType) => {
    const query = "/remove_file_type"
    const payload = {
        fileType: fileType
    }

    return adminAPI.delete(query, payload)
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