import React from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    ImageResizeMode,
    ImageSourcePropType,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';
import ImageItem from '../ImageItem';
import { SlideAnimationType } from '../types';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen');

interface PreviewGalleryProps {
    images: ImageSourcePropType[];
    slideAnimationType: SlideAnimationType;
    resizeMode?: ImageResizeMode;
    activeImage: number;
    horizontal?: boolean;
    scrollX: Animated.Value;
    scrollY: Animated.Value;
    onChangeActiveImage: (index: number) => void;
}

const PreviewGallery: React.FunctionComponent<PreviewGalleryProps> = ({
    images,
    activeImage,
    resizeMode,
    slideAnimationType,
    horizontal = true,
    scrollX,
    scrollY,
    onChangeActiveImage,
}) => {
    const galleryRef = React.useRef<FlatList>(null);

    React.useEffect(() => {
        if (galleryRef.current && images) {
            galleryRef.current.scrollToIndex({ animated: true, index: activeImage });
        }
    }, [activeImage, images]);

    const measure = React.useMemo(() => (horizontal ? WIDTH : HEIGHT), [horizontal]);

    const scrollDirection = React.useMemo(() => (horizontal ? scrollX : scrollY), [horizontal, scrollX, scrollY]);

    const inputRange = React.useMemo(() => images.map((_, index) => measure * index), [images, measure]);

    const renderItem = React.useCallback(
        ({ item, index }: { item: ImageSourcePropType; index: number }) => (
            <ImageItem
                image={item}
                index={index}
                resizeMode={resizeMode}
                slideAnimationType={slideAnimationType}
                inputRange={inputRange}
                scrollDirection={scrollDirection}
            />
        ),
        [inputRange, resizeMode, scrollDirection, slideAnimationType],
    );

    const onMomentumScrollEnd = React.useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const { nativeEvent } = event;
            const index = horizontal ? nativeEvent.contentOffset.x / WIDTH : nativeEvent.contentOffset.y / HEIGHT;
            if (index >= 0) {
                onChangeActiveImage(index);
            }
        },
        [horizontal, onChangeActiveImage],
    );

    const snapToInterval = React.useMemo(() => (horizontal ? WIDTH : HEIGHT), [horizontal]);

    const getItemLayout = React.useCallback(
        (_, index) => {
            const length = horizontal ? WIDTH : HEIGHT;
            return { length: length, offset: length * index, index };
        },
        [horizontal],
    );

    const keyExtractor = React.useCallback((_, index) => `image-gallery-${index}`, []);

    return (
        <Animated.FlatList
            data={images}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={horizontal}
            snapToInterval={snapToInterval}
            decelerationRate="fast"
            disableIntervalMomentum
            bounces={false}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY, x: scrollX } } }], {
                useNativeDriver: true,
            })}
            keyExtractor={keyExtractor}
            onMomentumScrollEnd={onMomentumScrollEnd}
            scrollEventThrottle={32}
            getItemLayout={getItemLayout}
            ref={galleryRef}
        />
    );
};

export default PreviewGallery;
