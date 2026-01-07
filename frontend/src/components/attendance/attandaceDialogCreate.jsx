import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import { Button } from '../ui/button';
import AttendanceForm from './AttendanceForm';

const AttendanceDialogCreate = ({
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
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          {isEditing ? 'Edit Absensi' : 'Tambah Absensi'}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Data Absensi' : 'Tambah Data Absensi'}
          </DialogTitle>
          <DialogDescription>
            Isi form di bawah untuk{' '}
            {isEditing ? 'memperbarui' : 'menambahkan'} data absensi
          </DialogDescription>
        </DialogHeader>

        <AttendanceForm
          formData={formData}
          onChange={onInputChange}
          onSelectChange={onSelectChange}
        />

        <DialogFooter>
          <Button
            onClick={async () => {
              onSubmit();
              onOpenChange(false);
            }}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {loading
              ? 'Menyimpan...'
              : isEditing
              ? 'Update'
              : 'Simpan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceDialogCreate;
