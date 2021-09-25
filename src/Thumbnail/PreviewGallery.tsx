import React from 'react';
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import ImageItem from '../ImageItem';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen');

interface PreviewGalleryProps {
    images: any[];
    activeImage: number;
    horizontal?: boolean;
    onChangeActiveImage: (index: number) => void;
}

const PreviewGallery: React.FunctionComponent<PreviewGalleryProps> = ({
    images,
    activeImage,
    horizontal = true,
    onChangeActiveImage,
}) => {
    const galleryRef = React.useRef<FlatList>(null);

    React.useEffect(() => {
        if (galleryRef.current && images) {
            galleryRef.current.scrollToIndex({ animated: true, index: activeImage });
        }
    }, [activeImage, images]);

    const renderItem = React.useCallback(({ item }) => <ImageItem image={item} />, []);

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

    return (
        <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={(_, index) => `gallery-${index}`}
            horizontal={horizontal}
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            disableIntervalMomentum
            onMomentumScrollEnd={onMomentumScrollEnd}
            scrollEventThrottle={32}
            snapToInterval={snapToInterval}
            getItemLayout={getItemLayout}
            ref={galleryRef}
        />
    );
};

export default PreviewGallery;
