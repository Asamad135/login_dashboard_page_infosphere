'use client';
import { Content } from '@carbon/react';
import UserForm from '@/components/UserForm';

export default function ConvertPage() {
  return (
    <Content>
      <div style={{ padding: '2rem' }}>
        <h1>Convert/Compare Module</h1>
        <UserForm />
      </div>
    </Content>
  );
}
