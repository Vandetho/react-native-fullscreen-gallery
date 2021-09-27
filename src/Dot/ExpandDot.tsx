import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

interface ExpandDotProps {
    inputRange: number[];
    index: number;
    horizontal: boolean;
    dotSize: number;
    roundDot: boolean;
    scrollDirection: Animated.Value;
    style: StyleProp<ViewStyle>;
}

const ExpandDot: React.FunctionComponent<ExpandDotProps> = ({
    inputRange,
    index,
    dotSize,
    roundDot,
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

    const borderRadius = React.useMemo(
        () =>
            roundDot
                ? {
                      borderRadius: scrollDirection.interpolate({
                          inputRange,
                          outputRange: inputRange.map((_, i) => (index === i ? dotSize / 2.5 : dotSize / 2)), // scale ratio 2.33
                      }),
                  }
                : {},
        [dotSize, index, inputRange, roundDot, scrollDirection],
    );

    const scale = React.useMemo(
        () => (horizontal ? { scaleX: scaleSize } : { scaleY: scaleSize }),
        [scaleSize, horizontal],
    );

    return <Animated.View style={[style, { opacity }, borderRadius, { transform: [scale] }]} />;
};

export default ExpandDot;
