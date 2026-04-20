import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: '#1A1917',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 4,
        justifyContent: 'center',
        fontSize: 20,
        color: '#F5F4F1',
        fontFamily: 'serif',
      }}
    >
      J
    </div>,
    { ...size }
  )
}
