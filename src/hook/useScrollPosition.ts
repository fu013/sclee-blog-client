import { useState, useEffect } from "react";

// Toc 클릭 시, 해당 제목 위치로 스크롤 이동 훅
export default function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToEl = (index: number) => {
    const headingElements = document.querySelectorAll("h1, h2, h3");

    if (index >= 0 && index < headingElements.length) {
      const targetElement = headingElements[index];

      const hasContent =
        targetElement.textContent &&
        targetElement.textContent.trim().length > 0;

      if (hasContent) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return { scrollPosition, scrollToEl };
}
