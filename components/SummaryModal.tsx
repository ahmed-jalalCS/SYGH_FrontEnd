"use client";
import { useState } from "react";
import { FaCopy, FaTimes, FaVolumeUp } from "react-icons/fa";
import { MdGTranslate, MdSummarize } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  summaryText: string;
  isLoading: boolean; // ✅ NEW: add loading prop
}

const SummaryModal: React.FC<SummaryModalProps> = ({
  isOpen,
  onClose,
  summaryText,
  isLoading,
}) => {
  const [translatedText, setTranslatedText] = useState<string>("");
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    toast.success("✅ تم نسخ الملخص بنجاح!", {
      style: { direction: "rtl", fontFamily: "Tajawal, sans-serif" },
    });
  };

  const handleSpeak = (text: string) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = /[\u0600-\u06FF]/.test(text) ? "ar-SA" : "en-US";
    synth.speak(utter);
  };

  const translateText = async () => {
    setIsTranslating(true);
    setTranslatedText("...جاري الترجمة");

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: summaryText }),
      });

      const data = await res.json();

      if (data?.translatedText) {
        setTranslatedText(data.translatedText);
        toast.success("✅ تمت الترجمة بنجاح!");
      } else {
        throw new Error("فشل الترجمة");
      }
    } catch (error) {
      toast.error("❌ حدث خطأ أثناء الترجمة");
      setTranslatedText("❌ الترجمة غير متوفرة حالياً.");
    } finally {
      setIsTranslating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Toaster />
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div
          className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative"
          dir="rtl"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-700">
            <MdSummarize size={24} /> ملخص المشروع
          </h2>

          <textarea
            readOnly
            value={isLoading ? "⏳ جاري توليد الملخص..." : summaryText}
            className="w-full h-40 p-4 border rounded-lg bg-gray-100 text-gray-800 resize-none"
          ></textarea>

          <div className="flex justify-between items-center mt-4 flex-wrap gap-3">
            <button
              onClick={handleCopy}
              disabled={isLoading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
            >
              <FaCopy /> نسخ الملخص
            </button>

            <button
              onClick={() => handleSpeak(summaryText)}
              disabled={isLoading}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
            >
              <FaVolumeUp /> استمع للنص
            </button>

            <button
              onClick={translateText}
              disabled={isLoading || isTranslating}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
            >
              <MdGTranslate /> ترجمة
            </button>

            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-800 ml-auto"
            >
              <FaTimes /> إغلاق
            </button>
          </div>

          {/* ترجمة النص */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <MdGTranslate /> الترجمة:
            </h3>
            <div className="flex justify-between gap-2 items-center">
              <p className="bg-gray-50 border p-3 rounded-lg text-gray-800 whitespace-pre-line w-full">
                {isTranslating ? "⏳ ...جاري الترجمة" : translatedText}
              </p>
              <button
                onClick={() => handleSpeak(translatedText)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                <FaVolumeUp size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryModal;
