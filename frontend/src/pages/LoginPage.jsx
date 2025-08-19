import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext"; // make sure the path is correct
import { Eye, EyeOff, Loader2 } from "lucide-react";

const LoginPage = () => {
  const { setToken, setRole, setName } = useContext(AppContext); // get setToken from context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", { email, password });

     if (response.data.success) {
  const { token, role, name } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("name", name);

  setToken(token);
  setRole(role);
  setName(name);

      // redirect to home
     window.location.href = "/";

      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border rounded-xl px-3 py-2"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border rounded-xl px-3 py-2"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-500"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-teal-500 text-white py-2 rounded-xl flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Logging In...
              </>
            ) : (
              "Login"
            )}
          </button>
        </div>

        <div className="mt-4 text-center text-sm">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-teal-600 hover:text-teal-800">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
