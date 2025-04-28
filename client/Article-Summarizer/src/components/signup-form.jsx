import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import axios from "axios";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      alert("Signup successful! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSignup} className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg">
          {/* Header */}
          <div className="space-y-1 p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
            <p className="text-sm text-gray-500">Enter your information to create an account</p>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            {/* Name */}
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-md border border-gray-300 pl-9 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-1"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  className="w-full rounded-md border border-gray-300 pl-9 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-1"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-300 pl-9 pr-9 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-1"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-0 top-0 h-8 w-8 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4 mx-auto" /> : <Eye className="h-4 w-4 mx-auto" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-300 pl-9 pr-9 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-1"
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-0 top-0 h-8 w-8 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4 mx-auto" /> : <Eye className="h-4 w-4 mx-auto" />}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col space-y-3 p-6 border-t">
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create account
            </button>
            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-600 hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
