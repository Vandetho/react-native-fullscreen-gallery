import React from 'react';
import { Animated, Dimensions, View, ViewStyle } from 'react-native';
import Dot from './Dot';
import { DotType } from '../types';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

interface DotIndicatorProps {
    measure: number;
    dotSize: number;
    inputRange: number[];
    dotColor: string;
    horizontal: boolean;
    roundDot: boolean;
    images: any[];
    withZoom: boolean;
    dotType: DotType;
    scrollDirection: Animated.Value;
}

const DotIndicator: React.FunctionComponent<DotIndicatorProps> = ({
    measure,
    dotSize,
    inputRange,
    dotColor,
    horizontal,
    roundDot,
    images,
    dotType,
    withZoom,
    scrollDirection,
}) => {
    const dotStyle = React.useMemo(
        () => ({
            width: dotSize,
            height: dotSize,
            backgroundColor: dotColor,
            zIndex: 1000,
            borderRadius: roundDot ? dotSize / 2 : dotSize / 10,
            ...(horizontal ? { marginRight: dotSize } : { marginBottom: dotSize }),
        }),
        [dotColor, dotSize, horizontal, roundDot],
    );

    const renderIndicators = React.useCallback(
        () =>
            images.map((_: any, index: number) => (
                <Dot
                    dotType={dotType}
                    inputRange={inputRange}
                    horizontal={horizontal}
                    index={index}
                    withZoom={withZoom}
                    dimension={measure}
                    scrollDirection={scrollDirection}
                    style={dotStyle}
                    key={`dot-indicator-${index}`}
                />
            )),
        [dotStyle, dotType, horizontal, images, inputRange, measure, scrollDirection, withZoom],
    );

    const renderSubView = React.useCallback(() => {
        if (['liquid'].includes(dotType)) {
            const inputRange: number[] = [];
            const outputRange: number[] = [];
            const length = images.length * 3;
            for (let i = 0; i < length; ++i) {
                inputRange.push(i / 2);
                outputRange.push(i % 2 !== 0 ? 2 : 1);
            }
            return (
                <Animated.View
                    style={[
                        {
                            width: dotSize,
                            height: dotSize,
                            position: 'absolute',
                        },
                        { backgroundColor: dotColor },
                        {
                            transform: [
                                ...(horizontal
                                    ? [
                                          {
                                              translateX: Animated.divide(scrollDirection, measure).interpolate({
                                                  inputRange: [0, 1],
                                                  outputRange: [0, dotSize * 2],
                                              }),
                                          },
                                          {
                                              scaleX: Animated.divide(scrollDirection, measure).interpolate({
                                                  inputRange,
                                                  outputRange,
                                              }),
                                          },
                                      ]
                                    : [
                                          {
                                              translateY: Animated.divide(scrollDirection, measure).interpolate({
                                                  inputRange: [0, 1],
                                                  outputRange: [0, dotSize * 2],
                                              }),
                                          },
                                          {
                                              scaleY: scrollDirection.interpolate({
                                                  inputRange: [0, 1],
                                                  outputRange: [1, 2],
                                              }),
                                          },
                                      ]),
                            ],
                        },
                    ]}
                />
            );
        }

        return null;
    }, [dotColor, dotSize, dotType, horizontal, images.length, measure, scrollDirection]);

    const indicatorStyle = React.useMemo((): ViewStyle => {
        const index = dotSize > 10 ? 5 : 3;
        return horizontal
            ? {
                  flexDirection: 'row',
                  position: 'absolute',
                  left: WIDTH / index - 20,
                  bottom: 50,
              }
            : {
                  position: 'absolute',
                  top: HEIGHT / index,
                  left: 20,
              };
    }, [dotSize, horizontal]);

    return (
        <View style={indicatorStyle}>
            {renderIndicators()}
            {renderSubView()}
        </View>
    );
};

export default DotIndicator;
