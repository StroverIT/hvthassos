"use client";

import type { FC } from "react";
import { useTranslations } from "next-intl";
import { POLICY_SECTIONS } from "./consts";
import type { TVillaPolicyContentProps } from "./types";

export const VillaPolicyContent: FC<TVillaPolicyContentProps> = ({
  showIntro = false,
  compact = false,
}) => {
  const t = useTranslations("villaPolicy");

  return (
    <div className={compact ? "space-y-8" : "space-y-12"}>
      {showIntro ? (
        <div>
          <h2
            className={`font-display text-sea ${compact ? "text-2xl" : "text-3xl"}`}
          >
            {t("title")}
          </h2>
          <p className="mt-2 leading-relaxed text-muted">{t("intro")}</p>
        </div>
      ) : null}

      {POLICY_SECTIONS.map((section) => (
        <article key={section.titleKey}>
          <h3
            className={`font-display text-sea ${
              compact ? "text-xl" : "text-2xl md:text-[1.75rem]"
            }`}
          >
            {t(section.titleKey)}
          </h3>
          <div className={`mt-3 ${compact ? "space-y-2" : "space-y-3"}`}>
            {section.bodyKeys.map((key) => (
              <p key={key} className="leading-relaxed text-muted">
                {t(key)}
              </p>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
};
