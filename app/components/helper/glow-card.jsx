"use client";

import { useEffect, useRef } from "react";

const GlowCard = ({ children, identifier }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    const card = cardRef.current;

    if (!container || !card) return;

    const CONFIG = {
      proximity: 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
    };

    const UPDATE = (event) => {
      const CARD_BOUNDS = card.getBoundingClientRect();

      if (
        event?.x > CARD_BOUNDS.left - CONFIG.proximity &&
        event?.x < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
        event?.y > CARD_BOUNDS.top - CONFIG.proximity &&
        event?.y < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity
      ) {
        card.style.setProperty("--active", 1);
      } else {
        card.style.setProperty("--active", CONFIG.opacity);
      }

      const CARD_CENTER = [
        CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
        CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5,
      ];

      let ANGLE =
        (Math.atan2(event?.y - CARD_CENTER[1], event?.x - CARD_CENTER[0]) *
          180) /
        Math.PI;

      ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;
      card.style.setProperty("--start", ANGLE + 90);
    };

    const RESTYLE = () => {
      container.style.setProperty("--gap", CONFIG.gap);
      container.style.setProperty("--blur", CONFIG.blur);
      container.style.setProperty("--spread", CONFIG.spread);
      container.style.setProperty(
        "--direction",
        CONFIG.vertical ? "column" : "row"
      );
    };

    // Initial setup
    RESTYLE();
    UPDATE();

    // Add event listener
    window.addEventListener("pointermove", UPDATE);

    // Cleanup
    return () => {
      window.removeEventListener("pointermove", UPDATE);
    };
  }, [identifier]);

  return (
    <div
      ref={containerRef}
      className={`glow-container-${identifier} glow-container`}
    >
      <article
        ref={cardRef}
        className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`}
      >
        <div className="glows"></div>
        {children}
      </article>
    </div>
  );
};

export default GlowCard;
