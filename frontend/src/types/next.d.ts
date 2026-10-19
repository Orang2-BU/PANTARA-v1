/* eslint-disable @typescript-eslint/no-explicit-any */
// Fallback types for Next.js App Router generated types when .next/types is not generated yet.

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type PageProps<Route extends string = string> = {
    params: Promise<any>;
    searchParams?: Promise<any>;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type LayoutProps<Route extends string = string> = {
    children: React.ReactNode;
    params?: Promise<any>;
  };
}

export {};
