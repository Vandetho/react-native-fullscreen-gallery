import React from 'react';
import { DotGallery } from './Dot';
import { ThumbnailGallery } from './Thumbnail';
import { DotType } from './types';

interface GalleryProps {
    images: any[];
    horizontal?: boolean;
    indicatorMode?: 'thumbnail' | 'dot';
    dotColor?: string;
    dotType?: DotType;
}

const Gallery: React.FunctionComponent<GalleryProps> = ({
    images,
    horizontal = true,
    indicatorMode = 'thumbnail',
    dotColor = '#FFFFFF',
    dotType = 'expand',
}) => {
    return React.useMemo(() => {
        if (indicatorMode === 'thumbnail') {
            return <ThumbnailGallery images={images} horizontal={horizontal} />;
        }
        return <DotGallery images={images} horizontal={horizontal} dotType={dotType} dotColor={dotColor} />;
    }, [dotColor, dotType, horizontal, images, indicatorMode]);
};

export default Gallery;
