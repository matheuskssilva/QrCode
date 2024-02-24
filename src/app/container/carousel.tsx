"use client"

import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import React from 'react'
import { Generate } from './generate'

const CarouselQr = () => {
  return (
    <Carousel className="w-full max-w-sm">
    <CarouselContent className="-ml-1">
      <Generate />
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
  )
}

export default CarouselQr
