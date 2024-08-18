import React from "react";
import { Toast } from "./Toast";
import { useToast } from "../../../hooks/useToast";

/**
 * 複数のトーストメッセージを管理し表示するコンテナコンポーネント
 * @returns {React.FC} トーストコンテナコンポーネント
 */
export const ToastContainer: React.FC = () => {
  const { messages, closeToast } = useToast();

  return (
    <div className="toast toast-end z-50">
      {messages.map((msg) => (
        <Toast key={msg.id} message={msg} onClose={closeToast} />
      ))}
    </div>
  );
};
