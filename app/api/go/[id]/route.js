import { NextResponse } from "next/server";

/** Map id → URL affiliate; đặt biến môi trường trong .env.local khi deploy */
const linkById = {
  sp1: process.env.AFFILIATE_URL_SP1,
  sp2: process.env.AFFILIATE_URL_SP2,
  tt1: process.env.AFFILIATE_URL_TT1,
  tt2: process.env.AFFILIATE_URL_TT2,
};

export async function GET(_req, { params }) {
  const { id } = await params;
  const target =
    linkById[id] ||
    process.env.AFFILIATE_DEFAULT_URL ||
    "https://shopee.vn/";

  console.log("Affiliate click:", id);

  return NextResponse.redirect(target, 302);
}
