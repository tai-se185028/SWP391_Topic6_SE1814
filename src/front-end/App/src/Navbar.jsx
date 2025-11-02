import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ username }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("/profile");
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <nav className="Navbar">
                <div className="color-box">
                    VEHICLE
                </div>

                <div className="menu-btn" onClick={toggleMenu}>
                    <FaBars />
                </div>

                <div className="nvbr-main">
                    <div className="navigate">
                        <NavLink 
                            to="/vehicles" 
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            Xe của bạn
                        </NavLink>
                        <NavLink 
                            to="/schedule" 
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            Đặt lịch
                        </NavLink>
                        <NavLink 
                            to="/usageHistory" 
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            Lịch sử
                        </NavLink>
                        <NavLink 
                            to="/notification" 
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            Thông báo
                        </NavLink>
                        <NavLink 
                            to="/support" 
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            Hỗ trợ
                        </NavLink>
                    </div>

                    <div
                        className="username"
                        onClick={handleProfileClick}
                        style={{ cursor: 'pointer' }}
                    >
                        <FaUserCircle size={24} />
                        <span>{username}</span>
                    </div>
                </div>
            </nav>

            {menuOpen && (
                <div className="nvbr-overlay">
                    <div 
                        style={{ 
                            position: 'absolute', 
                            top: '20px', 
                            right: '20px',
                            cursor: 'pointer',
                            fontSize: '28px'
                        }}
                        onClick={toggleMenu}
                    >
                        <FaTimes />
                    </div>
                    
                    <NavLink to="/vehicles" onClick={toggleMenu}>
                        Xe của bạn
                    </NavLink>
                    <NavLink to="/schedule" onClick={toggleMenu}>
                        Đặt lịch
                    </NavLink>
                    <NavLink to="/usageHistory" onClick={toggleMenu}>
                        Lịch sử
                    </NavLink>
                    <NavLink to="/notification" onClick={toggleMenu}>
                        Thông báo
                    </NavLink>
                    <NavLink to="/support" onClick={toggleMenu}>
                        Hỗ trợ
                    </NavLink>
                    
                    <div
                        style={{
                            marginTop: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            handleProfileClick();
                            toggleMenu();
                        }}
                    >
                        <FaUserCircle size={24} />
                        <span>{username}</span>
                    </div>
                </div>
            )}
        </>
    );
}
