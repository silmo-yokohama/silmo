import React, { useState, useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";
import Loading from "../../../assets/lottie/Loading";

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 1000); // フェードアウト時間と同じ
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const transition = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 250 },
  });

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  return transition((style, item) =>
    item ? (
      <animated.div
        style={style}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80"
      >
        <div className="text-white text-4xl">
          <Loading />
        </div>
      </animated.div>
    ) : null
  );
};

export default LoadingOverlay;
