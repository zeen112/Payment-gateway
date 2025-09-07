import { PaymentMethods } from "@/components/payment-methods"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Pilih Metode Pembayaran</h1>
          <p className="text-muted-foreground text-lg">Silakan pilih metode pembayaran yang Anda inginkan</p>
        </div>
        <PaymentMethods />
      </div>
    </main>
  )
}
