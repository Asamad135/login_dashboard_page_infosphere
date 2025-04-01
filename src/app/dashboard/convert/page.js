'use client';
import { Content } from '@carbon/react';
import UserForm from '@/components/UserForm';
import { Button } from 'carbon-components-react';
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
