import React from 'react';
import { Animated, Dimensions, ImageSourcePropType } from 'react-native';
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
    const config = React.useMemo(
        () => ({
            inputRange,
            outputRange: inputRange.map((_, i) => (index === i ? 1 : 0)),
        }),
        [index, inputRange],
    );

    const zoom = React.useCallback(() => {
        const scale = scrollDirection.interpolate(config);
        return [{ transform: [{ scale }] }];
    }, [config, scrollDirection]);

    const fade = React.useCallback(() => {
        const opacity = scrollDirection.interpolate(config);
        return { opacity };
    }, [config, scrollDirection]);

    const zoomAndFade = React.useCallback(() => {
        const scale = scrollDirection.interpolate(config);
        const opacity = scrollDirection.interpolate(config);
        return [{ opacity }, { transform: [{ scale }] }];
    }, [config, scrollDirection]);

    const animation = React.useMemo(() => {
        if (['slide'].includes(slideAnimationType)) {
            return {};
        }
        const effects = { zoom, fade, zoomAndFade };
        return effects[slideAnimationType]();
    }, [fade, slideAnimationType, zoom, zoomAndFade]);

    return (
        <Animated.Image
            source={image}
            resizeMode="cover"
            style={[
                {
                    width: WIDTH,
                    height: HEIGHT,
                    backgroundColor: '#AAAAAA',
                },
                animation,
            ]}
        />
    );
};

export default ImageItem;
