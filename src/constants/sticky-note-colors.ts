export type StickyNoteColorsType = {
  name: string;
  color: string;
  backgroundColor: string;
}

export const StickyNoteColors: StickyNoteColorsType[]  = [
  // 11: Purple 156, 39, 176 -> 230, 201, 235
  {
    name: 'purple',
    color: '#9c27b0',
    backgroundColor: '#e6c9eb',
  },

  // 12: DarkPurple 103, 58, 183 -> 217, 205, 237
  {
    name: 'darkPurple',
    color: '#673ab7',
    backgroundColor: '#d9cded'
  },

  // 13: BrightBlue 63, 81, 181 -> 207, 211, 236
  {
    name: 'brightBlue',
    color: '#3f51b5',
    backgroundColor: '#cfd3ec'
  },

  // 14: Blue 33, 150, 243 -> 199, 228, 252
  {
    name: 'blue',
    color: '#2196f3',
    backgroundColor: '#c7e4fc'
  },

  // 15: LightBlue 3, 169, 244 -> 192, 233, 252
  {
    name: 'lightBlue',
    color: '#03a9f4',
    backgroundColor: '#b3e5fc'
  },

  // 16: Cyan 0, 188, 212 -> 191, 238, 244
  {
    name: 'cyan',
    color: '#00bcd4',
    backgroundColor: '#bfeef4'
  },

  // 21: Teal 0, 150, 136 -> 191, 228, 225
  {
    name: 'teal',
    color: '#009688',
    backgroundColor: '#bfe4e1'
  },

  // 22: Green 76, 175, 80 -> 210, 235, 211
  {
    name: 'green',
    color: '#4caf50',
    backgroundColor: '#d2ebd3'
  },

  // 23: LightGreen 139, 195, 74 -> 226, 240, 209
  {
    name: 'lightGreen',
    color: '#8bc34a',
    backgroundColor: '#e2f0d1'
  },

  // 24: Lime 205, 220, 57 -> 242, 246, 205
  {
    name: 'lime',
    color: '#cddc39',
    backgroundColor: '#f2f6cd'
  },

  // 25: Yellow 255, 235, 59 -> 255, 250, 206
  {
    name: 'yellow',
    color: '#ffeb3b',
    backgroundColor: '#ffface'
  },

  // 26: Amber 255, 193, 7 -> 255, 239, 193
  {
    name: 'amber',
    color: '#ffc107',
    backgroundColor: '#ffefc1'
  },

  // 31: Orange 255, 152, 0 -> 255, 229, 191
  {
    name: 'orange',
    color: '#ff9800',
    backgroundColor: '#ffe5bf'
  },

  // 32: DeepOrange 255, 87, 34 -> 255, 213, 199
  {
    name: 'deepOrange',
    color: '#ff5722',
    backgroundColor: '#ffd5c7'
  },

  // 33: Red 244, 67, 54 -> 252, 208, 204
  {
    name: 'red',
    color: '#f44336',
    backgroundColor: '#fcd0cc'
  },

  // 34: Pink 233, 30, 99 -> 249, 198, 216
  {
    name: 'pink',
    color: '#e91e63',
    backgroundColor: '#f9c6d8'
  },

  // 35: Brown 121, 85, 72 -> 221, 212, 209
  {
    name: 'brown',
    color: '#795548',
    backgroundColor: '#ddd4d1'
  },

  // 36: Dark Cyan 96, 125, 139 -> 215, 222, 226
  {
    name: 'darkCyan',
    color: '#607d8b',
    backgroundColor: '#d7dee2'
  },

  // 41: Black 0, 0, 0 -> 191, 191, 191
  {
    name: 'black',
    color: '#000000',
    backgroundColor: '#bfbfbf'
  },

  // 42: Light Black 64, 64, 64 -> 207, 207, 207
  {
    name: 'light-black',
    color: '#404040',
    backgroundColor: '#cfcfcf'
  },

  // 43: Dark Gray 128, 128, 128 -> 223, 223, 223
  {
    name: 'dark-gray',
    color: '#808080',
    backgroundColor: '#dfdfdf'
  },

  // 44: Gray 191, 191, 191 -> 239, 239, 239 Black
  {
    name: 'gray',
    color: '#bfbfbf',
    backgroundColor: '#efefef'
  },

  // 45: Light Gray 223, 223, 223 -> 247, 247, 247
  {
    name: 'light-gray',
    color: '#dfdfdf',
    backgroundColor: '#f7f7f7'
  },

  // 46: White 255, 255, 255 -> 255, 255, 255
  {
    name: 'white',
    color: '#ffffff',
    backgroundColor: '#ffffff'
  },
]


export const StickyNoteColorsObject = StickyNoteColors.reduce((acc, cur) => {
  acc[cur.name] = cur
  return acc
}, {} as {[key: string ]: StickyNoteColorsType}
)

export default StickyNoteColors;
