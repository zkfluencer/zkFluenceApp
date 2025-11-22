import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Providers from "@/components/providers"

const inter = Inter({ subsets: ['latin'] });

const appUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

// Embed metadata for Farcaster sharing
const frame = {
  version: "1",
  imageUrl: `${appUrl}/opengraph-image.png`,
  button: {
    title: "Launch zkFluencer",
    action: {
      type: "launch_frame",
      name: "zkFluencer",
      url: appUrl,
      splashImageUrl: `${appUrl}/icon.png`,
      splashBackgroundColor: "#0a0a0a",
    },
  },
};

export const metadata: Metadata = {
  title: 'zkFluencer - Creator Verification Platform',
  description: 'Verify TikTok creators with Self.xyz, connect Web3 companies with authentic influencers. Earn USDC rewards on Celo.',
  openGraph: {
    title: 'zkFluencer - Creator Verification Platform',
    description: 'Verify TikTok creators with Self.xyz, connect Web3 companies with authentic influencers. Earn USDC rewards on Celo.',
    images: [`${appUrl}/opengraph-image.png`],
  },
  other: {
    "fc:frame": JSON.stringify(frame),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col">
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
