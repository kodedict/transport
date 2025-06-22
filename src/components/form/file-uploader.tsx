import { Upload, X } from "lucide-react"
import { useState, useRef } from "react"

const FileUploader = ({onChange}:{onChange?: (file:{file:File|any, fileName:string, base64:string, fileSize:{sizeInText:string, sizeInMb:number}, extension:string}) => Promise<string|void>}) => {
    const [file, setFile] = useState<File>();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        setFile(selectedFile);
        fileInputRef.current && (fileInputRef.current.value = '');

        if ( onChange ) {
            const fileName = selectedFile?.name ?? '';
            const extension = fileName?.split('.').pop();
            const base64 = await toBase64(selectedFile);
            const fileSize = getFileSize(selectedFile?.size ?? 0);

            const action = await onChange({
                file: selectedFile,
                base64: base64 as string,
                fileSize,
                extension: extension ?? '',
                fileName,
            });

            action == 'done' && removeFile();
        }
    };

    const removeFile = () => {
        setFile(undefined);
        fileInputRef.current && (fileInputRef.current.value = '');
    }

    const getFileSize = (fileSizeInBytes:number) => {
        const fileSizeInKB = fileSizeInBytes / 1024;
        const fileSizeInMB = fileSizeInKB / 1024;

        let size = Math.round(fileSizeInMB) > 0 ? (fileSizeInMB).toFixed(1) : Math.round(fileSizeInKB);
        let sizeType = Math.round(fileSizeInMB) > 0 ? 'MB' : 'KB';

        return {
            sizeInText: `${size} ${sizeType}`,
            sizeInMb: Math.round(fileSizeInMB),
        }
    }

    const toBase64 = (file:File|any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
    };

    return (
        <div>
            <div className="relative border-dashed border border-primary h-[10em] flex justify-center items-center">
                <div className="flex flex-col items-center space-y-2">
                    <Upload/>
                    <p className="label">
                        Drag and Drop file here or <span className="font-bold underline cursor-pointer">Choose file</span>
                    </p>
                    <p className="label text-primary">PNG, JPG, JPEG up to 2MB</p>
                </div>
                <input ref={fileInputRef} onChange={handleFileChange} type="file" className="absolute w-full h-full opacity-0 cursor-pointer" accept=".png,.jpg,.jpeg"/>
            </div>
            {file && (
                <div className="flex items-center justify-between p-2 mt-5 bg-gray-300">
                    <p>
                        <span className="text-black label">{file.name}</span>
                        <p className="text-xs font-light">{getFileSize(file.size).sizeInText}</p>
                    </p>
                    <span onClick={removeFile} className="p-2 text-white bg-red-500 rounded-full cursor-pointer"><X size={18}/></span>
                </div>
            )}
        </div>
    )
}

export default FileUploader

