import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { styles } from './styles';
import { Product, ProductProps } from '../Product';

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  // Listar todos os documentos
  useEffect(() => {
    const subscribe = firestore()
      .collection('products')
      // Filtrar consultas
      /* .where('quantity', '==', 1) */
      // Limitar consultas
      /* .limit(3) */
      // Ordenar consultas
      /* .orderBy('description', 'asc') */
      // Intervalo de consultas
      /* 
      .startAt(2)
      .endAt(4) 
      */
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        setProducts(data);
      });

    return () => subscribe();
  }, []);

  // Leitura única de um documento
  /* useEffect(() => {
    firestore()
      .collection('products')
      .doc('S1BhA8IhdDP1miJ6j7M9')
      .get()
      .then((response) => console.log({ id: response.id, ...response.data() }))
      .catch((error) => console.error(error));
  }, []); */

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
