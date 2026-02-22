import Image from 'next/image'

export default function Certificate() {

  const backgroundImageUrl = '/certificate/certificate-template.png';
    const text1 = 'Mr. Prapawee Sangsunthorn';

    return (
        <div className="w-[800px] h-[600px] relative overflow-clip">
            <span className="absolute w-full text-4xl top-[42%] place-content-center font-bold text-center">{text1}</span>
            <Image src={backgroundImageUrl} alt="background" className="w-full" />
        </div>
    )
}
