import { useEffect } from "react";

export const useSEO = ({ title, description }) => {
  useEffect(() => {
    if (title) {
      const fullTitle = `${title} | Asad ur Rehman`;
      document.title = fullTitle;
      document.querySelector('meta[property="og:title"]')?.setAttribute("content", fullTitle);
      document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", fullTitle);
    }

    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute("content", description);
      document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
      document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", description);
    }
  }, [title, description]);
};
