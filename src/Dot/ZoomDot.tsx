import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

interface ZoomDotProps {
    inputRange: number[];
    index: number;
    scrollValue: Animated.Value;
    style: StyleProp<ViewStyle>;
}

const ZoomDot: React.FunctionComponent<ZoomDotProps> = ({ inputRange, index, scrollValue, style }) => {
    const scaleSize = scrollValue.interpolate({
        inputRange,
        outputRange: inputRange.map((_, i) => (index === i ? 2 : 1)),
    });

    const opacity = scrollValue.interpolate({
        inputRange,
        outputRange: inputRange.map((_, i) => (index === i ? 1 : 0.5)),
    });

    return (
        <Animated.View style={[style, { opacity }, { transform: [{ scaleX: scaleSize }, { scaleY: scaleSize }] }]} />
    );
};

export default ZoomDot;
