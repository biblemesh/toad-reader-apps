import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8F9BB3',
    marginBottom: 8,
    display: 'block',
  },
  input: {
    width: '100%',
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E4E9F2',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    outline: 'none',
    fontFamily: 'inherit',
  },
});

const WebInput = ({
  value,
  onChangeText,
  placeholder,
  label,
  style,
  ...props
}) => {
  const handleChange = (e) => {
    if (onChangeText) {
      onChangeText(e.target.value);
    }
  };

  return (
    <div style={{ ...styles.container, ...style }}>
      {label && <label style={styles.label}>{label}</label>}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        style={styles.input}
        onFocus={(e) => {
          e.target.style.borderColor = styles.inputFocused.borderColor;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = styles.input.borderColor;
        }}
        {...props}
      />
    </div>
  );
};

export default WebInput;
