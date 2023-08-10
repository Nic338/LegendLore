import './LandingPage.css';

export const Hello = () => {
  return (
    <div className="landing-container">
      <h2>Welcome to</h2>
      <h1 className='legend-landing-header'>Legend</h1>
      <h1 className='lore-landing-header'>Lore</h1>
      <p>A simple tool for creating and managing epic Dungeons & Dragons campaigns.</p>
      <p>Design immersive worlds, craft compelling quests, and bring your adventures to life with this interactive world-building app designed to keep your thoughts and ideas organized for your next D&D session!</p>
      <p>To get started, click on the My Campaigns option in the top left of the page.</p>
    </div>
  );
}