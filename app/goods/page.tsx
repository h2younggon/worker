import Link from "next/link";
import React from "react";

export default function Goods() {
  return (
    <div>
      <Link href={"/favorite"}>favorite route</Link>
      <div>Goods</div>
    </div>
  );
}
