import { useDispatch, useSelector } from "react-redux";
import { addToast, removeToast, ToastMessage } from "../store/slices/toastSlice";
import { RootState } from "../store";

/**
 * トーストメッセージを管理するカスタムフック
 * @returns {Object} トーストメッセージの操作と現在のメッセージ一覧
 */
export const useToast = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.toast.messages);

  /**
   * 新しいトーストメッセージを表示する
   * @param {string} message 表示するメッセージ
   * @param {ToastMessage['type']} type メッセージのタイプ（デフォルトは'error'）
   */
  const showToast = (message: string, type: ToastMessage["type"] = "error") => {
    dispatch(addToast({ message, type }));
  };

  /**
   * 指定されたIDのトーストメッセージを閉じる
   * @param {string} id 閉じるメッセージのID
   */
  const closeToast = (id: string) => {
    dispatch(removeToast(id));
  };

  return { messages, showToast, closeToast };
};
