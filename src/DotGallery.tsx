import React from 'react';
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const DOT_SIZE = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE * 2;

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        width: WIDTH,
    },
    horizontalPagination: {
        flexDirection: 'row',
        position: 'absolute',
        left: WIDTH / 3,
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
        borderRadius: DOT_SIZE,
        backgroundColor: '#FFFFFF',
        marginRight: DOT_SIZE,
    },
    verticalDot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE,
        backgroundColor: '#FFFFFF',
        marginBottom: DOT_SIZE,
    },
    horizontalDotIndicator: {
        width: DOT_INDICATOR_SIZE,
        height: DOT_INDICATOR_SIZE,
        borderRadius: DOT_INDICATOR_SIZE,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        position: 'absolute',
        top: -DOT_SIZE / 2,
        left: -DOT_SIZE / 2,
    },
    verticalDotIndicator: {
        width: DOT_INDICATOR_SIZE,
        height: DOT_INDICATOR_SIZE,
        borderRadius: DOT_INDICATOR_SIZE,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        position: 'absolute',
        top: -DOT_SIZE / 2,
        left: -DOT_SIZE / 2,
    },
});

interface ImageGalleryProps {
    images: any[];
    horizontal?: boolean;
}

const ImageGallery: React.FunctionComponent<ImageGalleryProps> = ({ images, horizontal = true }) => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const renderImage = React.useCallback(({ item }) => {
        return <Image source={item} resizeMode="cover" style={{ width: WIDTH, height: HEIGHT }} />;
    }, []);

    const snapToInterval = React.useMemo(() => (horizontal ? WIDTH : HEIGHT), [horizontal]);

    const dotStyle = React.useMemo(() => (horizontal ? styles.horizontalDot : styles.verticalDot), [horizontal]);

    const renderIndicators = React.useCallback(
        () => images.map((_, index) => <View key={`image-gallery-${index}-indicator`} style={dotStyle} />),
        [dotStyle, images],
    );

    const keyExtractor = React.useCallback((_, index) => `image-gallery-${index}`, []);

    const indicatorStyle = React.useMemo(
        () => (horizontal ? styles.horizontalPagination : styles.verticalPagination),
        [horizontal],
    );

    const dotIndicatorStyle = React.useMemo(
        () => (horizontal ? styles.horizontalDotIndicator : styles.verticalDotIndicator),
        [horizontal],
    );

    return (
        <React.Fragment>
            <View style={styles.container}>
                <Animated.FlatList
                    data={images}
                    renderItem={renderImage}
                    showsHorizontalScrollIndicator={false}
                    horizontal={horizontal}
                    snapToInterval={snapToInterval}
                    decelerationRate="fast"
                    bounces={false}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY, x: scrollX } } }], {
                        useNativeDriver: true,
                    })}
                    keyExtractor={keyExtractor}
                />
            </View>
            <View style={indicatorStyle}>
                {renderIndicators()}
                <Animated.View
                    style={[
                        dotIndicatorStyle,
                        {
                            transform: [
                                {
                                    translateX: Animated.divide(scrollX, WIDTH).interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, DOT_INDICATOR_SIZE],
                                    }),
                                },
                                {
                                    translateY: Animated.divide(scrollY, HEIGHT).interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, DOT_INDICATOR_SIZE],
                                    }),
                                },
                            ],
                        },
                    ]}
                />
            </View>
        </React.Fragment>
    );
};

export default ImageGallery;
