// "use client";
// import React, { useState, useEffect } from "react";
// import { useTheme } from "next-themes";
// import { Switch } from "@/components/ui/switch";
//
// function ThemeToggle() {
//   const { setTheme, theme } = useTheme();
//   const [checked, setChecked] = useState(theme === "light");
//
//   useEffect(() => {
//     setChecked(theme === "light");
//   }, [theme]);
//
//   const handleThemeChange = (checked: boolean) => {
//     setChecked(checked);
//     setTimeout(() => setTheme(checked ? "light" : "dark"), 150);
//   };
//
//   return (
//     <Switch
//       checked={checked}
//       variant={"theme"}
//       onCheckedChange={handleThemeChange}
//     />
//   );
// }
//
// export default ThemeToggle;
