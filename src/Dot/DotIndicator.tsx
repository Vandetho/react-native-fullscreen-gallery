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
    dotColor: string;
    horizontal: boolean;
    images: any[];
    withZoom: boolean;
    dotType: DotType;
    scrollX: Animated.Value;
    scrollY: Animated.Value;
}

const DotIndicator: React.FunctionComponent<DotIndicatorProps> = ({
    dotColor,
    horizontal,
    images,
    dotType,
    withZoom,
    scrollX,
    scrollY,
}) => {
    const dotStyle = React.useMemo(() => (horizontal ? styles.horizontalDot : styles.verticalDot), [horizontal]);

    const measure = React.useMemo(() => (horizontal ? WIDTH : HEIGHT), [horizontal]);

    const scroll = React.useMemo(() => (horizontal ? scrollX : scrollY), [horizontal, scrollX, scrollY]);

    const inputRange = React.useMemo(() => images.map((_, index) => measure * index), [images, measure]);

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
                    scrollValue={scroll}
                    style={[dotStyle, { backgroundColor: dotColor }]}
                    key={`dot-indicator-${index}`}
                />
            )),
        [dotColor, dotStyle, dotType, horizontal, images, inputRange, measure, scroll],
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
                                              translateX: Animated.divide(scrollX, measure).interpolate({
                                                  inputRange: [0, 1],
                                                  outputRange: [0, DOT_SIZE * 2],
                                              }),
                                          },
                                          {
                                              scaleX: Animated.divide(scrollX, measure).interpolate({
                                                  inputRange,
                                                  outputRange,
                                              }),
                                          },
                                      ]
                                    : [
                                          {
                                              translateY: Animated.divide(scrollY, measure).interpolate({
                                                  inputRange: [0, 1],
                                                  outputRange: [0, DOT_SIZE * 2],
                                              }),
                                          },
                                          {
                                              scaleY: scrollY.interpolate({ inputRange: [0, 1], outputRange: [1, 2] }),
                                          },
                                      ]),
                            ],
                        },
                    ]}
                />
            );
        }

        return null;
    }, [dotColor, dotType, horizontal, images.length, measure, scrollX, scrollY]);

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
