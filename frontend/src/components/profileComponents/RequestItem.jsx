import React from 'react';
import { 
  Clock, CheckCircle, XCircle, MapPin, User, DollarSign, Calendar, Download,
  Pencil, Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RequestItem = ({ request, onEdit }) => {

  const navigate = useNavigate();


  const getStatusConfig = (status) => {
    switch (status) {
      case 'Approved': 
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <CheckCircle className="w-4 h-4" />,
          bgColor: 'bg-green-50'
        };
      case 'Pending': 
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <Clock className="w-4 h-4" />,
          bgColor: 'bg-yellow-50'
        };
      case 'Rejected': 
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: <XCircle className="w-4 h-4" />,
          bgColor: 'bg-red-50'
        };
      default: 
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <Clock className="w-4 h-4" />,
          bgColor: 'bg-gray-50'
        };
    }
  };

  const statusConfig = getStatusConfig(request.status);
  const formattedDate = new Date(request.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const handleDownloadEvidence = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/help/${request._id}/download`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `evidence-${request._id}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };


    const onDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this request?");
    if (!confirmed) return;

    try {
      const response = await axios.delete(`http://localhost:4000/api/help/${id}`);
      if (response.status === 200) {
        alert("Request deleted successfully");
       
      }
    } catch (err) {
      console.log("error in delete", err);
      alert("Failed to delete request");
    }
  };

  

  return (
    <div className={`border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 ${statusConfig.bgColor}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-semibold text-slate-800 text-base">
              {request.typeOfHelp}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${statusConfig.color}`}>
              {statusConfig.icon}
              <span>{request.status}</span>
            </span>
          </div>
          
          {/* Personal Details */}
          <div className="flex items-center space-x-4 text-sm text-slate-600">
            <div className="flex items-center">
              <User className="w-3 h-3 mr-1" />
              <span>{request.fullName}</span>
              {request.age && <span className="ml-1">({request.age} years)</span>}
            </div>
            {request.location && (
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{request.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-3">
        <p className="text-slate-700 text-sm leading-relaxed line-clamp-2">
          {request.description}
        </p>
      </div>

      {/* Financial Details */}
      {request.typeOfHelp === 'Financial Aid' && request.requestedAmount && (
        <div className="mb-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center text-blue-800">
            <DollarSign className="w-3 h-3 mr-2" />
            <span className="font-medium text-sm">Requested Amount: ${request.requestedAmount.toLocaleString()}</span>
          </div>
          {request.paymentDetails && (
            <p className="text-blue-700 text-xs mt-1">
              Payment Details: {request.paymentDetails}
            </p>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
        <div className="flex items-center text-xs text-slate-400">
          <Calendar className="w-3 h-3 mr-1" />
          <span>Submitted: {formattedDate}</span>
        </div>
        
        <div className="flex items-center gap-2">
          {request.evidenceFileUrl && (
            <button
              onClick={handleDownloadEvidence}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors"
            >
              <Download className="w-3 h-3" />
              <span>Download</span>
            </button>
          )}

          {/* ✅ Show only if Pending */}
          {request.status === 'Pending' && (
            <>
              <button
               onClick={() => navigate(`/update-request/${request._id}`)}
                className="bg-green-100 text-green-700 rounded-full px-3 py-1 flex items-center gap-1 hover:bg-green-200 transition"
              >
                <Pencil size={14} />
                <span className="text-xs font-medium">Edit</span>
              </button>

              <button
                onClick={() => onDelete(request._id)}
                className="bg-red-100 text-red-700 rounded-full px-3 py-1 flex items-center gap-1 hover:bg-red-200 transition"
              >
                <Trash2 size={14} />
                <span className="text-xs font-medium">Delete</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestItem;
