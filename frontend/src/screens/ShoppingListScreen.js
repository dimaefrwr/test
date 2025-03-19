import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  View, 
  FlatList, 
  Text, 
  StyleSheet, 
  RefreshControl, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { getProducts, deleteProduct } from '../api/api';

const ShoppingListScreen = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setRefreshing(true);
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setError(null);
    } catch (err) {
      console.error('Błąd pobierania produktów:', err);
      setError('Nie udało się pobrać produktów');
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteProduct = useCallback(async (productId) => {
    try {
      await deleteProduct(productId);
      fetchProducts();
    } catch (err) {
      console.error('Błąd usuwania produktu:', err);
      setError('Nie udało się usunąć produktu');
    }
  }, [fetchProducts]);

  const renderProduct = useCallback(({ item, index }) => {
    const uniqueKey = item._id || item.name || index.toString();
    return (
      <View style={styles.productItem} key={uniqueKey}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <View style={styles.productDetails}>
            <Text>Ilość: {item.quantity}</Text>
            <Text>Cena: {item.price} zł</Text>
            <Text>Sklep: {item.shop}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDeleteProduct(item._id)}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    );
  }, [handleDeleteProduct]);

  const keyExtractor = useCallback((item, index) => 
    item._id?.toString() || item.name || index.toString()
  , []);

  const listProps = useMemo(() => ({
    initialNumToRender: 10,
    maxToRenderPerBatch: 10,
    windowSize: 21,
    removeClippedSubviews: Platform.OS === 'android',
    updateCellsBatchingPeriod: 50,
    legacyImplementation: false,
    // Dodaj tę linię
    disableVirtualization: false,
  }), []);

  const refreshControlComponent = useMemo(() => (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={fetchProducts}
      colors={['#9Bd35A', '#689F38']}
      tintColor="#689F38"
    />
  ), [refreshing, fetchProducts]);

  const memoizedProducts = useMemo(() => products, [products]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={memoizedProducts}
        renderItem={renderProduct}
        keyExtractor={keyExtractor}
        refreshControl={refreshControlComponent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Brak produktów</Text>
          </View>
        }
        {...listProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  productItem: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productInfo: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});

export default React.memo(ShoppingListScreen);