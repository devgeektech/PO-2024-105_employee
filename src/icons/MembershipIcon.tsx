import React from "react";

export default function MembershipIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="56" height="56" rx="8" fill="#FFE500" />
      <rect width="56" height="56" rx="8" fill="white" fillOpacity="0.4" />
      <rect width="56" height="56" rx="8" fill="black" fillOpacity="0.02" />
      <mask
        id="mask0_115_555"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="12"
        y="12"
        width="32"
        height="32"
      >
        <rect x="12" y="12" width="32" height="32" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_115_555)">
        <path
          d="M17.3332 14.6667H38.6665C39.3998 14.6667 40.0276 14.9278 40.5498 15.45C41.0721 15.9722 41.3332 16.6 41.3332 17.3334V32C41.3332 32.7334 41.0721 33.3611 40.5498 33.8834C40.0276 34.4056 39.3998 34.6667 38.6665 34.6667H33.3332V41.3334L27.9998 38.6667L22.6665 41.3334V34.6667H17.3332C16.5998 34.6667 15.9721 34.4056 15.4498 33.8834C14.9276 33.3611 14.6665 32.7334 14.6665 32V17.3334C14.6665 16.6 14.9276 15.9722 15.4498 15.45C15.9721 14.9278 16.5998 14.6667 17.3332 14.6667ZM17.3332 29.3334H38.6665V25.3334H17.3332V29.3334Z"
          fill="#1A1A1A"
        />
      </g>
    </svg>
  );
}
