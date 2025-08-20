import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Download, Users, MapPin, HelpCircle, FileText, DollarSign, CheckCircle, XCircle, Clock, Upload } from "lucide-react";
import Footer from "../components/Footer";
import AdminNavigation from "../components/AdminNavigation";

export default function AdminHelpRequests() {
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/help/");
      setRequests(response.data.data || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:4000/api/help/${id}/status`, {
        status: newStatus
      });
      fetchRequests(); // refresh table
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDownload = (id) => {
    window.open(`http://localhost:4000/api/help/${id}/download`, "_blank");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-50 text-green-700 border-green-300";
      case "Rejected":
        return "bg-red-50 text-red-700 border-red-300";
      default:
        return "bg-yellow-50 text-yellow-700 border-yellow-300";
    }
  };

  const getHelpTypeColor = (typeOfHelp) => {
    switch (typeOfHelp) {
      case 'Financial Aid':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Medical Support':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Food Assistance':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Educational Support':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Emergency Relief':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Housing Support':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Other':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('https://www.pecva.org/wp-content/uploads/VCE_JMSWCD_VGBI_Event_Glenmore_Farm_Fauquier_County_9.21.22_credit_Hugh_Kenny_PEC-23-of-39-1024x683.jpg')`
        }}
      />
      
      {/* Glass Morphism Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>
      
      {/* Content Wrapper */}
      <div className="relative z-10">
        <AdminNavigation/>
        
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-200">Help Requests</h1>
                <p className="text-blue-600">Administrative Dashboard</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-xl font-bold text-gray-900">
                    {requests.filter(r => r.status === "Pending").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Approved</p>
                  <p className="text-xl font-bold text-gray-900">
                    {requests.filter(r => r.status === "Approved").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <XCircle className="w-6 h-6 text-red-500" />
                <div>
                  <p className="text-sm text-gray-500">Rejected</p>
                  <p className="text-xl font-bold text-gray-900">
                    {requests.filter(r => r.status === "Rejected").length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-800 via-indigo-800 to-blue-900 text-white">
                    <th className="p-4 text-left border-b border-indigo-700">
                      <div className="flex items-center gap-2 font-semibold">
                        <Users className="w-4 h-4 text-yellow-500" />
                        Full Name
                      </div>
                    </th>
                    <th className="p-4 text-left border-b border-indigo-700">
                      <div className="flex items-center gap-2 font-semibold">
                        <MapPin className="w-4 h-4 text-yellow-500" />
                        Location
                      </div>
                    </th>
                    <th className="p-4 text-left border-b border-indigo-700">
                      <div className="flex items-center gap-2 font-semibold">
                        <HelpCircle className="w-4 h-4 text-yellow-500" />
                        Type of Help
                      </div>
                    </th>
                    <th className="p-4 text-left border-b border-indigo-700">
                      <div className="flex items-center gap-2 font-semibold">
                        <FileText className="w-4 h-4 text-yellow-500" />
                        Description
                      </div>
                    </th>
                    <th className="p-4 text-left border-b border-indigo-700">
                      <div className="flex items-center gap-2 font-semibold">
                        <DollarSign className="w-4 h-4 text-yellow-500" />
                        Amount
                      </div>
                    </th>
                    <th className="p-4 text-center border-b border-indigo-700">
                      <div className="flex items-center justify-center gap-2 font-semibold">
                        <Upload className="w-4 h-4 text-yellow-500" />
                        Evidence
                      </div>
                    </th>
                    <th className="p-4 text-center border-b border-indigo-700">
                      <div className="flex items-center justify-center gap-2 font-semibold">
                        <CheckCircle className="w-4 h-4 text-yellow-500" />
                        Status
                      </div>
                    </th>
                    <th className="p-4 text-center border-b border-indigo-700">
                      <div className="font-semibold">Action</div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="p-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <HelpCircle className="w-12 h-12 text-gray-400" />
                          <p className="text-gray-500 text-lg">No requests found</p>
                          <p className="text-gray-400 text-sm">Help requests will appear here once submitted</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    requests.map((req, index) => (
                      <tr 
                        key={req._id} 
                        className={`hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`}
                      >
                        <td className="p-4 border-b border-gray-100">
                          <span className="text-gray-900 font-medium">{req.fullName}</span>
                        </td>
                        <td className="p-4 border-b border-gray-100">
                          <span className="text-gray-700">{req.location || "-"}</span>
                        </td>
                        <td className="p-4 border-b border-gray-100">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border ${getHelpTypeColor(req.typeOfHelp)}`}>
                            <HelpCircle className="w-3 h-3" />
                            {req.typeOfHelp}
                          </span>
                        </td>
                        <td className="p-4 border-b border-gray-100 max-w-xs">
                          <p className="text-gray-700 truncate" title={req.description}>
                            {req.description}
                          </p>
                        </td>
                        <td className="p-4 border-b border-gray-100">
                          {req.requestedAmount ? (
                            <span className="text-green-600 font-semibold">
                              Rs. {req.requestedAmount.toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-4 border-b border-gray-100 text-center">
                          {req.evidenceFileUrl ? (
                            <button
                              onClick={() => handleDownload(req._id)}
                              className="inline-flex items-center justify-center w-10 h-10 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 hover:text-yellow-700 rounded-lg transition-all duration-200 border border-yellow-200 hover:border-yellow-300"
                              title="Download Evidence"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-4 border-b border-gray-100">
                          <div className="flex items-center justify-center">
                            <select
                              value={req.status}
                              onChange={(e) =>
                                handleStatusChange(req._id, e.target.value)
                              }
                              className={`px-3 py-2 rounded-lg border text-sm font-medium bg-white ${getStatusColor(req.status)} focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Approved">Approved</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </div>
                        </td>
                        <td className="p-4 border-b border-gray-100 text-center">
                          <button
                            className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 ${
                              req.status === "Approved"
                                ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 shadow-lg hover:shadow-green-500/25"
                                : "bg-gray-300 cursor-not-allowed opacity-50"
                            }`}
                            disabled={req.status !== "Approved"}
                            onClick={() => navigate(`/admin/create-post/${req._id}`)}
                          >
                            {req.status === "Approved" ? (
                              <div className="flex items-center gap-2">
                                <Upload className="w-4 h-4" />
                                Post
                              </div>
                            ) : (
                              "Post"
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}