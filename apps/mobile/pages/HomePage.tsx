import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';

export default function HomePage() {
  const { signOut } = useAuth();
  return (
    <View style={styles.background}>
      <View style={styles.homeContainer}>
        <Text style={styles.title}>Home</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#3f37c9',
    height: '91%' // screen height minus tab bar height
  },
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff'
  }
});