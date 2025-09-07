"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Smartphone, CreditCard, QrCode, Download } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

const bankAccounts = {
  bca: { name: "Bank BCA", number: "1234567890", holder: "PT. Payment Gateway", color: "bg-blue-600" },
  seabank: { name: "SeaBank", number: "9876543210", holder: "PT. Payment Gateway", color: "bg-teal-500" },
  jago: { name: "Bank Jago", number: "5555666677", holder: "PT. Payment Gateway", color: "bg-red-500" },
}

const eWallets = {
  dana: { name: "DANA", number: "081234567890", iconPath: "/icons/dana.jpg", color: "bg-blue-500" },
  ovo: { name: "OVO", number: "081234567890", iconPath: "/icons/ovo.jpg", color: "bg-purple-500" },
  gopay: { name: "GoPay", number: "081234567890", iconPath: "/icons/gopay.jpg", color: "bg-green-500" },
  shopeepay: { name: "ShopeePay", number: "081234567890", iconPath: "/icons/shopeepay.jpg", color: "bg-orange-500" },
}

export function PaymentMethods() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const [selectedEWallet, setSelectedEWallet] = useState<string | null>(null)
  const bankCardRef = useRef<HTMLDivElement>(null)
  const eWalletCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedBank && bankCardRef.current) {
      const accountInfo = bankCardRef.current.querySelector("[data-account-info]")
      if (accountInfo) {
        accountInfo.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        })
      }
    }
  }, [selectedBank])

  useEffect(() => {
    if (selectedEWallet && eWalletCardRef.current) {
      const accountInfo = eWalletCardRef.current.querySelector("[data-ewallet-info]")
      if (accountInfo) {
        accountInfo.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        })
      }
    }
  }, [selectedEWallet])

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const downloadQRIS = () => {
    const link = document.createElement("a")
    link.href = "/images/qris-code.jpg"
    link.download = "qris-payment.jpg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "E-Wallet":
        return <Smartphone className="h-5 w-5" />
      case "Bank Transfer":
        return <CreditCard className="h-5 w-5" />
      case "QR Code":
        return <QrCode className="h-5 w-5" />
      default:
        return <Smartphone className="h-5 w-5" />
    }
  }

  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId)
  }

  const handleEWalletSelect = (eWalletId: string) => {
    setSelectedEWallet(eWalletId)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card ref={eWalletCardRef} className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                <Smartphone className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">E-Wallet</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Smartphone className="h-5 w-5" />
                  <span>Digital Wallet</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Pilih E-Wallet:</label>
            <Select onValueChange={handleEWalletSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih e-wallet..." />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(eWallets).map(([eWalletId, eWallet]) => (
                  <SelectItem key={eWalletId} value={eWalletId}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={eWallet.iconPath || "/placeholder.svg"}
                        alt={`${eWallet.name} icon`}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                      <span className="font-medium">{eWallet.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedEWallet && (
            <div
              data-ewallet-info
              className="bg-gradient-to-r from-muted/50 to-muted/30 p-4 rounded-xl border animate-in slide-in-from-top-2 duration-300"
            >
              <p className="text-sm text-muted-foreground mb-1">Nomor</p>
              <p className="font-mono text-lg font-bold tracking-wide">
                {eWallets[selectedEWallet as keyof typeof eWallets].number}
              </p>
            </div>
          )}

          {selectedEWallet && (
            <Button
              variant="outline"
              size="sm"
              className="w-full hover:bg-muted/50 transition-colors bg-transparent animate-in slide-in-from-bottom-2 duration-300"
              onClick={() => copyToClipboard(eWallets[selectedEWallet as keyof typeof eWallets].number, "ewallet")}
            >
              <Copy className="h-4 w-4 mr-2" />
              {copiedId === "ewallet" ? "Tersalin!" : "Salin"}
            </Button>
          )}
        </CardContent>
      </Card>

      <Card ref={bankCardRef} className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-600 flex items-center justify-center text-white shadow-sm overflow-hidden">
                <Image
                  src="/icons/bank.jpg"
                  alt="Bank Transfer icon"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">Bank Transfer</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <CreditCard className="h-5 w-5" />
                  <span>Bank Transfer</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Pilih Bank:</label>
            <Select onValueChange={handleBankSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih bank..." />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(bankAccounts).map(([bankId, bank]) => (
                  <SelectItem key={bankId} value={bankId}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={`/icons/${bankId}.jpg`}
                        alt={`${bank.name} icon`}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                      <span className="font-medium">{bank.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedBank && (
            <div
              data-account-info
              className="bg-gradient-to-r from-muted/50 to-muted/30 p-4 rounded-xl border animate-in slide-in-from-top-2 duration-300"
            >
              <p className="text-sm text-muted-foreground mb-1">Nomor Rekening</p>
              <p className="font-mono text-lg font-bold tracking-wide">
                {bankAccounts[selectedBank as keyof typeof bankAccounts].number}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                a.n. {bankAccounts[selectedBank as keyof typeof bankAccounts].holder}
              </p>
            </div>
          )}

          {selectedBank && (
            <Button
              variant="outline"
              size="sm"
              className="w-full hover:bg-muted/50 transition-colors bg-transparent animate-in slide-in-from-bottom-2 duration-300"
              onClick={() => copyToClipboard(bankAccounts[selectedBank as keyof typeof bankAccounts].number, "bank")}
            >
              <Copy className="h-4 w-4 mr-2" />
              {copiedId === "bank" ? "Tersalin!" : "Salin"}
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-sm overflow-hidden">
                <Image src="/icons/qris.jpg" alt="QRIS icon" width={32} height={32} className="object-contain" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">QRIS</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <QrCode className="h-5 w-5" />
                  <span>QR Code</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
            <p className="text-red-700 font-bold text-sm text-center">
              QRIS hanya menerima pembayaran dibawah Rp.100.000 (SERATUS RIBU RUPIAH), diatas nominal tersebut
              disarankan menggunakan transfer Bank
            </p>
          </div>

          <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-4 rounded-xl border text-center">
            <Image
              src="/images/qris-code.jpg"
              alt="QRIS QR Code"
              width={200}
              height={200}
              className="mx-auto rounded-lg"
            />
            <p className="text-sm text-muted-foreground mt-2">Scan untuk pembayaran</p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full hover:bg-muted/50 transition-colors bg-transparent"
            onClick={downloadQRIS}
          >
            <Download className="h-4 w-4 mr-2" />
            Download QRIS
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
