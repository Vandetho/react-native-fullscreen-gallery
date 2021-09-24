import React from 'react';
import DotGallery from './DotGallery';
import ThumbnailGallery from './ThumbnailGallery';

interface GalleryProps {
    images: any[];
    horizontal?: boolean;
    indicatorMode?: 'thumbnail' | 'dot';
}

const Gallery: React.FunctionComponent<GalleryProps> = ({ images, horizontal = true, indicatorMode = 'thumbnail' }) => {
    return React.useMemo(() => {
        if (indicatorMode === 'thumbnail') {
            return <ThumbnailGallery images={images} horizontal={horizontal} />;
        }
        return <DotGallery images={images} horizontal={horizontal} />;
    }, [horizontal, images, indicatorMode]);
};

export default Gallery;
