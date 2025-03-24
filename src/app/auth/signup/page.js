'use client'
import { Form, Stack, TextInput, Button } from '@carbon/react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Auth.module.scss';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function Signup() {
    
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:9000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: formData.name,
          password: formData.password
        }),
      });

      if (response.ok) {
        router.push('/auth/login');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Signup failed');
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
      <Form className={`${styles.authForm} ${styles.signupForm}`} onSubmit={handleSubmit}>
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
                <span className={styles.loginText}>Sign Up</span>
              </div>
            </div>
            <h2>Welcome to IBM InfoSphere</h2>
          </div>
          <TextInput
            id="name"
            labelText="Full Name"
            required
            value={formData.name}
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
          <TextInput
            id="confirmPassword"
            labelText="Confirm Password"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button type="submit" className={styles.authSubmit}>
            Create Account
          </Button>
          <div className={styles.authLinks}>
            Already have an account?{' '}
            <Link href="/auth/login">Login</Link>
          </div>
        </Stack>
      </Form>
    </div>
  );
}

