import { useState, useEffect, useRef } from "react";
import { Box, Button, Flex, Text, useColorMode, useColorModeValue, VStack, Heading } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

const colors = ["red", "green", "blue", "yellow"];
const words = ["RED", "GREEN", "BLUE", "YELLOW"];

const randomIndex = () => Math.floor(Math.random() * colors.length);

const Index = () => {
  const [currentColor, setCurrentColor] = useState(randomIndex());
  const [currentWord, setCurrentWord] = useState(randomIndex());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [scores, setScores] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const color = useColorModeValue("black", "white");

  const handleButtonClick = (colorIndex) => {
    if (startTime) {
      setEndTime(new Date());
      if (colors[colorIndex] === words[currentWord].toLowerCase()) {
        const reactionTime = new Date() - startTime;
        const newScores = [...scores, reactionTime].sort((a, b) => a - b).slice(0, 10);
        setScores(newScores);
      }
    }
    setCurrentColor(randomIndex());
    setCurrentWord(randomIndex());
    setStartTime(new Date());
  };

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  return (
    <VStack p={5} bg={bgColor} color={color} minH="100vh" justifyContent="center" spacing={8}>
      <Flex justifyContent="space-between" w="full" px={10}>
        <Heading>Stroop Test</Heading>
        <Button onClick={toggleColorMode}>{colorMode === "light" ? <FaMoon /> : <FaSun />}</Button>
      </Flex>
      <Box textAlign="center">
        <Text fontSize="6xl" color={colors[currentColor]} fontWeight="bold">
          {words[currentWord]}
        </Text>
        <Text fontSize="xl">Click the button with the color of the word above!</Text>
      </Box>
      <Flex>
        {colors.map((color, index) => (
          <Button key={color} colorScheme={color} m={2} onClick={() => handleButtonClick(index)}>
            {color.toUpperCase()}
          </Button>
        ))}
      </Flex>
      {endTime && <Text fontSize="lg">Reaction Time: {(endTime - startTime).toFixed(0)} ms</Text>}
      <VStack>
        <Heading size="md">Leaderboard (Top 10 Fastest Times)</Heading>
        {scores.map((score, index) => (
          <Text key={index}>
            {index + 1}. {score} ms
          </Text>
        ))}
      </VStack>
    </VStack>
  );
};

export default Index;
