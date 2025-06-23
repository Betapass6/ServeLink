import { Box, Flex, Link as ChakraLink, Spacer, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <Box bg="teal.500" color="white" px={6} py={3} mb={6}>
      <Flex align="center">
        <ChakraLink as={Link} to="/" fontWeight="bold" fontSize="xl">
          ServeLink
        </ChakraLink>
        <Spacer />
        <ChakraLink as={Link} to="/dashboard/buyer" mr={4}>
          Dashboard Buyer
        </ChakraLink>
        <ChakraLink as={Link} to="/dashboard/seller" mr={4}>
          Dashboard Seller
        </ChakraLink>
        <ChakraLink as={Link} to="/admin">
          Admin
        </ChakraLink>
      </Flex>
    </Box>
  );
} 