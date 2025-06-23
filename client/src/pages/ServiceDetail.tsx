import { Box, Heading, Button, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export default function ServiceDetail() {
  const { id } = useParams();
  return (
    <Box p={8}>
      <Heading mb={4}>Detail Layanan</Heading>
      <Text>ID: {id}</Text>
      {/* TODO: Tampilkan detail layanan dari API */}
      <Button colorScheme="teal" mt={4}>Booking Sekarang</Button>
    </Box>
  );
} 