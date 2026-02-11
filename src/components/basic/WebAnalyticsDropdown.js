import { useState, useRef, useEffect } from 'react';
import { Platform } from 'react-native';
import { i18n } from 'inline-i18n';
import { createPortal } from 'react-dom';

export default function WebAnalyticsDropdown({
  label,
  currentStudentIdx,
  students,
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
    onSelect({ row: index });
    handleClose();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target)) {
        // Check if click is inside dropdown
        const dropdownElement = document.querySelector(
          '[data-analytics-dropdown="true"]',
        );
        if (!dropdownElement || !dropdownElement.contains(e.target)) {
          handleClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Build dropdown items
  const dropdownItems = [
    {
      index: 0,
      title: i18n('Entire classroom', '', 'enhanced'),
      isSelected: currentStudentIdx === -1,
    },
    ...students.map((student, idx) => ({
      index: idx + 1,
      title: i18n('{{fullname}} ({{email}})', '', 'enhanced', {
        fullname: student.fullname || '—',
        email: student.email,
      }),
      isSelected: currentStudentIdx === idx,
    })),
  ];

  const selectedItem = dropdownItems.find((item) => item.isSelected);
  const displayValue = selectedItem
    ? selectedItem.title
    : dropdownItems[0].title;

  // ---- Dropdown UI ----
  const dropdown =
    isOpen && rect
      ? createPortal(
          <div
            data-analytics-dropdown="true"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              fontSize: 13,
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
            {dropdownItems.map((item, idx) => {
              const isHovered = hoveredIndex === idx;
              const isFirst = idx === 0;
              const isLast = idx === dropdownItems.length - 1;

              return (
                <div
                  key={item.index}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick(item.index);
                  }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    minHeight: 40,
                    padding: '8px 16px',
                    cursor: 'pointer',
                    backgroundColor: item.isSelected
                      ? '#EDF1F7'
                      : isHovered
                        ? '#F7F9FC'
                        : '#FFFFFF',
                    borderBottom: isLast ? 'none' : '1px solid #F0F0F0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 14,
                    fontWeight: 'normal',
                    color: '#333333',
                    borderTopLeftRadius: isFirst ? 6 : 0,
                    borderTopRightRadius: isFirst ? 6 : 0,
                    borderBottomLeftRadius: isLast ? 6 : 0,
                    borderBottomRightRadius: isLast ? 6 : 0,
                    transition: 'background-color 0.15s ease',
                  }}
                >
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
      {/* Label */}
      {label && (
        <div
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: 15,
            fontWeight: 'normal',
            color: '#8F9BB3',
            marginBottom: 8
          }}
        >
          {label}
        </div>
      )}

      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={handleToggle}
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
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
          fontSize: '15px',
          textAlign: 'left',
          fontWeight: '500',
        }}
      >
        <span style={{
            flex: 1,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            marginRight: 8
          }}>
            {displayValue}
        </span>
        <span style={{ fontSize: 12 }}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {dropdown}
    </>
  );
}
