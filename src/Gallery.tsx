import React from 'react';
import { DotGallery } from './Dot';
import { ThumbnailGallery } from './Thumbnail';
import { DotType, SlideAnimationType } from './types';
import { ImageResizeMode, ImageSourcePropType } from 'react-native';

interface GalleryProps {
    images: ImageSourcePropType[];
    horizontal?: boolean;
    indicatorMode?: 'thumbnail' | 'dot';
    slideAnimationType?: SlideAnimationType;
    resizeMode?: ImageResizeMode;
    roundDot?: boolean;
    dotSize?: number;
    dotColor?: string;
    dotType?: DotType;
    withZoom?: boolean;
}

const Gallery: React.FunctionComponent<GalleryProps> = ({
    images,
    horizontal = true,
    withZoom = false,
    roundDot = false,
    dotSize = 10,
    resizeMode,
    indicatorMode = 'thumbnail',
    dotColor = '#FFFFFF',
    dotType = 'expand',
    slideAnimationType = 'slide',
}) => {
    return React.useMemo(() => {
        if (indicatorMode === 'thumbnail') {
            return (
                <ThumbnailGallery
                    resizeMode={resizeMode}
                    images={images}
                    horizontal={horizontal}
                    slideAnimationType={slideAnimationType}
                />
            );
        }
        return (
            <DotGallery
                images={images}
                horizontal={horizontal}
                resizeMode={resizeMode}
                dotType={dotType}
                dotSize={dotSize}
                withZoom={withZoom}
                roundDot={roundDot}
                dotColor={dotColor}
                slideAnimationType={slideAnimationType}
            />
        );
    }, [
        dotColor,
        dotSize,
        dotType,
        horizontal,
        images,
        indicatorMode,
        resizeMode,
        roundDot,
        slideAnimationType,
        withZoom,
    ]);
};

export default Gallery;
