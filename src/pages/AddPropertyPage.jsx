import { useState, useEffect } from 'react'
import { Building2, Save, X } from 'lucide-react'

function AddPropertyPage({ onAdd, onUpdate, editingProperty, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    type: 'rent',
    category: 'residential',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    image: ''
  })

  const [errors, setErrors] = useState({})

  // تحميل بيانات العقار عند التعديل
  useEffect(() => {
    if (editingProperty) {
      setFormData({
        ...editingProperty,
        price: editingProperty.price.toString(),
        bedrooms: editingProperty.bedrooms.toString(),
        bathrooms: editingProperty.bathrooms.toString(),
        area: editingProperty.area.toString()
      })
    }
  }, [editingProperty])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // مسح الخطأ عند الكتابة
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'عنوان العقار مطلوب'
    if (!formData.location.trim()) newErrors.location = 'الموقع مطلوب'
    if (!formData.price || formData.price <= 0) newErrors.price = 'السعر يجب أن يكون أكبر من صفر'
    if (!formData.bedrooms || formData.bedrooms <= 0) newErrors.bedrooms = 'عدد الغرف مطلوب'
    if (!formData.bathrooms || formData.bathrooms <= 0) newErrors.bathrooms = 'عدد الحمامات مطلوب'
    if (!formData.area || formData.area <= 0) newErrors.area = 'المساحة مطلوبة'
    if (!formData.description.trim()) newErrors.description = 'الوصف مطلوب'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: parseFloat(formData.area)
      }

      if (editingProperty) {
        onUpdate({ ...propertyData, id: editingProperty.id })
      } else {
        onAdd(propertyData)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gold-400 mb-2">
            {editingProperty ? 'تعديل العقار' : 'إضافة عقار جديد'}
          </h1>
          <p className="text-gray-400">
            {editingProperty ? 'قم بتعديل بيانات العقار' : 'أدخل تفاصيل العقار الجديد'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-primary-800 rounded-2xl shadow-lg p-8 border border-gold-500/20">
          {/* عنوان العقار */}
          <div className="mb-6">
            <label className="form-label">عنوان العقار *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-input ${errors.title ? 'border-red-500' : ''}`}
              placeholder="مثال: شقة فاخرة في حي الروضة"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* الموقع */}
          <div className="mb-6">
            <label className="form-label">الموقع *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`form-input ${errors.location ? 'border-red-500' : ''}`}
              placeholder="مثال: حي الروضة، الرياض"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          {/* نوع العرض والتصنيف */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="form-label">نوع العرض *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="form-select"
              >
                <option value="rent">للإيجار</option>
                <option value="sale">للبيع</option>
              </select>
            </div>
            <div>
              <label className="form-label">التصنيف *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
              >
                <option value="residential">سكني</option>
                <option value="commercial">تجاري</option>
              </select>
            </div>
          </div>

          {/* السعر */}
          <div className="mb-6">
            <label className="form-label">
              السعر {formData.type === 'rent' ? '(ريال/شهر)' : '(ريال)'} *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`form-input ${errors.price ? 'border-red-500' : ''}`}
              placeholder="0"
              min="0"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          {/* المواصفات */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="form-label">عدد الغرف *</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className={`form-input ${errors.bedrooms ? 'border-red-500' : ''}`}
                placeholder="0"
                min="0"
              />
              {errors.bedrooms && <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>}
            </div>
            <div>
              <label className="form-label">عدد الحمامات *</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className={`form-input ${errors.bathrooms ? 'border-red-500' : ''}`}
                placeholder="0"
                min="0"
              />
              {errors.bathrooms && <p className="text-red-500 text-sm mt-1">{errors.bathrooms}</p>}
            </div>
            <div>
              <label className="form-label">المساحة (م²) *</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className={`form-input ${errors.area ? 'border-red-500' : ''}`}
                placeholder="0"
                min="0"
              />
              {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
            </div>
          </div>

          {/* رابط الصورة */}
          <div className="mb-6">
            <label className="form-label">رابط صورة العقار (اختياري)</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="form-input"
              placeholder="https://example.com/image.jpg"
              dir="ltr"
            />
          </div>

          {/* الوصف */}
          <div className="mb-8">
            <label className="form-label">وصف العقار *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`form-input resize-none ${errors.description ? 'border-red-500' : ''}`}
              placeholder="أدخل وصفاً تفصيلياً للعقار..."
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* الأزرار */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-black py-3 px-6 rounded-xl font-bold transition-colors"
            >
              <Save className="w-5 h-5" />
              <span>{editingProperty ? 'حفظ التعديلات' : 'إضافة العقار'}</span>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-gold-400 py-3 px-6 rounded-xl font-medium transition-colors border border-gold-500/30"
            >
              <X className="w-5 h-5" />
              <span>إلغاء</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPropertyPage
