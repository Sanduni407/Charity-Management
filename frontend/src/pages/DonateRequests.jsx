import React, { useState, useEffect } from "react";
import { Search, Target, Users } from "lucide-react";
import axios from "axios";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DonateCard from "../components/DonateCard";

const DonateRequests = () => {
  // -------------------- State --------------------
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUrgency, setSelectedUrgency] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  // -------------------- Fetch Data --------------------
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/posts/");
        setPosts(response.data.posts || []);
        setFilteredPosts(response.data.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // -------------------- Filtering Logic --------------------
  useEffect(() => {
    let filtered = posts;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.beneficiaryName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          post.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          post.itemsToGive?.some((item) =>
            item?.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Urgency filter
    if (selectedUrgency !== "All") {
      filtered = filtered.filter(
        (post) => post.urgencyLevel === selectedUrgency
      );
    }

    // Status filter
    if (selectedStatus !== "All") {
      filtered = filtered.filter((post) => post.status === selectedStatus);
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedUrgency, selectedStatus]);

  // -------------------- Render --------------------
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* -------------------- Header -------------------- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Help Those in Need
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse through urgent requests and make a difference in someone's
            life today. Every contribution counts.
          </p>
        </div>

        {/* -------------------- Search + Filters -------------------- */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, description, or items needed..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              {/* Urgency Filter */}
              <select
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white"
                value={selectedUrgency}
                onChange={(e) => setSelectedUrgency(e.target.value)}
              >
                <option value="All">All Urgency</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>

              {/* Status Filter */}
              <select
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* -------------------- Results Summary -------------------- */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-gray-700">
            <Target className="h-5 w-5 text-red-500" />
            <span className="font-medium">
              {filteredPosts.length} request
              {filteredPosts.length !== 1 ? "s" : ""} found
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-yellow-500" />
              <span>{posts.length} total requests</span>
            </div>
          </div>
        </div>

        {/* -------------------- Posts Grid -------------------- */}
        {loading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 animate-pulse border border-gray-100"
              >
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                  <div className="bg-gray-200 h-4 rounded w-full"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                  <div className="bg-gray-200 h-8 rounded w-full mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          // Show posts
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <DonateCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-12">
            <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-gray-200 shadow-sm">
              <Search className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No requests found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedUrgency("All");
                setSelectedStatus("All");
              }}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DonateRequests;
