import { useEffect, useState } from 'react';
import { Box, Heading, Text, Button, FormControl, FormLabel, Textarea, NumberInput, NumberInputField, Alert, Flex, Spinner, Stack } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Booking {
  id: string;
  service: { title: string; imageUrl: string };
}

export default function ReviewForm() {
  const { bookingId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    api.get(`/bookings`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => {
        const found = res.data.find((b: any) => b.id === bookingId);
        setBooking(found || null);
      })
      .catch(() => setBooking(null))
      .finally(() => setLoading(false));
  }, [bookingId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!user) {
      setError('Anda harus login untuk review.');
      return;
    }
    if (!rating) {
      setError('Rating wajib diisi.');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/reviews', { bookingId, rating, comment }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSuccess('Review berhasil!');
      setTimeout(() => navigate('/dashboard/buyer'), 1200);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Review gagal');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box p={8} maxW="md" mx="auto">
      {loading ? (
        <Flex justify="center" align="center" minH="40vh"><Spinner size="xl" color="teal.500" /></Flex>
      ) : !booking ? (
        <Text textAlign="center">Booking tidak ditemukan.</Text>
      ) : (
        <>
          <Heading mb={4} color="teal.600">Review Layanan</Heading>
          <Box mb={4} p={4} borderWidth={1} borderRadius="md" bg="gray.50">
            <Text fontWeight="bold">{booking.service.title}</Text>
            <img src={booking.service.imageUrl} alt={booking.service.title} style={{ width: '100%', maxHeight: 120, objectFit: 'cover', borderRadius: 8, marginTop: 8 }} />
          </Box>
          <form onSubmit={handleSubmit}>
            {error && <Alert status="error" mb={3}>{error}</Alert>}
            {success && <Alert status="success" mb={3}>{success}</Alert>}
            <FormControl mb={3} isRequired>
              <FormLabel>Rating (1-5)</FormLabel>
              <NumberInput min={1} max={5} value={rating} onChange={(_, v) => setRating(Number(v))}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Komentar</FormLabel>
              <Textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Tulis ulasan Anda (opsional)" />
            </FormControl>
            <Button colorScheme="teal" type="submit" isLoading={submitting} w="full">Kirim Review</Button>
          </form>
        </>
      )}
    </Box>
  );
} 