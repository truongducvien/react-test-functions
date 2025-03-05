import clsx from "clsx";

const ModeBtn = ({ label, onClick, isActive }) => (
  <button
    className={clsx({ "bg-#222222 text-white": isActive }, "text-sm")}
    onClick={onClick}
  >
    {label}
  </button>
);

export default ModeBtn;
