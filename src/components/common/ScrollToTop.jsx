"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // প্রতিবার যখন pathname (URL) চেঞ্জ হবে, উইন্ডো স্ক্রল হয়ে উপরে যাবে
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // "smooth" দিলে স্ক্রল হতে সময় নেয়, "instant" দিলে একদম উপরে চলে যাবে
    });
  }, [pathname]);

  return null; // এটি কোনো UI রেন্ডার করবে না, শুধু কাজ করবে
};

export default ScrollToTop;
