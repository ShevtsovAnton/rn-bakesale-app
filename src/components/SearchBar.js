import React, { useState, useEffect, useMemo } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import debounce from 'lodash.debounce';

export default function SearchBar({ searchDeals }) {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchDeals = useMemo(
    () =>
      debounce((arg) => {
        searchDeals(arg);
      }, 1000),
    [searchDeals]
  );

  useEffect(() => {
    debouncedSearchDeals(searchTerm);
  }, [searchTerm]);

  const handleChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <TextInput
      placeholder='Search All Deals'
      style={styles.input}
      onChangeText={handleChange}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 12,
  },
});
