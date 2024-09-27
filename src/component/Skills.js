import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import Song1 from "./Song1";
import Song2 from "./Song2";
import Song3 from "./Song3";

export const Skills = () => {
  const [openSong, setOpenSong] = useState(null);

  const handleToggle = (song) => {
    setOpenSong(openSong === song ? null : song);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="music">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>音乐和歌曲</h2>
                        <p>这里是我创作的一些歌曲：</p>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                            <div className="item">
                                <Song1 
                                  buttonText="歌曲 1" 
                                  isOpen={openSong === 'song1'} 
                                  onToggle={() => handleToggle('song1')} 
                                />
                            </div>
                            <div className="item">
                                <Song2 
                                  buttonText="歌曲 2" 
                                  isOpen={openSong === 'song2'} 
                                  onToggle={() => handleToggle('song2')} 
                                />
                            </div>
                            <div className="item">
                                <Song3 
                                  buttonText="歌曲 3" 
                                  isOpen={openSong === 'song3'} 
                                  onToggle={() => handleToggle('song3')} 
                                />
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}