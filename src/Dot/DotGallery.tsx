import React from 'react';
import { Animated, Dimensions, StyleSheet, View, ViewToken } from 'react-native';
import ImageItem from '../ImageItem';
import DotIndicator from './DotIndicator';
import { DotType } from '../types';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        width: WIDTH,
    },
});

interface DotGalleryProps {
    images: any[];
    horizontal?: boolean;
    withZoom?: boolean;
    dotColor?: string;
    dotType?: DotType;
}

const DotGallery: React.FunctionComponent<DotGalleryProps> = ({
    images,
    horizontal = true,
    withZoom = false,
    dotColor = '#FFFFFF',
    dotType = 'expand',
}) => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const galleryRef = React.useRef(null);
    const [, setActiveItem] = React.useState(0);

    const renderImage = React.useCallback(({ item }) => <ImageItem image={item} />, []);

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
                dotType={dotType}
                dotColor={dotColor}
                horizontal={horizontal}
                withZoom={withZoom}
                images={images}
                scrollX={scrollX}
                scrollY={scrollY}
            />
        </React.Fragment>
    );
};

export default DotGallery;
