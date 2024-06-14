import { AnimatePresence, motion } from "framer-motion";
import "../Modal/_Modal.css";

function Modal({ children, callback }) {
  return (
    <>
      <AnimatePresence initial="false">
        <motion.div
          key={1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          onClick={callback}
          className="modal__backdrop"
        ></motion.div>
        <motion.div
          key={2}
          initial={{ opacity: 0, scale: 0.95, translateX: "-50%" }}
          animate={{ opacity: 1, scale: 1, translateX: "-50%" }}
          exit={{ opacity: 0, scale: 0.95, translateX: "-50%" }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="modal__container"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default Modal;
