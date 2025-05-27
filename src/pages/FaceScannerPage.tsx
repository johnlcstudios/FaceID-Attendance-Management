import React from 'react';
import FaceScanner from '../components/FaceScanner';

const FaceScannerPage: React.FC = () => {
  const handleCapture = () => {
    // You can add any logic here if needed
    alert('Face captured!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Face Scanner</h1>
        <FaceScanner onCapture={handleCapture} buttonText="Scan Face" />
      </div>
    </div>
  );
};

export default FaceScannerPage;
