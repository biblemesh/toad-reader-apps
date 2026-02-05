import React, { useCallback } from "react"

import ReactNativeFlipEditor from "react-native-flip-editor"

const FlipEditor = React.memo(({
  id,
  info,
  updateContent,
  onChangeInfo,
  ...otherProps
 }) => {

  const customUpdateContent = useCallback(
    value => {
      if (updateContent) updateContent(value);
      if (onChangeInfo) onChangeInfo({ id, value, info });
    },
    [ id, info, updateContent, onChangeInfo ],
  )

  return (
    <ReactNativeFlipEditor
      id={id}
      key={id}
      updateContent={customUpdateContent}
      {...otherProps}
    />
  )
})

export default FlipEditor
