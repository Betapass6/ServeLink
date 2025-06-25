import { useEffect, useState } from 'react';
import { Box, Heading, Text, SimpleGrid, Badge, Button, Flex, Spinner, Stack, Alert } from '@chakra-ui/react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Booking {
  id: string;
  date: string;
  status: string;
  note?: string;
  service: { id: string; title: string; imageUrl: string };
  buyer: { id: string; name: string };
}

export default function DashboardSeller() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchBookings = () => {
    api.get('/bookings', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setBookings(res.data))
      .catch(() => setError('Gagal mengambil data booking'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!user) return;
    fetchBookings();
    // eslint-disable-next-line
  }, [user]);

  const handleStatus = async (id: string, status: string) => {
    setActionLoading(id + status);
    try {
      await api.patch(`/bookings/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchBookings();
    } catch {
      alert('Gagal update status');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Heading mb={6} color="teal.600">Kelola Booking Layanan</Heading>
      {loading ? (
        <Flex justify="center" align="center" minH="40vh"><Spinner size="xl" color="teal.500" /></Flex>
      ) : error ? (
        <Alert status="error">{error}</Alert>
      ) : bookings.length === 0 ? (
        <Text textAlign="center">Belum ada booking masuk.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 2 }} spacing={6}>
          {bookings.map(b => (
            <Box key={b.id} borderWidth={1} borderRadius="lg" bg="white" boxShadow="md" p={4}>
              <Flex align="center" gap={4}>
                <Box minW="80px" maxW="80px" h="60px" bg="gray.100" borderRadius="md" overflow="hidden">
                  <img src={b.service.imageUrl} alt={b.service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <Box flex={1}>
                  <Text fontWeight="bold">{b.service.title}</Text>
                  <Text fontSize="sm" color="gray.500">{new Date(b.date).toLocaleDateString()}</Text>
                  <Badge colorScheme={b.status === 'COMPLETED' ? 'green' : b.status === 'PENDING' ? 'yellow' : b.status === 'DECLINED' ? 'red' : 'blue'}>{b.status}</Badge>
                  <Text fontSize="xs" color="gray.400" mt={1}>Buyer: {b.buyer?.name}</Text>
                  {b.note && <Text fontSize="xs" color="gray.400" mt={1}>Catatan: {b.note}</Text>}
                </Box>
              </Flex>
              <Stack direction="row" spacing={2} mt={4}>
                {b.status === 'PENDING' && (
                  <>
                    <Button colorScheme="teal" size="sm" isLoading={actionLoading === b.id + 'ACCEPTED'} onClick={() => handleStatus(b.id, 'ACCEPTED')}>Terima</Button>
                    <Button colorScheme="red" size="sm" isLoading={actionLoading === b.id + 'DECLINED'} onClick={() => handleStatus(b.id, 'DECLINED')}>Tolak</Button>
                  </>
                )}
                {b.status === 'ACCEPTED' && (
                  <Button colorScheme="green" size="sm" isLoading={actionLoading === b.id + 'COMPLETED'} onClick={() => handleStatus(b.id, 'COMPLETED')}>Tandai Selesai</Button>
                )}
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
} 