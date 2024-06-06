import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
 
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ProfilePage = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://randomuser.me/api/?results=100&amp;inc=name',
      );
      const result = await response.json();
      setUserName(result.results);
      console.log(userName.results);
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        data={userName}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text
              style={
                styles.textstyle
              }>{`${item.name.title}. ${item.name.first} ${item.name.last}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textstyle: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
  },
});

export default ProfilePage;
