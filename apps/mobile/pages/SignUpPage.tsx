import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = { SignIn: undefined; SignUp: undefined; };
type SignUpPageNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
type Props = { navigation: SignUpPageNavigationProp };

export default function SignUpPage({ navigation }: Props) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: username,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      console.error('Sign-up error:', err);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    try {
      const attempt = await signUp.attemptEmailAddressVerification({ code });
      if (attempt.status === 'complete') {
        await setActive({ session: attempt.createdSessionId });
      } else console.error('Verification incomplete:', attempt);
    } catch (err) {
      console.error('Verification error:', err);
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verify Your Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter verification code"
          placeholderTextColor="#ccc"
          value={code}
          onChangeText={setCode}
        />
        <TouchableOpacity style={styles.button} onPress={onVerifyPress}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#ccc" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Username / Email" placeholderTextColor="#ccc" value={username} onChangeText={setUsername} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Role" placeholderTextColor="#ccc" value={role} onChangeText={setRole} />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#ccc" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.oauthButton}>
        <Text style={styles.oauthText}>Continue with Google</Text>
      </TouchableOpacity>

      <View style={styles.linkRow}>
        <Text style={styles.text}>Have an account already?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.link}> Sign In</Text>
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

