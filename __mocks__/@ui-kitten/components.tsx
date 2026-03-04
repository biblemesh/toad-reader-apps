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
