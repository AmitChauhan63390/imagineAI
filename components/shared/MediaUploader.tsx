import { Toaster } from "@/components/ui/toaster"
import { useToast } from "../ui/use-toast"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image";

type MediaUploaderProps = {
    onValueChange: (value: string) => void;
    setImage: React.Dispatch<any>;
    publicId: string;
    image: any;
    type: string;

}

const MediaUploader = ({ onValueChange,
    setImage,
    image,
    publicId,
    type }: MediaUploaderProps) => {
    const { toast } = useToast();

    const onUploadsuccessHandler = (result: any) => {
        toast({
            title: 'Image Uploaded Successfully',
            description: '1 credit was deducted from your account',
            duration: 5000,
            className: 'success-toast'
        })

    }
    const onUploadErrorHandler = () => {
        toast({
            title: 'Something went wrong while uploading',
            description: 'Please try again',
            duration: 5000,
            className: 'error-toast'
        })
    }

    return (
        <CldUploadWidget uploadPreset="Amit_imaginify"
            options={{
                multiple: false,
                resourceType: "image",
            }}
            onSuccess={onUploadsuccessHandler}
            onError={onUploadErrorHandler}>
            {({ open }) => (
                <div className="flex flex-col gap-4">
                    <h3 className="h3-bold text-dark-600">
                        Original
                    </h3>
                    {publicId ? (
                        <>
                            HERE IS THE IMAGE
                        </>
                    ) : (
                        <div className="media-uploader_cta" onClick={() => open()}>
                            <div className="media-uploader_cta-image">
                                <Image
                                    src="/assets/icons/add.svg"
                                    alt="add image"
                                    width={24}
                                    height={24}
                                />

                            </div>
                        </div>
                    )}


                </div>
            )}


        </CldUploadWidget>
    )
}

export default MediaUploader