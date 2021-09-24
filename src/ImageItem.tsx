import React from 'react';
import { Animated, Dimensions } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

interface ImageItemProps {
    image: any;
}

const ImageItem: React.FunctionComponent<ImageItemProps> = ({ image }) => {
    const scale = React.useRef(new Animated.Value(1)).current;

    const onPinchStateChange = React.useCallback(
        (event) => {
            if (event.nativeEvent.oldState === State.ACTIVE) {
                Animated.spring(scale, {
                    toValue: 1,
                    useNativeDriver: true,
                }).start();
            }
        },
        [scale],
    );

    return (
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
                style={{ width: WIDTH, height: HEIGHT, transform: [{ scale: scale }] }}
            />
        </PinchGestureHandler>
    );
};

export default ImageItem;
