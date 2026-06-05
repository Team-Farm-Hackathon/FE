import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  closeLabel?: string;
};

export default function Modal({
  open,
  onClose,
  children,
  closeLabel = "닫 기",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-lg border-2 border-[#8a6a3d] bg-[#2a1d11] p-6 text-[#e8b86b] shadow-[0_0_40px_rgba(0,0,0,0.6)] md:p-8"
          >
            {children}

            <button
              onClick={onClose}
              className="mt-6 w-full border-2 border-[#1a1108] bg-[#d9a04a] py-3 text-sm tracking-widest text-[#2a1d11] transition-transform hover:bg-[#e8b86b] active:translate-y-0.5"
            >
              {closeLabel}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
