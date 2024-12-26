import React from "react";

const RightArrowIcon = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_288_2870)">
        <rect
          width="40"
          height="40"
          rx="20"
          fill="#030D12"
          fill-opacity="0.7"
        />
        <path
          d="M17.1434 28.5716L25.7148 20.0001L17.1434 11.4287"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_288_2870"
          x="-4"
          y="-4"
          width="48"
          height="48"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_288_2870"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_288_2870"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default RightArrowIcon;
