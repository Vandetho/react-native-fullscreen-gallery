import React from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { PinchGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

interface ImageItemProps {
    image: any;
}

const ImageItem: React.FunctionComponent<ImageItemProps> = ({ image }) => {
    const doubleTapRef = React.useRef<any>(null);
    const scale = React.useRef(new Animated.Value(1)).current;

    const resetState = React.useCallback(() => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, [scale]);

    const onPinchStateChange = React.useCallback(
        (event) => {
            if (event.nativeEvent.oldState === State.ACTIVE && event.nativeEvent.scale < 1) {
                resetState();
                return;
            }
        },
        [resetState],
    );

    const onDoubleTap = React.useCallback(
        (event) => {
            if (event.nativeEvent.state === State.ACTIVE) {
                resetState();
            }
        },
        [resetState],
    );

    return (
        <TapGestureHandler waitFor={doubleTapRef}>
            <TapGestureHandler onHandlerStateChange={onDoubleTap} ref={doubleTapRef} numberOfTaps={2}>
                <View>
                    <PinchGestureHandler
                        onGestureEvent={Animated.event(
                            [
                                {
                                    nativeEvent: { scale: scale },
                                },
                            ],
                            {
                                useNativeDriver: true,
                            },
                        )}
                        onHandlerStateChange={onPinchStateChange}
                    >
                        <Animated.Image
                            source={image}
                            resizeMode="cover"
                            style={{
                                width: WIDTH,
                                height: HEIGHT,
                                transform: [{ scale }],
                            }}
                        />
                    </PinchGestureHandler>
                </View>
            </TapGestureHandler>
        </TapGestureHandler>
    );
};

export default ImageItem;
