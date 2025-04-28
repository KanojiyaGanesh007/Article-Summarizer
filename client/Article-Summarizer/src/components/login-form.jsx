import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful!");

      // 🔁 Change redirect to /menu
      navigate("/menu");
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex min-h-screen items-center justify-center bg-gray-50 p-4"
    >
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-md">
        <div className="p-6 space-y-1 border-b">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="text-sm text-gray-500">Enter your email and password to login to your account</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                className="w-full rounded-md border border-gray-300 bg-white px-10 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-10 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember" className="text-sm font-medium text-gray-700">Remember me</label>
            </div>
            <Link to="#" className="text-sm font-medium text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>
        <div className="p-6 space-y-4 border-t">
          <button type="submit" className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 text-sm font-medium">
            Login
          </button>
          <div className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
