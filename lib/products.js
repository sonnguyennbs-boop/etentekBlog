/**
 * Sản phẩm affiliate — giá hiển thị (VNĐ); URL thật qua .env (AFFILIATE_URL_*).
 * id trùng với khóa trong app/api/go/[id]/route.js
 */
export const affiliateProducts = [
  {
    id: "sp1",
    name: "ESP32 DevKit (gợi ý mua)",
    imageUrl:
      "https://drive.google.com/thumbnail?id=16_ifcSBEKImYovxmDvfLTlUYqlu7BfEl&sz=w1920",
    images: [
      "https://drive.google.com/thumbnail?id=16_ifcSBEKImYovxmDvfLTlUYqlu7BfEl&sz=w1920",
      "https://drive.google.com/thumbnail?id=19vX1mTee1BrHSqkMDl24kbGpwPY4gZF4&sz=w1920",
      "https://drive.google.com/thumbnail?id=1S5CM9_TpbfhZRyN20NbPdGbiprCgzC-O&sz=w1920",
      "https://drive.google.com/thumbnail?id=1eSX6E7YRDqoE3anqWKgDiR-Q_rXxO3Le&sz=w1920",
    ],
    price: 189000,
    platform: "shopee",
    description:
      "Board phổ biến cho IoT, Modbus gateway nhỏ, thu thập dữ liệu.",
  },
  {
    id: "sp2",
    name: "Màn HMI công nghiệp 7″ (gợi ý mua)",
    imageUrl:
      "https://drive.google.com/thumbnail?id=16_ifcSBEKImYovxmDvfLTlUYqlu7BfEl&sz=w1920",
    images: [
      "https://drive.google.com/thumbnail?id=16_ifcSBEKImYovxmDvfLTlUYqlu7BfEl&sz=w1920",
      "https://drive.google.com/thumbnail?id=19vX1mTee1BrHSqkMDl24kbGpwPY4gZF4&sz=w1920",
      "https://drive.google.com/thumbnail?id=1S5CM9_TpbfhZRyN20NbPdGbiprCgzC-O&sz=w1920",
      "https://drive.google.com/thumbnail?id=1eSX6E7YRDqoE3anqWKgDiR-Q_rXxO3Le&sz=w1920",
    ],
    price: 2450000,
    platform: "shopee",
    description:
      "Tham khảo cho tủ điện, kết nối PLC/SCADA — đổi link thật trên Vercel.",
  },
  {
    id: "tt1",
    name: "Kit cảm biến + module (gợi ý TikTok Shop)",
    imageUrl:
      "https://10.100.203.195:5000/uploads/2025/09/product-image-1-2025-09-04t06-41-08-229z-1756968170497-151045078.jpg",
    price: 359000,
    platform: "tiktok",
    description:
      "Gói linh kiện prototype — gắn AFFILIATE_URL_TT1 trong .env.local.",
  },
  {
    id: "tt2",
    name: "Kit cảm biến + module (gợi ý TikTok Shop)",
    imageUrl:
      "https://10.100.203.195:5000/uploads/2025/09/product-image-1-2025-09-04t06-41-08-229z-1756968170497-151045078.jpg",
    price: 359000,
    platform: "tiktok",
    description:
      "Gói linh kiện prototype — gắn AFFILIATE_URL_TT2 trong .env.local.",
  },
];

export function formatVnd(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}
