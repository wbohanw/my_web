import React, { useState, CSSProperties, useEffect } from 'react'
import { useTransition, animated, AnimatedProps, useSpringRef } from '@react-spring/web'

import styles from './styles.module.css'

const pages: ((props: AnimatedProps<{ style: CSSProperties }>) => React.ReactElement)[] = [
  // ({ style }) => <animated.div style={{ ...style, background: '#203753' }}><span className='lm: 20px'></span>B</animated.div>,
  // ({ style }) => <animated.div style={{ ...style, background: '#12323a' }}><span className='lm: 20px'></span>O</animated.div>,
  // ({ style }) => <animated.div style={{ ...style, background: '#6d777d' }}><span className='lm: 20px'></span>H</animated.div>,
  // ({ style }) => <animated.div style={{ ...style, background: '#203753' }}><span className='lm: 20px'></span>A</animated.div>,
  // ({ style }) => <animated.div style={{ ...style, background: '#12323a' }}><span className='lm: 20px'></span>N</animated.div>,
  // ({ style }) => <animated.div style={{ ...style, background: '#6d777d' }}><span className='lm: 20px'></span>W</animated.div>,
  // ({ style }) => <animated.div style={{ ...style, background: '#203753' }}><span className='lm: 20px'></span>A</animated.div>,
  // ({ style }) => <animated.div style={{ ...style, background: '#12323a' }}><span className='lm: 20px'></span>N</animated.div>,
  // ({ style }) => <animated.div style={{ ...style, background: '#6d777d' }}><span className='lm: 20px'></span>G</animated.div>,
  ({ style }) => <animated.div style={{ ...style, background: 'transparent' }}><span className='ml: 60px'></span>B</animated.div>,
  ({ style }) => <animated.div style={{ ...style, background: 'transparent' }}><span className='ml: 60px'></span>O</animated.div>,
  ({ style }) => <animated.div style={{ ...style, background: 'transparent' }}><span className='lm: 60px'></span>H</animated.div>,
  ({ style }) => <animated.div style={{ ...style, background: 'transparent' }}><span className='lm: 60px'></span>A</animated.div>,
  ({ style }) => <animated.div style={{ ...style, background: 'transparent' }}><span className='lm: 60px'></span>N</animated.div>,
  ({ style }) => <animated.div style={{ ...style, background: 'transparent' }}><span className='lm: 60px'></span>W</animated.div>,
  ({ style }) => <animated.div style={{ ...style, background: 'transparent' }}><span className='lm: 60px'></span>A</animated.div>,
  ({ style }) => <animated.div style={{ ...style, background: 'transparent' }}><span className='lm-60px'></span>N</animated.div>,
  ({ style }) => <animated.div style={{ ...style, background: 'transparent' }}><span className='lm-60px'></span>G</animated.div>,
  ({ style }) => <animated.div style={{ ...style, background: 'transparent' }}><span className='ml: 60px'></span>BOHAN</animated.div>,
  // ({ style }) => <animated.div style={{ ...style, background: 'transparent' }}><span className='ml: 60px'></span>WANG</animated.div>,
  
]

export default function BOHAN() {
  const [index, set] = useState(0)
  const onClick = () => set(state => (state + 1) % 10)
  const transRef = useSpringRef()
  const transitions = useTransition(index, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })
  useEffect(() => {
    transRef.start()
  }, [index])
  return (
    <div className={`flex fill ${styles.container}`} onClick={onClick}>
      {transitions((style, i) => {
        const Page = pages[i]
        return <Page style={style} />
      })}
    </div>
  )
}
