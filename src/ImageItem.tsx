import React from 'react';
import { Dimensions, Image } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

interface ImageItemProps {
    image: any;
}

const ImageItem: React.FunctionComponent<ImageItemProps> = ({ image }) => {
    return (
        <Image
            source={image}
            resizeMode="cover"
            style={{
                width: WIDTH,
                height: HEIGHT,
            }}
        />
    );
};

export default ImageItem;
