import React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import LineExample from "./Chart";


function App() {
  const [temperature, setTemperature] = React.useState(0)
  const [breathing, setBreathing] = React.useState(0)
  const [timer, setTimer] = React.useState(null)

  async function getData() {
    try {
      const result = await fetch('http://localhost:5000/app')
      const data = await result.json()
      data.forEach(function (item, index) {
        if (item.type === 'Temperature') {
          setTemperature(item.value)
        } else if (item.type === 'Breathing') {
          setBreathing(item.value)
        }
      });
    } catch (e) {
      console.error(e)
    }

    clearTimeout(timer)
    setTimer(setTimeout(getData, 500))
  }
  
  React.useEffect(() => {
    getData();
  }, []);

  
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <p>Temperature: {temperature}</p>
            {/* <p>Breathing: {breathing}</p>s */}
            <LineExample breathing={breathing} />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
