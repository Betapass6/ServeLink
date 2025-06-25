import { Box, Flex, Link as ChakraLink, Spacer, Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <Box bg="teal.500" color="white" px={6} py={3} mb={6} boxShadow="sm">
      <Flex align="center">
        <ChakraLink as={Link} to="/" fontWeight="bold" fontSize="xl">
          ServeLink
        </ChakraLink>
        <Spacer />
        {user && user.role === 'BUYER' && (
          <ChakraLink as={Link} to="/dashboard/buyer" mr={4}>
            Dashboard Buyer
          </ChakraLink>
        )}
        {user && user.role === 'SELLER' && (
          <ChakraLink as={Link} to="/dashboard/seller" mr={4}>
            Dashboard Seller
          </ChakraLink>
        )}
        {user && user.role === 'ADMIN' && (
          <ChakraLink as={Link} to="/admin" mr={4}>
            Admin
          </ChakraLink>
        )}
        {!user && (
          <>
            <ChakraLink as={Link} to="/login" mr={4}>Login</ChakraLink>
            <ChakraLink as={Link} to="/register" mr={4}>Register</ChakraLink>
          </>
        )}
        {user && (
          <Button onClick={handleLogout} colorScheme="whiteAlpha" variant="outline" size="sm" ml={2}>
            Logout
          </Button>
        )}
        <ThemeSwitcher />
      </Flex>
    </Box>
  );
} 