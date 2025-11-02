import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    cccd: "",
    license: "",
    cccdFile: null,
    licenseFile: null,
  });

  const [errors, setErrors] = useState({});

  // Validation rules (Vietnamese messages)
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Họ tên là bắt buộc";
        break;
      case "phone":
        if (!/^[0-9]{10}$/.test(value)) error = "Số điện thoại phải đủ 10 số";
        break;
      case "password":
        if (value.length < 6) error = "Mật khẩu phải từ 6 ký tự trở lên";
        break;
      case "confirmPassword":
        if (value !== formData.password) error = "Mật khẩu nhập lại không khớp";
        break;
      case "cccd":
        if (!/^[0-9]{12}$/.test(value)) error = "CCCD phải gồm 12 số";
        break;
      case "license":
        if (!value.trim()) error = "Số giấy phép lái xe là bắt buộc";
        break;
      case "cccdFile":
        if (!value) error = "Vui lòng tải lên ảnh căn cước";
        break;
      case "licenseFile":
        if (!value) error = "Vui lòng tải lên ảnh bằng lái";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const fieldValue = files ? files[0] : value;

    setFormData({ ...formData, [name]: fieldValue });

    const errorMsg = validateField(name, fieldValue);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg || "",
    }));

    if (name === "password" && formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateField("confirmPassword", formData.confirmPassword),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);

    if (Object.values(newErrors).every((err) => !err)) {
      console.log("Form data:", formData);
      alert("Đăng ký thành công!");
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: "",
      phone: "",
      password: "",
      confirmPassword: "",
      cccd: "",
      license: "",
      cccdFile: null,
      licenseFile: null,
    });
    setErrors({});
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
      padding: '20px'
    }}>
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <form onSubmit={handleSubmit} noValidate>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '24px',
            textAlign: 'center'
          }}>Đăng ký</h2>

          {/* Full Name */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>Họ tên</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="txtInput"
              style={{ 
                borderColor: errors.fullName ? '#dc2626' : '#d1d5db',
                margin: 0
              }}
            />
            {errors.fullName && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>{errors.fullName}</p>}
          </div>

          {/* Phone */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="txtInput"
              style={{ 
                borderColor: errors.phone ? '#dc2626' : '#d1d5db',
                margin: 0
              }}
            />
            {errors.phone && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>{errors.phone}</p>}
          </div>

          {/* Password */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="txtInput"
              style={{ 
                borderColor: errors.password ? '#dc2626' : '#d1d5db',
                margin: 0
              }}
            />
            {errors.password && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>Nhập lại mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="txtInput"
              style={{ 
                borderColor: errors.confirmPassword ? '#dc2626' : '#d1d5db',
                margin: 0
              }}
            />
            {errors.confirmPassword && (
              <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>{errors.confirmPassword}</p>
            )}
          </div>

          {/* CCCD */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>CCCD</label>
            <input
              type="text"
              name="cccd"
              value={formData.cccd}
              onChange={handleChange}
              className="txtInput"
              style={{ 
                borderColor: errors.cccd ? '#dc2626' : '#d1d5db',
                margin: 0
              }}
            />
            {errors.cccd && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>{errors.cccd}</p>}
          </div>

          {/* License */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>Giấy phép lái xe</label>
            <input
              type="text"
              name="license"
              value={formData.license}
              onChange={handleChange}
              className="txtInput"
              style={{ 
                borderColor: errors.license ? '#dc2626' : '#d1d5db',
                margin: 0
              }}
            />
            {errors.license && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>{errors.license}</p>}
          </div>

          {/* CCCD File Upload */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>Ảnh căn cước</label>
            <button
              type="button"
              onClick={() => document.getElementById("cccdFileInput").click()}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151'
              }}
            >
              Chọn file
            </button>
            <input
              id="cccdFileInput"
              type="file"
              name="cccdFile"
              accept="image/*"
              onChange={handleChange}
              style={{ display: "none" }}
            />
            {formData.cccdFile && (
              <span style={{ marginLeft: "10px", fontSize: '14px', color: '#6b7280' }}>{formData.cccdFile.name}</span>
            )}
            {errors.cccdFile && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>{errors.cccdFile}</p>}
          </div>

          {/* License File Upload */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>Ảnh bằng lái</label>
            <button
              type="button"
              onClick={() => document.getElementById("licenseFileInput").click()}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151'
              }}
            >
              Chọn file
            </button>
            <input
              id="licenseFileInput"
              type="file"
              name="licenseFile"
              accept="image/*"
              onChange={handleChange}
              style={{ display: "none" }}
            />
            {formData.licenseFile && (
              <span style={{ marginLeft: "10px", fontSize: '14px', color: '#6b7280' }}>{formData.licenseFile.name}</span>
            )}
            {errors.licenseFile && (
              <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>{errors.licenseFile}</p>
            )}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button 
              type="submit"
              className="btnInput"
              style={{ flex: 1 }}
            >
              Đăng ký
            </button>
            <button 
              type="button" 
              onClick={handleCancel}
              style={{
                flex: 1,
                padding: '12px 24px',
                backgroundColor: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                color: '#374151',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Hủy
            </button>
          </div>

          <div style={{ 
            marginTop: '20px', 
            textAlign: 'center',
            fontSize: '14px',
            color: '#6b7280'
          }}>
            Đã có tài khoản? <Link to="/vehicles" style={{ color: '#2563eb', fontWeight: '600' }}>Đăng nhập</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
