import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, 
  Mail, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  UserPlus, 
  LogIn, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { apiSignIn, apiSignUp, apiGoogleSignIn } from '../services/api';
import { initGoogleSignIn } from '../services/googleAuth';

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+353', country: 'Ireland', flag: '🇮🇪' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: 'custom', country: 'Custom Code', flag: '🌐' }
];

export default function Login({ onLogin, onNavigate }) {
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Registration Type: 'gmail' or 'phone'
  const [signupMethod, setSignupMethod] = useState('gmail');

  // Form Fields (Clean initial state - no dummy or instant data)
  const [name, setName] = useState('');
  const [gmail, setGmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [customCode, setCustomCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Sign In Fields
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Status & Notifications
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Compute full phone representation
  const activeCountryCode = countryCode === 'custom' 
    ? (customCode ? (customCode.startsWith('+') ? customCode : `+${customCode}`) : '+') 
    : countryCode;
  
  const cleanPhoneDigits = phoneNumber.replace(/[\s\-\(\)]/g, '');
  const formattedFullPhone = activeCountryCode && cleanPhoneDigits 
    ? `${activeCountryCode} ${cleanPhoneDigits}` 
    : '';

  // Google SSO Integration
  const googleButtonRef = useRef(null);
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
  const [gisReady, setGisReady] = useState(false);

  const handleGoogleSuccess = async (credential) => {
    setError('');
    setLoading(true);
    try {
      const user = await apiGoogleSignIn(credential);
      onLogin(user);
    } catch (err) {
      setError(err.message || 'Google authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (GOOGLE_CLIENT_ID) {
      initGoogleSignIn({
        clientId: GOOGLE_CLIENT_ID,
        onCredentialResponse: handleGoogleSuccess,
        buttonRef: googleButtonRef,
      }).then((ready) => {
        if (ready) setGisReady(true);
      });
    }
  }, [GOOGLE_CLIENT_ID]);

  const handleGoogleClick = () => {
    if (GOOGLE_CLIENT_ID && window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      // In dev mode or before client ID is configured:
      handleGoogleSuccess('demo_google_token');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (!name.trim()) {
          throw new Error('Please enter your full name.');
        }

        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters long.');
        }

        if (password !== confirmPassword) {
          throw new Error('Passwords do not match. Please re-enter.');
        }

        let payload = {
          name: name.trim(),
          auth_type: signupMethod,
          password
        };

        if (signupMethod === 'gmail') {
          const trimmedGmail = gmail.trim().toLowerCase();
          if (!trimmedGmail) {
            throw new Error('Please enter your Gmail address.');
          }
          if (!/^[a-zA-Z0-9._%+-]+@(?:gmail\.com|googlemail\.com)$/.test(trimmedGmail)) {
            throw new Error('Sign up requires a valid Gmail address (e.g. name@gmail.com).');
          }
          payload.email = trimmedGmail;
          payload.identifier = trimmedGmail;
        } else {
          // Phone validation
          if (!cleanPhoneDigits) {
            throw new Error('Please enter your phone number.');
          }
          if (!activeCountryCode || activeCountryCode === '+' || !/^\+[1-9]\d{0,4}$/.test(activeCountryCode)) {
            throw new Error('Please provide a valid international country code (e.g. +91, +1, +44).');
          }
          if (cleanPhoneDigits.length < 6 || cleanPhoneDigits.length > 14) {
            throw new Error('Please enter a valid phone number (6 to 14 digits).');
          }
          
          const fullPhone = `${activeCountryCode}${cleanPhoneDigits}`;
          payload.phone = fullPhone;
          payload.identifier = fullPhone;
          payload.country_code = activeCountryCode;
          payload.phone_number = cleanPhoneDigits;
        }

        const registeredUser = await apiSignUp(payload);
        
        // As required: No automatic sign in. Switch to Sign In tab and require password.
        setSuccessMessage(`Account created successfully for ${registeredUser.name}! Please enter your password to sign in.`);
        setIsSignUp(false);
        setLoginIdentifier(payload.identifier);
        setLoginPassword('');
        setPassword('');
        setConfirmPassword('');
      } else {
        // Sign In
        const trimmedIdent = loginIdentifier.trim();
        if (!trimmedIdent) {
          throw new Error('Please enter your Gmail address or registered phone number.');
        }
        if (!loginPassword) {
          throw new Error('Please enter your password.');
        }

        const user = await apiSignIn(trimmedIdent, loginPassword);
        onLogin(user);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      
      {/* Ambient RGB background glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        
        {/* Back to Homepage */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate('landing') : (window.location.hash = '')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <span>&larr; Back to Homepage</span>
          </button>
        </div>

        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            Academy Student Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI <span className="rgb-gradient-text">Academy</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            {isSignUp 
              ? 'Register with your Gmail ID or Mobile Phone to access Masterclass & FDE tracks.'
              : 'Sign in to sync your topic coverage and chapters with SQLite.'}
          </p>
        </div>

        {/* RGB Glowing Card Container */}
        <div className="rgb-border-box p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
          
          {/* --- GOOGLE SINGLE SIGN-ON (SSO) --- */}
          <div className="space-y-3">
            {/* Official GIS Button Container (renders when GIS SDK is active) */}
            <div ref={googleButtonRef} className="flex justify-center w-full empty:hidden"></div>

            {/* Fallback / Instant Demo Button (visible while GIS loads or if unconfigured) */}
            {(!GOOGLE_CLIENT_ID || !gisReady) && (
              <button
                type="button"
                disabled={loading}
                onClick={handleGoogleClick}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-700/80 hover:border-purple-500/60 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg hover:shadow-purple-500/25 active:scale-[0.99] group disabled:opacity-50"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="group-hover:text-white">Continue with Google</span>
                {!GOOGLE_CLIENT_ID && (
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Instant Demo
                  </span>
                )}
              </button>
            )}

            {/* Divider */}
            <div className="relative flex items-center justify-center pt-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <span className="relative bg-[#090d16] px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                or continue with password
              </span>
            </div>
          </div>

          {/* Sign In vs Sign Up Tabs */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => { setIsSignUp(false); setError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                !isSignUp 
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/30 font-black' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => { setIsSignUp(true); setError(''); setSuccessMessage(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isSignUp 
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/30 font-black' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              <span className="leading-relaxed font-medium">{successMessage}</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* --- SIGN UP FLOW --- */}
            {isSignUp ? (
              <>
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                {/* Sign up identifier selector: Gmail vs Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Registration Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => { setSignupMethod('gmail'); setError(''); }}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        signupMethod === 'gmail'
                          ? 'bg-amber-500/15 border-amber-500 text-amber-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Gmail ID</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setSignupMethod('phone'); setError(''); }}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        signupMethod === 'phone'
                          ? 'bg-amber-500/15 border-amber-500 text-amber-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Phone Number</span>
                    </button>
                  </div>
                </div>

                {/* Method 1: Gmail Input */}
                {signupMethod === 'gmail' ? (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Gmail ID
                      </label>
                      <span className="text-[11px] text-amber-400 font-medium">
                        Must be @gmail.com
                      </span>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={gmail}
                        onChange={(e) => setGmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        required
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>
                ) : (
                  /* Method 2: Phone with Country Code */
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Phone with Country Code
                      </label>
                      <span className="text-[11px] text-amber-400 font-medium">
                        International Code Required
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      {/* Country Code Selector */}
                      <div className="w-36 shrink-0">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                        >
                          {COUNTRY_CODES.map((item) => (
                            <option key={item.code} value={item.code} className="bg-slate-900 text-white">
                              {item.flag} {item.code} ({item.country})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Custom Code Input if selected */}
                      {countryCode === 'custom' && (
                        <div className="w-20 shrink-0">
                          <input
                            type="text"
                            value={customCode}
                            onChange={(e) => setCustomCode(e.target.value)}
                            placeholder="+..."
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-center"
                          />
                        </div>
                      )}

                      {/* Phone digits */}
                      <div className="flex-1 relative">
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="e.g. 9876543210"
                          required
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Live formatted preview */}
                    {formattedFullPhone && (
                      <div className="mt-1.5 text-[11px] text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Registered format: <strong className="text-slate-200 font-mono">{activeCountryCode}{cleanPhoneDigits}</strong></span>
                      </div>
                    )}
                  </div>
                )}

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Create Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>
              </>
            ) : (
              /* --- SIGN IN FLOW --- */
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Gmail ID or Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="e.g. name@gmail.com or +91 9876543210"
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Use your registered Gmail or phone number with country code.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-left space-y-1 text-xs">
                  <div className="text-[11px] font-semibold text-slate-400">
                    Existing Account Credentials (SQLite):
                  </div>
                  <div className="text-[11px] text-slate-300 font-mono">
                    <span className="text-amber-400 font-semibold">Gmail:</span> student.shriman@gmail.com &bull; <span className="text-amber-400 font-semibold">Pass:</span> 123456
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    <span className="text-blue-400 font-semibold">Phone:</span> +919876500123 &bull; <span className="text-blue-400 font-semibold">Pass:</span> PriyaPassword123!
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rgb-glow-btn disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              {loading ? (
                <span>Connecting to SQLite database...</span>
              ) : isSignUp ? (
                <>
                  <span>Create Account & Register</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Sign In & Load Progress</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>

        {/* Persistent Database notice */}
        <div className="mt-8 text-center flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Accounts & progress stored securely in SQLite `curriculum.db`</span>
        </div>

      </div>
    </div>
  );
}
