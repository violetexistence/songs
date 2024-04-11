import {
  CSSProperties,
  PropsWithChildren,
  createContext,
  useContext,
} from 'react'
import { useImageDropzone } from '../../features/dnd/useImageDropzone'
import { GlassOverlay } from '../overlay/GlassOverlay'

type DropzoneContextProps = {
  active: boolean
}

const DropzoneContext = createContext<DropzoneContextProps>({ active: false })

export type DropzoneProps = PropsWithChildren & {
  onDrop: (image: string) => void
  className?: string
  style?: CSSProperties
}

export function Dropzone({ onDrop, children, ...props }: DropzoneProps) {
  const { isZoneActive, getRootProps } = useImageDropzone({ onDrop })
  return (
    <DropzoneContext.Provider value={{ active: isZoneActive }}>
      <div {...getRootProps()} {...props}>
        {children}
      </div>
    </DropzoneContext.Provider>
  )
}

export type ActiveDropzoneLayerProps = PropsWithChildren & {
  style?: CSSProperties
}

export function ActiveDropzoneLayer({
  children,
  style,
}: ActiveDropzoneLayerProps) {
  const { active } = useContext(DropzoneContext)

  return active && <GlassOverlay style={style}>{children}</GlassOverlay>
}
