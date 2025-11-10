import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Entry: undefined;
  SignIn: undefined;
  SignUp: undefined;
};
type EntryPageNavigationProp = StackNavigationProp<RootStackParamList, 'Entry'>;
type Props = { navigation: EntryPageNavigationProp };

export default function EntryPage({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to VetScheduler</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3f37c9' },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  button: { backgroundColor: '#f72485', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

