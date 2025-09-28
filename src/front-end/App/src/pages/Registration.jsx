import React, { useState } from "react";

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
    <div
      style={{
        width: "400px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <form onSubmit={handleSubmit} noValidate>
        <h2>Đăng ký</h2>

        {/* Full Name */}
        <label style={{ display: "block", marginTop: "10px" }}>Họ tên</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          style={{ borderColor: errors.fullName ? "red" : "#ccc", width: "100%" }}
        />
        {errors.fullName && <p style={{ color: "red", fontSize: "12px" }}>{errors.fullName}</p>}

        {/* Phone */}
        <label style={{ display: "block", marginTop: "10px" }}>Số điện thoại</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          style={{ borderColor: errors.phone ? "red" : "#ccc", width: "100%" }}
        />
        {errors.phone && <p style={{ color: "red", fontSize: "12px" }}>{errors.phone}</p>}

        {/* Password */}
        <label style={{ display: "block", marginTop: "10px" }}>Mật khẩu</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={{ borderColor: errors.password ? "red" : "#ccc", width: "100%" }}
        />
        {errors.password && <p style={{ color: "red", fontSize: "12px" }}>{errors.password}</p>}

        {/* Confirm Password */}
        <label style={{ display: "block", marginTop: "10px" }}>Nhập lại mật khẩu</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={{ borderColor: errors.confirmPassword ? "red" : "#ccc", width: "100%" }}
        />
        {errors.confirmPassword && (
          <p style={{ color: "red", fontSize: "12px" }}>{errors.confirmPassword}</p>
        )}

        {/* CCCD */}
        <label style={{ display: "block", marginTop: "10px" }}>CCCD</label>
        <input
          type="text"
          name="cccd"
          value={formData.cccd}
          onChange={handleChange}
          style={{ borderColor: errors.cccd ? "red" : "#ccc", width: "100%" }}
        />
        {errors.cccd && <p style={{ color: "red", fontSize: "12px" }}>{errors.cccd}</p>}

        {/* License */}
        <label style={{ display: "block", marginTop: "10px" }}>Giấy phép lái xe</label>
        <input
          type="text"
          name="license"
          value={formData.license}
          onChange={handleChange}
          style={{ borderColor: errors.license ? "red" : "#ccc", width: "100%" }}
        />
        {errors.license && <p style={{ color: "red", fontSize: "12px" }}>{errors.license}</p>}

        {/* CCCD File Upload */}
        <div style={{ marginTop: "10px" }}>
          <button
            type="button"
            onClick={() => document.getElementById("cccdFileInput").click()}
          >
            Ảnh căn cước
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
            <span style={{ marginLeft: "10px" }}>{formData.cccdFile.name}</span>
          )}
          {errors.cccdFile && <p style={{ color: "red", fontSize: "12px" }}>{errors.cccdFile}</p>}
        </div>

        {/* License File Upload */}
        <div style={{ marginTop: "10px" }}>
          <button
            type="button"
            onClick={() => document.getElementById("licenseFileInput").click()}
          >
            Ảnh bằng lái
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
            <span style={{ marginLeft: "10px" }}>{formData.licenseFile.name}</span>
          )}
          {errors.licenseFile && (
            <p style={{ color: "red", fontSize: "12px" }}>{errors.licenseFile}</p>
          )}
        </div>

        {/* Buttons */}
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button type="submit">Đăng ký</button>
          <button type="button" onClick={handleCancel}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
