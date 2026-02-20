import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Lock,
  LogOut,
  Trash2,
  Edit2,
  Plus,
  Building2,
  MapPin,
  Eye,
  EyeOff,
  X,
  Save,
  Home,
  Phone,
  CheckCircle,
  AlertCircle,
  Upload,
  ImageIcon,
  Loader2
} from 'lucide-react'

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY

// مكوّن رفع الصورة — يُستخدم في نموذج الإضافة والتعديل
function ImageUploader({ currentUrl, onUpload, onUploadingChange }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentUrl || '')
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  // مزامنة المعاينة عند تغيير currentUrl (عند فتح التعديل)
  useEffect(() => {
    setPreview(currentUrl || '')
    setError('')
  }, [currentUrl])

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // التحقق من نوع الملف
    if (!file.type.startsWith('image/')) {
      setError('يرجى اختيار ملف صورة صالح')
      return
    }

    // التحقق من الحجم (أقصى 10 ميجابايت)
    if (file.size > 10 * 1024 * 1024) {
      setError('حجم الصورة يجب أن يكون أقل من 10 ميجابايت')
      return
    }

    setError('')

    // معاينة فورية قبل الرفع
    const reader = new FileReader()
    reader.onload = (ev) => setPreview(ev.target.result)
    reader.readAsDataURL(file)

    // إخبار الأب ببدء الرفع (لتعطيل زر الحفظ)
    setUploading(true)
    onUploadingChange?.(true)

    try {
      const data = new FormData()
      data.append('key', IMGBB_API_KEY)
      data.append('image', file)

      const res = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: data
      })
      const json = await res.json()

      if (json.success) {
        onUpload(json.data.url)
      } else {
        setError('فشل رفع الصورة، يرجى المحاولة مرة أخرى')
        setPreview(currentUrl || '')
      }
    } catch {
      setError('حدث خطأ أثناء الاتصال، تحقق من اتصالك بالإنترنت')
      setPreview(currentUrl || '')
    } finally {
      setUploading(false)
      onUploadingChange?.(false)
      // إعادة تعيين الـ input لقبول نفس الملف مجدداً إن احتاج
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div>
      {/* منطقة العرض والرفع */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl overflow-hidden transition-colors cursor-pointer
          ${uploading ? 'cursor-wait border-yellow-300 bg-yellow-50' : 'border-gray-300 hover:border-yellow-500 bg-gray-50'}`}
        style={{ minHeight: '160px' }}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="معاينة الصورة"
              className="w-full h-40 object-cover"
            />
            {/* طبقة التغطية عند التحميل */}
            {uploading && (
              <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
                <span className="text-sm text-gray-600 font-medium">جاري رفع الصورة...</span>
              </div>
            )}
            {/* زر التغيير */}
            {!uploading && (
              <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                <span className="bg-white text-gray-800 text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-2 shadow">
                  <Upload className="w-4 h-4" />
                  تغيير الصورة
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 gap-3 text-gray-400">
            {uploading ? (
              <>
                <Loader2 className="w-10 h-10 text-yellow-500 animate-spin" />
                <span className="text-sm font-medium text-gray-600">جاري رفع الصورة...</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-10 h-10" />
                <span className="text-sm">اضغط لاختيار صورة من جهازك</span>
                <span className="text-xs text-gray-300">JPG, PNG, WEBP — حتى 10 ميجابايت</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* زر الرفع */}
      <button
        type="button"
        onClick={() => !uploading && inputRef.current?.click()}
        disabled={uploading}
        className="mt-2 w-full flex items-center justify-center gap-2 border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 disabled:opacity-50 disabled:cursor-wait font-medium py-2 px-4 rounded-xl transition-colors text-sm"
      >
        {uploading ? (
          <><Loader2 className="w-4 h-4 animate-spin" />جاري الرفع...</>
        ) : (
          <><Upload className="w-4 h-4" />{preview ? 'تغيير الصورة' : 'رفع صورة من الجهاز'}</>
        )}
      </button>

      {/* رسالة الخطأ */}
      {error && (
        <p className="mt-2 text-red-500 text-xs flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}

      {/* رابط الصورة الحالي (للعرض فقط) */}
      {!uploading && !error && currentUrl && (
        <p className="mt-1 text-gray-400 text-xs truncate" dir="ltr">{currentUrl}</p>
      )}

      {/* input مخفي */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}

function AdminPage() {
  // حالة تسجيل الدخول
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')

  // العقارات
  const [properties, setProperties] = useState([])

  // نموذج الإضافة/التعديل
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [isImageUploading, setIsImageUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    city: '',
    neighborhood: '',
    price: '',
    propertyType: 'apartment',
    purpose: 'rent',
    category: 'residential',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    phone: '',
    image: ''
  })

  const ADMIN_PASSWORD = 'Rayan@0505@Eyad'

  const propertyTypes = [
    { value: 'apartment', label: 'شقة' },
    { value: 'villa', label: 'فيلا' },
    { value: 'land', label: 'أرض' },
    { value: 'shop', label: 'محل تجاري' },
    { value: 'office', label: 'مكتب' },
    { value: 'building', label: 'عمارة' }
  ]

  const purposes = [
    { value: 'sale', label: 'للبيع' },
    { value: 'rent', label: 'للإيجار' }
  ]

  const categories = [
    { value: 'residential', label: 'سكني' },
    { value: 'commercial', label: 'تجاري' }
  ]

  // تحميل العقارات من localStorage
  useEffect(() => {
    const saved = localStorage.getItem('properties')
    if (saved) {
      try {
        setProperties(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading properties:', e)
      }
    }
  }, [])

  // التحقق من حالة الدخول
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('adminLoggedIn')
    if (loggedIn === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  // حفظ العقارات في localStorage
  const saveProperties = (newProperties) => {
    localStorage.setItem('properties', JSON.stringify(newProperties))
    setProperties(newProperties)
    // إشعار App.jsx بالتغيير في نفس التبويب
    window.dispatchEvent(new CustomEvent('propertiesChanged'))
  }

  // تسجيل الدخول
  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminLoggedIn', 'true')
      setIsLoggedIn(true)
      setLoginError('')
    } else {
      setLoginError('كلمة المرور غير صحيحة')
    }
  }

  // تسجيل الخروج
  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn')
    setIsLoggedIn(false)
    setPassword('')
  }

  // تغيير حقول النموذج
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // تحديث رابط الصورة بعد الرفع
  const handleImageUploaded = (url) => {
    setFormData(prev => ({ ...prev, image: url }))
  }

  // إعادة تعيين النموذج
  const resetForm = () => {
    setFormData({
      title: '',
      city: '',
      neighborhood: '',
      price: '',
      propertyType: 'apartment',
      purpose: 'rent',
      category: 'residential',
      bedrooms: '',
      bathrooms: '',
      area: '',
      description: '',
      phone: '',
      image: ''
    })
    setEditingProperty(null)
    setShowEditModal(false)
  }

  // إضافة عقار جديد
  const handleAddProperty = (e) => {
    e.preventDefault()

    if (!formData.title || !formData.city || !formData.price) {
      alert('يرجى ملء الحقول المطلوبة (اسم العقار، المدينة، السعر)')
      return
    }

    const newProperty = {
      id: Date.now(),
      ...formData,
      price: parseFloat(formData.price) || 0,
      bedrooms: parseInt(formData.bedrooms) || 0,
      bathrooms: parseInt(formData.bathrooms) || 0,
      area: parseFloat(formData.area) || 0,
      location: `${formData.neighborhood}، ${formData.city}`,
      type: formData.purpose,
      image: formData.image || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      createdAt: new Date().toISOString()
    }

    const newProperties = [...properties, newProperty]
    saveProperties(newProperties)
    resetForm()
    setSuccessMessage('تم إضافة العقار بنجاح')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  // فتح نموذج التعديل
  const handleEdit = (property) => {
    setEditingProperty(property)
    setFormData({
      title: property.title || '',
      city: property.city || property.location?.split('،')[1]?.trim() || '',
      neighborhood: property.neighborhood || property.location?.split('،')[0]?.trim() || '',
      price: property.price?.toString() || '',
      propertyType: property.propertyType || 'apartment',
      purpose: property.purpose || property.type || 'rent',
      category: property.category || 'residential',
      bedrooms: property.bedrooms?.toString() || '',
      bathrooms: property.bathrooms?.toString() || '',
      area: property.area?.toString() || '',
      description: property.description || '',
      phone: property.phone || '',
      image: property.image || ''
    })
    setShowEditModal(true)
  }

  // حفظ التعديلات
  const handleSaveEdit = (e) => {
    e.preventDefault()

    if (!formData.title || !formData.city || !formData.price) {
      alert('يرجى ملء الحقول المطلوبة')
      return
    }

    const updatedProperty = {
      ...editingProperty,
      ...formData,
      price: parseFloat(formData.price) || 0,
      bedrooms: parseInt(formData.bedrooms) || 0,
      bathrooms: parseInt(formData.bathrooms) || 0,
      area: parseFloat(formData.area) || 0,
      location: `${formData.neighborhood}، ${formData.city}`,
      type: formData.purpose
    }

    const newProperties = properties.map(p =>
      p.id === editingProperty.id ? updatedProperty : p
    )
    saveProperties(newProperties)
    resetForm()
    setSuccessMessage('تم تحديث العقار بنجاح')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  // حذف عقار
  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العقار؟')) {
      const newProperties = properties.filter(p => p.id !== id)
      saveProperties(newProperties)
      setSuccessMessage('تم حذف العقار بنجاح')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  // تنسيق السعر
  const formatPrice = (price, type) => {
    const formatted = price?.toLocaleString('ar-SA') || '0'
    return type === 'rent' ? `${formatted} ريال/شهرياً` : `${formatted} ريال`
  }

  // الحصول على اسم نوع العقار
  const getPropertyTypeName = (type) => {
    return propertyTypes.find(pt => pt.value === type)?.label || type
  }

  // ============ شاشة تسجيل الدخول ============
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
          {/* شعار الموقع */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="bg-yellow-500 p-3 rounded-xl">
                <Building2 className="w-8 h-8 text-gray-900" />
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold text-yellow-500">ALHARIRI</h2>
                <p className="text-sm text-gray-400">REAL ESTATE</p>
              </div>
            </div>

            <div className="bg-yellow-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-yellow-500/30">
              <Lock className="w-10 h-10 text-yellow-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">دخول المدير</h1>
            <p className="text-gray-400">أدخل كلمة المرور للوصول إلى لوحة التحكم</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-medium mb-2">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 border-2 border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="أدخل كلمة المرور"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {loginError && (
                <div className="flex items-center gap-2 mt-3 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{loginError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              دخول
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ============ لوحة التحكم ============
  return (
    <div className="min-h-screen bg-gray-100">
      {/* الهيدر */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500 p-2 rounded-lg">
                <Building2 className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">لوحة تحكم المدير</h1>
                <p className="text-sm text-gray-500">إدارة العقارات</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">معاينة الموقع</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">تسجيل خروج</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* رسالة النجاح */}
        {successMessage && (
          <div className="mb-6 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* قسم إضافة عقار جديد */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Plus className="w-6 h-6 text-green-600" />
            إضافة عقار جديد
          </h2>

          <form onSubmit={handleAddProperty}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {/* اسم العقار */}
              <div className="lg:col-span-2">
                <label className="block text-gray-700 text-sm font-medium mb-2">اسم العقار *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="مثال: شقة فاخرة في حي الروضة"
                  required
                />
              </div>

              {/* رقم الجوال */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">رقم جوال المعلن</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="05xxxxxxxx"
                  dir="ltr"
                />
              </div>

              {/* المدينة */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">المدينة *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="مثال: جدة"
                  required
                />
              </div>

              {/* الحي */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">الحي</label>
                <input
                  type="text"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="مثال: حي الروضة"
                />
              </div>

              {/* السعر */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">السعر (ريال) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="0"
                  required
                />
              </div>

              {/* نوع العقار */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">نوع العقار</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500 transition-colors"
                >
                  {propertyTypes.map(pt => (
                    <option key={pt.value} value={pt.value}>{pt.label}</option>
                  ))}
                </select>
              </div>

              {/* الغرض */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">الغرض</label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500 transition-colors"
                >
                  {purposes.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              {/* التصنيف */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">التصنيف</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500 transition-colors"
                >
                  {categories.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* عدد الغرف */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">عدد الغرف</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="0"
                />
              </div>

              {/* عدد الحمامات */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">عدد الحمامات</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="0"
                />
              </div>

              {/* المساحة */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">المساحة (م²)</label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="0"
                />
              </div>

              {/* رفع الصورة */}
              <div className="lg:col-span-2">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  صورة العقار
                  {formData.image && (
                    <span className="mr-2 text-green-600 text-xs font-normal flex items-center gap-1 inline-flex">
                      <CheckCircle className="w-3.5 h-3.5" />
                      تم رفع الصورة
                    </span>
                  )}
                </label>
                <ImageUploader
                  currentUrl={formData.image}
                  onUpload={handleImageUploaded}
                  onUploadingChange={setIsImageUploading}
                />
              </div>
            </div>

            {/* الوصف */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">الوصف</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                placeholder="وصف تفصيلي للعقار..."
              ></textarea>
            </div>

            {/* زر الإضافة */}
            <button
              type="submit"
              disabled={isImageUploading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2"
            >
              {isImageUploading ? (
                <><Loader2 className="w-5 h-5 animate-spin" />جاري رفع الصورة...</>
              ) : (
                <><Plus className="w-5 h-5" />إضافة العقار</>
              )}
            </button>
          </form>
        </div>

        {/* قسم العقارات المنشورة */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-yellow-600" />
            العقارات المنشورة ({properties.length})
          </h2>

          {properties.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-right py-3 px-4 text-gray-600 font-medium">العقار</th>
                    <th className="text-right py-3 px-4 text-gray-600 font-medium">الموقع</th>
                    <th className="text-right py-3 px-4 text-gray-600 font-medium">السعر</th>
                    <th className="text-right py-3 px-4 text-gray-600 font-medium">النوع</th>
                    <th className="text-right py-3 px-4 text-gray-600 font-medium">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map(property => (
                    <tr key={property.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={property.image || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=200&fit=crop'}
                            alt={property.title}
                            className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=200&fit=crop'
                            }}
                          />
                          <div className="min-w-0">
                            <div className="font-medium text-gray-800">{property.title}</div>
                            {property.description && (
                              <div className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">
                                {property.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {property.location}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-green-600 font-bold">
                        {formatPrice(property.price, property.type)}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          property.type === 'rent'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {property.type === 'rent' ? 'للإيجار' : 'للبيع'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(property)}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-lg transition-colors"
                            title="تعديل"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(property.id)}
                            className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition-colors"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">لا توجد عقارات</h3>
              <p className="text-gray-400">أضف عقاراً جديداً للبدء</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal التعديل */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">تعديل العقار</h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* اسم العقار */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-2">اسم العقار *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500"
                    required
                  />
                </div>

                {/* المدينة */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">المدينة *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500"
                    required
                  />
                </div>

                {/* الحي */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">الحي</label>
                  <input
                    type="text"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500"
                  />
                </div>

                {/* السعر */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">السعر *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500"
                    required
                  />
                </div>

                {/* نوع العقار */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">نوع العقار</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500"
                  >
                    {propertyTypes.map(pt => (
                      <option key={pt.value} value={pt.value}>{pt.label}</option>
                    ))}
                  </select>
                </div>

                {/* الغرض */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">الغرض</label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500"
                  >
                    {purposes.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>

                {/* التصنيف */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">التصنيف</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500"
                  >
                    {categories.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                {/* عدد الغرف */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">عدد الغرف</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500"
                  />
                </div>

                {/* عدد الحمامات */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">عدد الحمامات</label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500"
                  />
                </div>

                {/* المساحة */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">المساحة (م²)</label>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500"
                  />
                </div>

                {/* رقم الجوال */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">رقم الجوال</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500"
                    dir="ltr"
                  />
                </div>

                {/* رفع الصورة - في نموذج التعديل */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    صورة العقار
                    {formData.image && (
                      <span className="mr-2 text-green-600 text-xs font-normal flex items-center gap-1 inline-flex">
                        <CheckCircle className="w-3.5 h-3.5" />
                        تم رفع الصورة
                      </span>
                    )}
                  </label>
                  <ImageUploader
                    currentUrl={formData.image}
                    onUpload={handleImageUploaded}
                    onUploadingChange={setIsImageUploading}
                  />
                </div>

                {/* الوصف */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-2">الوصف</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-yellow-500 resize-none"
                  ></textarea>
                </div>
              </div>

              {/* أزرار التعديل */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isImageUploading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {isImageUploading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" />جاري رفع الصورة...</>
                  ) : (
                    <><Save className="w-5 h-5" />حفظ التعديلات</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage
