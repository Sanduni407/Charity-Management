import React, { useState } from "react";
import AdminNavigation from "../components/AdminNavigation";
import { User, FileText, Package, DollarSign, AlertTriangle, Upload, Plus } from "lucide-react";
import { useParams } from "react-router-dom";

export default function CreatePostPage() {
  const { requestId } = useParams();  
  const navigate = (path) => console.log(`Navigating to: ${path}`);

  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [description, setDescription] = useState("");
  const [itemsToGive, setItemsToGive] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [urgency, setUrgency] = useState("Medium");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image");

    const formData = new FormData();
    formData.append("helpRequestId", requestId);
    formData.append("beneficiaryName", beneficiaryName);
    formData.append("description", description);
    formData.append("itemsToGive", JSON.stringify(itemsToGive.split(",")));
    formData.append("goalAmount", goalAmount);
    formData.append("urgencyLevel", urgency);
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:4000/api/posts/create", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert("Post created successfully!");
        navigate("/admin-view-requests");
      } else {
        alert(data.message || "Error creating post");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const getUrgencyColor = (level) => {
    switch (level) {
      case "Low": return "text-green-600 bg-green-50";
      case "Medium": return "text-amber-600 bg-amber-50";
      case "High": return "text-orange-600 bg-orange-50";
      case "Urgent": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
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
        {/* Admin Navigation Bar */}
        <AdminNavigation 
          navBg="bg-white" 
          buttonBg="bg-blue-900" 
          buttonIconColor="text-yellow-600" 
        />

        {/* Page Content */}
        <div className="p-6 flex justify-center items-start mt-6">
          <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-full mb-4">
                <Plus className="w-8 h-8 text-yellow-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Post</h1>
              <p className="text-gray-600">Fill in the details to create a help request post</p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-blue-900 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Post Details</h2>
              </div>

              <div className="p-8 space-y-6">
                {/* Beneficiary Name */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 text-red-600 mr-2" />
                    Beneficiary Name
                  </label>
                  <input
                    type="text"
                    value={beneficiaryName}
                    onChange={(e) => setBeneficiaryName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 transition-all duration-200 outline-none"
                    placeholder="Enter beneficiary's full name"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <FileText className="w-4 h-4 text-red-600 mr-2" />
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 transition-all duration-200 outline-none resize-none"
                    rows="4"
                    placeholder="Describe the help request in detail..."
                    required
                  />
                </div>

                {/* Items to Give */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Package className="w-4 h-4 text-yellow-500 mr-2" />
                    Items To Give
                  </label>
                  <input
                    type="text"
                    value={itemsToGive}
                    onChange={(e) => setItemsToGive(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 transition-all duration-200 outline-none"
                    placeholder="e.g., Food, Clothing, Medicine (comma separated)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple items with commas</p>
                </div>

                {/* Goal Amount */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 text-red-600 mr-2" />
                    Goal Amount
                  </label>
                  <input
                    type="number"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 transition-all duration-200 outline-none"
                    placeholder="Enter target amount"
                    min="0"
                    required
                  />
                </div>

                {/* Urgency Level */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
                    Urgency Level
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 transition-all duration-200 outline-none bg-white"
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(urgency)}`}>
                    Current: {urgency}
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Upload className="w-4 h-4 text-yellow-500 mr-2" />
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 transition-all duration-200 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-900 file:text-yellow-500 file:font-medium hover:file:bg-blue-800 file:cursor-pointer"
                    required
                  />
                  {image && (
                    <div className="mt-2 text-sm text-green-600 font-medium">
                      ✓ {image.name} selected
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-900/30 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5 text-yellow-500" />
                    Create Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}