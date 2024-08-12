import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface OpeningAnimationProps {
  onAnimationComplete: () => void;
}

/**
 * スライムのような動きを持つGSAPを使用したオープニングアニメーションコンポーネント
 * @param {Function} onAnimationComplete - アニメーション完了時に呼び出されるコールバック関数
 */
const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onAnimationComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/images/logo/silmo.png';
    img.onload = () => {
      setIsImageLoaded(true);
    };
  }, []);

  useEffect(() => {
    if (isImageLoaded && containerRef.current && logoRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: onAnimationComplete
          });
        }
      });

      tl.set(logoRef.current, { opacity: 0, scale: 1, filter: 'grayscale(100%)' })
        .to(logoRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out'
        })
        .to(logoRef.current, {
          scaleY: 0.5,
          duration: 0.3,
          ease: 'power2.in'
        })
        .to(logoRef.current, {
          scaleY: 1.1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.3)'
        })
        .to(logoRef.current, {
          scaleY: 1,
          duration: 0.2,
          ease: 'power2.out'
        })
        .to(logoRef.current, {
          y: '-=10',
          duration: 0.1,
          ease: 'power2.out',
          yoyo: true,
          repeat: 3
        })
        .to(containerRef.current, {
          backgroundColor: '#00A197',
          duration: 1,
          ease: 'power2.inOut'
        }, '-=0.8')
        .to(logoRef.current, {
          filter: 'grayscale(0%)',
          duration: 1,
          ease: 'power2.inOut'
        }, '<');
    }
  }, [isImageLoaded, onAnimationComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        zIndex: 9999,
      }}
    >
      {isImageLoaded && (
        <img
          ref={logoRef}
          src="/images/logo/silmo.png"
          alt="Silmo Logo"
          style={{ width: '200px' }}
        />
      )}
    </div>
  );
};

export default OpeningAnimation;
