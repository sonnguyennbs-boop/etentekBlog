# Viết bài blog (Markdown)

Thêm hoặc sửa file `.md` trong **`content/posts/`** (trừ `README.md` nếu có — loader bỏ qua). Sau đó **commit + deploy** để Vercel build lại.

## Frontmatter

| Trường | Mô tả |
|--------|--------|
| `title` | Tiêu đề |
| `slug` | URL `/blog/[slug]` |
| `excerpt` | Mô tả ngắn (SEO, thẻ bài) |
| `affiliateId` | Id cho `/api/go/[id]` — map URL trong `.env` |
| `category` | Tên nhóm hiển thị |
| `categorySlug` | Slug nhóm; thứ tự nhóm sửa tại `lib/post-config.js` → `categoryOrder` |
| `date` | Ngày (bài mới hơn lên trước) |
| `hero` | `emerald` \| `sky` \| `teal` \| `default` |
| `highlights` | (tuỳ chọn) Bullet “Tóm tắt nhanh” |

Dưới `---` là nội dung Markdown (`##`, list, bảng, code…).

## Admin / CMS?

- **File MD**: không cần admin, phù hợp một người hoặc team quen Git.
- **Sanity / Contentful**: có sẵn giao diện soạn, API.
- **Supabase + trang admin**: cần **auth** (NextAuth, Clerk…), middleware bảo vệ route, chống XSS khi render HTML từ DB.
