import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Navbar";

export default function Vehicle() {
    const { id } = useParams();

    // Mock data - in real app, fetch based on id
    const vehicle = {
        id: id,
        name: "Honda City",
        licensePlate: "29A-12345",
        status: "Đang sử dụng",
        model: "2023",
        color: "Trắng",
        coowners: [
            { name: "Nguyễn Văn A", share: "40%" },
            { name: "Trần Thị B", share: "30%" },
            { name: "Lê Văn C", share: "30%" },
        ],
    };

    const getStatusClass = (status) => {
        if (status === "Đang sử dụng") return "using";
        if (status === "Đang trống") return "free";
        if (status === "Chưa kích hoạt hợp đồng") return "inactive";
        return "";
    };

    return (
        <div className="main-container">
            <Navbar username="Username" />
            
            <div className="main-content-layout">
                <div className="main-content">
                    <div className="vehicle-info">
                        <Link to="/vehicles">← Quay lại</Link>
                        
                        <h1>{vehicle.name}</h1>
                        
                        <p><strong>Biển số:</strong> {vehicle.licensePlate}</p>
                        <p><strong>Năm sản xuất:</strong> {vehicle.model}</p>
                        <p><strong>Màu sắc:</strong> {vehicle.color}</p>
                        
                        <div className={`status ${getStatusClass(vehicle.status)}`}>
                            {vehicle.status}
                        </div>

                        <h4>Danh sách đồng sở hữu</h4>
                        {vehicle.coowners.map((coowner, index) => (
                            <div key={index} className="coowner-item">
                                <span>{coowner.name}</span>
                                <span>{coowner.share}</span>
                            </div>
                        ))}

                        <Link to={`/contract/${vehicle.id}`}>
                            Xem hợp đồng →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
