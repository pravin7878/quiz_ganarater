import React from 'react';
import {
  Box,
  Text,
  Heading,
  Button,
  VStack,
  useColorModeValue,
  useBreakpointValue,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaMedal, FaTrophy, FaRegSadTear } from 'react-icons/fa';

const getLevel = (score, total) => {
  const percent = (score / total) * 100;
  if (percent >= 90) return { level: "Platinum", icon: FaTrophy, color: "#ff007f", message: "🏆 Congratulations!" };
  if (percent >= 70) return { level: "Gold", icon: FaMedal, color: "#ffb300", message: "🥇 Well done!" };
  if (percent >= 50) return { level: "Silver", icon: FaMedal, color: "#90caf9", message: "🥈 Good Effort!" };
  if (percent >= 30) return { level: "Bronze", icon: FaMedal, color: "#8d6e63", message: "🥉 Keep Practicing!" };
  return { level: "No Medal", icon: FaRegSadTear, color: "#e53935", message: "❌ Try Again!" };
};

const Leaderboard = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
// console.log(state)

  const userName = state?.userName || "Guest";
  const score = state?.score || 0;
  const totalScore = state?.totalScore || 5;

  const { level, icon, color, message } = getLevel(score, totalScore);
  const cardBg = useColorModeValue("white", "gray.800");
  const fontSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("#fefeff", "gray.900")}
      px={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="full"
        maxW="lg"
        bg={cardBg}
        p={{ base: 6, md: 10 }}
        borderRadius="2xl"
        boxShadow="2xl"
        textAlign="center"
      >
        <VStack spacing={6}>
          <Heading fontSize={{ base: "2xl", md: "3xl" }} color={color}>
            {message}
          </Heading>

          <Flex
            align="center"
            justify="center"
            bg="#ffeaf5"
            borderRadius="full"
            w={20}
            h={20}
            color={color}
          >
            <Icon as={icon} w={10} h={10} />
          </Flex>

          <Text fontSize="xl" fontWeight="bold" color="#333">
            {userName}
          </Text>

          <Text fontSize="md" color="gray.600">
            Your Score: <b>{score}</b> / {totalScore}
          </Text>

          <Box
            px={4}
            py={2}
            borderRadius="md"
            bg={color}
            color="white"
            fontWeight="bold"
            fontSize={fontSize}
          >
            Level: {level}
          </Box>

          {score / totalScore < 0.3 && (
            <Button
              onClick={() => navigate("/quiz")}
              color="white"
              bg="#ff007f"
              _hover={{ bg: "#e6006f" }}
              size="md"
            >
              Try Again
            </Button>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export  {Leaderboard};
