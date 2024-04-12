'use client';

import { useState } from 'react';
import Card from '@/components/Card';

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const [names, setNames] = useState(['Arie', 'Paul', 'John']);
  const name = 'Arie';
  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  const handleAddName = () => {
    setNames([...names, 'New Name']);
  };
  const cards = isVisible && names.map((name, index) => <Card key={index}>{name}</Card>);

  return (
    <div className='p-20 space-y-4'>
      <div>Hello, {name}</div>
      {cards}
      <div className='flex space-x-4'>
        <button onClick={handleClick}>{isVisible ? 'Hide Names' : 'Show Names'}</button>
        <button onClick={handleAddName}>Add Name</button>
      </div>
    </div>
  );
}
