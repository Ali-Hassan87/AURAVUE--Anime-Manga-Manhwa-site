import './globals.css';
import Script from 'next/script';

export const metadata={title:'AURAVUE — Anime, Manga & Manhwa Universe',description:'A cinematic discovery universe for anime, manga and manhwa.',icons:{icon:[{url:'/favicon.svg',type:'image/svg+xml'}]}};

export default function RootLayout({children}){
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src="https://cdn.zanderio.ai/widget/loader.js"
          data-id="wdg_yiYE60Jj7dwSp09vBW42XRcd"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
