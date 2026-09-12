"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { imageOf, titleOf } from "../lib/api";

export default function Card({
  item,
  type = "anime",
  index = 0,
}) {
  const a = item?.attributes || {};
  const image = imageOf(item);
  const title = titleOf(item);

  return (
    <motion.article
      className="card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        delay: Math.min(index * 0.025, 0.2),
        duration: 0.4,
      }}
      whileHover={{ y: -7 }}
    >
      <Link href={`/${type}/${item.id}`}>
        <div className="poster">
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/poster-placeholder.svg";
            }}
          />

          <div className="poster-shade" />

          <span className="card-index">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="card-play">↗</span>
        </div>

        <div className="card-info">
          <h3>{title}</h3>

          <div>
            <span>{a.status || "Discover"}</span>

            <span>
              {a.averageRating
                ? `${Math.round(Number(a.averageRating))}%`
                : type === "anime"
                  ? "ANIME"
                  : "MANGA"}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}