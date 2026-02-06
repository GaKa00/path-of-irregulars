export default function MetaLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    )
  }