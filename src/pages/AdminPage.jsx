import { useState } from 'react'
import { Lock, LogOut, Trash2, Edit2, Plus, Building2, MapPin, Bed, Bath, Maximize, Eye, EyeOff, ShieldCheck, X, Save } from 'lucide-react'

function AdminPage({ properties, onAdd, onUpdate, onDelete }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)
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

  const ADMIN_PASSWORD = 'admin123'

  const propertyTypes = [
    { value: 'apartment', label: 'شقة' },
    { value: 'villa', label: 'فيلا' },
    { value: 'land', label: 'أرض' },
    { value: 'shop', label: 'محل تجاري' },
    { value: 'office', label: 'مكتب' }
  ]

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

  const resetForm = () => {
    setFormData({
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
    setShowAddForm(false)
    setEditingProperty(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title || !formData.location || !formData.price) {
      alert('يرجى ملء الحقول المطلوبة')
      return
    }

    const propertyData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      bedrooms: parseInt(formData.bedrooms) || 0,
      bathrooms: parseInt(formData.bathrooms) || 0,
      area: parseFloat(formData.area) || 0,
      image: formData.image || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
    }

    if (editingProperty) {
      onUpdate({ ...propertyData, id: editingProperty.id })
    } else {
      onAdd(propertyData)
    }

    resetForm()
  }

  const handleEdit = (property) => {
    setEditingProperty(property)
    setFormData({
      title: property.title,
      location: property.location,
      price: property.price.toString(),
      type: property.type,
      category: property.category,
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      area: property.area.toString(),
      description: property.description || '',
      image: property.image || ''
    })
    setShowAddForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا العقار؟')) {
      onDelete(id)
    }
  }

  const formatPrice = (price, type) => {
    const formatted = price.toLocaleString('ar-SA')
    return type === 'rent' ? `${formatted} ريال/شهرياً` : `${formatted} ريال`
  }

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
            <p className="text-gray-400">إدارة العقارات</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-4 py-2 rounded-lg transition-colors border border-red-600/30"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </button>
        </div>

        {/* إحصائيات */}
        <div className="bg-gold-500/10 border border-gold-500/30 rounded-xl p-6 mb-8 text-center">
          <Building2 className="w-12 h-12 text-gold-400 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gold-400">{properties.length}</div>
          <div className="text-gray-400">إجمالي العقارات</div>
        </div>

        {/* قسم إضافة عقار جديد */}
        <div className="mb-8">
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full bg-gold-500 hover:bg-gold-600 text-black font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-3 text-lg"
            >
              <Plus className="w-6 h-6" />
              إضافة عقار جديد
            </button>
          ) : (
            <div className="bg-primary-800 rounded-2xl p-6 border border-primary-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gold-400">
                  {editingProperty ? 'تعديل العقار' : 'إضافة عقار جديد'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">عنوان العقار *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                      placeholder="مثال: شقة فاخرة في حي الروضة"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">الموقع *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                      placeholder="مثال: حي الروضة، الرياض"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">نوع العرض</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                    >
                      <option value="rent">للإيجار</option>
                      <option value="sale">للبيع</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">التصنيف</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                    >
                      <option value="residential">سكني</option>
                      <option value="commercial">تجاري</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">السعر (ريال) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">عدد الغرف</label>
                    <input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">عدد الحمامات</label>
                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
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
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-300 text-sm mb-2">رابط الصورة</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                    placeholder="https://example.com/image.jpg"
                    dir="ltr"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-300 text-sm mb-2">الوصف</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 resize-none"
                    placeholder="وصف العقار..."
                  ></textarea>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gold-500 hover:bg-gold-600 text-black font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {editingProperty ? 'حفظ التعديلات' : 'إضافة العقار'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-primary-600 hover:bg-primary-500 text-white py-3 px-6 rounded-xl transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* قسم العقارات الحالية */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">العقارات الحالية ({properties.length})</h2>

          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(property => (
                <div key={property.id} className="bg-primary-800 rounded-xl overflow-hidden border border-primary-700 hover:border-gold-500/50 transition-all">
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

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(property)}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white py-2 px-4 rounded-lg transition-colors border border-red-600/30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-primary-800 rounded-xl border border-primary-700">
              <Building2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-400 mb-2">لا توجد عقارات</h3>
              <p className="text-gray-500">أضف عقاراً جديداً للبدء</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPage
