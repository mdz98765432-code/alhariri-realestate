import { useState } from 'react'
import { Lock, LogOut, CheckCircle, XCircle, Trash2, Clock, CheckCheck, Ban, Building2, MapPin, Bed, Bath, Maximize, Eye, EyeOff, ShieldCheck } from 'lucide-react'

function AdminPage({ properties, onApprove, onReject, onDelete }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('pending')

  const ADMIN_PASSWORD = 'admin123'

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('كلمة المرور غير صحيحة')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setPassword('')
  }

  const pendingProperties = properties.filter(p => p.status === 'pending')
  const approvedProperties = properties.filter(p => p.status === 'approved')
  const rejectedProperties = properties.filter(p => p.status === 'rejected')

  const formatPrice = (price, type) => {
    const formatted = price.toLocaleString('ar-SA')
    return type === 'rent' ? `${formatted} ريال/شهرياً` : `${formatted} ريال`
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            <Clock className="w-4 h-4" />
            قيد المراجعة
          </span>
        )
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400 border border-green-500/30">
            <CheckCheck className="w-4 h-4" />
            تمت الموافقة
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-500/20 text-red-400 border border-red-500/30">
            <Ban className="w-4 h-4" />
            مرفوض
          </span>
        )
      default:
        return null
    }
  }

  const PropertyCard = ({ property }) => (
    <div className="bg-primary-800 rounded-xl overflow-hidden border border-primary-700 hover:border-gold-500/50 transition-all duration-300">
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            property.type === 'rent'
              ? 'bg-blue-500/90 text-white'
              : 'bg-green-500/90 text-white'
          }`}>
            {property.type === 'rent' ? 'للإيجار' : 'للبيع'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3">
          {getStatusBadge(property.status)}
        </div>

        <h3 className="text-lg font-bold text-white mb-2">{property.title}</h3>

        <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span>{property.location}</span>
        </div>

        <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4" />
            <span>{property.area} م²</span>
          </div>
        </div>

        <div className="text-gold-400 font-bold text-lg mb-4">
          {formatPrice(property.price, property.type)}
        </div>

        {property.status === 'pending' && (
          <div className="flex gap-2">
            <button
              onClick={() => onApprove(property.id)}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              <CheckCircle className="w-5 h-5" />
              موافقة
            </button>
            <button
              onClick={() => onReject(property.id)}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              <XCircle className="w-5 h-5" />
              رفض
            </button>
          </div>
        )}

        {property.status === 'approved' && (
          <div className="flex gap-2">
            <button
              onClick={() => onReject(property.id)}
              className="flex-1 flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              <Ban className="w-5 h-5" />
              إلغاء الموافقة
            </button>
            <button
              onClick={() => onDelete(property.id)}
              className="flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white py-2 px-4 rounded-lg transition-colors border border-red-600/30"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}

        {property.status === 'rejected' && (
          <div className="flex gap-2">
            <button
              onClick={() => onApprove(property.id)}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              <CheckCircle className="w-5 h-5" />
              قبول
            </button>
            <button
              onClick={() => onDelete(property.id)}
              className="flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white py-2 px-4 rounded-lg transition-colors border border-red-600/30"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )

  // صفحة تسجيل الدخول
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center py-8 px-4">
        <div className="bg-primary-800 rounded-2xl p-8 w-full max-w-md border border-primary-700">
          <div className="text-center mb-8">
            <div className="bg-gold-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-10 h-10 text-gold-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">لوحة التحكم</h1>
            <p className="text-gray-400">أدخل كلمة المرور للوصول</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-300 text-sm mb-2">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="أدخل كلمة المرور"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gold-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-600 text-black font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              دخول
            </button>
          </form>
        </div>
      </div>
    )
  }

  // لوحة التحكم
  return (
    <div className="min-h-screen bg-primary-900 py-8">
      <div className="container mx-auto px-4">
        {/* الهيدر */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">لوحة التحكم</h1>
            <p className="text-gray-400">إدارة العقارات والموافقات</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-4 py-2 rounded-lg transition-colors border border-red-600/30"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </button>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-center">
            <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-400">{pendingProperties.length}</div>
            <div className="text-gray-400 text-sm">قيد المراجعة</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
            <CheckCheck className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">{approvedProperties.length}</div>
            <div className="text-gray-400 text-sm">تمت الموافقة</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
            <Ban className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-400">{rejectedProperties.length}</div>
            <div className="text-gray-400 text-sm">مرفوض</div>
          </div>
        </div>

        {/* التبويبات */}
        <div className="flex gap-2 mb-6 bg-primary-800 p-2 rounded-xl border border-primary-700">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors ${
              activeTab === 'pending'
                ? 'bg-yellow-500 text-black font-bold'
                : 'text-gray-400 hover:bg-primary-700'
            }`}
          >
            <Clock className="w-5 h-5" />
            قيد المراجعة ({pendingProperties.length})
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors ${
              activeTab === 'approved'
                ? 'bg-green-500 text-black font-bold'
                : 'text-gray-400 hover:bg-primary-700'
            }`}
          >
            <CheckCheck className="w-5 h-5" />
            موافق عليها ({approvedProperties.length})
          </button>
          <button
            onClick={() => setActiveTab('rejected')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors ${
              activeTab === 'rejected'
                ? 'bg-red-500 text-white font-bold'
                : 'text-gray-400 hover:bg-primary-700'
            }`}
          >
            <Ban className="w-5 h-5" />
            مرفوضة ({rejectedProperties.length})
          </button>
        </div>

        {/* عرض العقارات حسب التبويب */}
        {activeTab === 'pending' && (
          <>
            {pendingProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-primary-800 rounded-xl border border-primary-700">
                <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">لا توجد عقارات قيد المراجعة</h3>
                <p className="text-gray-500">جميع العقارات تمت مراجعتها</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'approved' && (
          <>
            {approvedProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {approvedProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-primary-800 rounded-xl border border-primary-700">
                <CheckCheck className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">لا توجد عقارات موافق عليها</h3>
                <p className="text-gray-500">لم تتم الموافقة على أي عقار بعد</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'rejected' && (
          <>
            {rejectedProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rejectedProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-primary-800 rounded-xl border border-primary-700">
                <Ban className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">لا توجد عقارات مرفوضة</h3>
                <p className="text-gray-500">لم يتم رفض أي عقار</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AdminPage
