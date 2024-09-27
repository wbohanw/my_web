import React, { useState, useRef } from 'react';
import './Song.css';

const Song3 = ({ buttonText, isOpen, onToggle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("播放被中断: ", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`song-container ${isOpen ? 'open' : ''}`}>
      <button className="song-button" onClick={onToggle}>
        {buttonText}
      </button>
      {isOpen && (
        <div className="song-content">
          <img 
            src="/assets/img/song3-image.jpg" 
            alt="Song 3" 
            className={`song-image ${isPlaying ? 'rotating' : ''}`}
          />
          <audio ref={audioRef} controls>
            <source src="/assets/audio/song3.mp3" type="audio/mpeg" />
            您的浏览器不支持 audio 元素。
          </audio>
          <button className="play-button" onClick={togglePlay}>
            {isPlaying ? '暂停' : '播放'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Song3;