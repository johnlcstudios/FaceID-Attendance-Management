import React, { useState } from 'react';
import { Calendar, Clock, History, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import FaceScanner from '../../components/FaceScanner';
import { toast } from 'react-toastify';

// Mock attendance history data
const mockAttendanceHistory = [
  { date: '2025-04-14', timeIn: '08:55 AM', timeOut: '05:10 PM', status: 'present' },
  { date: '2025-04-13', timeIn: '08:50 AM', timeOut: '05:05 PM', status: 'present' },
  { date: '2025-04-12', timeIn: '09:10 AM', timeOut: '05:00 PM', status: 'late' },
  { date: '2025-04-11', timeIn: '08:45 AM', timeOut: '05:15 PM', status: 'present' },
  { date: '2025-04-10', timeIn: '- -', timeOut: '- -', status: 'absent' },
];

enum AttendanceMode {
  CHECK_IN = 'check-in',
  CHECK_OUT = 'check-out',
}

const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const [showFaceScanner, setShowFaceScanner] = useState(false);
  const [attendanceMode, setAttendanceMode] = useState<AttendanceMode>(AttendanceMode.CHECK_IN);
  const [attendanceStatus, setAttendanceStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [attendanceTime, setAttendanceTime] = useState<string | null>(null);
  
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const handleMarkAttendance = (mode: AttendanceMode) => {
    setAttendanceMode(mode);
    setShowFaceScanner(true);
  };
  
  const handleFaceCapture = () => {
    setAttendanceStatus('processing');
    
    setTimeout(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setAttendanceStatus('success');
      setAttendanceTime(timeString);
      
      const actionText = attendanceMode === AttendanceMode.CHECK_IN ? 'Check-in' : 'Check-out';
      toast.success(`${actionText} successful at ${timeString}`);
    }, 1500);
  };
  
  const handleReset = () => {
    setShowFaceScanner(false);
    setAttendanceStatus('idle');
    setAttendanceTime(null);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Employee Dashboard</h1>
        <div className="flex items-center mt-2 text-blue-600">
          <Calendar size={16} className="mr-2 text-blue-600" />
          <span>{today}</span>
          <Clock size={16} className="ml-4 mr-2 text-blue-600" />
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
      
      <div>
        <div className="flex items-center mb-4">
          <History size={20} className="mr-2 text-blue-600" />
          <h2 className="text-xl font-semibold text-blue-700">Attendance History</h2>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border-4 border-blue-500">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-200">
              <thead className="bg-blue-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
                  >
                    Check In
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
                  >
                    Check Out
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-200">
                {mockAttendanceHistory.map((record, index) => (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                      {record.timeIn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                      {record.timeOut}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {record.status === 'present' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Present
                        </span>
                      ) : record.status === 'late' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          Late
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Absent
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;