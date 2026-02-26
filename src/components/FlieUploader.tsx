import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '../utils/format'
type FileUploaderProps = {
    onFileSelected: (file: File | null) => void;
}

export default function FlieUploader({ onFileSelected }: FileUploaderProps) {
    const [file, setFile] = useState<File | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selected = acceptedFiles[0] || null;
        setFile(selected)
        onFileSelected(selected)
    }, [onFileSelected])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
        },
        maxSize: 1048576,
    })

    return (
        <div className="w-full gradient-border">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {file ? (
                    <div className='uploader-selected-file' onClick={(e) => e.stopPropagation()}>
                        <div className='flex items-center space-x-3'>
                            <img src="/images/pdf.png" alt="pdf" className='size-10' />
                            <p className='text-lg text-gray-700 font-medium truncate'>
                                {file.name}
                            </p>
                            <p className='text-sm text-gray-500'>
                                {formatSize(file.size)}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p>Drag 'n' drop some files here, or click to select files</p>
                )}
            </div>
        </div>
    )
}