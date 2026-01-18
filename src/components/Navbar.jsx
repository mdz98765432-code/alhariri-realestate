import { Home, FileText, PlusCircle, Menu, X, Building2 } from 'lucide-react'
import { useState } from 'react'

function Navbar({ currentPage, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'properties', label: 'العقارات', icon: Building2 },
    { id: 'contracts', label: 'العقود', icon: FileText },
    { id: 'addProperty', label: 'إضافة عقار', icon: PlusCircle },
  ]

  const handleNavigate = (pageId) => {
    onNavigate(pageId)
    setMobileMenuOpen(false)
  }

  return (
    <nav className="bg-primary-900 text-white shadow-lg sticky top-0 z-50 border-b border-gold-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* الشعار */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavigate('home')}
          >
            <div className="bg-gold-500 p-2 rounded-lg">
              <Building2 className="w-6 h-6 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight text-gold-400">ALHARIRI</span>
              <span className="text-xs text-gray-400">REAL ESTATE</span>
            </div>
          </div>

          {/* قائمة التنقل - سطح المكتب */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gold-500 text-black font-medium'
                      : 'hover:bg-primary-700 text-gray-300 hover:text-gold-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>

          {/* زر القائمة للجوال */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-primary-700 text-gold-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* قائمة الجوال */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-slideUp">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gold-500 text-black font-medium'
                      : 'hover:bg-primary-700 text-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
