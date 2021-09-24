import React from 'react';
import { FlatList, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type MenuItem = { name: string; screen: string };

const MENU: MenuItem[] = [
    { name: 'Horizontal Thumbnail', screen: 'HorizontalThumbnail' },
    { name: 'Vertical Thumbnail', screen: 'VerticalThumbnail' },
    { name: 'Horizontal Dot', screen: 'HorizontalDot' },
    { name: 'Vertical Dot', screen: 'VerticalDot' },
];

interface ListItemProps {
    item: MenuItem;
    onPress: (item: MenuItem) => void;
}

const ListItem: React.FunctionComponent<ListItemProps> = ({ item, onPress }) => {
    const handlePress = React.useCallback(() => onPress(item), [item, onPress]);

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View
                style={{
                    height: 75,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    elevation: 2,
                    shadowColor: '#333333',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                }}
            >
                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
    const navigation = useNavigation<any>();

    const onPress = React.useCallback(
        (item: MenuItem) => {
            navigation.navigate(item.screen);
        },
        [navigation],
    );

    const renderItem = React.useCallback(
        ({ item }: { item: MenuItem }) => <ListItem item={item} onPress={onPress} />,
        [onPress],
    );

    const keyExtractor = React.useCallback((_: MenuItem, index: number) => `menu-item-${index}`, []);
    const Separator = React.useCallback(() => <View style={{ height: 20 }} />, []);

    return (
        <FlatList
            data={MENU}
            renderItem={renderItem}
            ItemSeparatorComponent={Separator}
            keyExtractor={keyExtractor}
            contentContainerStyle={{ flexGrow: 1, padding: 20 }}
        />
    );
};

export default Home;
