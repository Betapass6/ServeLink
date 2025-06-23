import { Box, Heading, Input, Textarea, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export default function BookingForm() {
  const { serviceId } = useParams();
  return (
    <Box p={8} maxW="md" mx="auto">
      <Heading mb={4}>Booking Layanan</Heading>
      <form>
        <FormControl mb={3}>
          <FormLabel>Tanggal</FormLabel>
          <Input type="date" />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Catatan</FormLabel>
          <Textarea />
        </FormControl>
        <Button colorScheme="teal" type="submit">Booking</Button>
      </form>
    </Box>
  );
} 