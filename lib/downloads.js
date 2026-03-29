/**
 * Tải xuống — phân loại theo nhóm. Chỉnh sửa mảng này để thêm/sửa link (Google Drive, v.v.).
 *
 * Mỗi mục:
 * - title: tên hiển thị
 * - url: link đầy đủ (https://...)
 * - description?: mô tả ngắn (tùy chọn)
 */
export const downloadCategories = [
  {
    id: "tai-lieu-ky-thuat",
    title: "Tài liệu kỹ thuật",
    description: "Datasheet, hướng dẫn nhanh và tài liệu tham khảo.",
    items: [
      {
        title: "Ví dụ — thay bằng link Drive của bạn",
        url: "https://drive.google.com/file/d/REPLACE_FILE_ID/view?usp=sharing",
        description:
          "Dán link chia sẻ file/thư mục (Chia sẻ → Bất kỳ ai có liên kết).",
      },
    ],
  },
  {
    id: "phan-mem-cong-cu",
    title: "Phần mềm & công cụ",
    description: "Bộ cài, script hoặc mẫu dự án.",
    items: [
      {
        title: "Ví dụ — gói tải về",
        url: "https://drive.google.com/file/d/REPLACE_FILE_ID/view?usp=sharing",
        description: "Sửa REPLACE_FILE_ID hoặc thay cả chuỗi url trong lib/downloads.js.",
      },
    ],
  },
  {
    id: "mau-du-an",
    title: "Mẫu dự án / firmware",
    description: "Code mẫu, firmware thử nghiệm.",
    items: [],
  },
];

export function getAllDownloadCategories() {
  return downloadCategories;
}
