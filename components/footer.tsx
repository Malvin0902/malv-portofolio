export default function Footer() {
  return (
    <footer className="w-full py-8 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Malv. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}