import React from 'react';
import { Login } from '../pages/Login';

interface AuthGateProps {
  onAuthenticated: () => void;
}

export const AuthGate: React.FC<AuthGateProps> = ({ onAuthenticated }) => {
  return <Login onAuthenticated={onAuthenticated} />;
};

