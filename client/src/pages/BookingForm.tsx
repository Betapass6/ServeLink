import { useEffect, useState } from 'react';
import { Box, Heading, Input, Textarea, Button, FormControl, FormLabel, Text, Alert, Spinner, Flex } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Service {
  id: string;
  title: string;
  imageUrl: string;
}

export default function BookingForm() {
  const { serviceId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get(`/services/${serviceId}`)
      .then(res => setService(res.data))
      .catch(() => setService(null))
      .finally(() => setLoading(false));
  }, [serviceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!user) {
      setError('Anda harus login sebagai buyer untuk booking.');
      return;
    }
    if (!date) {
      setError('Tanggal booking wajib diisi.');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/bookings', { serviceId, date, note }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSuccess('Booking berhasil!');
      setTimeout(() => navigate('/dashboard/buyer'), 1200);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Booking gagal');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box p={8} maxW="md" mx="auto">
      {loading ? (
        <Flex justify="center" align="center" minH="40vh"><Spinner size="xl" color="teal.500" /></Flex>
      ) : !service ? (
        <Text textAlign="center">Layanan tidak ditemukan.</Text>
      ) : (
        <>
          <Heading mb={4} color="teal.600">Booking: {service.title}</Heading>
          <form onSubmit={handleSubmit}>
            {error && <Alert status="error" mb={3}>{error}</Alert>}
            {success && <Alert status="success" mb={3}>{success}</Alert>}
            <FormControl mb={3} isRequired>
              <FormLabel>Tanggal</FormLabel>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Catatan</FormLabel>
              <Textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Catatan untuk seller (opsional)" />
            </FormControl>
            <Button colorScheme="teal" type="submit" isLoading={submitting} w="full">Booking</Button>
          </form>
        </>
      )}
    </Box>
  );
} 