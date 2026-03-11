import React from 'react';
import { TouchableOpacity, Text, TextInput, View } from 'react-native';

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
      ref={ref as React.Ref<View>}
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

export const Tooltip = ({
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

export const Select = ({
  onSelect,
  ...props
}: {
  onSelect?: (selectionInfo: Record<string, unknown>) => void;
  [key: string]: unknown;
}) => (
  <TouchableOpacity
    {...(props as object)}
    onPress={() => onSelect?.({ row: 0 })}
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

export const Input = React.forwardRef(
  (
    {
      onChangeText,
      ...props
    }: { onChangeText?: (text: string) => void; [key: string]: unknown },
    ref: React.Ref<unknown>,
  ) => (
    <TextInput
      {...(props as object)}
      ref={ref as React.Ref<TextInput>}
      onChangeText={onChangeText}
    />
  ),
);

export const Layout = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
  [key: string]: unknown;
}) => <View {...(props as object)}>{children}</View>;

export const Radio = React.forwardRef(
  (
    {
      onChange,
      ...props
    }: { onChange?: (value: boolean) => void; [key: string]: unknown },
    ref: React.Ref<unknown>,
  ) => (
    <TouchableOpacity
      {...(props as object)}
      ref={ref as React.Ref<View>}
      onPress={() => onChange?.(true)}
    />
  ),
);

export const RadioGroup = ({
  onChange,
  ...props
}: {
  onChange?: (index: number) => void;
  [key: string]: unknown;
}) => <TouchableOpacity {...(props as object)} onPress={() => onChange?.(0)} />;

export const Drawer = ({
  children,
  header,
  footer,
}: {
  children?: React.ReactNode;
  header?: () => React.ReactNode;
  footer?: () => React.ReactNode;
  [key: string]: unknown;
}) => (
  <View>
    {header?.()}
    {children}
    {footer?.()}
  </View>
);

export const DrawerItem = ({
  title,
}: {
  title?: string;
  [key: string]: unknown;
}) => (title ? <Text>{title}</Text> : null);

export const Modal = ({
  children,
  visible,
}: {
  children?: React.ReactNode;
  visible?: boolean;
  [key: string]: unknown;
}) => (visible ? <View>{children}</View> : null);

export const List = ({
  ListHeaderComponent,
  ListFooterComponent,
  ...props
}: {
  data?: unknown[];
  renderItem?: (info: { item: unknown; index: number }) => React.ReactNode;
  ListHeaderComponent?: React.ReactNode;
  ListFooterComponent?: React.ReactNode;
  [key: string]: unknown;
}) => (
  <View {...(props as object)}>
    {ListHeaderComponent}
    {ListFooterComponent}
  </View>
);

export const OverflowMenu = ({
  children,
  anchor,
}: {
  children?: React.ReactNode;
  anchor?: () => React.ReactNode;
  [key: string]: unknown;
}) => (
  <>
    {anchor?.()}
    {children}
  </>
);

export const MenuItem = ({
  title,
}: {
  title?: string;
  [key: string]: unknown;
}) => (title ? <Text>{title}</Text> : null);

export const SelectItem = ({
  title,
}: {
  title?: string;
  [key: string]: unknown;
}) => (title ? <Text>{title}</Text> : null);

export class IndexPath {
  row: number;
  constructor(row: number) {
    this.row = row;
  }
}

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
