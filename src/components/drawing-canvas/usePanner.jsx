import { useEffect, useState } from "react";

const usePanner = (containerRef, pannerRef) => {
  const [startX, setStartX] = useState();
  const [startY, setStartY] = useState();

  const scroll = (el, deltaX, deltaY) => {
    if (!el || isNaN(deltaX) || isNaN(deltaY)) return;
    el.scrollTop -= deltaY;
    el.scrollLeft -= deltaX;
  };

  const placeCenter = () => {
    const cE = containerRef.current;
    const pE = pannerRef.current;
    if (!cE || !pE) return;
    const { width: cW, height: cH } = cE.getBoundingClientRect();
    const { width: pW, height: pH } = pE.getBoundingClientRect();

    // Calculate the distance between container's center and panner's center:
    const deltaX = (cW - pW) / 2;
    const deltaY = (cH - pH) / 2;
    scroll(cE, deltaX, deltaY);
  };

  const handleMouseEnter = () => {
    const elm = containerRef.current;
    if (!elm) return;
    elm.style.cursor = "grab";
  };

  const handleMouseDown = () => {
    const elm = containerRef.current;
    if (!elm) return;
    elm.style.cursor = "grabbing";
    elm.addEventListener("mouseup", handleMouseUp);
    elm.addEventListener("mousemove", handleMouseMove);
    elm.addEventListener("mouseleave", handleMouseLeave);
  };

  const handleMouseUp = () => {
    const elm = containerRef.current;
    if (!elm) return;
    elm.style.cursor = "grab";
    elm.removeEventListener("mousemove", handleMouseMove);
  };

  const handleMouseMove = (e) => {
    const elm = containerRef.current;
    if (!elm) return;
    scroll(elm, e.movementX, e.movementY);
  };

  const handleMouseLeave = () => {
    const elm = containerRef.current;
    if (!elm) return;
    elm.style.cursor = "unset";
    elm.removeEventListener("mousemove", handleMouseMove);
  };

  useEffect(() => {
    console.log("re render");

    return () => {};
  }, []);

  return {
    placeCenter,
    handleMouseEnter,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleMouseLeave,
  };
};

export default usePanner;
