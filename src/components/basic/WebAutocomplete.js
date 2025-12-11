import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
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
  },
  inputFocused: {
    borderColor: '#3366FF',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E9F2',
    borderRadius: 4,
    maxHeight: 300,
    overflowY: 'auto',
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F7F9FC',
    cursor: 'pointer',
  },
  dropdownItemHover: {
    backgroundColor: '#F7F9FC',
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
  },
  dropdownItemDisabled: {
    cursor: 'default',
    opacity: 0.6,
  },
});

const WebAutocomplete = ({
  placeholder,
  value,
  onChangeText,
  onSelect,
  children,
  style,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);

  // Calculate dropdown position
  const updateDropdownPosition = useCallback(() => {
    if (inputRef.current && containerRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();

      setDropdownPosition({
        top: inputRect.bottom,
        left: inputRect.left,
        width: inputRect.width,
      });
    }
  }, []);

  // Handle input focus
  const handleFocus = useCallback(() => {
    setIsOpen(true);
    updateDropdownPosition();
  }, [updateDropdownPosition]);

  // Handle input blur with delay to allow clicks
  const handleBlur = useCallback(() => {
    setTimeout(() => {
      setIsOpen(false);
      setFocusedIndex(-1);
      setHoveredIndex(-1);
    }, 150);
  }, []);

  // Handle input change
  const handleChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      if (onChangeText) {
        onChangeText(newValue);
      }
      if (!isOpen) {
        setIsOpen(true);
        updateDropdownPosition();
      }
    },
    [onChangeText, isOpen, updateDropdownPosition],
  );

  // Handle item selection
  const handleItemClick = useCallback(
    (index) => {
      if (onSelect) {
        onSelect(index);
      }
      setIsOpen(false);
      setFocusedIndex(-1);
      setHoveredIndex(-1);
    },
    [onSelect],
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;

      const items = React.Children.toArray(children).filter(
        (child) => !child.props.disabled,
      );

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex((prev) => (prev + 1) % items.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((prev) => (prev <= 0 ? items.length - 1 : prev - 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (focusedIndex >= 0) {
            handleItemClick(focusedIndex);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    },
    [isOpen, children, focusedIndex, handleItemClick],
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        updateDropdownPosition();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, updateDropdownPosition]);

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
        setHoveredIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Render dropdown items
  const renderDropdownItems = () => {
    return React.Children.map(children, (child, index) => {
      if (!child || !child.props) return null;

      const isHovered = hoveredIndex === index;
      const isFocused = focusedIndex === index;
      const isDisabled = child.props.disabled;
      const isLast = index === React.Children.count(children) - 1;

      return (
        <div
          key={index}
          style={{
            ...styles.dropdownItem,
            ...(isLast ? styles.dropdownItemLast : {}),
            ...(isDisabled ? styles.dropdownItemDisabled : {}),
            ...(isHovered || isFocused ? styles.dropdownItemHover : {}),
          }}
          onMouseEnter={() => !isDisabled && setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(-1)}
          onClick={() => !isDisabled && handleItemClick(index)}
        >
          {child.props.title}
        </div>
      );
    });
  };

  // Create portal for dropdown
  const dropdown = isOpen && React.Children.count(children) > 0 && (
    <div
      ref={dropdownRef}
      style={{
        ...styles.dropdown,
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        width: dropdownPosition.width,
      }}
    >
      {renderDropdownItems()}
    </div>
  );

  return (
    <div ref={containerRef} style={{ ...styles.container, ...style }}>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        style={{
          ...styles.input,
          ...(isOpen ? styles.inputFocused : {}),
        }}
        {...props}
      />
      {Platform.OS === 'web' &&
        typeof document !== 'undefined' &&
        createPortal(dropdown, document.body)}
    </div>
  );
};

// Web-only AutocompleteItem component for compatibility
export const WebAutocompleteItem = () => {
  // This is just a placeholder - the actual rendering is handled by WebAutocomplete
  return null;
};

export default WebAutocomplete;
