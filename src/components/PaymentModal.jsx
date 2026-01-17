import { useState } from 'react'
import {
  X,
  CreditCard,
  Smartphone,
  Banknote,
  Building,
  CheckCircle,
  MapPin
} from 'lucide-react'

function PaymentModal({ property, onClose }) {
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const paymentMethods = [
    {
      id: 'mada',
      name: 'بطاقة مدى',
      icon: CreditCard,
      color: 'bg-blue-500',
      textColor: 'text-blue-500'
    },
    {
      id: 'visa',
      name: 'فيزا / ماستركارد',
      icon: CreditCard,
      color: 'bg-gradient-to-r from-blue-600 to-yellow-500',
      textColor: 'text-blue-600'
    },
    {
      id: 'apple',
      name: 'Apple Pay',
      icon: Smartphone,
      color: 'bg-gray-900',
      textColor: 'text-gray-900'
    },
    {
      id: 'stc',
      name: 'STC Pay',
      icon: Smartphone,
      color: 'bg-purple-600',
      textColor: 'text-purple-600'
    },
    {
      id: 'transfer',
      name: 'تحويل بنكي',
      icon: Building,
      color: 'bg-green-600',
      textColor: 'text-green-600'
    },
    {
      id: 'cash',
      name: 'الدفع النقدي',
      icon: Banknote,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    }
  ]

  const handlePayment = () => {
    if (selectedMethod) {
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
      }, 2000)
    }
  }

  const formatPrice = (price, type) => {
    const formatted = price.toLocaleString('ar-SA')
    if (type === 'rent') {
      return `${formatted} ريال/شهر`
    }
    return `${formatted} ريال`
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-primary-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slideUp border border-gold-500/20">
        {/* Header */}
        <div className="bg-gold-500 text-black p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">إتمام عملية الدفع</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-black/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Property Info */}
          <div className="bg-black/10 rounded-xl p-4">
            <h3 className="font-bold mb-2">{property.title}</h3>
            <div className="flex items-center gap-2 text-sm opacity-80 mb-2">
              <MapPin className="w-4 h-4" />
              <span>{property.location}</span>
            </div>
            <div className="text-2xl font-bold">
              {formatPrice(property.price, property.type)}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-6">
          {showSuccess ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">تمت العملية بنجاح!</h3>
              <p className="text-gray-400">شكراً لك، تم استلام طلب الدفع</p>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-bold text-gold-400 mb-4">اختر وسيلة الدفع</h3>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  const isSelected = selectedMethod === method.id
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-gold-500 bg-gold-500/10'
                          : 'border-primary-600 hover:border-gold-500/50 bg-primary-700'
                      }`}
                    >
                      <div className={`w-12 h-12 ${isSelected ? 'bg-gold-500' : 'bg-primary-600'} rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${isSelected ? 'text-black' : 'text-gold-400'}`} />
                      </div>
                      <span className={`text-sm font-medium ${isSelected ? 'text-gold-400' : 'text-gray-300'}`}>
                        {method.name}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Bank Transfer Info */}
              {selectedMethod === 'transfer' && (
                <div className="bg-primary-700 rounded-xl p-4 mb-6 border border-gold-500/20">
                  <h4 className="font-bold text-gold-400 mb-3">معلومات التحويل البنكي</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">البنك:</span>
                      <span className="font-medium text-white">البنك الأهلي السعودي</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">رقم الحساب:</span>
                      <span className="font-medium text-white" dir="ltr">SA1234567890123456789012</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">اسم المستفيد:</span>
                      <span className="font-medium text-white">مؤسسة الوساطة العقارية</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Cash Payment Info */}
              {selectedMethod === 'cash' && (
                <div className="bg-primary-700 rounded-xl p-4 mb-6 border border-gold-500/20">
                  <h4 className="font-bold text-gold-400 mb-3">الدفع النقدي</h4>
                  <p className="text-sm text-gray-300">
                    سيتم التواصل معك لتحديد موعد ومكان استلام المبلغ النقدي.
                    يرجى التأكد من توفر المبلغ كاملاً عند الاستلام.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handlePayment}
                disabled={!selectedMethod}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  selectedMethod
                    ? 'bg-gold-500 hover:bg-gold-600 text-black'
                    : 'bg-primary-600 cursor-not-allowed text-gray-500'
                }`}
              >
                {selectedMethod === 'transfer' || selectedMethod === 'cash'
                  ? 'تأكيد الطلب'
                  : 'إتمام الدفع'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
