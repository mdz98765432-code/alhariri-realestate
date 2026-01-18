import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Save, X, Building, Home, User, Phone, CreditCard, Calendar } from 'lucide-react'

function CreateContractPage({ properties, selectedProperty, onAdd }) {
  const navigate = useNavigate()
  const [contractType, setContractType] = useState('residential')
  const [propertyId, setPropertyId] = useState('')
  const [formData, setFormData] = useState({
    // بيانات المؤجر
    landlordName: '',
    landlordId: '',
    landlordPhone: '',
    // بيانات المستأجر
    tenantName: '',
    tenantId: '',
    tenantPhone: '',
    // بيانات العقد
    startDate: '',
    endDate: '',
    monthlyRent: '',
    deposit: '',
    paymentMethod: 'monthly',
    // للعقود التجارية
    commercialRegister: '',
    businessActivity: '',
    // شروط وأحكام
    terms: ''
  })

  const [errors, setErrors] = useState({})

  // تحديد العقار المختار
  useEffect(() => {
    if (selectedProperty) {
      setPropertyId(selectedProperty.id.toString())
      setFormData((prev) => ({
        ...prev,
        monthlyRent: selectedProperty.price.toString()
      }))
    }
  }, [selectedProperty])

  // العقارات المتاحة للإيجار فقط
  const rentProperties = properties.filter((p) => p.type === 'rent')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handlePropertyChange = (e) => {
    const id = e.target.value
    setPropertyId(id)
    const property = properties.find((p) => p.id.toString() === id)
    if (property) {
      setFormData((prev) => ({
        ...prev,
        monthlyRent: property.price.toString()
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!propertyId) newErrors.propertyId = 'يرجى اختيار العقار'
    if (!formData.landlordName.trim()) newErrors.landlordName = 'اسم المؤجر مطلوب'
    if (!formData.landlordId.trim()) newErrors.landlordId = 'رقم هوية المؤجر مطلوب'
    if (!formData.landlordPhone.trim()) newErrors.landlordPhone = 'رقم جوال المؤجر مطلوب'
    if (!formData.tenantName.trim()) newErrors.tenantName = 'اسم المستأجر مطلوب'
    if (!formData.tenantId.trim()) newErrors.tenantId = 'رقم هوية المستأجر مطلوب'
    if (!formData.tenantPhone.trim()) newErrors.tenantPhone = 'رقم جوال المستأجر مطلوب'
    if (!formData.startDate) newErrors.startDate = 'تاريخ البداية مطلوب'
    if (!formData.endDate) newErrors.endDate = 'تاريخ النهاية مطلوب'
    if (!formData.monthlyRent || formData.monthlyRent <= 0) newErrors.monthlyRent = 'الإيجار الشهري مطلوب'
    if (!formData.deposit || formData.deposit < 0) newErrors.deposit = 'مبلغ التأمين مطلوب'

    if (contractType === 'commercial') {
      if (!formData.commercialRegister.trim()) newErrors.commercialRegister = 'رقم السجل التجاري مطلوب'
      if (!formData.businessActivity.trim()) newErrors.businessActivity = 'نوع النشاط مطلوب'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      const property = properties.find((p) => p.id.toString() === propertyId)
      const contract = {
        ...formData,
        propertyId: parseInt(propertyId),
        propertyTitle: property?.title || '',
        propertyLocation: property?.location || '',
        contractType,
        monthlyRent: parseFloat(formData.monthlyRent),
        deposit: parseFloat(formData.deposit)
      }
      onAdd(contract)
    }
  }

  const paymentMethods = [
    { value: 'monthly', label: 'شهري' },
    { value: 'quarterly', label: 'ربع سنوي (كل 3 أشهر)' },
    { value: 'semi-annual', label: 'نصف سنوي (كل 6 أشهر)' },
    { value: 'annual', label: 'سنوي' }
  ]

  const defaultTermsResidential = `1. يلتزم المستأجر بدفع الإيجار في موعده المحدد.
2. لا يحق للمستأجر التأجير من الباطن دون موافقة المؤجر.
3. يلتزم المستأجر بالمحافظة على العقار واستخدامه للسكن فقط.
4. يتحمل المستأجر فواتير الماء والكهرباء والخدمات.
5. يلتزم المستأجر بإخلاء العقار عند انتهاء العقد ما لم يتم التجديد.`

  const defaultTermsCommercial = `1. يلتزم المستأجر بدفع الإيجار في موعده المحدد.
2. لا يحق للمستأجر التأجير من الباطن أو التنازل عن العقد دون موافقة كتابية.
3. يلتزم المستأجر باستخدام العقار للنشاط التجاري المحدد فقط.
4. يتحمل المستأجر جميع التراخيص والرسوم الحكومية المتعلقة بنشاطه.
5. يلتزم المستأجر بالمحافظة على العقار وإجراء الصيانة الدورية.
6. في حال الإخلال بأي من الشروط، يحق للمؤجر فسخ العقد.`

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      terms: contractType === 'residential' ? defaultTermsResidential : defaultTermsCommercial
    }))
  }, [contractType])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gold-400 mb-2">إنشاء عقد إيجار</h1>
          <p className="text-gray-400">أدخل بيانات العقد لإنشاء عقد إيجار جديد</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* نوع العقد واختيار العقار */}
          <div className="bg-primary-800 rounded-2xl shadow-lg p-6 border border-gold-500/20">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-gold-500" />
              نوع العقد والعقار
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* نوع العقد */}
              <div>
                <label className="form-label">نوع العقد *</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                    <input
                      type="radio"
                      name="contractType"
                      value="residential"
                      checked={contractType === 'residential'}
                      onChange={(e) => setContractType(e.target.value)}
                      className="w-5 h-5 text-gold-500"
                    />
                    <Home className="w-5 h-5 text-gold-500" />
                    <span>سكني</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                    <input
                      type="radio"
                      name="contractType"
                      value="commercial"
                      checked={contractType === 'commercial'}
                      onChange={(e) => setContractType(e.target.value)}
                      className="w-5 h-5 text-gold-500"
                    />
                    <Building className="w-5 h-5 text-gold-500" />
                    <span>تجاري</span>
                  </label>
                </div>
              </div>

              {/* اختيار العقار */}
              <div>
                <label className="form-label">العقار *</label>
                <select
                  value={propertyId}
                  onChange={handlePropertyChange}
                  className={`form-select ${errors.propertyId ? 'border-red-500' : ''}`}
                >
                  <option value="">اختر العقار</option>
                  {rentProperties.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.title} - {property.location}
                    </option>
                  ))}
                </select>
                {errors.propertyId && <p className="text-red-500 text-sm mt-1">{errors.propertyId}</p>}
              </div>
            </div>
          </div>

          {/* بيانات المؤجر */}
          <div className="bg-primary-800 rounded-2xl shadow-lg p-6 border border-gold-500/20">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-gold-500" />
              بيانات المؤجر
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="form-label">الاسم الكامل *</label>
                <input
                  type="text"
                  name="landlordName"
                  value={formData.landlordName}
                  onChange={handleChange}
                  className={`form-input ${errors.landlordName ? 'border-red-500' : ''}`}
                  placeholder="اسم المؤجر"
                />
                {errors.landlordName && <p className="text-red-500 text-sm mt-1">{errors.landlordName}</p>}
              </div>
              <div>
                <label className="form-label">رقم الهوية *</label>
                <input
                  type="text"
                  name="landlordId"
                  value={formData.landlordId}
                  onChange={handleChange}
                  className={`form-input ${errors.landlordId ? 'border-red-500' : ''}`}
                  placeholder="رقم الهوية الوطنية"
                  dir="ltr"
                />
                {errors.landlordId && <p className="text-red-500 text-sm mt-1">{errors.landlordId}</p>}
              </div>
              <div>
                <label className="form-label">رقم الجوال *</label>
                <input
                  type="tel"
                  name="landlordPhone"
                  value={formData.landlordPhone}
                  onChange={handleChange}
                  className={`form-input ${errors.landlordPhone ? 'border-red-500' : ''}`}
                  placeholder="05xxxxxxxx"
                  dir="ltr"
                />
                {errors.landlordPhone && <p className="text-red-500 text-sm mt-1">{errors.landlordPhone}</p>}
              </div>
            </div>
          </div>

          {/* بيانات المستأجر */}
          <div className="bg-primary-800 rounded-2xl shadow-lg p-6 border border-gold-500/20">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-gold-500" />
              بيانات المستأجر
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="form-label">الاسم الكامل *</label>
                <input
                  type="text"
                  name="tenantName"
                  value={formData.tenantName}
                  onChange={handleChange}
                  className={`form-input ${errors.tenantName ? 'border-red-500' : ''}`}
                  placeholder="اسم المستأجر"
                />
                {errors.tenantName && <p className="text-red-500 text-sm mt-1">{errors.tenantName}</p>}
              </div>
              <div>
                <label className="form-label">رقم الهوية *</label>
                <input
                  type="text"
                  name="tenantId"
                  value={formData.tenantId}
                  onChange={handleChange}
                  className={`form-input ${errors.tenantId ? 'border-red-500' : ''}`}
                  placeholder="رقم الهوية الوطنية"
                  dir="ltr"
                />
                {errors.tenantId && <p className="text-red-500 text-sm mt-1">{errors.tenantId}</p>}
              </div>
              <div>
                <label className="form-label">رقم الجوال *</label>
                <input
                  type="tel"
                  name="tenantPhone"
                  value={formData.tenantPhone}
                  onChange={handleChange}
                  className={`form-input ${errors.tenantPhone ? 'border-red-500' : ''}`}
                  placeholder="05xxxxxxxx"
                  dir="ltr"
                />
                {errors.tenantPhone && <p className="text-red-500 text-sm mt-1">{errors.tenantPhone}</p>}
              </div>
            </div>

            {/* حقول إضافية للعقود التجارية */}
            {contractType === 'commercial' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gold-500/20">
                <div>
                  <label className="form-label">رقم السجل التجاري *</label>
                  <input
                    type="text"
                    name="commercialRegister"
                    value={formData.commercialRegister}
                    onChange={handleChange}
                    className={`form-input ${errors.commercialRegister ? 'border-red-500' : ''}`}
                    placeholder="رقم السجل التجاري"
                    dir="ltr"
                  />
                  {errors.commercialRegister && <p className="text-red-500 text-sm mt-1">{errors.commercialRegister}</p>}
                </div>
                <div>
                  <label className="form-label">نوع النشاط *</label>
                  <input
                    type="text"
                    name="businessActivity"
                    value={formData.businessActivity}
                    onChange={handleChange}
                    className={`form-input ${errors.businessActivity ? 'border-red-500' : ''}`}
                    placeholder="مثال: تجارة التجزئة"
                  />
                  {errors.businessActivity && <p className="text-red-500 text-sm mt-1">{errors.businessActivity}</p>}
                </div>
              </div>
            )}
          </div>

          {/* تفاصيل العقد */}
          <div className="bg-primary-800 rounded-2xl shadow-lg p-6 border border-gold-500/20">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-gold-500" />
              تفاصيل العقد
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="form-label">تاريخ البداية *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`form-input ${errors.startDate ? 'border-red-500' : ''}`}
                />
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
              </div>
              <div>
                <label className="form-label">تاريخ النهاية *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={`form-input ${errors.endDate ? 'border-red-500' : ''}`}
                />
                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="form-label">الإيجار الشهري (ريال) *</label>
                <input
                  type="number"
                  name="monthlyRent"
                  value={formData.monthlyRent}
                  onChange={handleChange}
                  className={`form-input ${errors.monthlyRent ? 'border-red-500' : ''}`}
                  placeholder="0"
                  min="0"
                />
                {errors.monthlyRent && <p className="text-red-500 text-sm mt-1">{errors.monthlyRent}</p>}
              </div>
              <div>
                <label className="form-label">مبلغ التأمين (ريال) *</label>
                <input
                  type="number"
                  name="deposit"
                  value={formData.deposit}
                  onChange={handleChange}
                  className={`form-input ${errors.deposit ? 'border-red-500' : ''}`}
                  placeholder="0"
                  min="0"
                />
                {errors.deposit && <p className="text-red-500 text-sm mt-1">{errors.deposit}</p>}
              </div>
              <div>
                <label className="form-label">طريقة الدفع *</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="form-select"
                >
                  {paymentMethods.map((method) => (
                    <option key={method.value} value={method.value}>
                      {method.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* الشروط والأحكام */}
          <div className="bg-primary-800 rounded-2xl shadow-lg p-6 border border-gold-500/20">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-gold-500" />
              الشروط والأحكام
            </h2>

            <textarea
              name="terms"
              value={formData.terms}
              onChange={handleChange}
              rows="8"
              className="form-input resize-none"
              placeholder="أدخل شروط وأحكام العقد..."
            />
          </div>

          {/* الأزرار */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-black py-4 px-6 rounded-xl font-bold transition-colors"
            >
              <Save className="w-5 h-5" />
              <span>إنشاء العقد</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/properties')}
              className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-gold-400 py-4 px-6 rounded-xl font-medium transition-colors border border-gold-500/30"
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

export default CreateContractPage
