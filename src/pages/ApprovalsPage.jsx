import { CheckCircle, XCircle, Trash2, Clock, CheckCheck, Ban, Building2, MapPin, Bed, Bath, Maximize } from 'lucide-react'

function ApprovalsPage({ properties, pendingCount, onApprove, onReject, onDelete }) {
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
            في انتظار الموافقة
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

  const PropertyCard = ({ property, showActions = true }) => (
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
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            property.category === 'residential'
              ? 'bg-purple-500/90 text-white'
              : 'bg-orange-500/90 text-white'
          }`}>
            {property.category === 'residential' ? 'سكني' : 'تجاري'}
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

        {showActions && property.status === 'pending' && (
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

        {showActions && property.status === 'rejected' && (
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

  return (
    <div className="min-h-screen bg-primary-900 py-8">
      <div className="container mx-auto px-4">
        {/* العنوان */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">إدارة الموافقات</h1>
          <p className="text-gray-400">مراجعة العقارات المضافة والموافقة عليها</p>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-center">
            <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-400">{pendingProperties.length}</div>
            <div className="text-gray-400 text-sm">في انتظار الموافقة</div>
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

        {/* العقارات في انتظار الموافقة */}
        {pendingProperties.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              في انتظار الموافقة ({pendingProperties.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}

        {/* العقارات المعتمدة */}
        {approvedProperties.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
              <CheckCheck className="w-6 h-6" />
              تمت الموافقة ({approvedProperties.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedProperties.map(property => (
                <PropertyCard key={property.id} property={property} showActions={false} />
              ))}
            </div>
          </div>
        )}

        {/* العقارات المرفوضة */}
        {rejectedProperties.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
              <Ban className="w-6 h-6" />
              مرفوض ({rejectedProperties.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rejectedProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}

        {/* رسالة في حال عدم وجود عقارات */}
        {properties.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">لا توجد عقارات</h3>
            <p className="text-gray-500">لم يتم إضافة أي عقارات بعد</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ApprovalsPage
