import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { STATUS_OPTIONS } from '../../utils/constants';

const AttendanceForm = ({ formData, onChange, onSelectChange, }) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="studentName">Nama Mahasiswa</Label>
        <Input
          id="studentName"
          name="studentName"
          value={formData.studentName}
          onChange={onChange}
          placeholder="Masukkan nama mahasiswa"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="studentId">NIM</Label>
        <Input
          id="studentId"
          name="studentId"
          value={formData.studentId}
          onChange={onChange}
          placeholder="Masukkan NIM"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="subject">Mata Kuliah</Label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={onChange}
          placeholder="Masukkan nama mata kuliah"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="date">Tanggal</Label>
        <Input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={onChange}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="status">Status Kehadiran</Label>
        <Select className="bg-gray-100" value={formData.status} onValueChange={onSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AttendanceForm;