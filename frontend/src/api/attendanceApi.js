// src/api/attendanceApi.js

const API_BASE_URL = 'http://localhost:3000';

export const attendanceApi = {
  // Get all attendances
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/attendance`);
      if (!response.ok) throw new Error('Gagal mengambil data');
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Get single attendance by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/attendances/${id}`);
      if (!response.ok) throw new Error('Data tidak ditemukan');
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Create new attendance
  create: async (data) => {
    try {
      const validData = {
        "name": data.studentName,
        "nim": String(data.studentId),
        "matkul": data.subject,
        "status": data.status
      }
      const response = await fetch(`${API_BASE_URL}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validData)
      });
      if (!response.ok) throw new Error('Gagal menambah data');
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Update attendance
  update: async (id, data) => {
    try {
      const validData = {
        "name": data.studentName,
        "nim": String(data.studentId),
        "matkul": data.subject,
        "date": data.date,
        "status": data.status
      }

      console.log(JSON.stringify(validData))

      const response = await fetch(`${API_BASE_URL}/attendance/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validData)
      });
      if (!response.ok) throw new Error('Gagal memperbarui data');
      const updatedData = await response.json();
      console.log(updatedData.data)
      return updatedData.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete attendance
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/attendance/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Gagal menghapus data');
      return true;
    } catch (error) {
      throw error;
    }
  }
};

// Mock data untuk development/testing
export const mockAttendances = [
  { 
    id: 1, 
    studentName: 'Budi Santoso', 
    studentId: 'M001', 
    date: '2026-01-07', 
    status: 'hadir', 
    subject: 'Pemrograman Web' 
  },
  { 
    id: 2, 
    studentName: 'Siti Nurhaliza', 
    studentId: 'M002', 
    date: '2026-01-07', 
    status: 'izin', 
    subject: 'Basis Data' 
  },
  { 
    id: 3, 
    studentName: 'Ahmad Fauzi', 
    studentId: 'M003', 
    date: '2026-01-07', 
    status: 'hadir', 
    subject: 'Pemrograman Web' 
  }
];