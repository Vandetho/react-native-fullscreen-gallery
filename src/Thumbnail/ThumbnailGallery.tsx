import React from 'react';
import { Animated, Dimensions, ImageResizeMode, ImageSourcePropType, StyleSheet, View } from 'react-native';
import IndicatorGallery from './IndicatorGallery';
import PreviewGallery from './PreviewGallery';
import { SlideAnimationType } from '../types';

const styles = StyleSheet.create({
    container: {},
    indicatorHorizontalContainer: {
        position: 'absolute',
        bottom: 25,
        zIndex: 1000,
        height: 100,
        width: Dimensions.get('screen').width,
    },
    indicatorVerticalContainer: {
        position: 'absolute',
        left: 25,
        zIndex: 1000,
        width: 100,
        height: Dimensions.get('screen').height,
    },
});

interface ThumbnailGalleryProps {
    images: ImageSourcePropType[];
    slideAnimationType: SlideAnimationType;
    resizeMode?: ImageResizeMode;
    horizontal?: boolean;
}

const ThumbnailGallery: React.FunctionComponent<ThumbnailGalleryProps> = ({
    images,
    resizeMode,
    slideAnimationType,
    horizontal = true,
}) => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const [activeImage, setActiveImage] = React.useState<number>(0);

    const indicatorStyle = React.useMemo(
        () => (horizontal ? styles.indicatorHorizontalContainer : styles.indicatorVerticalContainer),
        [horizontal],
    );

    return (
        <View style={styles.container}>
            <PreviewGallery
                horizontal={horizontal}
                images={images}
                resizeMode={resizeMode}
                activeImage={activeImage}
                slideAnimationType={slideAnimationType}
                scrollX={scrollX}
                scrollY={scrollY}
                onChangeActiveImage={setActiveImage}
            />
            <View style={indicatorStyle}>
                <IndicatorGallery
                    horizontal={horizontal}
                    images={images}
                    activeImage={activeImage}
                    scrollX={scrollX}
                    scrollY={scrollY}
                    onChangeActiveImage={setActiveImage}
                />
            </View>
        </View>
    );
};

export default ThumbnailGallery;
