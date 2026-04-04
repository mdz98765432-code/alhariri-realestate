import { Home, PlusCircle, Menu, X, Building2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'الرئيسية', icon: Home },
    { path: '/properties', label: 'العقارات', icon: Building2 },
    { path: '/add', label: 'إضافة عقار', icon: PlusCircle },
  ]

  return (
    <nav className="bg-white text-gray-800 sticky top-0 z-50 border-b border-gold-500/20" style={{boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* الشعار */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="bg-gold-500 p-2 rounded-lg">
              <Building2 className="w-6 h-6 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight text-gold-500">DAR ALHARIRI</span>
              <span className="text-xs text-gray-500">REAL ESTATE</span>
            </div>
          </Link>

          {/* قائمة التنقل - سطح المكتب */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gold-500 text-black font-medium'
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gold-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* زر القائمة للجوال */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gold-500 transition-colors"
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
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gold-500 text-black font-medium'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
