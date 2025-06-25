import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, Text, VStack, Alert } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.user);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={16} p={8} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
      <Heading mb={6} textAlign="center" color="teal.600">Login</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          {error && <Alert status="error">{error}</Alert>}
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </FormControl>
          <Button colorScheme="teal" type="submit" isLoading={loading} w="full">Login</Button>
        </VStack>
      </form>
      <Text mt={4} textAlign="center">Belum punya akun? <Link to="/register" style={{ color: '#319795', fontWeight: 500 }}>Register</Link></Text>
    </Box>
  );
} 