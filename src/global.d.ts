declare module "clsx";
declare module "tailwind-merge";
declare module '*.css';
declare module '*.png';
declare module '*.svg';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';

// Minimal process.env typing for CRA-style environment variables in the browser
declare const process: { env: Record<string, string | undefined> };
