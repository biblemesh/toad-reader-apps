import React from 'react';
import { Platform } from 'react-native';

const Button = ({
  onPress,
  disabled,
  accessoryLeft,
  children,
  style,
  ...props
}) => {
  if (Platform.OS !== 'web') return null;

  return (
    <button
      onClick={disabled ? undefined : () => onPress?.(props)}
      disabled={disabled}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        backgroundColor: 'transparent',
        border: 'none',
        padding: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        borderRadius: '4px',
        transition: '150ms',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = '#f2f2f2';
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {accessoryLeft &&
        (typeof accessoryLeft === 'function'
          ? accessoryLeft({}) // left icon component
          : accessoryLeft)}

      {children && <span>{children}</span>}
    </button>
  );
};

export default Button;
