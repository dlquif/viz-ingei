import { useEffect, useRef, useState } from "react";

export function useDimensions(defDimensions) {
  const ref = useRef();
  const [dimensions, setDimensions] = useState(defDimensions);

  const measureSVG = () => {
    const { width, height } = ref.current.getBoundingClientRect();
    setDimensions({ width, height });
  };

  useEffect(() => {
    measureSVG();
    window.addEventListener("resize", measureSVG);
    return () => {
      window.removeEventListener("resize", measureSVG);
    };
  }, []);

  return [ref, dimensions];
}
