import React from 'react';
import { FlatList, Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

const styles = StyleSheet.create({
    horizontalContainer: {
        paddingHorizontal: 20,
    },
    verticalContainer: {
        paddingVertical: 100,
    },
    horizontalSeparator: {
        width: 10,
    },
    verticalSeparator: {
        height: 10,
    },
});

interface IndicatorGalleryProps {
    images: any[];
    activeImage: number;
    horizontal?: boolean;
    onChangeActiveImage: (index: number) => void;
}

const IndicatorGallery: React.FunctionComponent<IndicatorGalleryProps> = ({
    images,
    activeImage,
    horizontal = true,
    onChangeActiveImage,
}) => {
    const indicatorRef = React.useRef<FlatList>(null);

    React.useEffect(() => {
        if (indicatorRef.current) {
            const numberOfImage = horizontal ? 1 : 2;
            const index = activeImage >= numberOfImage ? activeImage - numberOfImage : 0;
            indicatorRef.current.scrollToIndex({ animated: true, index });
        }
    }, [activeImage, horizontal, images]);

    const onPress = React.useCallback(
        (index: number) => {
            onChangeActiveImage(index);
        },
        [onChangeActiveImage],
    );

    const renderItem = React.useCallback(
        ({ item, index }: { item: any; index: number }) => (
            <TouchableWithoutFeedback onPress={() => onPress(index)}>
                <Image
                    source={item}
                    style={{
                        width: 100,
                        height: 100,
                        borderColor: index === activeImage ? '#FFFFFF' : '#000000',
                        borderWidth: 5,
                        borderRadius: 30,
                    }}
                    resizeMode="cover"
                />
            </TouchableWithoutFeedback>
        ),
        [activeImage, onPress],
    );

    const contentContainerStyle = React.useMemo(
        () => (horizontal ? styles.horizontalContainer : styles.verticalContainer),
        [horizontal],
    );

    const Separator = React.useCallback(
        () => <View style={horizontal ? styles.horizontalSeparator : styles.verticalSeparator} />,
        [horizontal],
    );

    const getItemLayout = React.useCallback((_, index) => ({ length: 100, offset: 100 * index, index }), []);

    return (
        <FlatList
            data={images}
            renderItem={renderItem}
            ItemSeparatorComponent={Separator}
            ListFooterComponent={Separator}
            keyExtractor={(_, index) => `indicator-${index}`}
            horizontal={horizontal}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={contentContainerStyle}
            getItemLayout={getItemLayout}
            ref={indicatorRef}
        />
    );
};

export default IndicatorGallery;
