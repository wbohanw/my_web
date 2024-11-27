import { useState, useEffect, useRef } from "react";
import { MdPlayArrow, MdPause, MdSkipNext, MdSkipPrevious, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import cn from "classnames";
import './music.css';
import React from "react";
// Main App Component
export default function Music() {
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [songs] = useState([
    { title: "Song Number 1", src: "/Users/bohan/Desktop/my_web/src/assets/audio/song1.mp3", trackNumber: "01" },
    { title: "Song Number 2", src: "/Users/bohan/Desktop/my_web/src/assets/audio/song2.mp3", trackNumber: "02" },
    { title: "Song Number 3", src: "/Users/bohan/Desktop/my_web/src/assets/audio/song3.mp3", trackNumber: "03" },
    { title: "Song Number 4", src: "/Users/bohan/Desktop/my_web/src/assets/audio/song4.mp3", trackNumber: "04" },
    { title: "Song Number 5", src: "/Users/bohan/Desktop/my_web/src/assets/audio/song5.mp3", trackNumber: "05" },
  ]);
  const currentSong = songs[currentSongIndex];

  return (
    <div className="not-prose border rounded-lg my-10">
      <div className="container">
        <h1 className="text-xl md:text-4xl font-bold mb-8">My Audio Player</h1>
        <ul>
          {songs.map((song, index) => (
            <TrackItem
              key={index}
              selected={index === currentSongIndex}
              title={song.title}
              trackNumberLabel={song.trackNumber}
              onClick={() => setCurrentSongIndex(index)}
            />
          ))}
        </ul>
      </div>
      <AudioPlayer
        key={currentSongIndex}
        currentSong={currentSong}
        songCount={songs.length}
        songIndex={currentSongIndex}
        onNext={() => setCurrentSongIndex((i) => i + 1)}
        onPrev={() => setCurrentSongIndex((i) => i - 1)}
      />
    </div>
  );
}

// AudioPlayer Component
function AudioPlayer({ currentSong, songCount, songIndex, onNext, onPrev }) {
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
  };

  const handleVolumeChange = (volumeValue) => {
    if (!audioRef.current) return;
    audioRef.current.volume = volumeValue;
    setVolume(volumeValue);
  };

  const handleBufferProgress = (e) => {
    const audio = e.currentTarget;
    const dur = audio.duration;
    if (dur > 0) {
      for (let i = 0; i < audio.buffered.length; i++) {
        if (audio.buffered.start(audio.buffered.length - 1 - i) < audio.currentTime) {
          const bufferedLength = audio.buffered.end(audio.buffered.length - 1 - i);
          setBuffered(bufferedLength);
          break;
        }
      }
    }
  };

  const handleMuteUnmute = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = audioRef.current.volume === 0 ? 1 : 0;
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    const timeout = setTimeout(() => audioRef.current?.play(), 500);
    return () => clearTimeout(timeout);
  }, [songIndex]);

  const formatDurationDisplay = (duration) => {
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration % 60);
    return [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":");
  };

  const durationDisplay = formatDurationDisplay(duration);
  const elapsedDisplay = formatDurationDisplay(currentProgress);

  return (
    <div className="audio-player">
      {currentSong && (
        <audio
          ref={audioRef}
          preload="metadata"
          onDurationChange={(e) => setDuration(e.currentTarget.duration)}
          onCanPlay={() => setIsReady(true)}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={onNext}
          onTimeUpdate={(e) => setCurrentProgress(e.currentTarget.currentTime)}
          onProgress={handleBufferProgress}
          onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
        >
          <source type="audio/mpeg" src={currentSong.src} />
        </audio>
      )}
      <div className="text-center mb-1">
        <p className="text-slate-300 font-bold">{currentSong?.title ?? "Select a song"}</p>
        <p className="text-xs">Singer Name</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 items-center mt-4">
        <IconButton onClick={onPrev} disabled={songIndex === 0} aria-label="go to previous">
          <MdSkipPrevious size={24} />
        </IconButton>
        <IconButton onClick={togglePlayPause} disabled={!isReady} aria-label={isPlaying ? "Pause" : "Play"}>
          {!isReady ? <CgSpinner size={24} className="animate-spin" /> : isPlaying ? <MdPause size={30} /> : <MdPlayArrow size={30} />}
        </IconButton>
        <IconButton onClick={onNext} disabled={songIndex === songCount - 1} aria-label="go to next">
          <MdSkipNext size={24} />
        </IconButton>
      </div>
      <div className="flex gap-3 items-center md:justify-self-end mt-3">
        <IconButton onClick={handleMuteUnmute} aria-label={volume === 0 ? "unmute" : "mute"}>
          {volume === 0 ? <MdVolumeOff size={20} /> : <MdVolumeUp size={20} />}
        </IconButton>
        <VolumeInput volume={volume} onVolumeChange={handleVolumeChange} />
      </div>
      <AudioProgressBar
        duration={duration}
        currentProgress={currentProgress}
        buffered={buffered}
        onChange={(e) => {
          if (!audioRef.current) return;
          audioRef.current.currentTime = e.currentTarget.valueAsNumber;
          setCurrentProgress(e.currentTarget.valueAsNumber);
        }}
      />
      <div className="text-xs text-center mt-2">{`${elapsedDisplay} / ${durationDisplay}`}</div>
    </div>
  );
}

// VolumeInput Component
function VolumeInput({ volume, onVolumeChange }) {
  return (
    <input
      aria-label="volume"
      type="range"
      min={0}
      max={1}
      step={0.05}
      value={volume}
      className="volume-input"
      onChange={(e) => onVolumeChange(e.target.valueAsNumber)}
    />
  );
}

// AudioProgressBar Component
function AudioProgressBar({ duration, currentProgress, buffered, ...rest }) {
  const progressBarWidth = isNaN(currentProgress / duration) ? 0 : currentProgress / duration;
  const bufferedWidth = isNaN(buffered / duration) ? 0 : buffered / duration;

  const progressStyles = {
    "--progress-width": progressBarWidth,
    "--buffered-width": bufferedWidth,
  };

  return (
    <div className="audio-progress-bar">
      <input
        type="range"
        name="progress"
        style={progressStyles}
        min={0}
        max={duration}
        value={currentProgress}
        className="progress-bar"
        {...rest}
      />
    </div>
  );
}

// TrackItem Component
function TrackItem({ title, trackNumberLabel, selected, onClick }) {
  return (
    <li
      onClick={onClick}
      className={cn(
        "track-item",
        { "selected": selected },
        { "hover": !selected }
      )}
    >
      <span className="text-sm inline-block">{trackNumberLabel}</span>
      <h2 className="flex-1 text-base text-center">{title}</h2>
      <span>{selected ? <MdPause size={20} /> : <MdPlayArrow size={20} />}</span>
    </li>
  );
}

// IconButton Component
function IconButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "icon-button",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}