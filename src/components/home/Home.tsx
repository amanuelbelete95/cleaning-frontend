import React, { useState } from 'react';
import './styles.css';
import { accordionData } from './data';
import { Box, Button, Text, chakra } from '@chakra-ui/react';
import Header from '../Header';

const Home = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [enableMultiple, setEnableMultiple] = useState<boolean>(false);
  const [multiple, setMultiple] = useState<number[]>([]);

  const handleSingleSelection = (id: number) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  const handleMultipleSelection = (id: number) => {
    setMultiple((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleEnableMultiple = () => {
    setEnableMultiple((prev) => !prev);
    setMultiple([]);
  };

  return (
    <Box className='home-container'>
      <header className='hero-section'>
        <Text as="h1">Solid Waste Management Services</Text>
        <Text>
          Explore frequently asked questions to learn more about solid waste
          management and how we maintain cleanliness and safety in the
          environment.
        </Text>
      </header>

      <Box className='content-section'>
        <Button
          className='toggle-button'
          onClick={toggleEnableMultiple}>
          {enableMultiple
            ? 'Disable Multiple Selection'
            : 'Enable Multiple Selection'}
        </Button>

        <Box className='accordion'>
          {accordionData.map((item) => (
            <Box
              className='accordion-item'
              key={item.id}>
              <Box
                className='accordion-title'
                onClick={() =>
                  enableMultiple
                    ? handleMultipleSelection(item.id)
                    : handleSingleSelection(item.id)
                }>
                <Text>{item.question}</Text>
                <chakra.span>
                  {selected === item.id || multiple.includes(item.id)
                    ? '-'
                    : '+'}
                </chakra.span>
              </Box>

              {(selected === item.id || multiple.includes(item.id)) && (
                <Box className='accordion-content' >{item.answer}</Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      <Box className='footer-section'>
        <Text>
          Amanuel Belete © {new Date().getFullYear()} Solid Waste Management
          Services. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Home;
