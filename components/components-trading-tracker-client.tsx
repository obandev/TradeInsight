"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Moon, Sun, Image as ImageIcon, X } from "lucide-react"
import Image from "next/image"
import { supabase } from '@/lib/supabaseClient'

declare global {
  interface Window {
    RemoteCalc: (config: unknown) => void;
  }
}

interface Trade {
  id: number
  date: string
  timeframe: string
  entrysignal: string
  trendtype: string
  trend: string
  timeframetrend: string
  entryprice: number
  initialstoploss: number
  sma20: number
  sma50: number
  sma100: number
  sma200: number
  rsi: number
  bollingerbands: string
  profitloss: number
  finalstoploss: number
  direction: string
  imageurl: string
}

export function TradingTrackerClient() {
  const searchParams = useSearchParams()
  const [trades, setTrades] = useState<Trade[]>([])
  const [showAdditionalSMA, setShowAdditionalSMA] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [imageUrl, setImageUrl] = useState("")
  const [uploading, setUploading] = useState(false)
  const [overlayImage, setOverlayImage] = useState<string | null>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = "https://www.cashbackforex.com/Content/remote/remote-widgets.js"
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      if (window.RemoteCalc) {
        window.RemoteCalc({
          "Url": "https://www.cashbackforex.com",
          "TopPaneStyle": "YmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCNmZmYgMjAlLCAjZjVmNWY1IDQ1JSk7IGNvbG9yOiBibGFjazsgYm9yZGVyOiBzb2xpZCAxcHggI2FhYTsgYm9yZGVyLWJvdHRvbTogbm9uZTsg",
          "BottomPaneStyle": "YmFja2dyb3VuZDogI2YzZjNmMzsgYm9yZGVyOiBzb2xpZCAxcHggI2FhYTsgY29sb3I6IGJsYWNrOw==",
          "ButtonStyle": "YmFja2dyb3VuZDogIzM0MzU0MDsgY29sb3I6IHdoaXRlOyBib3JkZXItcmFkaXVzOiAyMHB4Ow==",
          "TitleStyle": "dGV4dC1hbGlnbjogbGVmdDsgZm9udC1zaXplOiAxNnB4OyBmb250LXdlaWdodDogNTAwOw==",
          "TextboxStyle": "YmFja2dyb3VuZC1jb2xvcjogd2hpdGU7IGNvbG9yOiBibGFjazsgYm9yZGVyOiBzb2xpZCAxcHggI2FhYWFhYQ==",
          "ContainerWidth": "100%",
          "DefaultInstrument": "BTC.USD",
          "HighlightColor": "#ffff00",
          "IsDisplayTitle": false,
          "IsShowChartLinks": false,
          "IsShowEmbedButton": false,
          "CompactType": "small",
          "Calculator": "position-size-calculator",
          "ContainerId": "position-size-calculator-588256"
        })

        window.RemoteCalc({
          "Url": "https://www.cashbackforex.com",
          "TopPaneStyle": "YmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCNmZmYgMjAlLCAjZjVmNWY1IDQ1JSk7IGNvbG9yOiBibGFjazsgYm9yZGVyOiBzb2xpZCAxcHggI2FhYTsgYm9yZGVyLWJvdHRvbTogbm9uZTsg",
          "BottomPaneStyle": "YmFja2dyb3VuZDogI2YzZjNmMzsgYm9yZGVyOiBzb2xpZCAxcHggI2FhYTsgY29sb3I6IGJsYWNrOw==",
          "ButtonStyle": "YmFja2dyb3VuZDogIzM0MzU0MDsgY29sb3I6IHdoaXRlOyBib3JkZXItcmFkaXVzOiAyMHB4Ow==",
          "TitleStyle": "dGV4dC1hbGlnbjogbGVmdDsgZm9udC1zaXplOiAxNnB4OyBmb250LXdlaWdodDogNTAwOw==",
          "TextboxStyle": "YmFja2dyb3VuZC1jb2xvcjogd2hpdGU7IGNvbG9yOiBibGFjazsgYm9yZGVyOiBzb2xpZCAxcHggI2FhYWFhYQ==",
          "ContainerWidth": "100%",
          "DefaultInstrument": "BTC.USD",
          "HighlightColor": "#ffff00",
          "IsDisplayTitle": false,
          "IsShowChartLinks": false,
          "IsShowEmbedButton": false,
          "CompactType": "small",
          "Calculator": "profit-calculator",
          "ContainerId": "profit-calculator-783744"
        })
      }
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    setShowAdditionalSMA(!!searchParams.get('sma20') && !!searchParams.get('sma50'))
  }, [searchParams])

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  useEffect(() => {
    const fetchTrades = async () => {
      const { data, error } = await supabase
        .from('trades')
        .select('*')
        .order('date', { ascending: false })

      if (error) {
        console.error('Error fetching trades:', error)
      } else {
        setTrades(data)
      }
    }

    fetchTrades()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    const params = new URLSearchParams(window.location.search)
    params.set(id, value)
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
  }

  const handleSelectChange = (value: string, id: string) => {
    const params = new URLSearchParams(window.location.search)
    params.set(id, value)
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
  }

  const handleTradeDirectionChange = (value: string) => {
    const params = new URLSearchParams(window.location.search)
    params.set('direction', value)
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'your_cloudinary_upload_preset')

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/your_cloudinary_cloud_name/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()
      setImageUrl(data.secure_url)
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setUploading(false)
    }
  }

  const saveTrade = async () => {
    const newTrade: Omit<Trade, 'id'> = {
      date: searchParams.get('date') || new Date().toISOString(),
      timeframe: searchParams.get('timeframe') || "",
      entrysignal: searchParams.get('entrysignal') || "",
      trendtype: searchParams.get('trendtype') || "",
      trend: searchParams.get('trend') || "",
      timeframetrend: searchParams.get('timeframetrend') || "",
      entryprice: parseFloat(searchParams.get('entryprice') || "0"),
      initialstoploss: parseFloat(searchParams.get('initialstoploss') || "0"),
      sma20: parseFloat(searchParams.get('sma20') || "0"),
      sma50: parseFloat(searchParams.get('sma50') || "0"),
      sma100: parseFloat(searchParams.get('sma100') || "0"),
      sma200: parseFloat(searchParams.get('sma200') || "0"),
      rsi: parseFloat(searchParams.get('rsi') || "0"),
      bollingerbands: searchParams.get('bollingerbands') || "",
      profitloss: 0,
      finalstoploss: 0,
      direction: searchParams.get('direction') || "",
      imageurl: imageUrl,
    }

    try {
      const { data, error } = await supabase
        .from('trades')
        .insert([newTrade])
        .select()

      if (error) {
        console.error('Error saving trade:', error)
        // Handle error (e.g., show an error message to the user)
      } else {
        setTrades(prev => [...prev, data[0]])
        // Clear URL params and image URL after saving
        window.history.replaceState({}, '', window.location.pathname)
        setImageUrl("")
        // Show success message to the user
      }
    } catch (error) {
      console.error('Error saving trade:', error)
      // Handle error (e.g., show an error message to the user)
    }
  }

  const handleTradeUpdate = async (id: number, field: keyof Trade, value: string) => {
    try {
      const { error } = await supabase
        .from('trades')
        .update({ [field]: value })
        .eq('id', id)
        .select()

      if (error) {
        console.error('Error updating trade:', error)
        // Handle error (e.g., show an error message to the user)
      } else {
        setTrades(prevTrades =>
          prevTrades.map(trade =>
            trade.id === id ? { ...trade, [field]: value } : trade
          )
        )
        // Show success message to the user
      }
    } catch (error) {
      console.error('Error updating trade:', error)
      // Handle error (e.g., show an error message to the user)
    }
  }

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`container mx-auto p-4 ${theme === 'dark' ? 'bg-[#1C2127] text-gray-200' : 'bg-white text-black'} border border-gray-200 dark:border-gray-700 rounded-lg`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Trade Tracker</h1>
        <Button onClick={toggleTheme} variant="outline" size="icon">
          {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className={`${theme === 'dark' ? 'bg-[#1C2127] border-gray-700' : 'border-gray-200'} border`}>
          <CardHeader>
            <CardTitle>Trading Calculators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Position Size Calculator</h3>
                <div id="position-size-calculator-588256"></div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Profit Calculator</h3>
                <div id="profit-calculator-783744"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={`${theme === 'dark' ? 'bg-[#1C2127] border-gray-700' : 'border-gray-200'} border`}>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Trade Details</CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => handleTradeDirectionChange('short')}
                className={`${
                  searchParams.get('direction') === 'short'
                    ? 'bg-[#FF5000] text-gray-200 hover:bg-[#FF5000] hover:text-gray-200'
                    : 'hover:bg-[#FF5000] hover:text-gray-200'
                }`}
              >
                Short
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleTradeDirectionChange('long')}
                className={`${
                  searchParams.get('direction') === 'long'
                    ? 'bg-[#00C805] text-gray-200 hover:bg-[#00C805] hover:text-gray-200'
                    : 'hover:bg-[#00C805] hover:text-gray-200'
                }`}
              >
                Long
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    type="datetime-local"
                    id="date"
                    value={searchParams.get('date') || ''}
                    onChange={handleInputChange}
                    className={`${theme === 'dark' ? 'bg-[#2C3139] ' : ''} border border-gray-300 dark:border-gray-600`}
                  />
                </div>
                <div>
                  <Label htmlFor="timeframe">Timeframe</Label>
                  <Select value={searchParams.get('timeframe') || ''} onValueChange={(value) => handleSelectChange(value, 'timeframe')}>
                    <SelectTrigger id="timeframe" className={`${theme === 'dark' ? 'bg-[#2C3139]' : ''} border border-gray-300 dark:border-gray-600`}>
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5m">5 minutes</SelectItem>
                      <SelectItem value="15m">15 minutes</SelectItem>
                      <SelectItem value="30m">30 minutes</SelectItem>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="4h">4 hours</SelectItem>
                      <SelectItem value="1d">1 day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="entrysignal">Entry Signal</Label>
                  <Input
                    id="entrysignal"
                    value={searchParams.get('entrysignal') || ''}
                    onChange={handleInputChange}
                    placeholder="Enter signal details"
                    className={`${theme === 'dark' ? 'bg-[#2C3139]' : ''} border border-gray-300 dark:border-gray-600`}
                  />
                </div>
                <div>
                  <Label htmlFor="trendtype">Set Up</Label>
                  <Select value={searchParams.get('trendtype') || ''} onValueChange={(value) => handleSelectChange(value, 'trendtype')}>
                    <SelectTrigger id="trendtype" className={`${theme === 'dark' ? 'bg-[#2C3139]' : ''} border border-gray-300 dark:border-gray-600`}>
                      <SelectValue placeholder="Select set up" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="counting">Trend Counting</SelectItem>
                      <SelectItem value="continuation">Trend Continuation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="trend">Trend</Label>
                  <Select value={searchParams.get('trend') || ''} onValueChange={(value) => handleSelectChange(value, 'trend')}>
                    <SelectTrigger id="trend" className={`${theme === 'dark' ? 'bg-[#2C3139]' : ''} border border-gray-300 dark:border-gray-600`}>
                      <SelectValue placeholder="Select a trend" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uptrend">Uptrend</SelectItem>
                      <SelectItem value="downtrend">Downtrend</SelectItem>
                      <SelectItem value="sideways">Sideways</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timeframetrend">{searchParams.get('timeframe') ? `${searchParams.get('timeframe')} Trend` : 'Timeframe Trend'}</Label>
                  <Select value={searchParams.get('timeframetrend') || ''} onValueChange={(value) => handleSelectChange(value, 'timeframetrend')}>
                    <SelectTrigger id="timeframetrend" className={`${theme === 'dark' ? 'bg-[#2C3139]' : ''} border border-gray-300 dark:border-gray-600`}>
                      <SelectValue placeholder="Select a timeframe trend" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uptrend">Uptrend</SelectItem>
                      <SelectItem value="downtrend">Downtrend</SelectItem>
                      <SelectItem value="sideways">Sideways</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="entryprice">Entry Price</Label>
                  <Input
                    id="entryprice"
                    value={searchParams.get('entryprice') || ''}
                    onChange={handleInputChange}
                    placeholder="Enter entry price"
                    className={`${theme === 'dark' ? 'bg-[#2C3139]' : ''} border border-gray-300 dark:border-gray-600`}
                  />
                </div>
                <div>
                  <Label htmlFor="initialstoploss">Initial Stop Loss</Label>
                  <Input
                    id="initialstoploss"
                    value={searchParams.get('initialstoploss') || ''}
                    onChange={handleInputChange}
                    placeholder="Enter initial stop loss"
                    className={`${theme === 'dark' ? 'bg-[#2C3139]' : ''} border border-gray-300 dark:border-gray-600`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sma20">SMA 20</Label>
                  <Input
                    id="sma20"
                    value={searchParams.get('sma20') || ''}
                    onChange={handleInputChange}
                    placeholder="SMA 20"
                    className={`${theme === 'dark' ? 'bg-[#2C3139]' : ''} border border-gray-300 dark:border-gray-600`}
                  />
                </div>
                <div>
                  <Label htmlFor="sma50">SMA 50</Label>
                  <Input
                    id="sma50"
                    value={searchParams.get('sma50') || ''}
                    onChange={handleInputChange}
                    placeholder="SMA 50"
                    className={`${theme === 'dark' ? 'bg-[#2C3139]' : ''} border border-gray-300 dark:border-gray-600`}
                  />
                </div>
                {showAdditionalSMA && (
                  <>
                    <div>
                      <Label htmlFor="sma100">SMA 100</Label>
                      <Input
                        id="sma100"
                        value={searchParams.get('sma100') || ''}
                        onChange={handleInputChange}
                        placeholder="SMA 100"
                        className={`${theme === 'dark' ? 'bg-[#2C3139]' : ''} border border-gray-300 dark:border-gray-600`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="sma200">SMA 200</Label>
                      <Input
                        id="sma200"
                        value={searchParams.get('sma200') || ''}
                        onChange={handleInputChange}
                        placeholder="SMA 200"
                        className={`${theme === 'dark' ? 'bg-[#2C3139]' : ''} border border-gray-300 dark:border-gray-600`}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rsi">RSI</Label>
                  <Input
                    id="rsi"
                    value={searchParams.get('rsi') || ''}
                    onChange={handleInputChange}
                    placeholder="Enter RSI value"
                    className={`${theme === 'dark' ? 'bg-[#2C3139]' : ''} border border-gray-300 dark:border-gray-600`}
                  />
                </div>
                <div>
                  <Label htmlFor="bollingerbands">Bollinger Bands</Label>
                  <Select value={searchParams.get('bollingerbands') || ''} onValueChange={(value) => handleSelectChange(value, 'bollingerbands')}>
                    <SelectTrigger id="bollingerbands" className={`${theme === 'dark' ? 'bg-[#2C3139]' : ''} border border-gray-300 dark:border-gray-600`}>
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upper">Upper Band</SelectItem>
                      <SelectItem value="middle">Middle Band</SelectItem>
                      <SelectItem value="lower">Lower Band</SelectItem>
                      <SelectItem value="outsideUpper">Outside Upper Band</SelectItem>
                      <SelectItem value="outsideLower">Outside Lower Band</SelectItem>
                      <SelectItem value="inside">Inside Bands</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="imageUpload">Upload Image</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="imageUpload"
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/*"
                    className={`${theme === 'dark' ? 'bg-[#2C3139]' : ''} border border-gray-300 dark:border-gray-600`}
                  />
                  {uploading && <p>Uploading...</p>}
                </div>
                {imageUrl && (
                  <div className="mt-2">
                    <Image src={imageUrl} alt="Uploaded trade image" width={200} height={200} />
                  </div>
                )}
              </div>
              <Button onClick={saveTrade}>Save Trade</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className={`mt-8 max-h-[calc(100vh-200px)] ${theme === 'dark' ? 'bg-[#1C2127] border-gray-700' : 'border-gray-200'} border`}>
        <CardHeader>
          <CardTitle>Trade History</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-[600px]">
            <Table className={theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Direction</TableHead>
                  <TableHead>Timeframe</TableHead>
                  <TableHead>Entry Signal</TableHead>
                  <TableHead>Set Up</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Timeframe Trend</TableHead>
                  <TableHead>Entry Price</TableHead>
                  <TableHead>Initial Stop Loss</TableHead>
                  <TableHead>SMA (20/50/100/200)</TableHead>
                  <TableHead>RSI</TableHead>
                  <TableHead>Bollinger Bands</TableHead>
                  <TableHead>Profit/Loss</TableHead>
                  <TableHead>Final Stop Loss</TableHead>
                  <TableHead>Image</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell>{new Date(trade.date).toLocaleString()}</TableCell>
                    <TableCell>{trade.direction}</TableCell>
                    <TableCell>{trade.timeframe}</TableCell>
                    <TableCell>{trade.entrysignal}</TableCell>
                    <TableCell>{trade.trendtype}</TableCell>
                    <TableCell>{trade.trend}</TableCell>
                    <TableCell>{trade.timeframetrend}</TableCell>
                    <TableCell>{trade.entryprice}</TableCell>
                    <TableCell>{trade.initialstoploss}</TableCell>
                    <TableCell>{`${trade.sma20}/${trade.sma50}/${trade.sma100}/${trade.sma200}`}</TableCell>
                    <TableCell>{trade.rsi}</TableCell>
                    <TableCell>{trade.bollingerbands}</TableCell>
                    <TableCell>
                      <Input
                        value={trade.profitloss?.toString() || ''}
                        onChange={(e) => handleTradeUpdate(trade.id, 'profitloss', e.target.value)}
                        placeholder="Enter P/L"
                        className={`${theme === 'dark' ? 'bg-[#2C3139]' : ''} border border-gray-300 dark:border-gray-600`}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={trade.finalstoploss?.toString() || ''}
                        onChange={(e) => handleTradeUpdate(trade.id, 'finalstoploss', e.target.value)}
                        placeholder="Enter final stop loss"
                        className={`${theme === 'dark' ? 'bg-[#2C3139]' : ''} border border-gray-300 dark:border-gray-600`}
                      />
                    </TableCell>
                    <TableCell>
                      {trade.imageurl && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setOverlayImage(trade.imageurl)}
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
      {overlayImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOverlayImage(null)}
              className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
            <Image src={overlayImage} alt="Trade image" width={800} height={600} className="max-w-full max-h-[90vh] object-contain" />
          </div>
        </div>
      )}
    </div>
  )
}
