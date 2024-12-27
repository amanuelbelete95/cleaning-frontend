import React, { useState } from 'react';
import './styles.css';
import { accordionData } from './data';
import { Box } from '@chakra-ui/react';

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
      <Box className='hero-section'>
        <h1>Solid Waste Management Services</h1>
        <p>
          Explore frequently asked questions to learn more about solid waste
          management and how we maintain cleanliness and safety in the
          environment.
        </p>
      </Box>

      <Box className='content-section'>
        <button
          className='toggle-button'
          onClick={toggleEnableMultiple}>
          {enableMultiple
            ? 'Disable Multiple Selection'
            : 'Enable Multiple Selection'}
        </button>

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
                <h2>{item.question}</h2>
                <span>
                  {selected === item.id || multiple.includes(item.id)
                    ? '-'
                    : '+'}
                </span>
              </Box>

              {(selected === item.id || multiple.includes(item.id)) && (
                <Box className='accordion-content'>{item.answer}</Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
