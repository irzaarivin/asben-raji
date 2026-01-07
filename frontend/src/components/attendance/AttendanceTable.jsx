import React from 'react';
import { Button } from '../ui/button';
import { Edit, Trash2, UserCheck } from 'lucide-react';
import StatusBadge from './StatusBadge';
import Loading from '../common/Loading';
import EmptyState from '../common/EmptyState';
import { formatDate } from '../../utils/formatters';

const AttendanceTable = ({ attendances, onEdit, onDelete, loading }) => {
  if (loading && attendances.length === 0) {
    return <Loading message="Memuat data absensi..." />;
  }

  if (attendances.length === 0) {
    return (
      <EmptyState
        title="Belum ada data absensi"
        description="Klik tombol 'Tambah Absensi' untuk menambahkan data pertama"
        icon={UserCheck}
      />
    );
  }

  return (
    <>
      {/* ===== MOBILE VIEW (CARD) ===== */}
 <div className="space-y-4 md:hidden">
  {attendances.map((attendance) => (
    <div
      key={attendance.id}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500">NIM</p>
          <p className="text-sm font-semibold text-gray-800">
            {attendance.nim}
          </p>
        </div>

        <StatusBadge status={attendance.status} />
      </div>

      {/* Main Info */}
      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-500">Nama</p>
          <p className="font-medium text-gray-800">
            {attendance.name}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Mata Kuliah</p>
          <p className="text-gray-700">
            {attendance.matkul}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Tanggal</p>
          <p className="text-gray-700">
            {formatDate(attendance.updatedAt)}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-3 border-t">
        <Button
          size="sm"
          className="flex-1"
          onClick={() => onEdit(attendance)}
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </Button>

        <Button
          size="sm"
          variant="destructive"
          className="flex-1"
          onClick={() => onDelete(attendance.id)}
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Hapus
        </Button>
      </div>
    </div>
  ))}
</div>


      {/* ===== DESKTOP TABLE ===== */}
      <div className="hidden md:block overflow-x-auto">
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
              <tr
                key={attendance.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 text-sm text-gray-600">{attendance.nim}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">{attendance.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{attendance.matkul}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {formatDate(attendance.updatedAt)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={attendance.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <Button size="sm" onClick={() => onEdit(attendance)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(attendance.id)}
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
    </>
  );
};

export default AttendanceTable;
