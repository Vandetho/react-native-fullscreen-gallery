import React from 'react';
import { Gallery } from 'react-native-fullscreen-gallery';
import { IMAGES } from './images';

export default function App() {
    return <Gallery images={IMAGES} horizontal={false} />;
}
