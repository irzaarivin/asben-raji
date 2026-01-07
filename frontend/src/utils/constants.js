export const ATTENDANCE_STATUS = {
  HADIR: 'hadir',
  IZIN: 'izin',
  SAKIT: 'sakit',
  ALPHA: 'alpha'
};

export const STATUS_OPTIONS = [
  { value: ATTENDANCE_STATUS.HADIR, label: 'Hadir' },
  { value: ATTENDANCE_STATUS.IZIN, label: 'Izin' },
  { value: ATTENDANCE_STATUS.SAKIT, label: 'Sakit' },
  { value: ATTENDANCE_STATUS.ALPHA, label: 'Alpha' }
];

export const STATUS_STYLES = {
  [ATTENDANCE_STATUS.HADIR]: 'bg-green-100 text-green-800 border-green-200',
  [ATTENDANCE_STATUS.IZIN]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  [ATTENDANCE_STATUS.SAKIT]: 'bg-blue-100 text-blue-800 border-blue-200',
  [ATTENDANCE_STATUS.ALPHA]: 'bg-red-100 text-red-800 border-red-200'
};

export const ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info'
};

export const MESSAGES = {
  SUCCESS_CREATE: 'Data berhasil ditambahkan!',
  SUCCESS_UPDATE: 'Data berhasil diperbarui!',
  SUCCESS_DELETE: 'Data berhasil dihapus!',
  ERROR_FETCH: 'Tidak dapat terhubung ke API. Menggunakan data demo.',
  CONFIRM_DELETE: 'Yakin ingin menghapus data ini?'
};