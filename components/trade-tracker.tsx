"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Trade {
  id: number
  date: string
  entrySignal: string
  sma20: string
  sma50: string
  sma100: string
  sma200: string
  rsi: string
  bollingerBands: string
  trend: string
  timeframe: string
  profitLoss: string
}

export function TradeTracker() {
  const [trades, setTrades] = useState<Trade[]>([])
  const [currentTrade, setCurrentTrade] = useState<Trade>({
    id: 0,
    date: "",
    entrySignal: "",
    sma20: "",
    sma50: "",
    sma100: "",
    sma200: "",
    rsi: "",
    bollingerBands: "",
    trend: "",
    timeframe: "",
    profitLoss: ""
  })
  const [showAdditionalSMA, setShowAdditionalSMA] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = "https://www.cashbackforex.com/Content/remote/remote-widgets.js"
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      window.RemoteCalc({
        "Url": "https://www.cashbackforex.com",
        "TopPaneStyle": "YmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCNmZmYgMjAlLCAjZjVmNWY1IDQ1JSk7IGNvbG9yOiBibGFjazsgYm9yZGVyOiBzb2xpZCAxcHggI2FhYTsgYm9yZGVyLWJvdHRvbTogbm9uZTsg",
        "BottomPaneStyle": "YmFja2dyb3VuZDogI2YzZjNmMzsgYm9yZGVyOiBzb2xpZCAxcHggI2FhYTsgY29sb3I6IGJsYWNrOw==",
        "ButtonStyle": "YmFja2dyb3VuZDogIzM0MzU0MDsgY29sb3I6IHdoaXRlOyBib3JkZXItcmFkaXVzOiAyMHB4Ow==",
        "TitleStyle": "dGV4dC1hbGlnbjogbGVmdDsgZm9udC1zaXplOiA0MHB4OyBmb250LXdlaWdodDogNTAwOw==",
        "TextboxStyle": "YmFja2dyb3VuZC1jb2xvcjogd2hpdGU7IGNvbG9yOiBibGFjazsgYm9yZGVyOiBzb2xpZCAxcHggI2FhYWFhYQ==",
        "ContainerWidth": "665",
        "HighlightColor": "#ffff00",
        "IsDisplayTitle": false,
        "IsShowChartLinks": false,
        "IsShowEmbedButton": false,
        "CompactType": "large",
        "Calculator": "position-size-calculator",
        "ContainerId": "position-size-calculator-780643"
      })
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (currentTrade.sma20 && currentTrade.sma50) {
      setShowAdditionalSMA(true)
    } else {
      setShowAdditionalSMA(false)
    }
  }, [currentTrade.sma20, currentTrade.sma50])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setCurrentTrade(prev => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string, id: string) => {
    setCurrentTrade(prev => ({ ...prev, [id]: value }))
  }

  const saveTrade = () => {
    const newTrade = { ...currentTrade, id: Date.now(), profitLoss: "" }
    setTrades(prev => [...prev, newTrade])
    setCurrentTrade({
      id: 0,
      date: "",
      entrySignal: "",
      sma20: "",
      sma50: "",
      sma100: "",
      sma200: "",
      rsi: "",
      bollingerBands: "",
      trend: "",
      timeframe: "",
      profitLoss: ""
    })
  }

  const handleTradeUpdate = (id: number, field: keyof Trade, value: string) => {
    setTrades(prevTrades =>
      prevTrades.map(trade =>
        trade.id === id ? { ...trade, [field]: value } : trade
      )
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trade Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Position Size Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div id="position-size-calculator-780643"></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Trade Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="date">Trade Date and Time</Label>
                <Input
                  type="datetime-local"
                  id="date"
                  value={currentTrade.date}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="entrySignal">Entry Signal</Label>
                <Input
                  id="entrySignal"
                  value={currentTrade.entrySignal}
                  onChange={handleInputChange}
                  placeholder="Enter signal details"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sma20">SMA 20</Label>
                  <Input
                    id="sma20"
                    value={currentTrade.sma20}
                    onChange={handleInputChange}
                    placeholder="SMA 20"
                  />
                </div>
                <div>
                  <Label htmlFor="sma50">SMA 50</Label>
                  <Input
                    id="sma50"
                    value={currentTrade.sma50}
                    onChange={handleInputChange}
                    placeholder="SMA 50"
                  />
                </div>
                {showAdditionalSMA && (
                  <>
                    <div>
                      <Label htmlFor="sma100">SMA 100</Label>
                      <Input
                        id="sma100"
                        value={currentTrade.sma100}
                        onChange={handleInputChange}
                        placeholder="SMA 100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sma200">SMA 200</Label>
                      <Input
                        id="sma200"
                        value={currentTrade.sma200}
                        onChange={handleInputChange}
                        placeholder="SMA 200"
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
                    value={currentTrade.rsi}
                    onChange={handleInputChange}
                    placeholder="Enter RSI value"
                  />
                </div>
                <div>
                  <Label htmlFor="bollingerBands">Bollinger Bands</Label>
                  <Input
                    id="bollingerBands"
                    value={currentTrade.bollingerBands}
                    onChange={handleInputChange}
                    placeholder="Enter Bollinger Bands value"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="trend">Trend</Label>
                <Select value={currentTrade.trend} onValueChange={(value) => handleSelectChange(value, 'trend')}>
                  <SelectTrigger id="trend">
                    <SelectValue placeholder="Select trend" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uptrend">Uptrend</SelectItem>
                    <SelectItem value="downtrend">Downtrend</SelectItem>
                    <SelectItem value="sideways">Sideways</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timeframe">Timeframe</Label>
                <Select value={currentTrade.timeframe} onValueChange={(value) => handleSelectChange(value, 'timeframe')}>
                  <SelectTrigger id="timeframe">
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
              <Button onClick={saveTrade}>Save Trade</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8 max-h-[calc(100vh-200px)]">
        <CardHeader>
          <CardTitle>Saved Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Entry Signal</TableHead>
                  <TableHead>SMA (20/50/100/200)</TableHead>
                  <TableHead>RSI</TableHead>
                  <TableHead>Bollinger Bands</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Timeframe</TableHead>
                  <TableHead>Profit/Loss</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell>{new Date(trade.date).toLocaleString()}</TableCell>
                    <TableCell>{trade.entrySignal}</TableCell>
                    <TableCell>{`${trade.sma20}/${trade.sma50}/${trade.sma100}/${trade.sma200}`}</TableCell>
                    <TableCell>{trade.rsi}</TableCell>
                    <TableCell>{trade.bollingerBands}</TableCell>
                    <TableCell>{trade.trend}</TableCell>
                    <TableCell>{trade.timeframe}</TableCell>
                    <TableCell>
                      <Input
                        value={trade.profitLoss}
                        onChange={(e) => handleTradeUpdate(trade.id, 'profitLoss', e.target.value)}
                        placeholder="Enter P/L"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}