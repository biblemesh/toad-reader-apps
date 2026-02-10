import React, { useCallback } from 'react';
import { Button as UIKittenButton } from '@ui-kitten/components';

const Button = React.memo(({ id, info, onPress, testID, ...otherProps }) => {
  const customOnPress = useCallback(() => {
    if (onPress) {
      onPress({ id, info });
    }
  }, [id, info, onPress]);

  return (
    <UIKittenButton {...otherProps} onPress={customOnPress} testID={testID} />
  );
});

export default Button;
