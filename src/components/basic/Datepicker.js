import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import {
  Datepicker as UIKittenDatepicker,
  NativeDateService,
} from '@ui-kitten/components';

const dateService = new NativeDateService('en', { format: 'MMM D, YYYY' });

const styles = StyleSheet.create({
  webContainer: {
    marginBottom: 16,
    width: '100%',
  },
  webLabel: {
    fontSize: 15,
    fontWeight: '400',
    color: '#8F9BB3',
    marginBottom: 8,
  },
});

function toISODateValue(value) {
  if (!value) return '';
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function formatPretty(value) {
  if (!value) return '';
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
}

const Datepicker = React.memo(
  ({ id, info, onSelect, date, label, style, ...otherProps }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hiddenDateRef = useRef(null);

    const customOnSelect = useCallback(
      (selectedDate) => {
        if (onSelect) onSelect(selectedDate, { id, info });
      },
      [id, info, onSelect],
    );

    const handleHiddenDateChange = useCallback(
      (event) => {
        const v = event.target.value; // YYYY-MM-DD
        if (!v) return;
        const selectedDate = new Date(`${v}T00:00:00`);
        if (!Number.isNaN(selectedDate.getTime())) customOnSelect(selectedDate);
      },
      [customOnSelect],
    );

    const prettyValue = useMemo(() => formatPretty(date), [date]);
    const isoValue = useMemo(() => toISODateValue(date), [date]);

    if (Platform.OS === 'web') {
      const wrapperStyle = {
        position: 'relative',
        width: '100%',
        minHeight: 40,
        height: 40,
      };

      const visibleFieldStyle = {
        width: '100%',
        height: 40,
        minHeight: 40,
        boxSizing: 'border-box',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: isFocused ? 'rgb(51, 102, 255)' : 'rgb(228, 233, 242)',
        backgroundColor: 'rgb(247, 249, 252)',
        padding: '7px 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        cursor: 'pointer',
        userSelect: 'none',
        boxShadow: isFocused ? '0 0 0 2px rgba(51, 102, 255, 0.20)' : 'none',
      };

      const iconWrapStyle = {
        width: 18,
        height: 18,
        marginLeft: 8,
        marginRight: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        opacity: 0.7,
        pointerEvents: 'none',
      };

      const valueTextStyle = {
        fontSize: 15,
        fontWeight: 400,
        color: 'rgb(0, 0, 0)',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        pointerEvents: 'none',
      };

      const hiddenInputStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        cursor: 'pointer',
        border: 'none',
        background: 'transparent',
        zIndex: 2,
        WebkitAppearance: 'none',
        appearance: 'none',
      };

      const openPicker = () => {
        const el = hiddenDateRef.current;
        if (!el) return;
        if (typeof el.showPicker === 'function') {
          el.showPicker();
          return;
        }
        el.focus();
        el.click();
      };

      return (
        <View style={[styles.webContainer, style]}>
          {label ? <Text style={styles.webLabel}>{label}</Text> : null}

          <div style={wrapperStyle} onMouseDown={openPicker}>
            <div style={visibleFieldStyle} aria-hidden="true">
              <span style={iconWrapStyle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 3v2M17 3v2M4.5 8.5h15"
                    stroke="rgb(143, 155, 179)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6.5 5h11A2.5 2.5 0 0 1 20 7.5v11A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5v-11A2.5 2.5 0 0 1 6.5 5Z"
                    stroke="rgb(143, 155, 179)"
                    strokeWidth="2"
                  />
                </svg>
              </span>

              <span style={valueTextStyle}>{prettyValue || ' '}</span>
            </div>

            <input
              ref={hiddenDateRef}
              type="date"
              lang="en-US"
              value={isoValue}
              onChange={handleHiddenDateChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={hiddenInputStyle}
              aria-label={label || 'Date'}
              {...otherProps}
            />
          </div>
        </View>
      );
    }

    return (
      <UIKittenDatepicker
        dateService={dateService}
        date={date}
        onSelect={customOnSelect}
        {...otherProps}
      />
    );
  },
);

export default Datepicker;