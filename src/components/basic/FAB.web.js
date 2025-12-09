import React from 'react';
import { Platform } from 'react-native';
import Icon from './Icon';

const FAB = ({ iconName, onPress, style, ...props }) => {
  if (Platform.OS !== 'web') return null;

  return (
    <button
      onClick={onPress}
      style={{
        width: 56,
        height: 56,
        backgroundColor: '#3366FF', // UI Kitten primary
        borderRadius: '50%',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transition: '150ms',
        outline: 'none',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.95)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      {...props}
    >
      <Icon name={iconName} size={22} color="white" />
    </button>
  );
};

export default FAB;
