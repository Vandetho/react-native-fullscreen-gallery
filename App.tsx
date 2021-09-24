import React from 'react';
import { IMAGES } from './images';
import { Gallery } from './src';

export default function App() {
    return <Gallery images={IMAGES} horizontal={false} />;
}
