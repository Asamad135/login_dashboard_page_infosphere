'use client'
import { TextInput as CarbonTextInput } from '@carbon/react';
import styles from './TextInput.module.scss';

export default function TextInput({ 
  labelText, 
  placeholder, 
  onChange, 
  value,
  id = "text-input" 
}) {
  return (
    <div className={styles.textInputWrapper}>
      <CarbonTextInput
        id={id}
        labelText={labelText}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
}
