import type { ReactNode } from 'react'
import type { ImageErrorEventData, ImageResizeMode, ImageSourcePropType, ImageStyle, NativeSyntheticEvent, StyleProp } from 'react-native'
import { Animated, Image, TouchableOpacity } from 'react-native'

interface Props {
  readonly source: ImageSourcePropType
  readonly resizeMode: ImageResizeMode
  readonly imageOpacity: Animated.Value
  readonly renderToHardwareTextureAndroid: boolean
  readonly disabled: boolean
  readonly style?: StyleProp<ImageStyle>
  onDialogOpen(): void
  onLongPressOriginImage?(): void
  renderImageComponent?(params: {
    readonly source: ImageSourcePropType
    readonly style?: StyleProp<ImageStyle>
    readonly resizeMode: ImageResizeMode
  }): ReactNode,
  onError?: (event: NativeSyntheticEvent<ImageErrorEventData>) => void
}

const OriginImage = ({
  source,
  resizeMode,
  imageOpacity,
  renderToHardwareTextureAndroid,
  disabled,
  style,
  onDialogOpen,
  onLongPressOriginImage,
  renderImageComponent,
  onError,
}: Props) => {
  const handleOpen = (): void => {
    if (disabled) {
      return
    }
    onDialogOpen()
  }

  return (
    <Animated.View
      renderToHardwareTextureAndroid={renderToHardwareTextureAndroid}
      style={[{ opacity: imageOpacity }]}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={{ alignSelf: 'baseline' }}
        onPress={handleOpen}
        onLongPress={onLongPressOriginImage}
      >
        {typeof renderImageComponent === 'function' ? (
          renderImageComponent({
            source,
            style,
            resizeMode,
          })
        ) : (
          <Image source={source} style={style} resizeMode={resizeMode} onError={(event:any)=> console.log("error")}/>
        )}
      </TouchableOpacity>
    </Animated.View>
  )
}

export { OriginImage }
