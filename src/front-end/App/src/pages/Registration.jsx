import React, { useState } from "react";
import { FaUpload, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const navigate = useNavigate();
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
      // Navigate to vehicles page after successful registration
      navigate("/vehicles");
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="card p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Đăng ký tài khoản</h2>
            <p className="text-gray-600">Vui lòng điền đầy đủ thông tin để tạo tài khoản</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`input-field ${errors.fullName ? "input-error" : ""}`}
                    placeholder="Nhập họ và tên"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`input-field ${errors.phone ? "input-error" : ""}`}
                    placeholder="0123456789"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`input-field ${errors.password ? "input-error" : ""}`}
                    placeholder="Tối thiểu 6 ký tự"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nhập lại mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`input-field ${errors.confirmPassword ? "input-error" : ""}`}
                    placeholder="Nhập lại mật khẩu"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-5">
                {/* CCCD */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số CCCD <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="cccd"
                    value={formData.cccd}
                    onChange={handleChange}
                    className={`input-field ${errors.cccd ? "input-error" : ""}`}
                    placeholder="12 chữ số"
                  />
                  {errors.cccd && (
                    <p className="text-red-500 text-sm mt-1">{errors.cccd}</p>
                  )}
                </div>

                {/* License */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giấy phép lái xe <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="license"
                    value={formData.license}
                    onChange={handleChange}
                    className={`input-field ${errors.license ? "input-error" : ""}`}
                    placeholder="Số giấy phép lái xe"
                  />
                  {errors.license && (
                    <p className="text-red-500 text-sm mt-1">{errors.license}</p>
                  )}
                </div>

                {/* CCCD File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ảnh căn cước <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => document.getElementById("cccdFileInput").click()}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200"
                  >
                    {formData.cccdFile ? (
                      <>
                        <FaCheckCircle className="text-green-500" />
                        <span className="text-sm text-gray-700">{formData.cccdFile.name}</span>
                      </>
                    ) : (
                      <>
                        <FaUpload className="text-gray-400" />
                        <span className="text-sm text-gray-600">Tải lên ảnh căn cước</span>
                      </>
                    )}
                  </button>
                  <input
                    id="cccdFileInput"
                    type="file"
                    name="cccdFile"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                  {errors.cccdFile && (
                    <p className="text-red-500 text-sm mt-1">{errors.cccdFile}</p>
                  )}
                </div>

                {/* License File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ảnh bằng lái <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => document.getElementById("licenseFileInput").click()}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200"
                  >
                    {formData.licenseFile ? (
                      <>
                        <FaCheckCircle className="text-green-500" />
                        <span className="text-sm text-gray-700">{formData.licenseFile.name}</span>
                      </>
                    ) : (
                      <>
                        <FaUpload className="text-gray-400" />
                        <span className="text-sm text-gray-600">Tải lên ảnh bằng lái</span>
                      </>
                    )}
                  </button>
                  <input
                    id="licenseFileInput"
                    type="file"
                    name="licenseFile"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                  {errors.licenseFile && (
                    <p className="text-red-500 text-sm mt-1">{errors.licenseFile}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button type="submit" className="btn-primary flex-1">
                Đăng ký
              </button>
              <button type="button" onClick={handleCancel} className="btn-secondary flex-1">
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
