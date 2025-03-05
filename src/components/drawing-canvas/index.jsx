import { useEffect, useMemo, useRef, useState } from "react";
import usePanner from "./usePanner";
import { MODE } from "./constants";
import ModeBtn from "./ModeBtn";
import clsx from "clsx";

export default function DrawingCanvas() {
  const containerRef = useRef(null);
  const pannerRef = useRef(null);

  const [mode, setMode] = useState(MODE.PAN);

  const { placeCenter, handleMouseEnter, handleMouseDown } = usePanner(
    containerRef,
    pannerRef,
    mode === MODE.PAN
  );

  const modeBtnList = useMemo(
    () => [
      {
        key: "default",
        label: "Default",
        isActive: mode === MODE.DEFAULT,
        onClick: () => setMode(MODE.DEFAULT),
      },
      {
        key: "pan",
        label: "Pan",
        isActive: mode === MODE.PAN,
        onClick: () => setMode(MODE.PAN),
      },
      {
        key: "center",
        label: "Center",
        isActive: mode === MODE.CENTER,
        onClick: () => setMode(MODE.CENTER),
      },
    ],
    [mode]
  );

  useEffect(() => {
    placeCenter();
  }, [containerRef, pannerRef, placeCenter]);

  useEffect(() => {
    if (mode === MODE.CENTER) placeCenter();
  }, [mode, placeCenter]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        {modeBtnList.map(({ key, label, isActive, onClick }) => (
          <ModeBtn
            key={key}
            label={label}
            isActive={isActive}
            onClick={onClick}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className={clsx(
          "w-[700px] h-[400px] border-2 border-black overflow-hidden"
          // mode === MODE.PAN ? "cursor-grab" : "cursor-default"
        )}
        onMouseEnter={mode === MODE.PAN ? handleMouseEnter : () => {}}
        onMouseDown={mode === MODE.PAN ? handleMouseDown : () => {}}
      >
        <div
          ref={pannerRef}
          className="flex flex-col items-center justify-center bg-gray-300 w-[2000px] h-[2000px] overflow-hidden"
        >
          <div className="w-[400px] h-[300px] bg-white"></div>
        </div>
      </div>
    </div>
  );
}
