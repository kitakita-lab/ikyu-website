import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** 本文中心のページでは narrow を使う(読みやすい行長) */
  width?: "default" | "narrow";
  className?: string;
};

export function Container({ children, width = "default", className = "" }: Props) {
  const max = width === "narrow" ? "max-w-[720px]" : "max-w-[1080px]";
  return (
    <div className={`mx-auto w-full ${max} px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}
