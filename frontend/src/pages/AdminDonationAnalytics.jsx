import React, { useEffect, useState } from "react";
import AdminNavigation from "../components/AdminNavigation";
import { 
  BarChart3, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Calendar,
  PieChart,
  Globe,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Cell,
  Area,
  AreaChart
} from "recharts";

export default function AdminDonationAnalyticsPage() {
  const [analytics, setAnalytics] = useState([]);
  const [allDonations, setAllDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('all'); // all, 1m, 3m, 6m, 1y
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAnalytics();
    fetchAllDonations();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:4000/api/donations/analytics");
      if (res.data.success) setAnalytics(res.data.data);
    } catch (err) {
      console.error("Error fetching analytics:", err);
    }
  };

  const fetchAllDonations = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/donations/admin/all");
      if (res.data.success) setAllDonations(res.data.data);
    } catch (err) {
      console.error("Error fetching donations:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchAnalytics(), fetchAllDonations()]);
    setRefreshing(false);
  };

  // Calculate comprehensive metrics
  const totalCollectedLKR = analytics.reduce((acc, cur) => acc + cur.totalAmountLKR, 0);
  const totalCollectedUSD = analytics.reduce((acc, cur) => acc + cur.totalAmountUSD, 0);
  const totalDonations = analytics.reduce((acc, cur) => acc + cur.donationCount, 0);
  const uniqueRequests = new Set(analytics.map((a) => a._id.requestCode)).size;
  const averageDonationLKR = totalDonations > 0 ? totalCollectedLKR / totalDonations : 0;
  
  // Recent donations for trend calculation
  const recentDonations = allDonations.filter(d => {
    const donationDate = new Date(d.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return donationDate >= thirtyDaysAgo;
  });

  const previousPeriodDonations = allDonations.filter(d => {
    const donationDate = new Date(d.createdAt);
    const sixtyDaysAgo = new Date();
    const thirtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return donationDate >= sixtyDaysAgo && donationDate < thirtyDaysAgo;
  });

  const recentTotal = recentDonations.reduce((acc, d) => acc + d.amountLKR, 0);
  const previousTotal = previousPeriodDonations.reduce((acc, d) => acc + d.amountLKR, 0);
  const growthPercentage = previousTotal > 0 ? ((recentTotal - previousTotal) / previousTotal) * 100 : 0;

  // Transform data for charts
  const chartData = analytics.map((item) => ({
    requestCode: item._id.requestCode,
    month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
    totalAmountLKR: item.totalAmountLKR,
    totalAmountUSD: item.totalAmountUSD,
    donationCount: item.donationCount,
  }));

  // Monthly trend data
  const monthlyTrends = analytics.reduce((acc, item) => {
    const monthKey = `${item._id.year}-${String(item._id.month).padStart(2, "0")}`;
    if (!acc[monthKey]) {
      acc[monthKey] = { month: monthKey, totalLKR: 0, totalUSD: 0, count: 0 };
    }
    acc[monthKey].totalLKR += item.totalAmountLKR;
    acc[monthKey].totalUSD += item.totalAmountUSD;
    acc[monthKey].count += item.donationCount;
    return acc;
  }, {});

  const trendData = Object.values(monthlyTrends).sort((a, b) => a.month.localeCompare(b.month));

  // Request performance data (top performing beneficiary requests)
  const requestPerformance = analytics.reduce((acc, item) => {
    const code = item._id.requestCode;
    if (!acc[code]) {
      acc[code] = { requestCode: code, totalLKR: 0, totalUSD: 0, donations: 0 };
    }
    acc[code].totalLKR += item.totalAmountLKR;
    acc[code].totalUSD += item.totalAmountUSD;
    acc[code].donations += item.donationCount;
    return acc;
  }, {});

  const topRequests = Object.values(requestPerformance)
    .sort((a, b) => b.totalLKR - a.totalLKR)
    .slice(0, 5);

  // Colors for charts
  const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16'];

  const statsData = [
    {
      icon: DollarSign,
      label: "Total Collected (LKR)",
      value: totalCollectedLKR.toLocaleString(),
      subValue: `$${totalCollectedUSD.toLocaleString()}`,
      color: "from-emerald-500 to-green-600",
      iconColor: "text-emerald-600",
      bgAccent: "bg-emerald-50",
      trend: growthPercentage > 0 ? "up" : "down",
      trendValue: Math.abs(growthPercentage).toFixed(1)
    },
    {
      icon: Users,
      label: "Total Donations",
      value: totalDonations.toLocaleString(),
      subValue: `${recentDonations.length} this month`,
      color: "from-blue-500 to-indigo-600",
      iconColor: "text-blue-600",
      bgAccent: "bg-blue-50",
      trend: recentDonations.length > previousPeriodDonations.length ? "up" : "down",
      trendValue: recentDonations.length > 0 ? ((recentDonations.length - previousPeriodDonations.length) / Math.max(previousPeriodDonations.length, 1) * 100).toFixed(1) : "0"
    },
    {
      icon: TrendingUp,
      label: "Unique Requests",
      value: uniqueRequests,
      subValue: `Avg. ${(totalDonations / uniqueRequests || 0).toFixed(1)} donations/request`,
      color: "from-purple-500 to-violet-600",
      iconColor: "text-purple-600",
      bgAccent: "bg-purple-50",
      trend: "neutral",
      trendValue: "0"
    },
    {
      icon: BarChart3,
      label: "Average Donation",
      value: `LKR ${averageDonationLKR.toLocaleString()}`,
      subValue: `$${(averageDonationLKR / 320).toFixed(2)} USD`,
      color: "from-orange-500 to-red-600",
      iconColor: "text-orange-600",
      bgAccent: "bg-orange-50",
      trend: "neutral",
      trendValue: "0"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transform scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1350&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-indigo-900/20"></div>
      <div className="absolute inset-0 backdrop-blur-sm bg-white/5"></div>

      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <AdminNavigation
          navBg="bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20"
          buttonBg="bg-gradient-to-r from-blue-900 to-indigo-900 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          buttonIconColor="text-yellow-500"
        />

        <div className="p-6 flex justify-center items-start mt-6">
          <div className="w-full max-w-7xl space-y-8">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full animate-spin-slow opacity-20"></div>
                <div className="relative bg-gradient-to-r from-blue-900 to-indigo-900 rounded-full p-5 shadow-2xl">
                  <Activity className="w-10 h-10 text-yellow-400" />
                </div>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-300 via-gray-200 to-gray-800 bg-clip-text text-transparent mb-4">
                Donation Analytics Dashboard
              </h1>
              <p className="text-xl text-gray-200 font-medium mb-6">
                Comprehensive insights into donation patterns and beneficiary performance
              </p>
              
              {/* Controls */}
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                  Refresh Data
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300">
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {statsData.map((stat, index) => {
                const IconComponent = stat.icon;
                const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
                return (
                  <div
                    key={index}
                    className="group relative bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 p-6 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`${stat.bgAccent} p-3 rounded-xl`}>
                          <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
                        </div>
                        {stat.trend !== 'neutral' && (
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            <TrendIcon className="w-3 h-3" />
                            {stat.trendValue}%
                          </div>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-800 mb-1">
                        {isLoading ? (
                          <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                        ) : (
                          stat.value
                        )}
                      </p>
                      <p className="text-xs text-gray-500">{stat.subValue}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
              {/* Monthly Trends */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Monthly Donation Trends</h3>
                    <p className="text-sm text-gray-600">Track donation patterns over time</p>
                  </div>
                </div>
                <div className="h-80">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData}>
                        <defs>
                          <linearGradient id="colorLKR" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="totalLKR"
                          stroke="#3B82F6"
                          fillOpacity={1}
                          fill="url(#colorLKR)"
                          strokeWidth={3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* Top Performing Requests */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Top Performing Requests</h3>
                    <p className="text-sm text-gray-600">Highest earning beneficiary requests</p>
                  </div>
                </div>
                <div className="h-80">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topRequests} layout="horizontal">
                        <XAxis type="number" tick={{ fontSize: 12 }} />
                        <YAxis dataKey="requestCode" type="category" tick={{ fontSize: 12 }} width={80} />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Bar dataKey="totalLKR" fill="#10B981" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>

            {/* Detailed Chart */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Detailed Analytics by Request</h3>
                    <p className="text-sm text-gray-600">Comprehensive breakdown of all donation requests</p>
                  </div>
                </div>
              </div>
              
              <div className="h-96">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="flex space-x-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <defs>
                        <linearGradient id="totalAmountGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
                          <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.7}/>
                        </linearGradient>
                        <linearGradient id="donationCountGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.9}/>
                          <stop offset="95%" stopColor="#d97706" stopOpacity={0.7}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="requestCode" 
                        tick={{ fill: '#6b7280', fontSize: 11 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid rgba(229, 231, 235, 0.5)',
                          borderRadius: '12px',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                          backdropFilter: 'blur(10px)'
                        }}
                        formatter={(value, name) => [
                          typeof value === 'number' ? value.toLocaleString() : value,
                          name
                        ]}
                      />
                      <Legend />
                      <Bar 
                        dataKey="totalAmountLKR" 
                        fill="url(#totalAmountGradient)" 
                        name="Total Collected (LKR)" 
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="donationCount" 
                        fill="url(#donationCountGradient)" 
                        name="Number of Donations" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}