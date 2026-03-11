import "./globals.css"

export const metadata = {
  title: "SPAININTER",
  description: "Rent services"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>

      <body className="bg-gray-100">

        <div className="min-h-screen flex flex-col">

          {/* Header */}
          <header className="bg-white border-b p-4 flex justify-between items-center">
            <h1 className="font-bold text-lg">SPAININTER</h1>
            <div className="text-sm text-gray-500">Menu</div>
          </header>

          {/* Content */}
          <main className="flex-1 flex justify-center">
            <div className="w-full max-w-md p-4">
              {children}
            </div>
          </main>

        </div>

      </body>
    </html>
  )
}