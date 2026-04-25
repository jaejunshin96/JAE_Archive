import { ImageResponse } from 'next/og'

export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default async function Icon() {
  const font = await fetch(
    new URL('https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgEM86xRbPQ.woff2')
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    <div
      style={{
        background: '#FFFFFF',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'Playfair Display',
          fontWeight: 700,
          fontSize: 96,
          color: '#000000',
          letterSpacing: '-2px',
        }}
      >
        ROOVIZ
      </span>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'Playfair Display',
          data: font,
          weight: 700,
        },
      ],
    }
  )
}
