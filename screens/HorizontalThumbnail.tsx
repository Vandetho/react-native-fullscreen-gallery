import React from 'react';
import { Gallery } from '../src';
import { IMAGES } from '../images';

interface HorizontalThumbnailProps {}

const HorizontalThumbnail: React.FunctionComponent<HorizontalThumbnailProps> = () => <Gallery images={IMAGES} />;

export default HorizontalThumbnail;
