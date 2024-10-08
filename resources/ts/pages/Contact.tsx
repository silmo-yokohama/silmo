import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import SubPageLayout from "../components/layouts/page/SubPageLayout";
import MailForm from "../components/layouts/forms/MialForm";
import { route } from "ziggy-js";
import SendingOverlay from "../components/layouts/loading/SendingOverlay";
import Modal from "../components/ui/modals/Modal";
import Complete from "../assets/lottie/Complate";

const Contact: React.FC = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    phone: "",
    category: "",
    content: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [serverResponse, setServerResponse] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const limitTile = 2000;
    const startTime = Date.now();

    post(route("contact.store"), {
      preserveState: true,
      preserveScroll: true,
      forceFormData: true,
      onSuccess: (page) => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        setServerResponse(page.props.flash);

        if (duration < limitTile) {
          setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccessAnimation(true);
          }, limitTile - duration);
        } else {
          setIsSubmitting(false);
          setShowSuccessAnimation(true);
        }
      },
      onError: (errors) => {
        setIsSubmitting(false);
        setServerResponse({ error: "送信に失敗しました。" });
      },
    });
  };

  const handleInputChange = (
    name: "name" | "email" | "phone" | "category" | "content",
    value: string
  ) => {
    setData(name, value);
  };

  const listClassName =
    "flex items-center mb-3 md:mb-2 justify-start gap-3 before:flex before:w-3 before:h-[2px] before:min-w-2 before:bg-primary";

  return (
    <SubPageLayout
      headerImage="/images/photo/typewriter.jpg"
      headerTitle="Contact"
      headerSubtitle="お問い合わせ"
      title="お問い合わせ"
    >
      <SendingOverlay isVisible={isSubmitting || processing} />
      <Modal
        isVisible={showSuccessAnimation}
        onClose={() => setShowSuccessAnimation(false)}
        lottieAnimation={<Complete />}
      >
        <h2 className="text-2xl text-center font-bold mb-4">送信完了</h2>
        <p>
          お問い合わせありがとうございました！ お急ぎの方は
          <a
            href="https://twitter.com/silmo_yokohama"
            target="_blank"
            className="underline text-primary inline"
          >
            Twitter
          </a>
          のDMからお問い合わせください。
        </p>
      </Modal>
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <div className="t bg-secondary-content border-secondary border-2 rounded-xl mt-4 mb-10 p-4 md:px-10 text-black">
          <h2 className="text-xl md:text-3xl text-center mb-3 md:mb-6">
            送信前にご一読お願いします！
          </h2>
          <ul className="text-xs md:text-sm">
            <li className={listClassName}>
              ポートフォリオなのでメールフォームも作成しましたが、実際に私の所にメールは飛びません。
            </li>
            <li className={listClassName}>
              メールは飛ばないので、時間など気にせず送信機能をお試しください。
            </li>
            <li className={listClassName}>
              ただし、念のため送信内容をデータベースに保存しているので、個人情報などが含まれるものを送ることはお控えください。
            </li>
            <li className={listClassName}>
              <span>
                私へのご連絡は
                <a
                  href="https://twitter.com/silmo_yokohama"
                  target="_blank"
                  className="underline text-primary inline"
                >
                  Twitter
                </a>
                のDMからお願いいたします！お仕事のご相談などお待ちしております👍
              </span>
            </li>
          </ul>
        </div>

        <MailForm
          onSubmit={handleSubmit}
          data={data}
          errors={errors}
          onChange={handleInputChange}
          isSubmitting={isSubmitting || processing}
        />
      </div>
    </SubPageLayout>
  );
};

export default Contact;
