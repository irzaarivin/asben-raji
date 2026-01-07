// src/components/attendance/AttendanceDialog.jsx

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import AttendanceForm from './AttendanceForm';

export const AttendanceDialog = ({ 
  isOpen, 
  onOpenChange, 
  formData, 
  onInputChange, 
  onSelectChange, 
  onSubmit, 
  isEditing, 
  loading 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Data Absensi' : 'Tambah Data Absensi'}
          </DialogTitle>
          <DialogDescription>
            Isi form di bawah untuk {isEditing ? 'memperbarui' : 'menambahkan'} data absensi
          </DialogDescription>
        </DialogHeader>
        
        <AttendanceForm 
          formData={formData}
          onChange={onInputChange}
          onSelectChange={onSelectChange}
        />
        
        <DialogFooter>
          <Button 
            onClick={onSubmit} 
            disabled={loading} 
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {loading ? 'Menyimpan...' : isEditing ? 'Update' : 'Simpan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};



export default AttendanceDialog