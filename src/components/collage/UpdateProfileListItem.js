import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const UpdateProfileListItem = ({category, value}) => {
  return (
    <View>
      <Text>Update {category}</Text>
      <View>
        <Text style={styles.userItemKey}>{category}</Text>
        <Text style={styles.userItemValue}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default UpdateProfileListItem;
