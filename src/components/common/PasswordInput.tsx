/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React from 'react'
import Image from 'next/image'
import { ICONS } from '@/constants/Icons'

type TextInputProps = {
  value: string
  className?: string
  onChangeText: (text: string) => void
  onClickForgetPassword?: () => void
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const { value, className, onChangeText, onClickForgetPassword } = props

  const [isShowPassword, setIsShowPassword] = React.useState(false)

  return (
    <div className={className}>
      <div className="mb-1 flex flex-row justify-between">
        <div className="text-sm font-medium text-[#6E7491]">Password*</div>
        <div className="cursor-pointer text-sm" onClick={onClickForgetPassword}>
          Forgot Password?
        </div>
      </div>
      <div className="border-outline relative flex w-full flex-row items-center rounded-lg border px-4 py-2">
        <input
          value={value}
          type={isShowPassword ? 'text' : 'password'}
          className="w-full focus:outline-none"
          onChange={(e) => onChangeText(e.target.value)}
        />
        <Image
          src={ICONS.eyeIcon}
          width={24}
          height={24}
          alt="password-input"
          className="absolute right-[16px] cursor-pointer"
          onMouseDown={() => setIsShowPassword(true)}
          onMouseUp={() => setIsShowPassword(false)}
        />
      </div>
    </div>
  )
}

export default TextInput
