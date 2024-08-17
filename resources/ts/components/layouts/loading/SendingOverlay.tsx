import { config, useSpring, animated } from "@react-spring/web";
import React, { useEffect } from "react";

interface SendingOverlayProps {
  isVisible: boolean;
  onAnimationComplete?: () => void;
}

const SendingOverlay: React.FC<SendingOverlayProps> = ({ isVisible, onAnimationComplete }) => {
  const [props, api] = useSpring(() => ({
    opacity: 0,
    config: { ...config.gentle, duration: 300 },
    onRest: () => {
      if (!isVisible && onAnimationComplete) {
        onAnimationComplete();
      }
    },
  }));

  useEffect(() => {
    api.start({ opacity: isVisible ? 1 : 0 });
  }, [isVisible, api]);

  if (!isVisible && props.opacity.get() === 0) return null;

  return (
    <animated.div
      style={{
        opacity: props.opacity,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      <div className="text-white text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        <p className="mt-4 text-lg font-semibold">送信中...</p>
      </div>
    </animated.div>
  );
};

export default SendingOverlay;
