import React, { useCallback } from 'react';
import { CheckBox as UIKittenCheckBox } from '@ui-kitten/components';

const CheckBox = React.memo(({ id, onChange, onChangeInfo, ...otherProps }) => {
  const customOnChange = useCallback(
    (value) => {
      if (onChange) onChange(value);
      if (onChangeInfo) onChangeInfo({ id, value });
    },
    [id, onChange, onChangeInfo],
  );

  return <UIKittenCheckBox {...otherProps} onChange={customOnChange} />;
});

export default CheckBox;
