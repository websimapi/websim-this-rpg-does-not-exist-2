import React from 'react';

export const useMultiplayer = () => {
  const [room, setRoom] = React.useState(null);
  const [rpgs, setRpgs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    const initializeRoom = async () => {
      try {
        const newRoom = new WebsimSocket();
        setRoom(newRoom);
        
        // Get existing RPGs
        const existingRpgs = newRoom.collection('rpg').getList();
        
        // Set up subscription to keep RPGs up to date
        newRoom.collection('rpg').subscribe((updatedRpgs) => {
          setRpgs(updatedRpgs);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error initializing multiplayer:', error);
        setLoading(false);
      }
    };
    
    initializeRoom();
    
    return () => {
      // Clean up if needed
    };
  }, []);
  
  const addRPG = async (rpgData) => {
    try {
      if (!room) {
        throw new Error('Room not initialized');
      }
      
      // Create a new record in the 'rpg' collection
      await room.collection('rpg').create(rpgData);
      
      return true;
    } catch (error) {
      console.error('Error adding RPG:', error);
      throw error;
    }
  };
  
  return {
    room,
    rpgs,
    addRPG,
    loading
  };
};

