import { notFound } from "next/navigation";
import Link from "next/link";
import { affiliateProducts, formatVnd } from "@/lib/products";
import DriveAwareImage from "../../components/DriveAwareImage";
import MarkdownBody from "../../components/MarkdownBody";
import { getProductContentById } from "@/lib/load-product-content";
import ProductImageCarousel from "../../components/ProductImageCarousel";
import AddToCartButton from "../../components/AddToCartButton";
import { ArrowRightIcon, FolderIcon } from "../../components/Icons";

function getProduct(id) {
  return affiliateProducts.find((p) => p.id === id) ?? null;
}

function platformLabel(platform) {
  if (platform === "tiktok") return "TikTok Shop";
  return "Shopee";
}

export async function generateMetadata({ params }) {
  const id = (await params).id;
  const product = getProduct(id);
  if (!product) return { title: "Không tìm thấy" };

  const productContent = await getProductContentById(id);
  return {
    title: `${product.name} - ETENTEK`,
    description: productContent?.excerpt || product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return notFound();

  const productContent = await getProductContentById(id);
  const images = product.images?.length
    ? product.images
    : product.imageUrl
      ? [product.imageUrl]
      : [];

  return (
    <article className="mx-auto flex min-h-0 flex-1 flex-col px-4 py-12 sm:px-6 lg:max-w-3xl lg:px-8">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        <Link href="/kham-pha" className="hover:text-foreground">
          <span className="inline-flex items-center gap-2">
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
            Mua hàng
          </span>
        </Link>
      </p>

      <section className="mt-5">
        {images.length ? (
          <ProductImageCarousel images={images} productName={product.name} />
        ) : (
          <div className="h-[260px] w-full rounded-2xl border border-zinc-200 bg-gradient-to-br from-orange-50 to-white dark:border-zinc-800 dark:from-orange-900/20 dark:to-zinc-900/30" />
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {product.name}
          </h1>

          <span className="inline-flex rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-500/20 dark:text-orange-400">
            {platformLabel(product.platform)}
          </span>
        </div>

        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {product.description}
        </p>

        <p className="mt-5 text-3xl font-semibold tracking-tight text-foreground">
          {formatVnd(product.price)}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <a
            href={`/api/go/${product.id}`}
            className="inline-flex min-h-[40px] items-center justify-center whitespace-nowrap rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-orange-600 sm:text-sm"
          >
            <span className="inline-flex items-center gap-2">
              Mua ngay
              <ArrowRightIcon className="h-4 w-4" />
            </span>
          </a>

          <AddToCartButton productId={product.id} />

          <Link
            href="/kham-pha"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <span className="inline-flex items-center gap-2">
              <FolderIcon className="h-4 w-4" />
              Xem thêm sản phẩm
            </span>
          </Link>
        </div>
      </section>

      {productContent?.content ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">Nội dung sản phẩm</h2>
          <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/35">
            <MarkdownBody markdown={productContent.content} />
          </div>
        </section>
      ) : null}

      {images.length > 1 ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">Thư viện ảnh</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {images.map((src, idx) => (
              <div
                key={`${src}-${idx}`}
                className="relative h-56 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30"
              >
                <DriveAwareImage
                  src={src}
                  alt={`${product.name} - ảnh ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}

