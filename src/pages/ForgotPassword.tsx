import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/images/magnetic-background.webp';
import magneticLogo from '../assets/images/powered-by-magnetic-logo.svg';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulación - aquí iría la llamada al API
    setTimeout(() => {
      setMessage('If an account exists with this email, you will receive password reset instructions.');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={backgroundImage}
          alt="Magnetic Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-grey-500 mb-3">
              Forgot your password?
            </h1>
            <p className="text-grey-300">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          {/* Success Message */}
          {message && (
            <div className="mb-6 p-4 bg-success/10 border border-success/30 rounded-lg">
              <p className="text-sm text-success">{message}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-grey-500 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-grey-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder=""
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send reset instructions'}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              ← Back to login
            </button>
          </div>

          {/* Powered by Magnetic */}
          <div className="mt-16">
            <div className="flex items-center justify-center">
              <img
                src={magneticLogo}
                alt="Powered by Magnetic"
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
