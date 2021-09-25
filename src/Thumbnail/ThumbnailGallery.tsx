import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import IndicatorGallery from './IndicatorGallery';
import PreviewGallery from './PreviewGallery';

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
    images: any[];
    horizontal?: boolean;
}

const ThumbnailGallery: React.FunctionComponent<ThumbnailGalleryProps> = ({ images, horizontal = true }) => {
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
                activeImage={activeImage}
                onChangeActiveImage={setActiveImage}
            />
            <View style={indicatorStyle}>
                <IndicatorGallery
                    horizontal={horizontal}
                    images={images}
                    activeImage={activeImage}
                    onChangeActiveImage={setActiveImage}
                />
            </View>
        </View>
    );
};

export default ThumbnailGallery;
