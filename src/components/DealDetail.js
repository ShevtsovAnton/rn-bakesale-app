import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { priceDisplay } from '../util.js';
import ajax from '../ajax';

export default function DealDetail({ initialDealData, onItemPress }) {
  const [deal, setDeal] = useState(initialDealData);

  useEffect(() => {
    const dealDetail = async () => {
      const response = await ajax.fetchDealDetail(deal.key);
      setDeal(response);
    };
    dealDetail();
  }, []);

  return (
    <View style={styles.deal}>
      <TouchableOpacity
        onPress={() => {
          onItemPress(null);
        }}
      >
        <Text style={styles.backLink}>Back</Text>
      </TouchableOpacity>
      <Image style={styles.image} source={{ uri: deal.media[0] }} />
      <View style={styles.info}>
        <Text style={styles.title}>{deal.title}</Text>
        <View style={styles.moreInfo}>
          <View style={styles.footer}>
            <Text style={styles.cause}>{priceDisplay(deal.price)}</Text>
            <Text style={styles.price}>{deal.cause.name}</Text>
          </View>
          {deal.user ? (
            <View style={styles.userContainer}>
              <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
              <Text>{deal.user.name}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.description}>
          <Text>{deal.description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deal: {
    marginHorizontal: 12,
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    backgroundColor: '#fa3',
    padding: 10,
  },
  info: {
    borderColor: '#bbb',
    borderWidth: 1,
  },
  footer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cause: {
    flex: 1,
  },
  price: {
    flex: 1,
    textAlign: 'right',
  },
  avatar: {
    height: 60,
    width: 60,
  },
  userContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  description: {
    borderWidth: 1,
    borderColor: '#eee',
    padding: 10,
    margin: 10,
  },
  backLink: {
    marginBottom: 5,
    color: '#22f',
  },
});
