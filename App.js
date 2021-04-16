import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Easing,
  Animated,
  Dimensions,
} from 'react-native';
import ajax from './src/ajax';
import DealDetail from './src/components/DealDetail';
import DealList from './src/components/DealList';
import SearchBar from './src/components/SearchBar';

export default function App() {
  const [deals, setDeals] = useState([]);
  const [currentDealId, setCurrentDealId] = useState(null);
  const [dealsFromSearch, setDealsFromSearch] = useState([]);
  const titleXPos = new Animated.Value(0);

  const animateTitle = (direction = 1) => {
    const width = Dimensions.get('window').width - 150;
    Animated.timing(titleXPos, {
      toValue: (direction * width) / 2,
      duration: 1000,
      easing: Easing.ease,
    }).start(({ finished }) => {
      if (finished) {
        animateTitle(-1 * direction);
      }
    });
  };
  useEffect(() => {
    const getDeals = async () => {
      const deals = await ajax.fetchInitialDeals();
      setDeals(deals);
    };
    getDeals();
  }, []);

  useEffect(() => {
    animateTitle();
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
    <Animated.View style={[{ left: titleXPos }, styles.container]}>
      <Text style={styles.header}>Bakesale</Text>
    </Animated.View>
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
