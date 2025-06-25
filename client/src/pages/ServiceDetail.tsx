import { useEffect, useState } from 'react';
import { Box, Heading, Text, Image, Badge, Button, Flex, Stack, Spinner, Divider } from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  seller: { id: string; name: string };
  reviews: Review[];
}

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/services/${id}`)
      .then(res => setService(res.data))
      .catch(() => setService(null))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <Box p={{ base: 4, md: 8 }}>
      {loading ? (
        <Flex justify="center" align="center" minH="40vh"><Spinner size="xl" color="teal.500" /></Flex>
      ) : !service ? (
        <Text textAlign="center">Layanan tidak ditemukan.</Text>
      ) : (
        <Box maxW="3xl" mx="auto" bg="white" borderRadius="lg" boxShadow="lg" p={6}>
          <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
            <Image src={service.imageUrl} alt={service.title} w={{ base: '100%', md: '320px' }} h="220px" objectFit="cover" borderRadius="md" />
            <Box flex={1}>
              <Badge colorScheme="teal" mb={2}>{service.category}</Badge>
              <Heading size="lg" mb={2}>{service.title}</Heading>
              <Text color="gray.600" mb={2}>{service.description}</Text>
              <Text fontWeight="bold" color="teal.700" fontSize="xl" mb={2}>Rp {service.price.toLocaleString()}</Text>
              <Text fontSize="sm" color="gray.500" mb={2}>Oleh: {service.seller?.name}</Text>
              <Flex align="center" mb={4}>
                <Badge colorScheme="yellow" mr={2}>
                  ⭐ {service.reviews.length > 0 ? (service.reviews.reduce((a, r) => a + r.rating, 0) / service.reviews.length).toFixed(1) : '-'}
                </Badge>
                <Text fontSize="xs" color="gray.400">{service.reviews.length} review</Text>
              </Flex>
              <Button as={Link} to={`/booking/${service.id}`} colorScheme="teal" w={{ base: 'full', md: 'auto' }}>
                Booking Sekarang
              </Button>
            </Box>
          </Flex>
          <Divider my={6} />
          <Box>
            <Heading size="md" mb={4}>Review</Heading>
            {service.reviews.length === 0 ? (
              <Text color="gray.500">Belum ada review.</Text>
            ) : (
              <Stack spacing={4}>
                {service.reviews.map(r => (
                  <Box key={r.id} p={4} borderWidth={1} borderRadius="md" bg="gray.50">
                    <Flex align="center" mb={1}>
                      <Badge colorScheme="yellow" mr={2}>⭐ {r.rating}</Badge>
                      <Text fontSize="xs" color="gray.400">{new Date(r.createdAt).toLocaleDateString()}</Text>
                    </Flex>
                    <Text>{r.comment || <i>Tidak ada komentar</i>}</Text>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
} 