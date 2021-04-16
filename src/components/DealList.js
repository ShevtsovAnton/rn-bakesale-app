import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import DealItem from './DealItem';

export default function DealList({ deals, onItemPress }) {
  return (
    <View style={styles.list}>
      <FlatList
        data={deals}
        renderItem={({ item }) => (
          <DealItem deal={item} onPress={onItemPress} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee',
    width: '100%',
  },
});
