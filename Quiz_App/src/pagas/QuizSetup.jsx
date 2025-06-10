import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
  Text,
  VStack,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getData } from '../redux/slices/slices';

export const QuizSetup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const categoryRef = useRef(null);
  const difficultyRef = useRef(null);
  const questionCountRef = useRef(null);
  const toast = useToast();

  const isLoading = useSelector((state) => state.quizes.isLoding);
  const [formError, setFormError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const category = +categoryRef.current.value;
    const difficulty = difficultyRef.current.value;
    const numOfQuestions = +questionCountRef.current.value;

    if (!name || !category || !difficulty || !numOfQuestions) {
      setFormError(true);
      toast({
        title: 'Please fill out all fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setFormError(false);

    dispatch(getData({ numOfQuesiton: numOfQuestions, catagory: category, difficulty, userName: name }));

    toast({
      title: 'Quiz is loading...',
      status: 'success',
      duration: 1000,
      isClosable: true,
    });

    setTimeout(() => {
      navigate('/quiz');
    }, 1000);
  };

  return (
    <Box
      w="full"
      minH="100vh"
      bg="gray.50"
      px={4}
      py={10}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        w={{ base: "100%", sm: "90%", md: "70%", lg: "40%" }}
        bg="white"
        p={{ base: 6, md: 10 }}
        rounded="xl"
        boxShadow="lg"
      >
        <Heading fontSize="2xl" mb={6} color="#F50157" textAlign="center">
          Set up Your Quiz
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired isInvalid={formError && !nameRef.current?.value}>
              <FormLabel>Enter Your Name</FormLabel>
              <Input placeholder="John Doe" ref={nameRef} />
            </FormControl>

            <FormControl isRequired isInvalid={formError && categoryRef.current?.value === "0"}>
              <FormLabel>Select Category</FormLabel>
              <Select placeholder="Select Category" ref={categoryRef}>
                <option value="9">General Knowledge</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
              </Select>
            </FormControl>

            <FormControl isRequired isInvalid={formError && !difficultyRef.current?.value}>
              <FormLabel>Select Difficulty</FormLabel>
              <Select placeholder="Select Difficulty" ref={difficultyRef}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Select>
            </FormControl>

            <FormControl isRequired isInvalid={formError && !questionCountRef.current?.value}>
              <FormLabel>Number of Questions</FormLabel>
              <Input type="number" placeholder="5" ref={questionCountRef} min="1" max="50" />
            </FormControl>

            <Button
              type="submit"
              colorScheme="pink"
              bg="#F50157"
              _hover={{ bg: "#cc1a58" }}
              w="full"
              isLoading={isLoading}
              spinner={<Spinner size="sm" />}
            >
              {isLoading ? 'Loading...' : 'Start Quiz'}
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};
