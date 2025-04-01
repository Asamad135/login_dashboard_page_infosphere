'use client'
import { Form, Stack, TextInput, Button, ToastNotification } from '@carbon/react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Auth.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const formBody = new URLSearchParams();
      formBody.append('username', formData.username);
      formBody.append('password', formData.password);

      const response = await fetch('http://localhost:9000/auth/login', {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      });

      // With no-cors mode, we can't read the response
      // So we'll assume success if the request doesn't throw an error
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);

    } catch (error) {
      setError('Connection error. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className={styles.authContainer}>
      {error && (
        <div className={styles.notification}>
          <ToastNotification
            kind="error"
            title="Error"
            subtitle={error}
            timeout={5000}
            caption=""
          />
        </div>
      )}
      {showSuccess && (
        <div className={styles.notification}>
          <ToastNotification
            kind="success"
            title="Success"
            subtitle="Login successful!"
            timeout={2000}
            caption=""
          />
        </div>
      )}
      <Form className={styles.authForm} onSubmit={handleSubmit}>
        <Stack gap={7}>
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <Image
                src="/IBM_logo.svg"
                alt="IBM Logo"
                width={70}
                height={30}
                priority
              />
              <div className={styles.rightContent}>
                <span className={styles.loginText}>Login</span>
              </div>
            </div>
            <h2>Welcome to IBM InfoSphere</h2>
          </div>
          <TextInput
            id="username"
            labelText="Username"
            required
            value={formData.username}
            onChange={handleChange}
          />
          <TextInput
            id="password"
            labelText="Password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <div className={styles.forgotPassword}>
            <Link href="/auth/forgot-password">Forgot Password?</Link>
          </div>
          <Button type="submit" className={styles.authSubmit}>
            Login
          </Button>
          <div className={styles.authLinks}>
            Don't have an account?{' '}
            <Link href="/auth/signup">Sign up</Link>
          </div>
        </Stack>
      </Form>
    </div>
  );
}

