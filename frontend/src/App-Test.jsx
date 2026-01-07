import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Edit, Plus, UserCheck, AlertCircle, CheckCircle } from 'lucide-react';

const API_BASE_URL = 'https://api.example.com';

export default function AttendanceApp() {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'hadir',
    subject: ''
  });

  // Fetch data absensi
  const fetchAttendances = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/attendances`);
      if (!response.ok) throw new Error('Gagal mengambil data');
      const data = await response.json();
      setAttendances(data);
    } catch (err) {
      setError('Tidak dapat terhubung ke API. Menggunakan data demo.');
      // Data demo untuk testing
      setAttendances([
        { id: 1, studentName: 'Budi Santoso', studentId: 'M001', date: '2026-01-07', status: 'hadir', subject: 'Pemrograman Web' },
        { id: 2, studentName: 'Siti Nurhaliza', studentId: 'M002', date: '2026-01-07', status: 'izin', subject: 'Basis Data' },
        { id: 3, studentName: 'Ahmad Fauzi', studentId: 'M003', date: '2026-01-07', status: 'hadir', subject: 'Pemrograman Web' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendances();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, status: value }));
  };

  // Create atau Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const url = editingId 
        ? `${API_BASE_URL}/attendances/${editingId}`
        : `${API_BASE_URL}/attendances`;
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Gagal menyimpan data');

      setSuccess(editingId ? 'Data berhasil diperbarui!' : 'Data berhasil ditambahkan!');
      setIsDialogOpen(false);
      resetForm();
      
      // Simulasi update untuk demo
      if (editingId) {
        setAttendances(prev => prev.map(item => 
          item.id === editingId ? { ...formData, id: editingId } : item
        ));
      } else {
        const newId = Math.max(...attendances.map(a => a.id), 0) + 1;
        setAttendances(prev => [...prev, { ...formData, id: newId }]);
      }
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_BASE_URL}/attendances/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Gagal menghapus data');

      setSuccess('Data berhasil dihapus!');
      setAttendances(prev => prev.filter(item => item.id !== id));
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      // Simulasi delete untuk demo
      setAttendances(prev => prev.filter(item => item.id !== id));
      setSuccess('Data berhasil dihapus!');
      setTimeout(() => setSuccess(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Edit
  const handleEdit = (attendance) => {
    setEditingId(attendance.id);
    setFormData({
      studentName: attendance.studentName,
      studentId: attendance.studentId,
      date: attendance.date,
      status: attendance.status,
      subject: attendance.subject
    });
    setIsDialogOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      studentName: '',
      studentId: '',
      date: new Date().toISOString().split('T')[0],
      status: 'hadir',
      subject: ''
    });
    setEditingId(null);
  };

  const getStatusBadge = (status) => {
    const styles = {
      hadir: 'bg-green-100 text-green-800 border-green-200',
      izin: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      sakit: 'bg-blue-100 text-blue-800 border-blue-200',
      alpha: 'bg-red-100 text-red-800 border-red-200'
    };
    return styles[status] || styles.hadir;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <UserCheck className="w-10 h-10 text-indigo-600" />
            Sistem Absensi Mahasiswa
          </h1>
          <p className="text-gray-600">Kelola data kehadiran mahasiswa dengan mudah</p>
        </div>

        {error && (
          <Alert className="mb-4 border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Data Absensi</CardTitle>
                <CardDescription className="text-indigo-100">
                  Total {attendances.length} record absensi
                </CardDescription>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) resetForm();
              }}>
                <DialogTrigger asChild>
                  <Button className="bg-white text-indigo-600 hover:bg-indigo-50">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Absensi
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>
                        {editingId ? 'Edit Data Absensi' : 'Tambah Data Absensi'}
                      </DialogTitle>
                      <DialogDescription>
                        Isi form di bawah untuk {editingId ? 'memperbarui' : 'menambahkan'} data absensi
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="studentName">Nama Mahasiswa</Label>
                        <Input
                          id="studentName"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleInputChange}
                          placeholder="Masukkan nama mahasiswa"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="studentId">NIM</Label>
                        <Input
                          id="studentId"
                          name="studentId"
                          value={formData.studentId}
                          onChange={handleInputChange}
                          placeholder="Masukkan NIM"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="subject">Mata Kuliah</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Masukkan nama mata kuliah"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="date">Tanggal</Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="status">Status Kehadiran</Label>
                        <Select value={formData.status} onValueChange={handleSelectChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hadir">Hadir</SelectItem>
                            <SelectItem value="izin">Izin</SelectItem>
                            <SelectItem value="sakit">Sakit</SelectItem>
                            <SelectItem value="alpha">Alpha</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700">
                        {loading ? 'Menyimpan...' : editingId ? 'Update' : 'Simpan'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {loading && attendances.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Memuat data...</div>
            ) : attendances.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Belum ada data absensi</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">NIM</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Mata Kuliah</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tanggal</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendances.map((attendance) => (
                      <tr key={attendance.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="px-4 py-3 text-sm text-gray-600">{attendance.studentId}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-800">{attendance.studentName}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{attendance.subject}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(attendance.date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(attendance.status)}`}>
                            {attendance.status.charAt(0).toUpperCase() + attendance.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(attendance)}
                              className="hover:bg-blue-50 hover:border-blue-300"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(attendance.id)}
                              className="hover:bg-red-50 hover:border-red-300 text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 mb-2">Petunjuk Integrasi API:</h3>
          <p className="text-sm text-gray-600 mb-2">
            Ubah variabel <code className="bg-gray-100 px-2 py-1 rounded">API_BASE_URL</code> dengan URL API Anda.
          </p>
          <p className="text-sm text-gray-600">
            API endpoint yang digunakan:
          </p>
          <ul className="text-sm text-gray-600 list-disc list-inside ml-2 mt-1">
            <li><code className="bg-gray-100 px-2 py-1 rounded">GET /attendances</code> - Mengambil semua data</li>
            <li><code className="bg-gray-100 px-2 py-1 rounded">POST /attendances</code> - Menambah data baru</li>
            <li><code className="bg-gray-100 px-2 py-1 rounded">PUT /attendances/:id</code> - Update data</li>
            <li><code className="bg-gray-100 px-2 py-1 rounded">DELETE /attendances/:id</code> - Hapus data</li>
          </ul>
        </div>
      </div>
    </div>
  );
}