import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { FaCar, FaPlus, FaSearch } from "react-icons/fa";

export default function Vehicles() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const vehicles = [
    { 
      id: 1, 
      name: "Honda City", 
      status: "Đang sử dụng",
      licensePlate: "30A-12345",
      model: "2023",
      color: "Trắng"
    },
    { 
      id: 2, 
      name: "Toyota Vios", 
      status: "Đang trống",
      licensePlate: "29B-67890",
      model: "2022",
      color: "Đen"
    },
    { 
      id: 3, 
      name: "Ford Ranger", 
      status: "Chưa kích hoạt hợp đồng",
      licensePlate: "51C-11111",
      model: "2024",
      color: "Xám"
    },
    { 
      id: 4, 
      name: "Mazda CX-5", 
      status: "Đang trống",
      licensePlate: "30D-22222",
      model: "2023",
      color: "Đỏ"
    },
    { 
      id: 5, 
      name: "Hyundai Accent", 
      status: "Đang sử dụng",
      licensePlate: "29E-33333",
      model: "2022",
      color: "Xanh"
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

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Phương tiện của bạn</h1>
            <p className="text-gray-600 mt-1">Quản lý và theo dõi các phương tiện của bạn</p>
          </div>
          <Link
            to="/tao-hop-dong"
            className="btn-primary flex items-center space-x-2"
          >
            <FaPlus />
            <span>Tạo hợp đồng mới</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="card p-4">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên xe hoặc biển số..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng số xe</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{vehicles.length}</p>
              </div>
              <div className="bg-primary-100 p-3 rounded-full">
                <FaCar className="text-primary-600 text-2xl" />
              </div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đang sử dụng</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {vehicles.filter(v => v.status === "Đang sử dụng").length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaCar className="text-green-600 text-2xl" />
              </div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đang trống</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">
                  {vehicles.filter(v => v.status === "Đang trống").length}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FaCar className="text-orange-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <Link
                key={vehicle.id}
                to={`/vehicle/${vehicle.id}`}
                className="card p-6 hover:scale-105 transition-transform duration-200"
              >
                {/* Vehicle Icon */}
                <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg p-8 mb-4 flex items-center justify-center">
                  <FaCar className="text-white text-6xl" />
                </div>

                {/* Vehicle Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{vehicle.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{vehicle.licensePlate}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Năm: {vehicle.model}</span>
                    <span className="text-gray-600">Màu: {vehicle.color}</span>
                  </div>

                  {/* Status Badge */}
                  <div>
                    <span className={`badge ${getStatusBadge(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center">
            <FaCar className="text-gray-300 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Không tìm thấy phương tiện
            </h3>
            <p className="text-gray-600">
              Thử tìm kiếm với từ khóa khác hoặc thêm phương tiện mới
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
