'use client';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { updateFormData, setSubmitted } from '@/redux/features/formSlice';
import { Form, TextInput, TextArea, Button, Stack } from '@carbon/react';
import styles from './UserForm.module.scss';

const UserForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);
  const { formData, isSubmitted } = formState;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    ...formData, // Spread the Redux state if it exists
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const newForm = { ...prev, [name]: value };
      dispatch(updateFormData(newForm));
      return newForm;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSubmitted(true));
    router.push('/dashboard');
  };

  if (isSubmitted) {
    return (
      <div className={styles.viewMode}>
        <Stack gap={5}>
          <h3>Submitted Form Data</h3>
          <TextInput
            labelText="Name"
            value={formData.name}
            readonly
          />
          <TextInput
            labelText="Email"
            value={formData.email}
            readonly
          />
          <TextInput
            labelText="Phone"
            value={formData.phone}
            readonly
          />
          <TextArea
            labelText="Address"
            value={formData.address}
            readonly
          />
        </Stack>
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit} className={styles.form}>
      <Stack gap={7}>
        <TextInput
          id="name"
          name="name"
          labelText="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextInput
          id="email"
          name="email"
          labelText="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextInput
          id="phone"
          name="phone"
          labelText="Phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <TextArea
          id="address"
          name="address"
          labelText="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <Button type="submit" kind="primary">
          Submit
        </Button>
      </Stack>
    </Form>
  );
};

export default UserForm;
