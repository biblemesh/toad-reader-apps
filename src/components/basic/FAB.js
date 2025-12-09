import { useCallback } from "react"
import { StyleSheet, Platform } from "react-native"
import { Button, styled } from '@ui-kitten/components'

import useThemedStyleSets from "../../hooks/useThemedStyleSets"
import FABWeb from "./FAB.web"

import Icon from "./Icon"

const styles = StyleSheet.create({
  icon: {
    height: 28,
  },
  button: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    borderRadius: 25,
    width: 50,
    height: 50,
    elevation: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 15,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
})

const FAB = ({
  style,
  iconName,
  iconPack,
  iconStyle,
  status,
  onPress,

  eva: {
    style: themedStyle,
  }={},
}) => {

  // Use web-specific FAB on web platform
  if (Platform.OS === 'web') {
    return (
      <FABWeb
        iconName={iconName}
        status={status}
        onPress={onPress}
        style={style}
      />
    )
  }

  const { baseThemedStyle, iconThemedStyle } = useThemedStyleSets(themedStyle)

  const ButtonIcon = useCallback(
    ({ style }) => (
      <Icon
        name={iconName}
        pack={iconPack}
        style={[
          style,
          styles.icon,
          iconThemedStyle,
          iconStyle,
        ]}
      />
    ),
    [ iconName, iconPack, iconThemedStyle, iconStyle ],
  )

  return (
    <Button
      style={[
        styles.button,
        baseThemedStyle,
        style,
      ]}
      accessoryLeft={ButtonIcon}
      status={status}
      onPress={onPress}
    />
  )
}

export default styled('FAB')(FAB)