import { Form, Stack, TextInput, Button, Link, ToastNotification } from '@carbon/react';
import Image from 'next/image';
import styles from '@/styles/Auth.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const formBody = new URLSearchParams();
      formBody.append('username', formData.username);
      formBody.append('password', formData.password);

      const response = await fetch('http://localhost:9000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      });

      if (response.ok) {
        const text = await response.text();
        if (text.includes('successful')) {
          setShowSuccess(true);
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        } else {
          setError('Login failed');
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
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
            <Link href="#" onClick={() => router.push('/auth/forgot-password')}>
              Forgot Password?
            </Link>
          </div>
          <Button type="submit" className={styles.authSubmit}>
            Login
          </Button>
          <div className={styles.authLinks}>
            Don't have an account?{' '}
            <Link href="#" onClick={() => router.push('/auth/signup')}>
              Sign up
            </Link>
          </div>
        </Stack>
      </Form>
    </div>
  );
}
