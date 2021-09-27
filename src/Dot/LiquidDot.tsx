import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

interface LiquidDotProps {
    inputRange: number[];
    index: number;
    withZoom: boolean;
    scrollDirection: Animated.Value;
    style: StyleProp<ViewStyle>;
}

const LiquidDot: React.FunctionComponent<LiquidDotProps> = ({
    inputRange,
    index,
    scrollDirection,
    withZoom,
    style,
}) => {
    const scaleSize = scrollDirection.interpolate({
        inputRange,
        outputRange: inputRange.map((_, i) => (index === i ? 2 : 1)),
    });

    const opacity = scrollDirection.interpolate({
        inputRange,
        outputRange: inputRange.map((_, i) => (index === i ? 1 : 0.5)),
    });

    return (
        <Animated.View
            style={[style, { opacity }, withZoom && { transform: [{ scaleX: scaleSize }, { scaleY: scaleSize }] }]}
        />
    );
};

export default LiquidDot;
