import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

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
    <TouchableOpacity {...props} ref={ref as React.Ref<View>}>
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </TouchableOpacity>
  ),
);
