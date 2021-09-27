import React from 'react';
import { Animated, Dimensions, Image as RNImage, ImageSourcePropType } from 'react-native';
import { SlideAnimationType } from './types';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

interface ImageItemProps {
    inputRange: number[];
    image: ImageSourcePropType;
    scrollDirection: Animated.Value;
    slideAnimationType: SlideAnimationType;
    index: number;
}

const ImageItem: React.FunctionComponent<ImageItemProps> = ({
    inputRange,
    image,
    slideAnimationType,
    index,
    scrollDirection,
}) => {
    const zoom = React.useCallback(() => {
        const scale = scrollDirection.interpolate({
            inputRange,
            outputRange: inputRange.map((_, i) => (index === i ? 1 : 0)),
        });
        return { transform: [{ scale }] };
    }, [index, inputRange, scrollDirection]);

    const fade = React.useCallback(() => {
        const opacity = scrollDirection.interpolate({
            inputRange,
            outputRange: inputRange.map((_, i) => (index === i ? 1 : 0)),
        });
        return { opacity };
    }, [index, inputRange, scrollDirection]);

    const animation = React.useMemo(() => {
        if (slideAnimationType === 'slide') {
            return {};
        }
        const effects = { zoom, fade };
        return effects[slideAnimationType]();
    }, [fade, slideAnimationType, zoom]);

    return (
        <RNImage
            source={image}
            resizeMode="cover"
            style={[
                {
                    width: WIDTH,
                    height: HEIGHT,
                },
                animation,
            ]}
        />
    );
};

export default ImageItem;
