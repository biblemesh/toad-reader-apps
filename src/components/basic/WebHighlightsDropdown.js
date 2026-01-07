import { useState, useRef, useEffect } from 'react';
import { Platform } from 'react-native';
import { createPortal } from 'react-dom';

export default function WebHighlightsDropdown({
  selectOptions,
  selectedIndexes,
  displayValue,
  onSelect,
}) {
  if (Platform.OS !== 'web') return null;

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const triggerRef = useRef(null);
  const [rect, setRect] = useState(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);

    // Calculate trigger button position
    if (triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      setRect(r);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setHoveredIndex(null);
  };

  const handleItemClick = (index) => {
    // Multi-select behavior: toggle the selection
    const currentlySelected = selectedIndexes.map((idx) => idx.row);
    const isSelected = currentlySelected.includes(index);

    let newSelectedIndexes;
    if (isSelected) {
      // Remove from selection
      newSelectedIndexes = selectedIndexes.filter((idx) => idx.row !== index);
    } else {
      // Add to selection
      newSelectedIndexes = [...selectedIndexes, { row: index }];
    }

    onSelect(newSelectedIndexes);
    // Don't close dropdown for multi-select - let user continue selecting
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target)) {
        // Check if click is inside dropdown
        const dropdownElement = document.querySelector(
          '[data-highlights-dropdown="true"]',
        );
        if (!dropdownElement || !dropdownElement.contains(e.target)) {
          handleClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // ---- Dropdown UI ----
  const dropdown =
    isOpen && rect
      ? createPortal(
          <div
            data-highlights-dropdown="true"
            style={{
              position: 'absolute',
              top: rect.bottom + 4,
              left: rect.left,
              width: rect.width,
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0,0,0,0.15)',
              borderRadius: 6,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 1000,
              maxHeight: 300,
              overflowY: 'auto',
            }}
          >
            {/* ITEMS */}
            {selectOptions.map((item, idx) => {
              const isSelected = selectedIndexes.some(
                (selectedIdx) => selectedIdx.row === idx,
              );
              const isHovered = hoveredIndex === idx;
              const isFirst = idx === 0;
              const isLast = idx === selectOptions.length - 1;

              return (
                <div
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick(idx);
                  }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    minHeight: 40,
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    fontSize: 14,
                    fontWeight: isSelected ? 600 : 400,
                  
                    padding: '8px 16px',
                    cursor: 'pointer',
                    backgroundColor: isSelected
                      ? '#EDF1F7'
                      : isHovered
                        ? '#F7F9FC'
                        : '#FFFFFF',
                    borderBottom: isLast ? 'none' : '1px solid #F0F0F0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: 'rgb(34, 43, 69)',                  
                    borderTopLeftRadius: isFirst ? 6 : 0,
                    borderTopRightRadius: isFirst ? 6 : 0,
                    borderBottomLeftRadius: isLast ? 6 : 0,
                    borderBottomRightRadius: isLast ? 6 : 0,
                    transition: 'background-color 0.15s ease, color 0.15s ease',
                  }}
                >
                  {/* Multi-select checkbox */}
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      border: isSelected
                        ? '1px solid #3366FF'
                        : '1px solid #E4E9F2',
                      backgroundColor: isSelected ? '#3366FF' : 'transparent',
                      borderRadius: 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexShrink: 0,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isSelected && (
                      <svg
                        width="10"
                        height="7"
                        viewBox="0 0 10 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 3L3.5 5.5L9 1"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span style={{ flex: 1, lineHeight: '1.4' }}>
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={handleToggle}
        style={{
          width: '100%',
          height: 48,
          borderRadius: 6,
          border: '1px solid rgba(0,0,0,0.15)',
          background: '#f7f9fc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          cursor: 'pointer',
          fontSize: 'inherit',
          fontFamily: 'inherit',
          textAlign: 'left',
        }}
      >
        <span>{displayValue}</span>
        <span style={{ fontSize: 12 }}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {dropdown}
    </>
  );
}
