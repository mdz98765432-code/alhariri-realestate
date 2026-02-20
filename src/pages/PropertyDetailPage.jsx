import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  MapPin, Bed, Bath, Maximize, MessageCircle,
  ArrowRight, Tag, Home, Building2, Calendar
} from 'lucide-react'

function PropertyDetailPage({ properties }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const property = properties.find(p => p.id === id)

  if (!property) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Building2 className="w-20 h-20 text-gold-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">العقار غير موجود</h2>
        <p className="text-gray-400 mb-6">لم يتم العثور على هذا العقار</p>
        <Link
          to="/properties"
          className="bg-gold-500 hover:bg-gold-600 text-black px-6 py-3 rounded-xl font-bold transition-colors"
        >
          العودة للعقارات
        </Link>
      </div>
    )
  }

  const formatPrice = (price, type) => {
    const formatted = price.toLocaleString('ar-SA')
    return type === 'rent' ? `${formatted} ريال/شهر` : `${formatted} ريال`
  }

  const getWhatsAppLink = () => {
    const phoneNumber = '966550552045'
    const typeText = property.type === 'rent' ? 'للإيجار' : 'للبيع'
    const categoryText = property.category === 'residential' ? 'سكني' : 'تجاري'
    const message = `السلام عليكم، أرغب في الاستفسار عن هذا العقار:

📍 اسم العقار: ${property.title}
🏠 النوع: ${categoryText} - ${typeText}
💰 السعر: ${formatPrice(property.price, property.type)}
📌 الموقع: ${property.location}
📐 المساحة: ${property.area} م²
🛏️ الغرف: ${property.bedrooms} | 🚿 الحمامات: ${property.bathrooms}`
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  }

  const typeLabel = property.type === 'rent' ? 'للإيجار' : 'للبيع'
  const categoryLabel = property.category === 'residential' ? 'سكني' : 'تجاري'

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* زر الرجوع */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gold-400 hover:text-gold-300 mb-6 transition-colors"
      >
        <ArrowRight className="w-5 h-5" />
        <span>رجوع</span>
      </button>

      {/* صورة العقار */}
      <div className="relative rounded-2xl overflow-hidden mb-8 h-72 md:h-96 bg-primary-800">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop' }}
        />
        {/* شارات */}
        <div className="absolute top-4 right-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${property.type === 'rent' ? 'bg-gold-500 text-black' : 'bg-green-500 text-white'}`}>
            {typeLabel}
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-bold bg-primary-700 text-gold-400 border border-gold-500/30">
            {categoryLabel}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* العمود الرئيسي */}
        <div className="md:col-span-2 space-y-6">
          {/* العنوان والموقع */}
          <div className="bg-primary-800 rounded-2xl p-6 border border-gold-500/20">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">{property.title}</h1>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-5 h-5 text-gold-500 shrink-0" />
              <span>{property.location}</span>
            </div>
          </div>

          {/* المواصفات */}
          <div className="bg-primary-800 rounded-2xl p-6 border border-gold-500/20">
            <h2 className="text-lg font-bold text-gold-400 mb-4">مواصفات العقار</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2 bg-primary-700 rounded-xl p-4">
                <Bed className="w-6 h-6 text-gold-500" />
                <span className="text-2xl font-bold text-white">{property.bedrooms}</span>
                <span className="text-gray-400 text-sm">غرف نوم</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-primary-700 rounded-xl p-4">
                <Bath className="w-6 h-6 text-gold-500" />
                <span className="text-2xl font-bold text-white">{property.bathrooms}</span>
                <span className="text-gray-400 text-sm">حمامات</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-primary-700 rounded-xl p-4">
                <Maximize className="w-6 h-6 text-gold-500" />
                <span className="text-2xl font-bold text-white">{property.area}</span>
                <span className="text-gray-400 text-sm">م²</span>
              </div>
            </div>
          </div>

          {/* الوصف */}
          {property.description && (
            <div className="bg-primary-800 rounded-2xl p-6 border border-gold-500/20">
              <h2 className="text-lg font-bold text-gold-400 mb-4">وصف العقار</h2>
              <p className="text-gray-300 leading-relaxed text-base whitespace-pre-line">
                {property.description}
              </p>
            </div>
          )}
        </div>

        {/* العمود الجانبي */}
        <div className="space-y-4">
          {/* السعر */}
          <div className="bg-primary-800 rounded-2xl p-6 border border-gold-500/20">
            <p className="text-gray-400 text-sm mb-1">السعر</p>
            <div className="text-2xl font-bold text-gold-400">
              {formatPrice(property.price, property.type)}
            </div>
          </div>

          {/* تفاصيل إضافية */}
          <div className="bg-primary-800 rounded-2xl p-6 border border-gold-500/20 space-y-3">
            <div className="flex items-center gap-3 text-gray-300">
              <Tag className="w-4 h-4 text-gold-500" />
              <span className="text-sm">{typeLabel}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              {property.category === 'residential'
                ? <Home className="w-4 h-4 text-gold-500" />
                : <Building2 className="w-4 h-4 text-gold-500" />
              }
              <span className="text-sm">{categoryLabel}</span>
            </div>
            {property.createdAt && (
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="w-4 h-4 text-gold-500" />
                <span className="text-sm">
                  {new Date(property.createdAt).toLocaleDateString('ar-SA')}
                </span>
              </div>
            )}
          </div>

          {/* زر التواصل */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-4 px-4 rounded-xl transition-colors font-bold text-base w-full"
          >
            <MessageCircle className="w-5 h-5" />
            <span>تواصل عبر واتساب</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetailPage
