import React from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

export default function Vehicles() {
    // Mock data
    const vehicles = [
        { id: 1, name: "Honda City", status: "Đang sử dụng", licensePlate: "29A-12345" },
        { id: 2, name: "Toyota Vios", status: "Đang trống", licensePlate: "30B-67890" },
        { id: 3, name: "Ford Ranger", status: "Chưa kích hoạt hợp đồng", licensePlate: "51C-11111" },
        { id: 4, name: "Mazda CX-5", status: "Đang trống", licensePlate: "29D-22222" },
    ];

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
                    <h1 className="vehicle-title">Phương tiện của bạn</h1>
                    
                    <Link to="/tao-hop-dong">
                        + Tạo hợp đồng mới
                    </Link>

                    <div className="vehicle-list">
                        {vehicles.map((vehicle) => (
                            <Link 
                                to={`/vehicle/${vehicle.id}`} 
                                key={vehicle.id}
                                style={{ textDecoration: 'none' }}
                            >
                                <div className="vehicle-card">
                                    <div>
                                        <h3>{vehicle.name}</h3>
                                        <p style={{ 
                                            color: '#6b7280', 
                                            fontSize: '14px',
                                            marginBottom: '12px' 
                                        }}>
                                            {vehicle.licensePlate}
                                        </p>
                                    </div>
                                    <div className={`status ${getStatusClass(vehicle.status)}`}>
                                        {vehicle.status}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
