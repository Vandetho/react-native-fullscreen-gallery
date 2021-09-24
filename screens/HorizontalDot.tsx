import React from 'react';
import { Gallery } from '../src';
import { IMAGES } from '../images';

interface HorizontalDotProps {}

const HorizontalDot: React.FunctionComponent<HorizontalDotProps> = () => (
    <Gallery images={IMAGES} indicatorMode="dot" />
);

export default HorizontalDot;
