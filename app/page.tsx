"use client"

import { TradeTracker } from '@/components/trade-tracker'
import React, { Suspense } from "react"


export default function Home() {
  return (
    <Suspense fallback={<></>}>
      <TradeTracker />
    </Suspense>
  )
}
