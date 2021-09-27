import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

interface FadeDotProps {
    inputRange: number[];
    index: number;
    horizontal: boolean;
    scrollDirection: Animated.Value;
    style: StyleProp<ViewStyle>;
}

const FadeDot: React.FunctionComponent<FadeDotProps> = ({ inputRange, index, horizontal, scrollDirection, style }) => {
    const scaleSize = scrollDirection.interpolate({
        inputRange,
        outputRange: inputRange.map((_, i) => (index === i ? 2 : 1)),
    });

    const opacity = scrollDirection.interpolate({
        inputRange,
        outputRange: inputRange.map((_, i) => (index === i ? 1 : index - 1 === i || index + 1 === i ? 0.5 : 0)),
    });

    const scale = React.useMemo(
        () => (horizontal ? { scaleX: scaleSize } : { scaleY: scaleSize }),
        [scaleSize, horizontal],
    );

    return <Animated.View style={[style, { opacity }, { transform: [scale] }]} />;
};

export default FadeDot;
