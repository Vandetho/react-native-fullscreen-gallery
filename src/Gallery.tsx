import React from 'react';
import DotGallery from './DotGallery';
import ThumbnailGallery from './ThumbnailGallery';

interface GalleryProps {
    images: any[];
    horizontal?: boolean;
    indicatorMode?: 'thumbnail' | 'dot';
    dotColor?: string;
}

const Gallery: React.FunctionComponent<GalleryProps> = ({
    images,
    horizontal = true,
    indicatorMode = 'thumbnail',
    dotColor = '#FFFFFF',
}) => {
    return React.useMemo(() => {
        if (indicatorMode === 'thumbnail') {
            return <ThumbnailGallery images={images} horizontal={horizontal} />;
        }
        return <DotGallery images={images} horizontal={horizontal} dotColor={dotColor} />;
    }, [dotColor, horizontal, images, indicatorMode]);
};

export default Gallery;
