import { Box, Heading, Text, Alert } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

export default function AdminPanel() {
  const { user } = useAuth();
  if (!user || user.role !== 'ADMIN') {
    return <Alert status="error" mt={8} maxW="lg" mx="auto">Hanya admin yang bisa mengakses halaman ini.</Alert>;
  }
  return (
    <Box p={8}>
      <Heading mb={4}>Admin Panel</Heading>
      <Text>Manajemen user dan layanan di sini.</Text>
    </Box>
  );
} 