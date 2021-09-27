import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

interface ExpandDotProps {
    inputRange: number[];
    index: number;
    horizontal: boolean;
    scrollDirection: Animated.Value;
    style: StyleProp<ViewStyle>;
}

const ExpandDot: React.FunctionComponent<ExpandDotProps> = ({
    inputRange,
    index,
    horizontal,
    scrollDirection,
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

    const scale = React.useMemo(
        () => (horizontal ? { scaleX: scaleSize } : { scaleY: scaleSize }),
        [scaleSize, horizontal],
    );

    return <Animated.View style={[style, { opacity }, { transform: [scale] }]} />;
};

export default ExpandDot;
