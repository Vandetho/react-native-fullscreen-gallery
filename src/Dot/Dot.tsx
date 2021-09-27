import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { DotType } from '../types';
import ExpandDot from './ExpandDot';
import RotaryDot from './RotaryDot';
import FadeDot from './FadeDot';
import LiquidDot from './LiquidDot';
import ZoomDot from './ZoomDot';

interface DotProps {
    inputRange: number[];
    index: number;
    dimension: number;
    horizontal: boolean;
    dotType: DotType;
    scrollValue: Animated.Value;
    style: StyleProp<ViewStyle>;
}

const Dot: React.FunctionComponent<DotProps> = ({ dotType, ...props }) => {
    const dots = React.useMemo(
        () => ({
            expand: <ExpandDot {...props} />,
            rotary: <RotaryDot {...props} />,
            fade: <FadeDot {...props} />,
            liquid: <LiquidDot {...props} />,
            zoom: <ZoomDot {...props} />,
        }),
        [props],
    );

    return dots[dotType];
};

export default Dot;
