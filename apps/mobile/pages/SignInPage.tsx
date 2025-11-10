import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = { SignIn: undefined; SignUp: undefined; };
type SignInPageNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;
type Props = { navigation: SignInPageNavigationProp };

export default function SignInPage({ navigation }: Props) {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPress = async () => {
    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({ identifier: emailAddress, password });
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
      } else console.error('Sign-in incomplete:', signInAttempt);
    } catch (err) {
      console.error('Sign-in error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        placeholderTextColor="#ccc"
        autoCapitalize="none"
        value={emailAddress}
        onChangeText={setEmailAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.oauthButton}>
        <Text style={styles.oauthText}>Continue with Google</Text>
      </TouchableOpacity>

      <View style={styles.linkRow}>
        <Text style={styles.text}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.link}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3f37c9' },
  title: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '80%', backgroundColor: '#4f4fc9', color: '#fff', padding: 10, borderRadius: 8, marginBottom: 10 },
  button: { backgroundColor: '#f72485', paddingVertical: 12, width: '80%', borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  oauthButton: { backgroundColor: '#4285F4', paddingVertical: 12, width: '80%', borderRadius: 8, alignItems: 'center', marginTop: 10 },
  oauthText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  linkRow: { flexDirection: 'row', marginTop: 20 },
  text: { color: '#fff' },
  link: { color: '#f72485', fontWeight: 'bold' },
});
