import React from 'react';
import { DotGallery } from './Dot';
import { ThumbnailGallery } from './Thumbnail';
import { DotType, SlideAnimationType } from './types';
import { ImageSourcePropType } from 'react-native';

interface GalleryProps {
    images: ImageSourcePropType[];
    horizontal?: boolean;
    indicatorMode?: 'thumbnail' | 'dot';
    slideAnimationType?: SlideAnimationType;
    dotColor?: string;
    dotType?: DotType;
    withZoom?: boolean;
}

const Gallery: React.FunctionComponent<GalleryProps> = ({
    images,
    horizontal = true,
    withZoom = false,
    indicatorMode = 'thumbnail',
    dotColor = '#FFFFFF',
    dotType = 'expand',
    slideAnimationType = 'slide',
}) => {
    return React.useMemo(() => {
        if (indicatorMode === 'thumbnail') {
            return <ThumbnailGallery images={images} horizontal={horizontal} slideAnimationType={slideAnimationType} />;
        }
        return (
            <DotGallery
                images={images}
                horizontal={horizontal}
                dotType={dotType}
                withZoom={withZoom}
                dotColor={dotColor}
                slideAnimationType={slideAnimationType}
            />
        );
    }, [dotColor, dotType, horizontal, images, indicatorMode, slideAnimationType, withZoom]);
};

export default Gallery;
