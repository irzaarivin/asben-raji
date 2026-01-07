// src/utils/validators.js

export const validateAttendanceForm = (formData) => {
  const errors = {};

  // Validasi nama mahasiswa
  if (!formData.studentName || formData.studentName.trim() === '') {
    errors.studentName = 'Nama mahasiswa wajib diisi';
  } else if (formData.studentName.length < 3) {
    errors.studentName = 'Nama mahasiswa minimal 3 karakter';
  }

  // Validasi NIM
  if (!formData.studentId || formData.studentId.trim() === '') {
    errors.studentId = 'NIM wajib diisi';
  } else if (!/^[A-Za-z0-9]+$/.test(formData.studentId)) {
    errors.studentId = 'NIM hanya boleh berisi huruf dan angka';
  }

  // Validasi mata kuliah
  if (!formData.subject || formData.subject.trim() === '') {
    errors.subject = 'Mata kuliah wajib diisi';
  }

  // Validasi tanggal
  if (!formData.date) {
    errors.date = 'Tanggal wajib diisi';
  }

  // Validasi status
  if (!formData.status) {
    errors.status = 'Status kehadiran wajib dipilih';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateNIM = (nim) => {
  return /^[A-Za-z0-9]+$/.test(nim);
};

export const validateName = (name) => {
  return name && name.trim().length >= 3;
};