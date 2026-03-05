import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const styled =
  () => (Component: React.ComponentType<Record<string, unknown>>) =>
    Component;

export const ApplicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => children;

export const CheckBox = React.forwardRef(
  (
    {
      checked,
      onChange,
      ...props
    }: {
      checked: boolean;
      onChange?: (value: boolean) => void;
      [key: string]: unknown;
    },
    ref: React.Ref<unknown>,
  ) => (
    <TouchableOpacity
      {...props}
      ref={ref as React.Ref<typeof TouchableOpacity>}
      accessibilityRole="checkbox"
      onPress={() => onChange?.(!checked)}
    />
  ),
);

export class NativeDateService {
  constructor() {}
}

export const Datepicker = ({
  onSelect,
  ...props
}: {
  onSelect?: (date: Date) => void;
  [key: string]: unknown;
}) => (
  <TouchableOpacity
    {...props}
    onPress={() => onSelect?.(new Date('2024-01-15'))}
  />
);

export const Popover = ({
  anchor,
  children,
}: {
  anchor?: () => React.ReactNode;
  children?: React.ReactNode;
  [key: string]: unknown;
}) => (
  <>
    {anchor?.()}
    {children}
  </>
);

export const Button = React.forwardRef(
  (
    {
      children,
      ...props
    }: { children: React.ReactNode; [key: string]: unknown },
    ref: React.Ref<unknown>,
  ) => (
    <TouchableOpacity
      {...props}
      ref={ref as React.Ref<typeof TouchableOpacity>}
    >
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </TouchableOpacity>
  ),
);
