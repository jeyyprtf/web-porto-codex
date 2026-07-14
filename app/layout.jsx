import '../src/styles.css';
import '../src/overrides.css';

export const metadata = {
  title: 'Juan — Visual Stories in Light',
  description: 'Juan is a 19-year-old photographer and visual director with four years of experience crafting intimate stories in light.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Juan — Visual Stories in Light',
    description: 'Photography, visual direction, and stories made with feeling.',
    type: 'website'
  }
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
