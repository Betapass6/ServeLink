import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, Text, VStack, Select, Alert } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('BUYER');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      login(res.data); // langsung login setelah register
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Register gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={16} p={8} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
      <Heading mb={6} textAlign="center" color="teal.600">Register</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          {error && <Alert status="error">{error}</Alert>}
          <FormControl isRequired>
            <FormLabel>Nama</FormLabel>
            <Input value={name} onChange={e => setName(e.target.value)} autoFocus />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Role</FormLabel>
            <Select value={role} onChange={e => setRole(e.target.value)}>
              <option value="BUYER">Buyer</option>
              <option value="SELLER">Seller</option>
            </Select>
          </FormControl>
          <Button colorScheme="teal" type="submit" isLoading={loading} w="full">Register</Button>
        </VStack>
      </form>
      <Text mt={4} textAlign="center">Sudah punya akun? <Link to="/login" style={{ color: '#319795', fontWeight: 500 }}>Login</Link></Text>
    </Box>
  );
} 