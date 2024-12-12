import React, { useState } from "react";
import Header from "../../../components/Header";
import { TrashIcon } from '@heroicons/react/outline'; // Biểu tượng thùng rác

const hard_code_maintenances = [
  { title: "Periodic maintenance", startDate: "20:00PM 12/11/2024", 
    duration: "2", content: "Fix error", status: "Complete", createdBy: "Tran Quoc Hieu" },
  { title: "Periodic maintenance", startDate: "20:00PM 12/11/2024", 
    duration: "2", content: "Fix error", status: "Complete", createdBy: "Truong Tuan Anh" },
  { title: "Periodic maintenance", startDate: "20:00PM 12/11/2024", 
    duration: "2", content: "Fix error", status: "Not start", createdBy: "Tran Quoc Hieu" },
]

const MaintenanceSchedulePage = () => {
  const [maintenancePlans, setMaintenancePlans] = useState(hard_code_maintenances);
  const [newPlan, setNewPlan] = useState({
    title: "",
    startDate: "",
    duration: 0,
    content: "",
    createdBy: "Tran Quoc Trung",
  });

  // Hàm xử lý thêm kế hoạch bảo trì vào đầu danh sách
  const handleAddPlan = () => {
    if (
      newPlan.title.trim() !== "" &&
      newPlan.startDate.trim() !== "" &&
      newPlan.duration.trim() !== "" &&
      newPlan.content.trim() !== ""
    ) {
      setMaintenancePlans([newPlan, ...maintenancePlans]); // Thêm kế hoạch vào đầu danh sách
      setNewPlan({ title: "", startDate: "", duration: "", content: "" }); // Reset ô nhập
    }
  };

  // Hàm xử lý xóa kế hoạch bảo trì
  const handleDeletePlan = (index) => {
    const updatedPlans = maintenancePlans.filter((_, i) => i !== index);
    setMaintenancePlans(updatedPlans);
  };

  return (
    <div className="flex flex-col space-y-5 bg-gray-100 p-6 w-full">
      {/* Header */}
      <Header pageName="Maintenance Schedule Page" description="Create and update system maintenance schedule."/>

      {/* Lịch bảo trì */}
      <div className="bg-white p-4 rounded-lg flex flex-col space-y-2 drop-shadow">
        <h2 className="text-2xl font-bold text-blue">Maintenance Schedule</h2>
        {maintenancePlans.length === 0 ? (
            <p className="text-gray-500">Chưa có kế hoạch bảo trì nào.</p>
          ) : (
          maintenancePlans.map((plan, index) => (
            <div
              className="flex flex-col space-y-2 p-2 drop-shadow bg-white rounded-lg overflow-y-auto max-h-120"
            >
              {/* Tiêu đề và thông tin */}
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800 text-xl">{plan.title}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeletePlan(index)}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Thông tin "Bắt đầu từ" và "Thời gian bảo trì" */}
              <div className="flex justify-between text-xs">
                <span className="font-bold text-sm text-black">Content</span>
                <div className="flex flex-row">
                  <span className="italic text-gray-400 inline w-32"> {plan.startDate}</span> {/* Đặt lớp tailwind vào đây */}
                  <div className="flex flex-row space-x-2 justify-start w-44">
                    <span><strong>Created by:</strong></span> 
                    <span className="text-gray-400 inline">{plan.createdBy}</span>
                  </div>
                  <div className="flex flex-row space-x-2 justify-end w-28">
                    <span><strong>Status:</strong></span> 
                    <span className="text-gray-400 inline">{plan.status}</span>
                  </div>
                  <div className="flex flex-row space-x-2 justify-end w-28">
                    <span><strong>Duration:</strong></span> 
                    <span className="text-gray-400 inline">{plan.duration} hours</span>
                  </div>
                </div>
              </div>


              {/* Nội dung */}
              <div className="bg-gray-200 p-1 text-gray-700 text-sm">
                {plan.content}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Form Thêm Kế Hoạch Bảo Trì */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-4">
        <h2 className="text-2xl font-bold text-blue">Add maintenance plan</h2>
        <div className="space-y-3">
          {/* Tiêu đề */}
          <div className="flex items-center space-x-3">
            <label className="w-24 text-gray-700"><strong>Title:</strong></label>
            <input
              type="text"
              value={newPlan.title}
              onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
              className="w-3/4 px-2 py-1 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter tilte..."
            />
          </div>

          {/* Bắt đầu từ và Thời gian bảo trì */}
          <div className="flex space-x-8 flex-row">
            <div className="flex items-center space-x-3">
              <label className="w-24 text-gray-700"><strong>Start from:</strong></label>
              <input
                type="date"
                value={newPlan.startDate}
                onChange={(e) => setNewPlan({ ...newPlan, startDate: e.target.value })}
                className="px-2 py-1 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-3">
              <label className="text-gray-700"><strong>Duration:</strong></label>
              <input
                type="number"
                value={newPlan.duration}
                onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
                className="px-2 py-1 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Nội dung */}
          <div className="flex items-start space-x-3">
            <label className="w-24 text-gray-700"><strong>Description:</strong></label>
            <textarea
              value={newPlan.content}
              onChange={(e) => setNewPlan({ ...newPlan, content: e.target.value })}
              className="w-3/4 min-h-60 p-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Nhập nội dung..."
            />
          </div>

          {/* Nút Thêm */}
          <div className="flex justify-end">
            <button
              onClick={handleAddPlan}
              className="px-6 py-1 bg-blue text-white rounded-md hover:bg-blue"
            >
              Tạo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceSchedulePage;
