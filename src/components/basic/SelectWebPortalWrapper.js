import { useState, useRef, useEffect } from 'react';
import { Platform, View, TouchableOpacity, Text, Animated } from 'react-native';
import { createPortal } from 'react-dom';

const SelectWebPortalWrapper = ({
  label,
  value,
  options,
  onSelect,
  disabled,
}) => {
  if (Platform.OS !== 'web') return null;

  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  const anchorRef = useRef(null);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleOpen = () => {
    if (disabled) return;
    Animated.timing(rotateAnim, {
      toValue: open ? 0 : 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
    setOpen(!open);
  };

  useEffect(() => {
    if (!open || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    });
  }, [open]);

  const arrowStyle = {
    transform: [
      {
        rotate: rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'], // down ↔ up
        }),
      },
    ],
  };

  const dropdown =
    open &&
    createPortal(
      <View
        style={{
          position: 'fixed',
          top: pos.top,
          left: pos.left,
          width: pos.width,
          backgroundColor: 'white',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#E4E9F2',
          boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
          zIndex: 999999,
        }}
      >
        {options.map((opt, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onSelect(opt);
              toggleOpen();
            }}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 12,
              backgroundColor: opt.title === value ? '#F7F9FC' : 'white',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: '#151A30',
                fontWeight: opt.title === value ? '600' : '400',
              }}
            >
              {opt.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>,
      document.body,
    );

  return (
    <>
      <View style={{ marginTop: 12 }}>
        <Text
          style={{
            marginBottom: 4,
            color: '#8F9BB3',
            fontSize: 14,
            fontWeight: '500',
          }}
        >
          {label}
        </Text>

        <TouchableOpacity
          ref={anchorRef}
          onPress={toggleOpen}
          style={{
            borderWidth: 1,
            borderColor: open ? '#3366FF' : '#E4E9F2',
            borderRadius: 8,
            paddingVertical: 14,
            paddingHorizontal: 12,
            backgroundColor: disabled ? '#F7F9FC' : 'white',
            opacity: disabled ? 0.6 : 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: '#151A30',
              fontWeight: '500',
            }}
          >
            {value}
          </Text>

          <Animated.Text
            style={[
              {
                fontSize: 12,
                color: '#8F9BB3',
              },
              arrowStyle,
            ]}
          >
            ▼
          </Animated.Text>
        </TouchableOpacity>
      </View>

      {dropdown}
    </>
  );
};

export default SelectWebPortalWrapper;
