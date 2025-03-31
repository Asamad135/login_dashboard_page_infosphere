'use client';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { submitForm } from '@/redux/slices/formSlice';
import { Form, TextInput, TextArea, Button, Stack } from '@carbon/react';
import styles from './UserForm.module.scss';

const UserForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { formData, isSubmitted } = useSelector((state) => state.form);
  
  const [form, setForm] = useState(formData || {
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitForm(form));
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
          labelText="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <TextInput
          id="email"
          labelText="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <TextInput
          id="phone"
          labelText="Phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <TextArea
          id="address"
          labelText="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
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
