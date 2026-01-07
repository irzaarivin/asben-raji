import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';

import Header from '../components/layout/Header';
import AttendanceTable from '../components/attendance/AttendanceTable';
import AttendanceDialogCreate from '../components/attendance/attandaceDialogCreate';
import { useAttendance } from '../hooks/useAttendance';

const AttendancePage = () => {
  const {
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
    handleCloseDialog
  } = useAttendance();

  return (
<div className="p-3 sm:p-4 md:p-8">
  <div className="max-w-6xl mx-auto space-y-4">
        <Header />

        {/* Error Alert */}
        {error && (
          <Alert className="border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Success Alert */}
        {success && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {success}
            </AlertDescription>
          </Alert>
        )}

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-3xl text-slate-900">
                  Data Absensi
                </CardTitle>
                <CardDescription className="text-indigo-900">
                  Total {attendances.length} record absensi
                </CardDescription>
              </div>

              <AttendanceDialogCreate
                isOpen={isDialogOpen}
                onOpenChange={handleCloseDialog}
                formData={formData}
                onInputChange={handleInputChange}
                onSelectChange={handleSelectChange}
                onSubmit={handleSubmit}
                isEditing={!!editingId}
                loading={loading}
              />
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <AttendanceTable
              attendances={attendances}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendancePage;
