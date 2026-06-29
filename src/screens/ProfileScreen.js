import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

export default function ProfileScreen({ route }) {
  const { onLogout } = route.params || {};
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Feather name="log-out" size={20} color="#FFFFFF" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    borderRadius: 16,
    padding: 16,
    width: '100%',
  },
  logoutText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});