import { useEffect } from "react";

const useTitle = (title = "") => {
  useEffect(() => {
    if (!title) return;

    document.title = `E.L.F ${title}`;

    return () => {
      document.title = "E.L.F";
    };
  });
};

export default useTitle;
