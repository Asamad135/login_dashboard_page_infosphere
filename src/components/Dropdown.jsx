'use client'
import { Select, SelectItem } from '@carbon/react';

export default function Dropdown({ items, onChange, label = "Select an option" }) {
  return (
    <Select 
      labelText={label}
      onChange={(e) => onChange(e.target.value)}
    >
      <SelectItem value="" text="Choose an option" />
      {items.map((item) => (
        <SelectItem key={item} value={item} text={item} />
      ))}
    </Select>
  );
}
