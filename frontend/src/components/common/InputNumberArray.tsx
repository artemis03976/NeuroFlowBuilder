import React, { useState, useEffect, useRef } from 'react';
import { Input, Tooltip } from 'antd';

// Interface for InputNumberArray
interface InputNumberArrayProps {
  // Input value
  value?: number[];
  // Callback function for value change
  onChange?: (value: number[]) => void;
  // Placeholder text for input
  placeholder?: string;
  // Separator for input array
  separator?: string;
  [key: string]: any;
}

/**
 * Component for Input Number Array
 * @param props - InputNumberArrayProps
 */
const InputNumberArray: React.FC<InputNumberArrayProps> = ({ 
  value, 
  onChange, 
  placeholder = "", 
  separator = ',',
  ...props 
}) => {
  // String Store for Input
  const [inputValue, setInputValue] = useState<string>('');
  // Error Message
  const [errorMessage, setErrorMessage] = useState<string>('');
  // Flag for internal update to allow free input
  const isInternalUpdate = useRef<boolean>(false);

  useEffect(() => {
    if (!isInternalUpdate.current) {
      setInputValue(value?.join(separator) || '');
    }
  }, [value, separator]);

  // Confirm if string input is valid
  const validateInput = (input: string): boolean => {
    // Return true if empty
    if (!input.trim()) {
      onChange?.([]);
      isInternalUpdate.current = false;
      return true;
    }

    // Check every part
    const parts = input.split(separator);
    const isValid = parts.every(part => {
      const trimmed = part.trim();
      return trimmed === '' || /^-?\d*\.?\d*$/.test(trimmed);
    });

    setErrorMessage(isValid ? '' : 'Please enter valid numbers separated by commas.');
    return isValid;
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const stringValue = e.target.value;
    setInputValue(stringValue);

    // Mark as internal update
    isInternalUpdate.current = true;

    const isValid = validateInput(stringValue);

    if (!isValid) {
      // Invalid input, do not trigger onChange
      isInternalUpdate.current = false;
      return;
    }

    // Convert string to number array and remove NaN and empty digits
    const numberArray = stringValue
      .split(separator)
      .map(item => {
        const trimmed = item.trim();
        return trimmed === '' ? NaN : Number(trimmed);
      })
      .filter(n => !isNaN(n));
    
    // Trigger external onChange callback
    onChange?.(numberArray);
  };

  return (
    <Tooltip 
      title={errorMessage} 
      open={!!errorMessage && inputValue.trim() !== ''} // 仅在无效且非空时显示Tooltip
      placement="topLeft"
    >
      <Input
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        status={errorMessage ? 'error' : ''}
        {...props}
      />
    </Tooltip>
  );
};

export default InputNumberArray;