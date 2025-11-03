import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = { Login: undefined; Home: undefined; };
type LoginPageNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type Props = { navigation: LoginPageNavigationProp; };

export default function LoginPage({ navigation }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Page</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
