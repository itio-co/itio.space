import localFont from 'next/font/local'

export const kuriousLoopedFont = localFont({
  variable: '--Kurious',
  src: [
    {
      path: './Kurious_Looped-Light.ttf',
      weight: '300',
    },
    {
      path: './Kurious_Looped-Medium.ttf',
      style: 'normal',
      weight: '400',
    },
    {
      path: './Kurious_Looped-SemiBold.otf',
      style: 'normal',
      weight: '700',
    },
  ],
})

export const notoSansFont = localFont({
  variable: '--NotoSans',
  src: [
    {
      path: './NunitoSans_10pt-Light.ttf',
      weight: '300',
    },
    {
      path: './NunitoSans_10pt-Regular.ttf',
      weight: '400',
    },
    {
      path: './NunitoSans_10pt-Medium.ttf',
      weight: '500',
    },
    {
      path: './NunitoSans_10pt-SemiBold.ttf',
      weight: '600',
    },
    {
      path: './NunitoSans_10pt-Bold.ttf',
      weight: '700',
    },
  ],
})
