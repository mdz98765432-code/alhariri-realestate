import { FileText, Download, Calendar, User, MapPin, Home, Building } from 'lucide-react'

function ContractsPage({ contracts }) {
  const downloadContract = (contract) => {
    const paymentMethodLabels = {
      monthly: 'شهري',
      quarterly: 'ربع سنوي',
      'semi-annual': 'نصف سنوي',
      annual: 'سنوي'
    }

    const contractText = `
═══════════════════════════════════════════════════════════════
                      عقد إيجار ${contract.contractType === 'residential' ? 'سكني' : 'تجاري'}
═══════════════════════════════════════════════════════════════

رقم العقد: ${contract.id}
تاريخ الإنشاء: ${contract.createdAt}

═══════════════════════════════════════════════════════════════
                          بيانات العقار
═══════════════════════════════════════════════════════════════

العقار: ${contract.propertyTitle}
الموقع: ${contract.propertyLocation}

═══════════════════════════════════════════════════════════════
                          الطرف الأول (المؤجر)
═══════════════════════════════════════════════════════════════

الاسم: ${contract.landlordName}
رقم الهوية: ${contract.landlordId}
رقم الجوال: ${contract.landlordPhone}

═══════════════════════════════════════════════════════════════
                          الطرف الثاني (المستأجر)
═══════════════════════════════════════════════════════════════

الاسم: ${contract.tenantName}
رقم الهوية: ${contract.tenantId}
رقم الجوال: ${contract.tenantPhone}
${contract.contractType === 'commercial' ? `
رقم السجل التجاري: ${contract.commercialRegister}
نوع النشاط: ${contract.businessActivity}
` : ''}
═══════════════════════════════════════════════════════════════
                          تفاصيل العقد
═══════════════════════════════════════════════════════════════

تاريخ البداية: ${contract.startDate}
تاريخ النهاية: ${contract.endDate}
الإيجار الشهري: ${contract.monthlyRent.toLocaleString('ar-SA')} ريال
مبلغ التأمين: ${contract.deposit.toLocaleString('ar-SA')} ريال
طريقة الدفع: ${paymentMethodLabels[contract.paymentMethod]}

═══════════════════════════════════════════════════════════════
                          الشروط والأحكام
═══════════════════════════════════════════════════════════════

${contract.terms}

═══════════════════════════════════════════════════════════════
                          التوقيعات
═══════════════════════════════════════════════════════════════

توقيع المؤجر: _______________________     التاريخ: ____________

توقيع المستأجر: _______________________   التاريخ: ____________

═══════════════════════════════════════════════════════════════
           تم إنشاء هذا العقد عبر منصة الوساطة العقارية
═══════════════════════════════════════════════════════════════
`

    const blob = new Blob([contractText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `عقد_إيجار_${contract.id}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-SA')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gold-400 mb-2">العقود المنشأة</h1>
        <p className="text-gray-400">جميع عقود الإيجار التي تم إنشاؤها</p>
      </div>

      {/* Contracts Count */}
      <div className="mb-6">
        <span className="text-gray-400">
          عدد العقود: <span className="font-bold text-gold-400">{contracts.length}</span> عقد
        </span>
      </div>

      {/* Contracts List */}
      {contracts.length > 0 ? (
        <div className="space-y-6">
          {contracts.map((contract) => (
            <div
              key={contract.id}
              className="bg-primary-800 rounded-2xl shadow-lg overflow-hidden border border-gold-500/20"
            >
              {/* Contract Header */}
              <div className="p-4 bg-gold-500 text-black">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {contract.contractType === 'residential' ? (
                      <Home className="w-6 h-6" />
                    ) : (
                      <Building className="w-6 h-6" />
                    )}
                    <div>
                      <h3 className="font-bold">
                        عقد إيجار {contract.contractType === 'residential' ? 'سكني' : 'تجاري'}
                      </h3>
                      <p className="text-sm opacity-80">رقم العقد: {contract.id}</p>
                    </div>
                  </div>
                  <div className="text-sm opacity-80">
                    {contract.createdAt}
                  </div>
                </div>
              </div>

              {/* Contract Body */}
              <div className="p-6">
                {/* Property Info */}
                <div className="mb-6 pb-6 border-b border-gold-500/20">
                  <h4 className="text-sm font-medium text-gold-400 mb-2">بيانات العقار</h4>
                  <p className="font-bold text-white mb-1">{contract.propertyTitle}</p>
                  <p className="text-gray-400 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gold-500" />
                    {contract.propertyLocation}
                  </p>
                </div>

                {/* Parties Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-gold-500/20">
                  <div>
                    <h4 className="text-sm font-medium text-gold-400 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-gold-500" />
                      المؤجر
                    </h4>
                    <p className="font-bold text-white">{contract.landlordName}</p>
                    <p className="text-sm text-gray-400">الهوية: {contract.landlordId}</p>
                    <p className="text-sm text-gray-400">الجوال: {contract.landlordPhone}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gold-400 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-gold-500" />
                      المستأجر
                    </h4>
                    <p className="font-bold text-white">{contract.tenantName}</p>
                    <p className="text-sm text-gray-400">الهوية: {contract.tenantId}</p>
                    <p className="text-sm text-gray-400">الجوال: {contract.tenantPhone}</p>
                    {contract.contractType === 'commercial' && (
                      <>
                        <p className="text-sm text-gray-400">السجل التجاري: {contract.commercialRegister}</p>
                        <p className="text-sm text-gray-400">النشاط: {contract.businessActivity}</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Contract Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-primary-700 rounded-xl p-4 text-center border border-gold-500/20">
                    <Calendar className="w-5 h-5 text-gold-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">تاريخ البداية</p>
                    <p className="font-bold text-white">{formatDate(contract.startDate)}</p>
                  </div>
                  <div className="bg-primary-700 rounded-xl p-4 text-center border border-gold-500/20">
                    <Calendar className="w-5 h-5 text-gold-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">تاريخ النهاية</p>
                    <p className="font-bold text-white">{formatDate(contract.endDate)}</p>
                  </div>
                  <div className="bg-primary-700 rounded-xl p-4 text-center border border-gold-500/20">
                    <p className="text-xs text-gray-400">الإيجار الشهري</p>
                    <p className="font-bold text-gold-400">{contract.monthlyRent.toLocaleString('ar-SA')} ريال</p>
                  </div>
                  <div className="bg-primary-700 rounded-xl p-4 text-center border border-gold-500/20">
                    <p className="text-xs text-gray-400">التأمين</p>
                    <p className="font-bold text-gold-400">{contract.deposit.toLocaleString('ar-SA')} ريال</p>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => downloadContract(contract)}
                  className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-black py-3 rounded-xl font-bold transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>تحميل العقد</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-primary-800 rounded-2xl border border-gold-500/20">
          <FileText className="w-20 h-20 text-gold-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">لا توجد عقود</h3>
          <p className="text-gray-400">لم يتم إنشاء أي عقود إيجار بعد</p>
        </div>
      )}
    </div>
  )
}

export default ContractsPage
