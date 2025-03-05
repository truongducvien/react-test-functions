import { useCallback, useEffect, useRef } from "react";
import { CURSOR } from "./constants";

const usePanner = (containerRef, pannerRef, isActive) => {
  const startRef = useRef({
    x: containerRef.current?.scrollLeft || 0,
    y: containerRef.current?.scrollTop || 0,
  }); // Initial scroll position

  const scroll = (el, deltaX, deltaY) => {
    if (!el || isNaN(deltaX) || isNaN(deltaY)) return;
    const { x, y } = startRef.current;
    const cX = x - deltaX;
    const cY = y - deltaY;
    el.scrollTop = cY;
    el.scrollLeft = cX;
    startRef.current = { x: cX, y: cY };
  };

  const setCursorStyle = (elm, type) => {
    if (!elm || !type) return;
    elm.style.cursor = type;
  };

  const placeCenter = useCallback(() => {
    const cE = containerRef.current;
    const pE = pannerRef.current;
    if (!cE || !pE) return;

    const { width: cW, height: cH } = cE.getBoundingClientRect();
    const { width: pW, height: pH } = pE.getBoundingClientRect();

    // Calculate the distance between container's center and panner's center:
    const deltaX = (cW - pW) / 2;
    const deltaY = (cH - pH) / 2;
    // Reset scroll position
    startRef.current = { x: 0, y: 0 };

    scroll(cE, deltaX, deltaY);
  }, [containerRef, pannerRef]);

  const handleMouseEnter = () => {
    const elm = containerRef.current;
    if (!elm) return;
    setCursorStyle(elm, CURSOR.GRAB);
  };

  const handleMouseDown = () => {
    const elm = containerRef.current;
    if (!elm) return;
    setCursorStyle(elm, CURSOR.GRABBING);
    elm.addEventListener("mouseup", handleMouseUp);
    elm.addEventListener("mousemove", handleMouseMove);
    elm.addEventListener("mouseleave", handleMouseLeave);
  };

  const handleMouseUp = () => {
    const elm = containerRef.current;
    if (!elm) return;
    setCursorStyle(elm, CURSOR.GRAB);
    elm.removeEventListener("mousemove", handleMouseMove);
    elm.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const elm = containerRef.current;
    if (!elm) return;
    scroll(elm, e.movementX, e.movementY);
  };

  const handleMouseLeave = () => {
    const elm = containerRef.current;
    if (!elm) return;
    setCursorStyle(elm, CURSOR.DEFAULT);
    elm.removeEventListener("mousemove", handleMouseMove);
    elm.removeEventListener("mouseleave", handleMouseLeave);
  };

  useEffect(() => {
    setCursorStyle(
      containerRef.current,
      isActive ? CURSOR.GRAB : CURSOR.DEFAULT
    );
  }, [isActive, containerRef]);

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
