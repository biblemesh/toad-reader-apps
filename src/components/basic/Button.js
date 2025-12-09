import React, { useCallback } from "react"
import { Platform } from "react-native"
import { Button as UIKittenButton } from "@ui-kitten/components"
import ButtonWeb from "./Button.web"

const Button = React.memo(({
  id,
  info,
  onPress,
  ...otherProps
 }) => {

  const customOnPress = useCallback(
    () => {
      if (onPress) {
        onPress({ id, info })
      }
    },
    [ id, info, onPress ],
  )

  // Use web-specific Button on web platform
  if (Platform.OS === 'web') {
    return (
      <ButtonWeb
        {...otherProps}
        onPress={customOnPress}
      />
    )
  }

  return (
    <UIKittenButton
      {...otherProps}
      onPress={customOnPress}
    />
  )
})

export default Button
