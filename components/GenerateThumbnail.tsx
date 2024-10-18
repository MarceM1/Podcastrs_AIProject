import { useRef, useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Label } from '@radix-ui/react-label'
import { Textarea } from './ui/textarea'
import { Loader } from 'lucide-react'
import { GenerateThumbnailProps } from '@/Types'
import { Input } from './ui/input'
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUploadFiles } from '@xixixao/uploadstuff/react'
import { v4 as uuidv4 } from 'uuid'
import { AnyAaaaRecord } from 'dns'


const GenerateThumbnail = ({ setImage, setImageStorageId, image, imagePrompt, setImagePrompt }: GenerateThumbnailProps) => {

  const [isAiThumbnail, setIsAiThumbnail] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const imageRef = useRef<HTMLInputElement>(null)

  const { toast } = useToast()

  const generateUploadUrl = useMutation(api.files.generateUploadUrl)

  const { startUpload } = useUploadFiles(generateUploadUrl)

  const getImageUrl = useMutation(api.podcasts.getUrl)


  const handleGenerateThumbnail = useAction(api.openai.generateThumbnailAction)

  const handleImage = async (blob: Blob, fileName: string) => {
    setIsImageLoading(true)
    setImage('')

    try {
      const file = new File([blob], fileName, { type: 'image/png' })

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId

      setImageStorageId(storageId)

      const imageUrl = await getImageUrl({ storageId })

      setImage(imageUrl!)

      setIsImageLoading(false)
      toast({
        title: 'Thumbnail generated successfully'
      })

    } catch (error) {
      console.log('Handle Image: ', error)
      toast({ title: 'Error generating thumbnail', variant: 'destructive' })
    }
  }
  const generateImage = async () => {
    try {
      const response = await handleGenerateThumbnail({ prompt: imagePrompt })
      const blob = new Blob([response], { type: 'image/png' })
      handleImage(blob, `thumbail-${uuidv4()}.png`)
    } catch (error) {
      console.log('generateImage: ', error)
      toast({ title: 'Error generating thumbnail', variant: 'destructive' })
    }
  }
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {

    e.preventDefault();

    try {
      const files = e.target.files
      if (!files) return;
      const file = files[0];
      const blob = await file.arrayBuffer()
        .then((ab) => new Blob([ab]))

      handleImage(blob, file.name)
    } catch (error) {
      console.log("uploadImage: ", error)
      toast({ title: 'Error uploading image', variant: 'destructive' })
    }
  }

  return (
    <>
      <div className="generate_thumbnail">
        <Button
          type="button"
          variant="plain"
          onClick={() => setIsAiThumbnail(true)}
          className={cn('', {
            'bg-black-6': isAiThumbnail
          })}
        >
          Use AI to generate thumbnail
        </Button>
        <Button
          type="button"
          variant="plain"
          onClick={() => setIsAiThumbnail(false)}
          className={cn('', {
            'bg-black-6': !isAiThumbnail
          })}
        >
          Upload custom image
        </Button>
      </div>
      {isAiThumbnail ? (
        <div className="flex flex-col gap-5">
          <div className="mt-5 flex flex-col gap-2.5">
            <Label className="text-16 font-bold text-white-1">
              AI Prompt to generate Thumbnail
            </Label>
            <Textarea
              className="input-class font-light focus-visible:ring-offset-orange-1"
              placeholder='Provide text to generate thumbnail'
              rows={5}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
          </div>
          <div className="w-full max-w-[200px]">
            <Button  className="text-16 bg-orange-1 py-4 font-bold text-white-1" onClick={generateImage}>
              {isImageLoading ? (
                <>
                  Generating
                  <Loader size={20} className="animate-spin ml-2" />
                </>
              ) : (
                'Generate'
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className='image_div' onClick={() => imageRef?.current?.click()}>
          <Input
            type='file'
            className='hidden'
            ref={imageRef}
            onChange={(e) => uploadImage(e)}
          />
          {!isImageLoading ? (
            <Image src={"/icons/upload-image.svg"} alt='Upload iamge' width={40} height={40} />
          ) : (
            <div className='text-16 flex-center font-medium text-white-1'>
              Uploading
              <Loader size={20} className="animate-spin ml-2" />
            </div>
          )}
          <div className="flex flex-col items-center gap-1">
            <h2 className='text-12 font-bold text-orange-1'>Click to upload</h2>
            <p className='text-12 font-normal text-gray-1'>SVG, PNG, JPG, or GIF (max. 1080x1080px)</p>
          </div>
        </div>
      )}
      {image && (
        <div className='flex-center w-full'>
          <Image src={image} alt='thumbnail' width={200} height={200}  className='mt-5'/>
        </div>
      )}
    </>
  )
}

export default GenerateThumbnail