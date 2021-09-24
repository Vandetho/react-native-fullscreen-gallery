import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import IndicatorGallery from './IndicatorGallery';
import PreviewGallery from './PreviewGallery';
import DotGallery from './DotGallery';

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

interface GalleryProps {
    images: any[];
    horizontal?: boolean;
    indicatorMode?: 'thumbnail' | 'dot';
}

const Gallery: React.FunctionComponent<GalleryProps> = ({ images, horizontal = true, indicatorMode = 'thumbnail' }) => {
    const [activeImage, setActiveImage] = React.useState<number>(0);

    const indicatorStyle = React.useMemo(
        () => (horizontal ? styles.indicatorHorizontalContainer : styles.indicatorVerticalContainer),
        [horizontal],
    );

    return React.useMemo(() => {
        if (indicatorMode === 'thumbnail') {
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
        }
        return <DotGallery images={images} horizontal={horizontal} />;
    }, [activeImage, horizontal, images, indicatorMode, indicatorStyle]);
};

export default Gallery;
