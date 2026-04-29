'use client'

import Image from 'next/image'
import { useState } from 'react'

interface GalleryImage {
  id: string
  src: string
  alt: string
  title?: string
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'wide'
}

interface GalleryGridProps {
  title: string
  description?: string
  images: GalleryImage[]
}

export default function GalleryGrid({ title, description, images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  // Arrange images in a creative masonry-like layout
  const getGridClass = (index: number) => {
    const pattern = index % 12
    switch (pattern) {
      case 0:
      case 6:
        return 'md:col-span-2 md:row-span-2'
      case 3:
      case 9:
        return 'md:col-span-2'
      default:
        return 'md:col-span-1'
    }
  }

  const getAspectRatioClass = (aspectRatio?: string) => {
    switch (aspectRatio) {
      case 'landscape':
        return 'aspect-video'
      case 'portrait':
        return 'aspect-[3/4]'
      case 'wide':
        return 'aspect-[16/5]'
      case 'square':
      default:
        return 'aspect-square'
    }
  }

  return (
    <div className="min-h-screen bg-background py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <h1 className="text-2xl sm:text-4xl font-bold text-primary mb-2 sm:mb-4">{title}</h1>
          {description && <p className="text-xs sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">{description}</p>}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 auto-rows-max">
          {images.length > 0 ? (
            images.map((image, index) => (
              <div
                key={image.id}
                className={`group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${getGridClass(index)}`}
                onClick={() => setSelectedImage(image)}
              >
                <div className={`relative w-full h-full ${getAspectRatioClass(image.aspectRatio)}`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center px-2">
                      {image.title && (
                        <h3 className="text-xs sm:text-lg font-semibold">{image.title}</h3>
                      )}
                      <p className="text-xs mt-1 sm:mt-2">Click to view</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Placeholder Gallery
            <div className="col-span-2 sm:col-span-2 md:col-span-4">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                {[...Array(12)].map((_, index) => (
                  <div
                    key={index}
                    className={`group relative bg-gray-200 rounded-lg overflow-hidden shadow-lg ${
                      index % 12 === 0 || index % 12 === 6 ? 'hidden md:block md:col-span-2 md:row-span-2' : ''
                    }`}
                  >
                    <div
                      className={`relative w-full ${
                        index % 12 === 0 || index % 12 === 6
                          ? 'aspect-square'
                          : index % 3 === 0
                            ? 'aspect-video'
                            : index % 3 === 1
                              ? 'aspect-square'
                              : 'aspect-video'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center hover:from-gray-300 hover:to-gray-400 transition-colors duration-300">
                        <div className="text-center">
                          <svg
                            className="w-12 h-12 text-gray-400 mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm text-gray-500 font-medium">Image {index + 1}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <p className="text-gray-600 text-lg">
                  Gallery is ready for images! Upload your photos to the <code className="bg-gray-100 px-2 py-1 rounded">/public/gallery/</code> folder
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full h-[80vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
              {selectedImage.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                  <p className="text-lg font-semibold">{selectedImage.title}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
