import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar({ username }) {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("/profile");
    };

    return (
        <nav className="flex items-center justify-between bg-gray-900 px-6 py-3 text-white">
            {/* Left Side Menu */}
            <div className="flex space-x-6">
                <Link to="/xe-cua-ban" className="hover:text-gray-300">
                    Xe của bạn
                </Link>
                <Link to="/dat-lich" className="hover:text-gray-300">
                    Đặt lịch
                </Link>
                <Link to="/lich-su" className="hover:text-gray-300">
                    Lịch sử
                </Link>
                <Link to="/thong-bao" className="hover:text-gray-300">
                    Thông báo
                </Link>
                <Link to="/ho-tro" className="hover:text-gray-300">
                    Hỗ trợ
                </Link>
            </div>

            {/* User Box */}
            <div
                className="flex items-center space-x-2 cursor-pointer hover:text-gray-300"
                onClick={handleProfileClick}
            >
                <FaUserCircle size={28} />
                <span>{username}</span>
            </div>
        </nav>
    );
}
