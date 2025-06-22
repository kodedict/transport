import ClipboardJS from "clipboard";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ClipboardCopyType {
  text: string;
}

const ClipboardCopy = ({ text }: ClipboardCopyType) => {
  const clipboardRef = useRef<HTMLSpanElement>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    // Initialize ClipboardJS
    if (clipboardRef.current) {
      const clipboard = new ClipboardJS(clipboardRef.current, {
        text: () => text,
      });

      // Optional: Handle success event
      clipboard.on("success", () => {
        setCopied(true);
        setTimeout(()=> setCopied(false), 1000);
      });
      return () => clipboard.destroy();
    }
  }, [text]);

  return (
    <div className="flex items-center space-x-2">
      <span>
        {text}
      </span>
      <span ref={clipboardRef}
        data-clipboard-text={text}>
        { ! copied ? <Clipboard className="cursor-pointer" size={16} /> : <span className="flex items-center space-x-1 text-green-600"><span>copied</span> <ClipboardCheck size={16}/></span>}
      </span>
    </div>
  );
};

export default ClipboardCopy;
