import React from 'react';
import { Animated, Dimensions, ImageResizeMode, ImageSourcePropType, StyleSheet, View, ViewToken } from 'react-native';
import ImageItem from '../ImageItem';
import DotIndicator from './DotIndicator';
import { DotType, SlideAnimationType } from '../types';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        width: WIDTH,
    },
});

interface DotGalleryProps {
    images: ImageSourcePropType[];
    slideAnimationType: SlideAnimationType;
    resizeMode?: ImageResizeMode;
    roundDot: boolean;
    horizontal?: boolean;
    dotSize: number;
    withZoom?: boolean;
    dotColor?: string;
    dotType?: DotType;
}

const DotGallery: React.FunctionComponent<DotGalleryProps> = ({
    images,
    slideAnimationType,
    dotSize,
    resizeMode,
    horizontal = true,
    roundDot = false,
    withZoom = false,
    dotColor = '#FFFFFF',
    dotType = 'expand',
}) => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const galleryRef = React.useRef(null);
    const [, setActiveItem] = React.useState(0);

    const measure = React.useMemo(() => (horizontal ? WIDTH : HEIGHT), [horizontal]);

    const inputRange = React.useMemo(() => images.map((_, index) => measure * index), [images, measure]);

    const scrollDirection = React.useMemo(() => (horizontal ? scrollX : scrollY), [horizontal, scrollX, scrollY]);

    const renderImage = React.useCallback(
        ({ item, index }: { item: ImageSourcePropType; index: number }) => (
            <ImageItem
                inputRange={inputRange}
                scrollDirection={scrollDirection}
                resizeMode={resizeMode}
                image={item}
                index={index}
                slideAnimationType={slideAnimationType}
            />
        ),
        [inputRange, resizeMode, scrollDirection, slideAnimationType],
    );

    const snapToInterval = React.useMemo(() => (horizontal ? WIDTH : HEIGHT), [horizontal]);

    const keyExtractor = React.useCallback((_, index) => `image-gallery-${index}`, []);

    const viewableItemsChanged = React.useRef(({ viewableItems }: { viewableItems: ViewToken[] }) =>
        setActiveItem(viewableItems[0].index),
    ).current;

    const viewabilityConfig = React.useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return (
        <React.Fragment>
            <View style={styles.container}>
                <Animated.FlatList
                    data={images}
                    renderItem={renderImage}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={horizontal}
                    snapToInterval={snapToInterval}
                    decelerationRate="fast"
                    disableIntervalMomentum
                    bounces={false}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY, x: scrollX } } }], {
                        useNativeDriver: true,
                    })}
                    keyExtractor={keyExtractor}
                    ref={galleryRef}
                />
            </View>
            <DotIndicator
                measure={measure}
                inputRange={inputRange}
                dotType={dotType}
                dotColor={dotColor}
                dotSize={dotSize}
                roundDot={roundDot}
                horizontal={horizontal}
                withZoom={withZoom}
                images={images}
                scrollDirection={scrollDirection}
            />
        </React.Fragment>
    );
};

export default DotGallery;
