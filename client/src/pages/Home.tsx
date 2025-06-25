import { useEffect, useState } from 'react';
import {
  Box, Heading, Text, SimpleGrid, Image, Badge, Button, Flex, Spinner, Stack, Avatar, useColorModeValue, Icon, Center
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaRegFolderOpen } from 'react-icons/fa';
import api from '../services/api';

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  seller: { id: string; name: string };
  reviews: { rating: number }[];
}

function getStars(rating: number, max = 5) {
  return Array.from({ length: max }, (_, i) =>
    i < Math.round(rating) ? <Icon as={FaStar} color="yellow.400" key={i} /> : <Icon as={FaRegStar} color="gray.300" key={i} />
  );
}

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardShadow = useColorModeValue('md', 'dark-lg');

  useEffect(() => {
    api.get('/services')
      .then(res => setServices(Array.isArray(res.data) ? res.data : []))
      .catch(() => {
        setServices([]);
        setError('Gagal memuat data layanan');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box px={{ base: 2, md: 8 }} py={0} minH="100vh">
      {/* Hero Section */}
      <Box
        py={{ base: 10, md: 16 }}
        px={{ base: 2, md: 8 }}
        mb={10}
        bg={useColorModeValue('teal.50', 'teal.900')}
        borderRadius="2xl"
        boxShadow="sm"
        textAlign="center"
      >
        <Heading size="2xl" color="teal.600" mb={3} fontWeight="extrabold">
          ServeLink
        </Heading>
        <Text fontSize={{ base: 'lg', md: 'xl' }} color={useColorModeValue('gray.700', 'gray.200')} mb={4}>
          Platform profesional untuk jual beli & booking jasa secara mudah, aman, dan terintegrasi.
        </Text>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} justify="center" align="center">
          <Button as={Link} to="/login" colorScheme="teal" size="lg" variant="solid">
            Mulai Booking
          </Button>
          <Button as={Link} to="/register" colorScheme="teal" size="lg" variant="outline">
            Daftar Sebagai Seller
          </Button>
        </Stack>
      </Box>

      <Heading mb={6} color="teal.600" fontWeight="bold" fontSize={{ base: '2xl', md: '3xl' }}>
        Daftar Layanan
      </Heading>
      {loading ? (
        <Flex justify="center" align="center" minH="40vh"><Spinner size="xl" color="teal.500" /></Flex>
      ) : error ? (
        <Text textAlign="center" color="red.500">{error}</Text>
      ) : Array.isArray(services) && services.length === 0 ? (
        <Center flexDir="column" minH="40vh">
          <Icon as={FaRegFolderOpen} boxSize={16} color="gray.300" mb={4} />
          <Text fontSize="lg" color="gray.500">Belum ada layanan tersedia.</Text>
        </Center>
      ) : Array.isArray(services) ? (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          {services.map(s => {
            const avgRating = s.reviews.length > 0 ? s.reviews.reduce((a, r) => a + r.rating, 0) / s.reviews.length : 0;
            return (
              <Box
                key={s.id}
                borderWidth={1}
                borderRadius="2xl"
                overflow="hidden"
                bg={cardBg}
                boxShadow={cardShadow}
                _hover={{ boxShadow: '2xl', transform: 'translateY(-4px) scale(1.02)' }}
                transition="all 0.2s"
                display="flex"
                flexDirection="column"
                minH="420px"
              >
                <Image src={s.imageUrl} alt={s.title} objectFit="cover" w="100%" h="180px" />
                <Box p={5} flex={1} display="flex" flexDirection="column">
                  <Stack direction="row" align="center" mb={2}>
                    <Badge colorScheme="teal" fontSize="0.9em">{s.category}</Badge>
                    <Text fontWeight="bold" color="teal.700" fontSize="lg">Rp {s.price.toLocaleString()}</Text>
                  </Stack>
                  <Heading size="md" mb={1} noOfLines={1}>{s.title}</Heading>
                  <Text fontSize="sm" color="gray.600" mb={2} noOfLines={2}>{s.description}</Text>
                  <Flex align="center" mb={2}>
                    <Avatar name={s.seller?.name} size="sm" mr={2} />
                    <Text fontSize="sm" color="gray.500">{s.seller?.name}</Text>
                  </Flex>
                  <Flex align="center" mb={2}>
                    {getStars(avgRating)}
                    <Text fontSize="xs" color="gray.400" ml={2}>{s.reviews.length} review</Text>
                  </Flex>
                  <Button as={Link} to={`/service/${s.id}`} colorScheme="teal" w="full" mt="auto" size="md" fontWeight="bold">
                    Lihat Detail
                  </Button>
                </Box>
              </Box>
            );
          })}
        </SimpleGrid>
      ) : (
        <Text textAlign="center" color="red.500">Gagal memuat data layanan.</Text>
      )}
    </Box>
  );
} 