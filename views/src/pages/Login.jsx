import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../api/client';

const Login = () => {
  const [role, setRole] = useState('Resident');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth(); const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password) return Swal.fire({ icon: 'error', title: 'Missing details', text: 'Enter your email address and password.' });
    try {
      setIsSubmitting(true); const user = await login(email.trim(), password);
      if (user.role !== role) throw new Error(`This account is registered as ${user.role}.`);
      const destinations = { Admin: '/admin/dashboard', Resident: '/resident/dashboard', Guard: '/guard/active-visitors' };
      navigate(destinations[user.role]);
    } catch (error) { Swal.fire({ icon: 'error', title: 'Unable to sign in', text: error.message || getErrorMessage(error) }); }
    finally { setIsSubmitting(false); }
  };
  return <main className="auth-page"><section className="auth-intro"><div className="auth-intro-content"><div className="auth-logo"><i className="fa-solid fa-building-shield" /></div><span className="auth-eyebrow">SOCIETY HUB</span><h1>Everything your community needs, in one secure place.</h1><p>Manage your society with clarity—from residents and bills to visitors and service requests.</p><div className="auth-feature"><i className="fa-solid fa-shield-halved" /> Role-based, secure access</div><div className="auth-feature"><i className="fa-solid fa-bolt" /> Everyday operations, simplified</div></div></section><section className="auth-panel"><div className="auth-card"><div className="auth-mobile-brand"><i className="fa-solid fa-building-shield" /> Society Hub</div><div className="auth-heading"><span className="auth-kicker">WELCOME BACK</span><h2>Sign in to your account</h2><p>Choose your portal and enter your registered details.</p></div><form onSubmit={handleLogin}><label className="auth-label">ACCESS PORTAL</label><div className="role-picker">{['Resident', 'Admin', 'Guard'].map((item) => <button type="button" key={item} onClick={() => setRole(item)} className={role === item ? 'active' : ''}><i className={`fa-solid ${item === 'Resident' ? 'fa-house' : item === 'Admin' ? 'fa-user-gear' : 'fa-shield-halved'}`} />{item}</button>)}</div><div className="auth-field"><label htmlFor="login-email">Email address</label><div className="auth-input"><i className="fa-regular fa-envelope" /><input id="login-email" required type="email" autoComplete="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div></div><div className="auth-field"><label htmlFor="login-password">Password</label><div className="auth-input"><i className="fa-solid fa-lock" /><input id="login-password" required type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility"><i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} /></button></div></div><button disabled={isSubmitting} className="auth-submit">{isSubmitting ? 'Signing in…' : 'Sign in securely'} <i className="fa-solid fa-arrow-right" /></button></form><p className="auth-switch">New to Society Hub? <Link to="/signup">Create an account</Link></p></div></section></main>;
};
export default Login;
