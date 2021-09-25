import React from 'react';
import { FlatList, Animated, StyleSheet, TouchableWithoutFeedback, View, Image, Dimensions } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

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
    scrollX: Animated.Value;
    scrollY: Animated.Value;
    onChangeActiveImage: (index: number) => void;
}

const IndicatorGallery: React.FunctionComponent<IndicatorGalleryProps> = ({
    images,
    activeImage,
    horizontal = true,
    scrollX,
    scrollY,
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

    const measure = React.useMemo(() => (horizontal ? WIDTH : HEIGHT), [horizontal]);

    const scroll = React.useMemo(() => (horizontal ? scrollX : scrollY), [horizontal, scrollX, scrollY]);

    const inputRange = React.useMemo(() => images.map((_, index) => measure * index), [images, measure]);

    const renderItem = React.useCallback(
        ({ item, index }: { item: any; index: number }) => {
            const outputRange = images.map((_, i) => (index === i ? 12 : 1));

            const scaleXSize = scroll.interpolate({
                inputRange: inputRange,
                outputRange: outputRange,
            });

            const scaleYSize = scroll.interpolate({
                inputRange: inputRange,
                outputRange: outputRange,
            });

            return (
                <TouchableWithoutFeedback onPress={() => onPress(index)}>
                    <View
                        style={{
                            position: 'relative',
                            backgroundColor: '#000000',
                            zIndex: 10,
                            width: 100,
                            height: 100,
                            padding: 5,
                            borderRadius: 30,
                            overflow: 'hidden',
                        }}
                    >
                        <Image
                            source={item}
                            style={{
                                width: 90,
                                height: 90,
                                zIndex: 1000,
                                borderRadius: 25,
                            }}
                            resizeMode="cover"
                        />
                        <Animated.View
                            style={[
                                {
                                    width: 10,
                                    height: 10,
                                    backgroundColor: '#FFFFFF',
                                    position: 'absolute',
                                    top: 100 / 2 - 5,
                                    left: 100 / 2 - 5,
                                    zIndex: 100,
                                    borderRadius: 2,
                                },
                                {
                                    transform: [{ scaleX: scaleXSize }, { scaleY: scaleYSize }],
                                },
                            ]}
                        />
                    </View>
                </TouchableWithoutFeedback>
            );
        },
        [images, inputRange, onPress, scroll],
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
