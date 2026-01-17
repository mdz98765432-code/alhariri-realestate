import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Eye,
  Edit,
  Trash2,
  FileText,
  CreditCard,
  Home,
  Building,
  MessageCircle
} from 'lucide-react'

function PropertyCard({
  property,
  onEdit,
  onDelete,
  onPayment,
  onCreateContract,
  showActions = true
}) {
  const formatPrice = (price, type) => {
    const formatted = price.toLocaleString('ar-SA')
    if (type === 'rent') {
      return `${formatted} ريال/شهر`
    }
    return `${formatted} ريال`
  }

  // إنشاء رابط الواتساب مع رسالة جاهزة
  const getWhatsAppLink = () => {
    const phoneNumber = '966550552045'
    const categoryText = property.category === 'residential' ? 'سكني' : 'تجاري'
    const priceText = formatPrice(property.price, property.type)
    const message = `السلام عليكم، أرغب في الاستفسار عن هذا العقار وإنشاء عقد إيجار:

📍 اسم العقار: ${property.title}
🏠 النوع: ${categoryText}
💰 السعر: ${priceText}
📌 الموقع: ${property.location}`

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  }

  const handleWhatsAppContract = () => {
    window.open(getWhatsAppLink(), '_blank')
  }

  return (
    <div className="property-card rounded-xl shadow-lg overflow-hidden">
      {/* صورة العقار */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        {/* شارات */}
        <div className="absolute top-3 right-3 flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              property.type === 'rent'
                ? 'bg-gold-500 text-black'
                : 'bg-green-500 text-white'
            }`}
          >
            {property.type === 'rent' ? 'للإيجار' : 'للبيع'}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
              property.category === 'residential'
                ? 'bg-primary-700 text-gold-400 border border-gold-500/30'
                : 'bg-primary-700 text-gold-400 border border-gold-500/30'
            }`}
          >
            {property.category === 'residential' ? (
              <>
                <Home className="w-3 h-3" />
                سكني
              </>
            ) : (
              <>
                <Building className="w-3 h-3" />
                تجاري
              </>
            )}
          </span>
        </div>
      </div>

      {/* محتوى البطاقة */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2">{property.title}</h3>

        <div className="flex items-center gap-2 text-gray-400 mb-3">
          <MapPin className="w-4 h-4 text-gold-500" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* المواصفات */}
        <div className="flex items-center gap-4 mb-4 text-gray-300">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4 text-gold-500" />
            <span className="text-sm">{property.bedrooms} غرف</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4 text-gold-500" />
            <span className="text-sm">{property.bathrooms} حمام</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4 text-gold-500" />
            <span className="text-sm">{property.area} م²</span>
          </div>
        </div>

        {/* السعر */}
        <div className="text-xl font-bold text-gold-400 mb-4">
          {formatPrice(property.price, property.type)}
        </div>

        {/* الأزرار */}
        {showActions && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onPayment(property)}
              className="flex-1 flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-black py-2 px-3 rounded-lg transition-colors text-sm font-medium"
            >
              <CreditCard className="w-4 h-4" />
              <span>الدفع</span>
            </button>

            {property.type === 'rent' && (
              <button
                onClick={handleWhatsAppContract}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg transition-colors text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span>عقد إيجار</span>
              </button>
            )}

            <button
              onClick={() => onEdit(property)}
              className="flex items-center justify-center gap-1 bg-primary-600 hover:bg-primary-500 text-gold-400 py-2 px-3 rounded-lg transition-colors text-sm border border-gold-500/30"
            >
              <Edit className="w-4 h-4" />
            </button>

            <button
              onClick={() => onDelete(property.id)}
              className="flex items-center justify-center gap-1 bg-red-600 hover:bg-red-500 text-white py-2 px-3 rounded-lg transition-colors text-sm"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyCard
