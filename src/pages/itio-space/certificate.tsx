import { useRef } from "react";
import { toPng } from "html-to-image";

import Certificate from "@/components/common/Certificate";

export default function CertificatePage() {
    const elementRef = useRef<HTMLDivElement>(null);

    const htmlToImageConvert = () => {
        toPng(elementRef.current as HTMLDivElement, { cacheBust: false })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "my-image-name.png";
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.log(err);
          });
      };

    return (
        <div>
            <div ref={elementRef}>
                <Certificate  />
            </div>
            <button onClick={htmlToImageConvert}>Download Certificate</button>
        </div>
    )
}
