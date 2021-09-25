import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

interface LiquidDotProps {
    inputRange: number[];
    index: number;
    scrollValue: Animated.Value;
    style: StyleProp<ViewStyle>;
}

const LiquidDot: React.FunctionComponent<LiquidDotProps> = ({ inputRange, index, scrollValue, style }) => {
    const opacity = scrollValue.interpolate({
        inputRange,
        outputRange: inputRange.map((_, i) => (index === i ? 1 : 0.5)),
    });

    return <Animated.View style={[style, { opacity }]} />;
};

export default LiquidDot;
