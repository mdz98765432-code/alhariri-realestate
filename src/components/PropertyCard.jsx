import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  MessageCircle,
  Eye
} from 'lucide-react'
import { Link } from 'react-router-dom'

function PropertyCard({ property }) {
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
    const typeText = property.type === 'rent' ? 'للإيجار' : 'للبيع'
    const categoryText = property.category === 'residential' ? 'سكني' : 'تجاري'
    const priceText = formatPrice(property.price, property.type)
    const message = `السلام عليكم، أرغب في الاستفسار عن هذا العقار:

📍 اسم العقار: ${property.title}
🏠 النوع: ${categoryText} - ${typeText}
💰 السعر: ${priceText}
📌 الموقع: ${property.location}
📐 المساحة: ${property.area} م²
🛏️ الغرف: ${property.bedrooms} | 🚿 الحمامات: ${property.bathrooms}`

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  }

  const handleWhatsApp = () => {
    window.open(getWhatsAppLink(), '_blank')
  }

  return (
    <div className="property-card rounded-xl shadow-sm overflow-hidden">
      {/* صورة العقار */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.image}
          alt={`${property.title} - ${property.type === 'rent' ? 'للإيجار' : 'للبيع'} في ${property.location} - دار الحريري العقارية`}
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
          <span className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 bg-white/90 text-gold-600 border border-gold-500/30">
            {property.category === 'residential' ? 'سكني' : 'تجاري'}
          </span>
        </div>
      </div>

      {/* محتوى البطاقة */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{property.title}</h3>

        <div className="flex items-center gap-2 text-gray-500 mb-3">
          <MapPin className="w-4 h-4 text-gold-500" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* المواصفات */}
        <div className="flex items-center gap-4 mb-4 text-gray-600">
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
        <div className="text-xl font-bold text-gold-500 mb-2">
          {formatPrice(property.price, property.type)}
        </div>

        {/* وصف مختصر */}
        {property.description && (
          <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2">
            {property.description.length > 100
              ? property.description.slice(0, 100) + '...'
              : property.description}
          </p>
        )}

        {/* أزرار */}
        <div className="flex gap-2">
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-3 rounded-lg transition-colors font-medium text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>واتساب</span>
          </button>
          <Link
            to={`/properties/${property.id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gold-600 py-3 px-3 rounded-lg transition-colors font-medium text-sm border border-gold-500/30"
          >
            <Eye className="w-4 h-4" />
            <span>التفاصيل</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
