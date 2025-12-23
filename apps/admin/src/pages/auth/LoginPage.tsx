import { Button, Input } from '@f-code/components';
import React, { useState } from 'react';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

export function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginErrors>({});

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
  };

  const handleInputChange = (field: keyof LoginFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-xl">RB</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Rode Battle Admin</h1>
          <p className="text-sm text-gray-600">Sign in to manage competitions</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email')(e.target.value)}
            placeholder="admin@rode.com"
            error={errors.email}
            fullWidth
          />

          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password')(e.target.value)}
            placeholder="Enter password"
            error={errors.password}
            fullWidth
          />

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" fullWidth loading={false}>
              'Sign In'
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">Rode Battle</p>
        </div>
      </div>
    </div>
  );
}
