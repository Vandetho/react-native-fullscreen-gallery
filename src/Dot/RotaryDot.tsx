import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

interface RotaryDotProps {
    inputRange: number[];
    index: number;
    horizontal: boolean;
    scrollDirection: Animated.Value;
    style: StyleProp<ViewStyle>;
}

const RotaryDot: React.FunctionComponent<RotaryDotProps> = ({
    inputRange,
    index,
    horizontal,
    scrollDirection,
    style,
}) => {
    const scaleSize = scrollDirection.interpolate({
        inputRange,
        outputRange: inputRange.map((_, i) => (index === i ? 2 : index - 1 === i || index + 1 === i ? 1 : 0)),
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

export default RotaryDot;
