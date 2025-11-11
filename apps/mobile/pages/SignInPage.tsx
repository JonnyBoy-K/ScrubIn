import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSignIn, useSSO } from '@clerk/clerk-expo';
import { ActivityIndicator } from 'react-native-paper';

// used ai to implement sign in

type RootStackParamList = {
  Entry: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
};

type SignInPageNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

type Props = {
  navigation: SignInPageNavigationProp;
};

export default function SignInPage({ navigation }: Props) {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { startSSOFlow } = useSSO();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<string | null>(null);

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        Alert.alert('Error', 'Sign in failed. Please try again.');
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.errors?.[0]?.message || 'Something went wrong');
    }
  };

  const onSocialSignIn = async (strategy: 'oauth_google') => {
    if (!isLoaded) return;

    setLoading(strategy);
    try {
        const { createdSessionId, setActive } = await startSSOFlow({
            strategy,
        });

        if (createdSessionId) {
            await setActive!({ session: createdSessionId });
        }
    } catch (err: any) {
        console.error(JSON.stringify(err, null, 2));
        Alert.alert('Error', err.errors?.[0]?.message || 'Failed to sign in with ${getProviderName(strategy)}');
    } finally {
        setLoading(null);
    }
  };

  const availableProviders = [
    { id: 'oauth_google', name: 'Google' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput style={styles.input} placeholder="Username or Email" placeholderTextColor="#888" value={emailAddress} onChangeText={setEmailAddress} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#888" value={password} onChangeText={setPassword} secureTextEntry />
      
      <TouchableOpacity style={styles.primaryButton} onPress={onSignInPress}>
        <Text style={styles.primaryButtonText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.socialContainer}>
        <Text style={styles.socialText}>Or sign in with</Text>

        {availableProviders.map((provider) => (
        <TouchableOpacity style={styles.socialButton} key={provider.id} onPress={() => onSocialSignIn('oauth_google')} disabled={!!loading} >
            {loading === provider.id ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.socialButtonText}>{provider.name}</Text>
            )}
        </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.footerLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1C1C1E',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  socialContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  socialText: {
    color: '#888',
    marginBottom: 15,
  },
  socialButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#888',
  },
  footerLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
