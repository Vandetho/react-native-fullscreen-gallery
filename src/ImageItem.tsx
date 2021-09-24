import React from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

interface ImageItemProps {
    image: any;
}

const ImageItem: React.FunctionComponent<ImageItemProps> = ({ image }) => {
    const doubleTapRef = React.useRef<any>(null);
    const translateX = React.useRef(new Animated.Value(0)).current;
    const translateY = React.useRef(new Animated.Value(0)).current;
    const scale = React.useRef(new Animated.Value(1)).current;
    const [enabledPan, setEnabledPan] = React.useState(false);

    const resetState = React.useCallback(() => {
        Animated.timing(translateX, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
        Animated.timing(translateY, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
        setEnabledPan(false);
    }, [scale, translateX, translateY]);

    const onPinchStateChange = React.useCallback(
        (event) => {
            if (event.nativeEvent.oldState === State.ACTIVE && event.nativeEvent.scale < 1) {
                resetState();
                return;
            }
            if (event.nativeEvent.oldState === State.ACTIVE) {
                setEnabledPan(true);
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

    const onHandlerPanStateChange = React.useCallback(
        (event) => {
            if (event.nativeEvent.velocityX > 0 && event.nativeEvent.velocityY > 0) {
                translateX.extractOffset();
                translateY.extractOffset();
            }
        },
        [translateX, translateY],
    );

    return (
        <TapGestureHandler waitFor={doubleTapRef}>
            <TapGestureHandler onHandlerStateChange={onDoubleTap} ref={doubleTapRef} numberOfTaps={2}>
                <View>
                    <PanGestureHandler
                        onGestureEvent={Animated.event(
                            [
                                {
                                    nativeEvent: { translationX: translateX, translationY: translateY },
                                },
                            ],
                            {
                                useNativeDriver: true,
                            },
                        )}
                        onHandlerStateChange={onHandlerPanStateChange}
                        enabled={enabledPan}
                    >
                        <Animated.View
                            style={{
                                width: WIDTH,
                                height: HEIGHT,
                                transform: [{ translateX }, { translateY }],
                            }}
                        >
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
                        </Animated.View>
                    </PanGestureHandler>
                </View>
            </TapGestureHandler>
        </TapGestureHandler>
    );
};

export default ImageItem;
