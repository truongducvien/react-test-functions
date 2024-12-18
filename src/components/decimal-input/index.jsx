// import { useState } from "react";

// const NUM_INPUT_REGEX = /^[0-9,.]*$/g;

// export default function DecimalInput({
//   decimalSeparator = ".",
//   decimalScale,
//   value,
//   onChange,
// }) {
//   const [displayValue, setDisplayValue] = useState(
//     value?.replace(".", decimalSeparator)
//   );
//   console.log({ value });

//   const handleChange = (e) => {
//     let formatted;
//     const value = e.target.value;
//     // Validation input:
//     if (!value?.match(NUM_INPUT_REGEX)) return;
//     console.log("match::: ", value?.match(NUM_INPUT_REGEX));
//     // Replace separator:
//     formatted = value?.replace(".", decimalSeparator);
//     // Prevent duplication of decimal separator:
//     const isDuplicatedSeparator =
//       formatted?.split("").filter((it) => it === decimalSeparator)?.length > 1;
//     if (isDuplicatedSeparator) return;
//     // Limit decimal:
//     if (decimalScale) {
//       const decimalIndex = formatted
//         ?.split("")
//         .findIndex((it) => it === decimalSeparator);
//       if (decimalIndex < 0) return; // There is no decimal separator
//       formatted = formatted?.substr(0, decimalIndex + decimalScale + 1);
//     }

//     // setDisplayValue(formatted);
//     // onChange?.(formatted.replace(",", "."));
//   };

//   return <input value={displayValue} onChange={handleChange} />;
// }

import React, { useState } from "react";

const DecimalInput = () => {
  const [value, setValue] = useState(""); // State to hold only valid numbers

  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Allow only numbers, comma, or period
    const sanitizedValue = inputValue.replace(/[^0-9,.]/g, "");

    // Update state with the sanitized value
    setValue(sanitizedValue);
  };

  return (
    <input
      type="text"
      value={value} // Controlled value from state
      onChange={handleChange} // Sanitize input on every change
    />
  );
};

export default DecimalInput;
