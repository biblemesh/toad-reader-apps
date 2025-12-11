import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
  },
  // Disabled state
  disabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

const WebButton = ({
  onPress,
  children,
  status = 'primary',
  size = 'medium',
  appearance = 'filled',
  disabled = false,
  style,
  ...props
}) => {
  const handleClick = (e) => {
    if (!disabled && onPress) {
      onPress(e);
    }
  };

  const getButtonStyles = () => {
    let buttonStyles = { ...styles.button };

    // Apply size
    if (styles[size]) {
      buttonStyles = { ...buttonStyles, ...styles[size] };
    }

    // Apply status
    if (styles[status]) {
      buttonStyles = { ...buttonStyles, ...styles[status] };
    }

    // Apply outline appearance
    if (appearance === 'outline' && styles[status]) {
      buttonStyles = {
        ...buttonStyles,
        backgroundColor: 'transparent',
        color: styles[status].backgroundColor,
        borderColor: styles[status].backgroundColor,
      };
    }

    // Apply disabled state
    if (disabled) {
      buttonStyles = { ...buttonStyles, ...styles.disabled };
    }

    return buttonStyles;
  };

  const getHoverStyles = () => {
    const hoverKey = `${status}Hover`;
    if (styles[hoverKey] && !disabled) {
      if (appearance === 'outline') {
        return {
          backgroundColor: styles[status].backgroundColor,
          color: '#FFFFFF',
        };
      }
      return styles[hoverKey];
    }
    return {};
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={{
        ...getButtonStyles(),
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          const hoverStyles = getHoverStyles();
          Object.assign(e.target.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          const baseStyles = getButtonStyles();
          Object.assign(e.target.style, baseStyles);
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default WebButton;
