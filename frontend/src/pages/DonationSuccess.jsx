import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, Home, Heart, User, CreditCard, Calendar, ArrowRight, Gift, Sparkles } from "lucide-react";
import axios from "axios";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("Verifying payment...");
  const [donation, setDonation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`http://localhost:4000/api/donations/verify/${sessionId}`);
        if (res.data.success) {
          setDonation(res.data.donation);
          setStatus("Payment Successful!");
          setError(false);
        } else {
          setStatus("Payment Not Completed");
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setStatus("Error Verifying Payment");
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (sessionId) {
      verifyPayment();
    } else {
      setStatus("Invalid Session");
      setError(true);
      setIsLoading(false);
    }
  }, [sessionId]);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navbar />
        
        <div className="pt-20 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-20">
                <div className="relative mb-8">
                  <div className="w-20 h-20 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-rose-600 animate-pulse" />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-700">Verifying your payment...</h2>
                <p className="text-gray-500 mt-2">Please wait while we confirm your donation</p>
              </div>
            )}

            {/* Success State */}
            {!isLoading && !error && (
              <div className="text-center">
                {/* Success Animation */}
                <div className="mb-8">
                  <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 max-w-2xl mx-auto">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    Thank You! 🎉
                  </h1>
                  
                  <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-blue-600 mx-auto rounded-full mb-6"></div>
                  
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Your generous donation has been successfully processed. You're making a real difference in someone's life!
                  </p>

                  {/* Donation Details */}
                  {donation && (
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 mb-8 text-left">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        <Gift className="w-6 h-6 inline mr-2 text-rose-600" />
                        Donation Details
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-sm">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium">Donation ID</p>
                            <p className="text-lg font-semibold text-gray-800">{donation.donationId}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-sm">
                          <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-rose-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium">Donor Name</p>
                            <p className="text-lg font-semibold text-gray-800">{donation.donorName || "Anonymous Donor"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-sm">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Heart className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium">Amount Donated</p>
                            <p className="text-lg font-semibold text-gray-800">LKR {donation.amountLKR.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-sm">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium">Request Code</p>
                            <p className="text-lg font-semibold text-gray-800">{donation.beneficiaryRequestCode}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Impact Message */}
                  <div className="bg-gradient-to-r from-rose-50 to-blue-50 rounded-2xl p-6 mb-8 border border-rose-100">
                    <div className="text-center">
                      <Heart className="w-8 h-8 text-rose-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-800 mb-2">Your Impact</h4>
                      <p className="text-gray-600 text-sm">
                        Your donation will directly help someone in need. We'll send you updates on how your contribution is making a difference.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleGoHome}
                      className="bg-gradient-to-r from-rose-600 to-blue-700 text-white px-8 py-4 rounded-full hover:from-rose-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                    >
                      <Home className="w-5 h-5" />
                      <span>Return to Home</span>
                    </button>
                    
                    <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-blue-700 hover:text-blue-700 transition-all duration-300 hover:bg-blue-50 flex items-center justify-center space-x-2">
                      <span>View More Causes</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Error State */}
            {!isLoading && error && (
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>

                <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 max-w-2xl mx-auto">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Payment Issue
                  </h1>
                  
                  <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full mb-6"></div>
                  
                  <p className="text-xl text-gray-600 mb-8">
                    {status === "Invalid Session" ? "No payment session found." : status}
                  </p>
                  
                  <div className="bg-red-50 rounded-2xl p-6 mb-8 border border-red-100">
                    <p className="text-red-600 text-sm">
                      If you think this is an error, please contact our support team. We're here to help resolve any issues with your donation.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleGoHome}
                      className="bg-gradient-to-r from-rose-600 to-blue-700 text-white px-8 py-4 rounded-full hover:from-rose-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                    >
                      <Home className="w-5 h-5" />
                      <span>Return to Home</span>
                    </button>
                    
                    <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-blue-700 hover:text-blue-700 transition-all duration-300 hover:bg-blue-50">
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default DonationSuccess;