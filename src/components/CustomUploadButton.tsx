import { useRef, useState, useEffect } from "react"
import { toast } from "react-toastify"

function CustomUploadButton({ onUpload, defaultImage }: any) {

  const fileRef = useRef<HTMLInputElement | null>(null)
  const [image, setImage] = useState<string>(defaultImage)

  useEffect(() => {
    if (defaultImage) {
      setImage(defaultImage)
    }
  }, [defaultImage])

  const handleClick = () => {
    fileRef.current?.click()
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File must be less than 10MB")
      return
    }

    setImage(URL.createObjectURL(file))
    onUpload(file)
  }

  return (
    <div className="flex gap-5 items-center">

      <img
        src={image}
        alt="profile"
        className="flex h-30 w-30 object-cover rounded-full items-center justify-center"
      />

      <input
        type="file"
        ref={fileRef}
        onChange={handleFile}
        accept="image/png, image/jpeg, image/gif"
        hidden
      />

      <div className="flex flex-col gap-3">
        <button
          onClick={handleClick}
          className="border border-blue-50 h-10 w-40 
          rounded-md text-black font-semibold bg-blue-50"
        >
          Upload Photo
        </button>

        <p className="text-gray-600">
          JPG, PNG or GIF. Max 10MB.
        </p>
      </div>

    </div>
  )
}

export default CustomUploadButton;