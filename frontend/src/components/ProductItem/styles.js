import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 8,
        padding: 15,
        elevation: 2,
    },
    bought: {
        backgroundColor: '#f0f0f0',
        opacity: 0.7,
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    store: {
        color: COLORS.gray,
        fontSize: 14,
    },
    price: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: COLORS.error,
        padding: 8,
        borderRadius: 4,
    },
    deleteText: {
        color: 'white',
    },
});