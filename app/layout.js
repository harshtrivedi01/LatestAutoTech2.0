import '../styles/styles.css'
import '../styles/globals.css'
export const metadata = {
  title: 'Latest Auto Tech - Cars, Bikes, Smartphones, EV',
  description: 'A modern multi-category tech and automotive blog',
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
