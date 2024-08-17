import React from "react";
import TextInput from "../../ui/forms/TextInput";
import RadioInput from "../../ui/forms/RadioInput";
import TextareaInput from "../../ui/forms/TextareaInput";

interface MailFormProps {
  onSubmit: (e: React.FormEvent) => void;
  data: {
    name: string;
    email: string;
    phone: string;
    category: string;
    content: string;
    "g-recaptcha-response": string;
  };
  errors: any; // eslint-disable-line
  onChange: (name: string, value: string) => void;
  isSubmitting: boolean;
}

const MailForm: React.FC<MailFormProps> = ({ onSubmit, data, errors, onChange, isSubmitting }) => {
  const categoryOptions = [
    { value: "制作に関するご相談", label: "制作に関するご相談" },
    { value: "外注・業務委託に関するご相談", label: "外注・業務委託に関するご相談" },
    { value: "単価（料金）に関するお問い合わせ", label: "単価（料金）に関するお問い合わせ" },
    { value: "その他", label: "その他" },
  ];

  const inputWrapperClass = "mb-6";
  const labelClass = "t block mb-2 text-lg font-medium  text-base-content ";
  const inputClass =
    "w-full px-4 py-2 border bg-base-100 border-base-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500";
  const errorClass = "mt-1 text-sm text-red-600";

  return (
    <form onSubmit={onSubmit} className="bg-base-300 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <div className={inputWrapperClass}>
        <label htmlFor="name" className={labelClass}>
          お名前 (必須)
        </label>
        <TextInput
          id="name"
          value={data.name}
          onChange={onChange}
          required
          className={inputClass}
          placeholder="山田 太郎"
        />
        {errors.name && <div className={errorClass}>{errors.name}</div>}
      </div>

      <div className={inputWrapperClass}>
        <label htmlFor="email" className={labelClass}>
          E-Mail (必須)
        </label>
        <TextInput
          id="email"
          type="email"
          value={data.email}
          onChange={onChange}
          required
          className={inputClass}
          placeholder="example@example.com"
        />
        {errors.email && <div className={errorClass}>{errors.email}</div>}
      </div>

      <div className={inputWrapperClass}>
        <label htmlFor="phone" className={labelClass}>
          電話番号 (任意)
        </label>
        <TextInput
          id="phone"
          type="tel"
          value={data.phone}
          onChange={onChange}
          className={inputClass}
          placeholder="090-1234-5678"
        />
        {errors.phone && <div className={errorClass}>{errors.phone}</div>}
      </div>

      <div className={inputWrapperClass}>
        <label className={labelClass}>区分 (必須)</label>
        <RadioInput
          id="category"
          options={categoryOptions}
          value={data.category}
          onChange={onChange}
          required
          className="space-y-2"
        />
        {errors.category && <div className={errorClass}>{errors.category}</div>}
      </div>

      <div className={inputWrapperClass}>
        <label htmlFor="content" className={labelClass}>
          内容 (必須)
        </label>
        <TextareaInput
          id="content"
          value={data.content}
          onChange={onChange}
          required
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder="お問い合わせ内容をご記入ください"
        />
        {errors.content && <div className={errorClass}>{errors.content}</div>}
      </div>

      <div className="flex items-center justify-center p-6">
        <button
          type="submit"
          className={`t bg-primary hover:bg-primary-content text-white font-bold py-5 px-16 rounded focus:outline-none focus:shadow-outline ${
            isSubmitting ? "opacity-50 cursor-not-allowed disabled:bg-base-300" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "送信中..." : "送信"}
        </button>
      </div>
    </form>
  );
};

export default MailForm;
