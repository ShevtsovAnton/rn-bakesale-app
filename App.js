import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ajax from './src/ajax';
import DealDetail from './src/components/DealDetail';
import DealList from './src/components/DealList';
import SearchBar from './src/components/SearchBar';

export default function App() {
  const [deals, setDeals] = useState([]);
  const [currentDealId, setCurrentDealId] = useState(null);
  const [dealsFromSearch, setDealsFromSearch] = useState([]);

  useEffect(() => {
    const getDeals = async () => {
      const deals = await ajax.fetchInitialDeals();
      setDeals(deals);
    };
    getDeals();
  }, []);

  const searchDeals = async (searchTerm) => {
    let dealsFromSearch = [];
    if (searchTerm) {
      dealsFromSearch = await ajax.fetchDealsSearchResults(searchTerm);
    }
    setDealsFromSearch(dealsFromSearch);
  };

  const currentDeal = () => {
    return deals.find((deal) => deal.key === currentDealId);
  };

  if (currentDealId) {
    return (
      <View style={styles.main}>
        <DealDetail
          onItemPress={setCurrentDealId}
          initialDealData={currentDeal()}
        />
      </View>
    );
  }
  const dealsToDisplay = dealsFromSearch.length > 0 ? dealsFromSearch : deals;
  if (dealsToDisplay.length > 0) {
    return (
      <View style={styles.main}>
        <SearchBar searchDeals={searchDeals} />
        <DealList deals={dealsToDisplay} onItemPress={setCurrentDealId} />
      </View>
    );
  }
  return (
    <View>
      <Text style={styles.header}>Bakesale</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
  },
  main: {
    marginTop: 30,
  },
});
