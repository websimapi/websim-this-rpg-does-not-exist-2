import React from 'react';

export const RPGGenerator = ({ onRPGCreated }) => {
  const [title, setTitle] = React.useState('');
  const [genre, setGenre] = React.useState('fantasy');
  const [setting, setSetting] = React.useState('');
  const [characters, setCharacters] = React.useState('');
  const [mechanics, setMechanics] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  
  const clearForm = () => {
    setTitle('');
    setGenre('fantasy');
    setSetting('');
    setCharacters('');
    setMechanics('');
  };
  
  const generateRPG = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Step 1: Generate the RPG description with LLM
      const rpgPrompt = `
        Create a detailed description for a fictional role-playing game titled "${title || '[Generate a title]'}" 
        in the ${genre} genre with the following elements:
        ${setting ? `Setting: ${setting}` : ''}
        ${characters ? `Characters: ${characters}` : ''}
        ${mechanics ? `Game Mechanics: ${mechanics}` : ''}

        Format your response as JSON with these fields:
        - title: A catchy title for this RPG (use the provided one if available)
        - genre: The primary genre with potential subgenres
        - tagline: A short, catchy tagline for marketing the game
        - description: A detailed 3-paragraph description of the game
        - setting: Rich details about the world and setting
        - characters: Types of characters players can create
        - mechanics: The core game mechanics that make this RPG unique
        - themes: 3-5 key themes in the game
      `;

      const rpgCompletion = await websim.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a creative RPG designer who can create detailed, imaginative role-playing game concepts. Be specific, evocative, and original."
          },
          {
            role: "user",
            content: rpgPrompt
          }
        ],
        json: true
      });

      const rpgData = JSON.parse(rpgCompletion.content);
      
      // Step 2: Generate the RPG cover image based on the description
      const imagePrompt = `
        Create a stunning, professional cover art for a role-playing game called "${rpgData.title}".
        The game is in the ${rpgData.genre} genre.
        Setting details: ${rpgData.setting}
        
        This should look like high-quality box art for a premium RPG, with dramatic lighting,
        rich colors, and a cinematic feel. Include title text in an appropriate thematic font.
        
        Style: Digital painting, highly detailed, professional concept art
      `;
      
      const imageResult = await websim.imageGen({
        prompt: imagePrompt,
        aspect_ratio: "3:4"
      });

      // Combine all the data
      const newRPG = {
        ...rpgData,
        imageUrl: imageResult.url,
        timestamp: new Date().toISOString()
      };

      // Save the new RPG and update the UI
      await onRPGCreated(newRPG);
      clearForm();
      
    } catch (err) {
      console.error('Error generating RPG:', err);
      setError('Failed to generate RPG. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Generate Your Own RPG</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={generateRPG}>
        <div className="form-group">
          <label htmlFor="title">Title (optional)</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Leave blank for AI to generate"
          />
        </div>
        
        <div className="input-row">
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <select 
              id="genre" 
              value={genre} 
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="fantasy">Fantasy</option>
              <option value="sci-fi">Science Fiction</option>
              <option value="horror">Horror</option>
              <option value="cyberpunk">Cyberpunk</option>
              <option value="steampunk">Steampunk</option>
              <option value="post-apocalyptic">Post-Apocalyptic</option>
              <option value="superhero">Superhero</option>
              <option value="mystery">Mystery</option>
              <option value="western">Western</option>
              <option value="historical">Historical</option>
              <option value="urban fantasy">Urban Fantasy</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="setting">Setting Ideas (optional)</label>
          <textarea
            id="setting"
            value={setting}
            onChange={(e) => setSetting(e.target.value)}
            placeholder="Describe the world or setting for your RPG"
            rows="3"
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="characters">Character Ideas (optional)</label>
          <textarea
            id="characters"
            value={characters}
            onChange={(e) => setCharacters(e.target.value)}
            placeholder="Describe character types, classes, or races"
            rows="3"
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="mechanics">Game Mechanics (optional)</label>
          <textarea
            id="mechanics"
            value={mechanics}
            onChange={(e) => setMechanics(e.target.value)}
            placeholder="Describe any unique game mechanics or rules"
            rows="3"
          ></textarea>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? (
            <span className="loading">
              <span className="spinner"></span>
              Generating your RPG...
            </span>
          ) : (
            'Generate RPG'
          )}
        </button>
      </form>
    </div>
  );
};

