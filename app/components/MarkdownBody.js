"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownImageLightbox from "./MarkdownImageLightbox";

export default function MarkdownBody({ markdown }) {
  return (
    <div
      className={[
        "max-w-none text-zinc-700 dark:text-zinc-300",
        "[&_h2]:mt-10 [&_h2]:scroll-mt-20 [&_h2]:border-b [&_h2]:border-zinc-200 [&_h2]:pb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground dark:[&_h2]:border-zinc-700",
        "[&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground",
        "[&_p]:mt-4 [&_p]:leading-relaxed",
        "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6",
        "[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6",
        "[&_li]:mt-2",
        "[&_a]:font-medium [&_a]:text-orange-600 [&_a]:underline-offset-2 hover:[&_a]:underline dark:[&_a]:text-orange-400",
        "[&_code]:rounded [&_code]:bg-zinc-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm dark:[&_code]:bg-zinc-800",
        "[&_pre]:mt-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-zinc-200 [&_pre]:bg-zinc-50 [&_pre]:p-4 dark:[&_pre]:border-zinc-700 dark:[&_pre]:bg-zinc-900/80",
        "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
        "[&_blockquote]:mt-4 [&_blockquote]:border-l-4 [&_blockquote]:border-orange-400 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-zinc-600 dark:[&_blockquote]:text-zinc-400",
        "[&_table]:mt-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm",
        "[&_th]:border [&_th]:border-zinc-200 [&_th]:bg-zinc-50 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left dark:[&_th]:border-zinc-700 dark:[&_th]:bg-zinc-800",
        "[&_td]:border [&_td]:border-zinc-200 [&_td]:px-3 [&_td]:py-2 dark:[&_td]:border-zinc-700",
        "[&_hr]:my-10 [&_hr]:border-zinc-200 dark:[&_hr]:border-zinc-700",
      ].join(" ")}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: (props) => <MarkdownImageLightbox {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
