import React, { useState } from "react";
import Layout from "../components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaCar, 
  FaArrowLeft, 
  FaEdit, 
  FaTrash, 
  FaCalendarAlt, 
  FaMapMarkerAlt,
  FaGasPump,
  FaClock,
  FaUser
} from "react-icons/fa";

export default function Vehicle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");

  // Mock data - In real app, fetch based on id
  const vehicle = {
    id: id,
    name: "Honda City",
    licensePlate: "30A-12345",
    model: "2023",
    color: "Trắng",
    status: "Đang sử dụng",
    brand: "Honda",
    seats: 5,
    fuelType: "Xăng",
    transmission: "Tự động",
    mileage: "15,000 km",
    registrationDate: "15/03/2023",
    lastMaintenance: "01/10/2024",
    nextMaintenance: "01/01/2025",
  };

  const usageHistory = [
    {
      id: 1,
      date: "25/10/2024",
      customer: "Nguyễn Văn A",
      duration: "3 ngày",
      location: "Hà Nội - Đà Nẵng",
      revenue: "3,000,000 VNĐ",
    },
    {
      id: 2,
      date: "15/10/2024",
      customer: "Trần Thị B",
      duration: "2 ngày",
      location: "Hà Nội - Hải Phòng",
      revenue: "2,000,000 VNĐ",
    },
    {
      id: 3,
      date: "05/10/2024",
      customer: "Lê Văn C",
      duration: "5 ngày",
      location: "Hà Nội - Huế",
      revenue: "5,000,000 VNĐ",
    },
  ];

  const maintenanceHistory = [
    {
      id: 1,
      date: "01/10/2024",
      type: "Bảo dưỡng định kỳ",
      cost: "1,500,000 VNĐ",
      description: "Thay dầu máy, lọc gió, kiểm tra phanh",
    },
    {
      id: 2,
      date: "01/07/2024",
      type: "Sửa chữa",
      cost: "3,000,000 VNĐ",
      description: "Thay lốp xe, cân bằng động",
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      "Đang sử dụng": "bg-green-100 text-green-800",
      "Đang trống": "bg-orange-100 text-orange-800",
      "Chưa kích hoạt hợp đồng": "bg-red-100 text-red-800",
    };
    return statusConfig[status] || "bg-gray-100 text-gray-800";
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phương tiện này?")) {
      console.log("Deleting vehicle:", id);
      navigate("/vehicles");
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/vehicles")}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
        >
          <FaArrowLeft />
          <span>Quay lại danh sách</span>
        </button>

        {/* Hero Section */}
        <div className="card overflow-hidden">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-12 flex items-center justify-center">
            <FaCar className="text-white text-9xl" />
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{vehicle.name}</h1>
                <p className="text-xl text-gray-600 mt-1">{vehicle.licensePlate}</p>
                <span className={`badge ${getStatusBadge(vehicle.status)} mt-3`}>
                  {vehicle.status}
                </span>
              </div>
              <div className="flex gap-3">
                <button className="btn-primary flex items-center space-x-2">
                  <FaEdit />
                  <span>Chỉnh sửa</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium flex items-center space-x-2"
                >
                  <FaTrash />
                  <span>Xóa</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("info")}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === "info"
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Thông tin xe
              </button>
              <button
                onClick={() => setActiveTab("usage")}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === "usage"
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Lịch sử sử dụng
              </button>
              <button
                onClick={() => setActiveTab("maintenance")}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === "maintenance"
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Bảo dưỡng
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Vehicle Info Tab */}
            {activeTab === "info" && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin cơ bản</h3>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Hãng xe</span>
                    <span className="font-medium text-gray-900">{vehicle.brand}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Năm sản xuất</span>
                    <span className="font-medium text-gray-900">{vehicle.model}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Màu sắc</span>
                    <span className="font-medium text-gray-900">{vehicle.color}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Số chỗ ngồi</span>
                    <span className="font-medium text-gray-900">{vehicle.seats} chỗ</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Loại nhiên liệu</span>
                    <span className="font-medium text-gray-900">{vehicle.fuelType}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Hộp số</span>
                    <span className="font-medium text-gray-900">{vehicle.transmission}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin khác</h3>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Số km đã đi</span>
                    <span className="font-medium text-gray-900">{vehicle.mileage}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Ngày đăng ký</span>
                    <span className="font-medium text-gray-900">{vehicle.registrationDate}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Bảo dưỡng lần cuối</span>
                    <span className="font-medium text-gray-900">{vehicle.lastMaintenance}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Bảo dưỡng tiếp theo</span>
                    <span className="font-medium text-orange-600">{vehicle.nextMaintenance}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Usage History Tab */}
            {activeTab === "usage" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lịch sử cho thuê</h3>
                {usageHistory.map((usage) => (
                  <div key={usage.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <FaCalendarAlt className="text-primary-600" />
                          <span>{usage.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <FaUser className="text-primary-600" />
                          <span>{usage.customer}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <FaMapMarkerAlt className="text-primary-600" />
                          <span>{usage.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <FaClock className="text-primary-600" />
                          <span>{usage.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-green-600">{usage.revenue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Maintenance Tab */}
            {activeTab === "maintenance" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lịch sử bảo dưỡng</h3>
                {maintenanceHistory.map((maintenance) => (
                  <div key={maintenance.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <FaCalendarAlt className="text-primary-600" />
                          <span className="font-medium text-gray-900">{maintenance.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaGasPump className="text-primary-600" />
                          <span className="text-gray-900">{maintenance.type}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{maintenance.description}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xl font-bold text-red-600">{maintenance.cost}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
