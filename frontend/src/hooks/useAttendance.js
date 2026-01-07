import { useState, useEffect } from 'react';
import { attendanceApi, mockAttendances } from '../api/attendanceApi';
import { MESSAGES, ATTENDANCE_STATUS } from '../utils/constants';
import { formatDateForInput } from '../utils/formatters';

export const useAttendance = () => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    date: formatDateForInput(),
    status: ATTENDANCE_STATUS.HADIR,
    subject: ''
  });

  // Fetch data
  const fetchAttendances = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await attendanceApi.getAll();
      setAttendances(data.data);
    } catch (err) {
      setError(MESSAGES.ERROR_FETCH);
      setAttendances(mockAttendances);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendances();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select change
  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, status: value }));
  };

  // Create or Update
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (editingId) {
        await attendanceApi.update(editingId, formData);
        const data = await attendanceApi.getAll();
        setAttendances(data.data);
        setSuccess(MESSAGES.SUCCESS_UPDATE);
      } else {
        const newId = Math.max(...attendances.map(a => a.id), 0) + 1;
        await attendanceApi.create(formData);
        const data = await attendanceApi.getAll();
        setAttendances(data.data);
        // setAttendances(prev => [...prev, { ...formData, id: newId }]);
        setSuccess(MESSAGES.SUCCESS_CREATE);
      }
      
      setIsDialogOpen(false);
      resetForm();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!confirm(MESSAGES.CONFIRM_DELETE)) return;
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await attendanceApi.delete(id);
      setAttendances(prev => prev.filter(item => item.id !== id));
      setSuccess(MESSAGES.SUCCESS_DELETE);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setAttendances(prev => prev.filter(item => item.id !== id));
      setSuccess(MESSAGES.SUCCESS_DELETE);
      setTimeout(() => setSuccess(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Edit
  const handleEdit = (attendance) => {
    setEditingId(attendance.id);
    setFormData({
      studentName: attendance.name,
      studentId: attendance.nim,
      date: attendance.updatedAt,
      status: attendance.status,
      subject: attendance.matkul
    });
    setIsDialogOpen(true);
  };

  // Open dialog for new entry
  const handleOpenDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      nim: '',
      updatedAt: formatDateForInput(),
      status: ATTENDANCE_STATUS.HADIR,
      matkul: ''
    });
    setEditingId(null);
  };

  // Close dialog
  const handleCloseDialog = (open) => {
    setIsDialogOpen(open);
    if (!open) resetForm();
  };

  return {
    attendances,
    loading,
    error,
    success,
    isDialogOpen,
    editingId,
    formData,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    handleDelete,
    handleEdit,
    handleOpenDialog,
    handleCloseDialog
  };
};