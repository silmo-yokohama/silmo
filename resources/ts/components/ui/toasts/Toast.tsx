import React, { useState, useCallback } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";
import { ToastMessage } from "../../../store/slices/toastSlice";

interface ToastProps {
  message: ToastMessage;
  onClose: (id: string) => void;
}

/**
 * 個別のトーストメッセージを表示するコンポーネント
 * @param {ToastProps} props コンポーネントのプロパティ
 * @returns {React.FC} トーストメッセージコンポーネント
 */
export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const [isLeaving, setIsLeaving] = useState(false);

  // アニメーション設定
  const springProps = useSpring({
    opacity: isLeaving ? 0 : 1,
    transform: isLeaving ? "translateY(-100%)" : "translateY(0)",
    config: isLeaving ? config.stiff : { tension: 300, friction: 20 },
    onRest: () => {
      if (isLeaving) {
        onClose(message.id);
      }
    },
  });

  const startLeaveAnimation = useCallback(() => {
    setIsLeaving(true);
  }, []);

  // 5秒後に自動的に閉じるアニメーションを開始
  React.useEffect(() => {
    const timer = setTimeout(startLeaveAnimation, 5000);
    return () => clearTimeout(timer);
  }, [startLeaveAnimation]);

  // メッセージタイプに応じたアイコンとスタイルを設定
  const getIconAndStyle = () => {
    switch (message.type) {
      case "error":
        return { icon: <XCircle className="w-6 h-6" />, alertClass: "alert-error" };
      case "success":
        return { icon: <CheckCircle className="w-6 h-6" />, alertClass: "alert-success" };
      case "warning":
        return { icon: <AlertCircle className="w-6 h-6" />, alertClass: "alert-warning" };
      case "info":
      default:
        return { icon: <Info className="w-6 h-6" />, alertClass: "alert-info" };
    }
  };

  const { icon, alertClass } = getIconAndStyle();

  return (
    <animated.div
      style={springProps}
      onClick={startLeaveAnimation}
      className="w-full max-w-sm mb-2 cursor-pointer"
    >
      <div className={`alert ${alertClass} shadow-lg`}>
        <div className="flex items-center gap-3">
          {icon}
          <span>{message.message}</span>
        </div>
      </div>
    </animated.div>
  );
};
