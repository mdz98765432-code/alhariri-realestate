import { useState } from 'react'
import { Send, User, Phone, Home, MapPin, FileText, Building2 } from 'lucide-react'

function AddPropertyPage() {
  const [formData, setFormData] = useState({
    advertiserName: '',
    phoneNumber: '',
    propertyType: 'apartment',
    purpose: 'rent',
    city: '',
    neighborhood: '',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    description: ''
  })

  const propertyTypes = [
    { value: 'apartment', label: 'شقة' },
    { value: 'villa', label: 'فيلا' },
    { value: 'land', label: 'أرض' },
    { value: 'shop', label: 'محل تجاري' },
    { value: 'office', label: 'مكتب' }
  ]

  const getPropertyTypeLabel = (value) => {
    const type = propertyTypes.find(t => t.value === value)
    return type ? type.label : value
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // التحقق من الحقول المطلوبة
    if (!formData.advertiserName || !formData.phoneNumber) {
      alert('يرجى إدخال اسم المعلن ورقم الجوال')
      return
    }

    // تنسيق الرسالة
    const message = `طلب إضافة عقار جديد:
----------------------
اسم المعلن: ${formData.advertiserName}
رقم الجوال: ${formData.phoneNumber}
نوع العقار: ${getPropertyTypeLabel(formData.propertyType)}
الغرض: ${formData.purpose === 'rent' ? 'للإيجار' : 'للبيع'}
الموقع: ${formData.city} - ${formData.neighborhood}
السعر: ${formData.price} ريال
المساحة: ${formData.area} متر
الغرف: ${formData.bedrooms} | الحمامات: ${formData.bathrooms}
الوصف: ${formData.description}`

    // فتح واتساب
    const phoneNumber = '966550552045'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-primary-900 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* العنوان */}
        <div className="text-center mb-8">
          <div className="bg-gold-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-gold-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">إضافة عقار جديد</h1>
          <p className="text-gray-400">أدخل بيانات العقار وسنتواصل معك</p>
        </div>

        {/* النموذج */}
        <form onSubmit={handleSubmit} className="bg-primary-800 rounded-2xl p-6 border border-primary-700">
          {/* معلومات المعلن */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gold-400 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              معلومات المعلن
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">اسم المعلن *</label>
                <input
                  type="text"
                  name="advertiserName"
                  value={formData.advertiserName}
                  onChange={handleChange}
                  required
                  className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="الاسم الكامل"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">رقم الجوال *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="05xxxxxxxx"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* معلومات العقار */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gold-400 mb-4 flex items-center gap-2">
              <Home className="w-5 h-5" />
              معلومات العقار
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">نوع العقار</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                >
                  {propertyTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">الغرض</label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                >
                  <option value="rent">للإيجار</option>
                  <option value="sale">للبيع</option>
                </select>
              </div>
            </div>
          </div>

          {/* الموقع */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gold-400 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              الموقع
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">المدينة</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="مثال: جدة"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">الحي</label>
                <input
                  type="text"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="مثال: الروضة"
                />
              </div>
            </div>
          </div>

          {/* التفاصيل */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gold-400 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              التفاصيل
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">السعر (ريال)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">المساحة (م²)</label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">الغرف</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">الحمامات</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">الوصف</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                placeholder="أضف وصفاً تفصيلياً للعقار..."
              ></textarea>
            </div>
          </div>

          {/* زر الإرسال */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-3 text-lg"
          >
            <Send className="w-6 h-6" />
            إرسال الطلب عبر واتساب
          </button>

          <p className="text-gray-500 text-sm text-center mt-4">
            سيتم فتح تطبيق واتساب لإرسال بيانات العقار
          </p>
        </form>
      </div>
    </div>
  )
}

export default AddPropertyPage
