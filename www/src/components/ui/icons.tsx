type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  logo: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <rect width="256" height="256" fill="none" />
      <line
        x1="208"
        y1="128"
        x2="128"
        y2="208"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="192"
        y1="40"
        x2="40"
        y2="192"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  ),
  google: (props: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      />
    </svg>
  ),
  bankAccount: (props: IconProps) => (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="1" y="1" width="42" height="42" rx="21" fill="#E7F5FF" />
      <path
        d="M13.7224 18.5522L21.5923 13.4717C21.8231 13.3228 22.1209 13.3228 22.3517 13.4717L30.2224 18.5522C30.4216 18.6816 30.5426 18.9031 30.5426 19.1414V19.6933C30.5426 20.0795 30.2289 20.3931 29.8418 20.3931H14.1022C13.715 20.3931 13.4014 20.0795 13.4014 19.6933V19.1414C13.4014 18.9031 13.5224 18.6816 13.7224 18.5522Z"
        stroke="#1864AB"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.9714 17.455V17.4642"
        stroke="#1864AB"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.5684 30.0436L30.1971 28.3581C30.1477 28.1338 29.9485 27.9738 29.7187 27.9738H14.2238C13.9939 27.9738 13.7948 28.1338 13.7455 28.3581L13.3741 30.0436C13.3071 30.3489 13.5398 30.6383 13.8525 30.6383H30.091C30.4037 30.6383 30.6354 30.3489 30.5684 30.0436Z"
        stroke="#1864AB"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.1377 20.3912V27.9745M28.4713 20.3912V27.9745M15.469 20.3912V27.9745M19.8025 20.3912V27.9745"
        stroke="#1864AB"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="1"
        y="1"
        width="42"
        height="42"
        rx="21"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  ),
  expense: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.259 18.3478H6.4217C4.53397 18.3478 3.35986 17.0159 3.35986 15.1309V8.02841C3.35986 6.14349 4.53397 4.81152 6.42076 4.81152H17.579C19.4601 4.81152 20.6399 6.14349 20.6399 8.02841V9.94693M6.44409 8.17151H7.791M16.5376 16.2978L18.5887 18.349M18.5887 18.349L20.639 16.2978M18.5887 18.349L18.5887 13.5002M9.80444 11.5806C9.80444 10.3673 10.788 9.38467 12.0004 9.38467C13.2137 9.38467 14.1973 10.3673 14.1973 11.5806C14.1973 12.7939 13.2137 13.7766 12.0004 13.7766C10.788 13.7766 9.80444 12.7939 9.80444 11.5806Z"
        stroke="#212529"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  income: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.259 18.3478H6.4217C4.53397 18.3478 3.35986 17.0159 3.35986 15.1309V8.02841C3.35986 6.14349 4.53397 4.81152 6.42076 4.81152H17.579C19.4601 4.81152 20.6399 6.14349 20.6399 8.02841V9.94693M16.5376 15.5514L18.5887 13.5002M18.5887 13.5002L20.639 15.5514M18.5887 13.5002L18.589 18.348M6.44409 8.17334H7.791M9.80261 11.5806C9.80261 10.3673 10.7862 9.38467 11.9986 9.38467C13.2119 9.38467 14.1954 10.3673 14.1954 11.5806C14.1954 12.7939 13.2119 13.7766 11.9986 13.7766C10.7862 13.7766 9.80261 12.7939 9.80261 11.5806Z"
        stroke="#212529"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};
