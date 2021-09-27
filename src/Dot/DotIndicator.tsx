import React from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import Dot from './Dot';
import { DotType } from '../types';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const DOT_SIZE = 10;

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        width: WIDTH,
    },
    horizontalPagination: {
        flexDirection: 'row',
        position: 'absolute',
        left: WIDTH / 3 - 20,
        bottom: 50,
    },
    verticalPagination: {
        position: 'absolute',
        top: HEIGHT / 3,
        left: 20,
    },
    horizontalDot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: 1,
        marginRight: DOT_SIZE,
    },
    verticalDot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: 1,
        marginBottom: DOT_SIZE,
    },
    dotIndicator: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        position: 'absolute',
    },
});

interface DotIndicatorProps {
    measure: number;
    inputRange: number[];
    dotColor: string;
    horizontal: boolean;
    images: any[];
    withZoom: boolean;
    dotType: DotType;
    scrollDirection: Animated.Value;
}

const DotIndicator: React.FunctionComponent<DotIndicatorProps> = ({
    measure,
    inputRange,
    dotColor,
    horizontal,
    images,
    dotType,
    withZoom,
    scrollDirection,
}) => {
    const dotStyle = React.useMemo(() => (horizontal ? styles.horizontalDot : styles.verticalDot), [horizontal]);

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
                    style={[dotStyle, { backgroundColor: dotColor }]}
                    key={`dot-indicator-${index}`}
                />
            )),
        [dotColor, dotStyle, dotType, horizontal, images, inputRange, measure, scrollDirection, withZoom],
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
                        styles.dotIndicator,
                        { backgroundColor: dotColor },
                        {
                            transform: [
                                ...(horizontal
                                    ? [
                                          {
                                              translateX: Animated.divide(scrollDirection, measure).interpolate({
                                                  inputRange: [0, 1],
                                                  outputRange: [0, DOT_SIZE * 2],
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
                                                  outputRange: [0, DOT_SIZE * 2],
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
    }, [dotColor, dotType, horizontal, images.length, measure, scrollDirection]);

    const indicatorStyle = React.useMemo(
        () => (horizontal ? styles.horizontalPagination : styles.verticalPagination),
        [horizontal],
    );

    return (
        <View style={indicatorStyle}>
            {renderIndicators()}
            {renderSubView()}
        </View>
    );
};

export default DotIndicator;
