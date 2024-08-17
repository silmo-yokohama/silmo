import React, { useEffect, useRef } from "react";
import { useSpring, animated, config } from "@react-spring/web";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  lottieAnimation?: React.ReactNode; // Lottieアニメーション用のプレースホルダー
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children, lottieAnimation }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [props, api] = useSpring(() => ({
    opacity: 0,
    y: -50,
    config: config.gentle,
  }));

  useEffect(() => {
    api.start({
      opacity: isVisible ? 1 : 0,
      y: isVisible ? 0 : -50,
    });
  }, [isVisible, api]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible && props.opacity.get() === 0) return null;

  return (
    <animated.div
      style={{
        opacity: props.opacity,
        pointerEvents: isVisible ? "all" : "none",
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
      <animated.div
        ref={modalRef}
        style={{
          y: props.y,
          padding: "2rem",
          borderRadius: "0.5rem",
          maxWidth: "90%",
          maxHeight: "90%",
          overflow: "auto",
          position: "relative",
        }}
        className="bg-base-200 text-base-content"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {lottieAnimation && <div className="mb-4">{lottieAnimation}</div>}
        <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">{children}</div>
      </animated.div>
    </animated.div>
  );
};

export default Modal;
