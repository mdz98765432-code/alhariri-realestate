import {
  Phone,
  Mail,
  MapPin,
  FileCheck,
  CreditCard,
  Smartphone,
  Banknote,
  Home,
  Building2,
  FileText,
  PlusCircle
} from 'lucide-react'

// شعار الهيئة العامة للعقار
const RegaLogo = ({ className }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none">
    {/* الشكل الهندسي - ماسة */}
    <path
      d="M20 2L38 20L20 38L2 20L20 2Z"
      fill="url(#regaGradient)"
      stroke="#0d4a6f"
      strokeWidth="1"
    />
    {/* الخطوط الداخلية */}
    <path
      d="M20 8L32 20L20 32L8 20L20 8Z"
      fill="none"
      stroke="#2dd4bf"
      strokeWidth="1.5"
    />
    <path
      d="M20 14L26 20L20 26L14 20L20 14Z"
      fill="#2dd4bf"
    />
    <defs>
      <linearGradient id="regaGradient" x1="2" y1="2" x2="38" y2="38">
        <stop offset="0%" stopColor="#0d4a6f" />
        <stop offset="100%" stopColor="#1e6a8a" />
      </linearGradient>
    </defs>
  </svg>
)

function Footer({ onShowCertificate }) {
  return (
    <footer className="bg-primary-950 text-white mt-auto border-t border-gold-500/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* عن المنصة */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gold-500 p-2 rounded-lg">
                <Building2 className="w-6 h-6 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight text-gold-400">ALHARIRI REAL ESTATE</span>
                <span className="text-sm text-gray-400">الحريري للعقارات</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              منصة متكاملة للوساطة العقارية تقدم خدمات احترافية في مجال العقارات
              السكنية والتجارية، مع عقود إلكترونية موثقة ووسائل دفع متعددة.
            </p>

            {/* أزرار الشهادات */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onShowCertificate('marketing')}
                className="flex items-center gap-2 bg-primary-800 hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors border border-gold-500/20"
              >
                <RegaLogo className="w-6 h-6" />
                <span className="text-sm text-gold-400">الهيئة العامة للعقار</span>
              </button>
              <button
                onClick={() => onShowCertificate('freelance')}
                className="flex items-center gap-2 bg-primary-800 hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors border border-gold-500/20"
              >
                <FileCheck className="w-5 h-5 text-success-500" />
                <span className="text-sm text-gold-400">وثيقة العمل الحر</span>
              </button>
            </div>
          </div>

          {/* روابط سريعة */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold-400">روابط سريعة</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors">
                  <Home className="w-4 h-4" />
                  <span>الصفحة الرئيسية</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors">
                  <Building2 className="w-4 h-4" />
                  <span>العقارات</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors">
                  <FileText className="w-4 h-4" />
                  <span>العقود</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors">
                  <PlusCircle className="w-4 h-4" />
                  <span>إضافة عقار</span>
                </a>
              </li>
            </ul>
          </div>

          {/* معلومات التواصل */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold-400">تواصل معنا</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-gold-500" />
                <span dir="ltr">+966 55 055 2045</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-gold-500" />
                <span>haririrayan031@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-gold-500" />
                <span>جدة، المملكة العربية السعودية</span>
              </li>
            </ul>

            {/* وسائل الدفع */}
            <h4 className="text-sm font-medium mb-3 text-gold-400">وسائل الدفع المعتمدة</h4>
            <div className="flex flex-wrap gap-2">
              <div className="bg-primary-800 border border-gold-500/20 px-3 py-2 rounded-lg flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gold-400" />
                <span className="text-xs text-gray-300">مدى</span>
              </div>
              <div className="bg-primary-800 border border-gold-500/20 px-3 py-2 rounded-lg flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gold-400" />
                <span className="text-xs text-gray-300">فيزا</span>
              </div>
              <div className="bg-primary-800 border border-gold-500/20 px-3 py-2 rounded-lg flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gold-400" />
                <span className="text-xs text-gray-300">ماستركارد</span>
              </div>
              <div className="bg-primary-800 border border-gold-500/20 px-3 py-2 rounded-lg flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-gold-400" />
                <span className="text-xs text-gray-300">Apple Pay</span>
              </div>
              <div className="bg-primary-800 border border-gold-500/20 px-3 py-2 rounded-lg flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-gold-400" />
                <span className="text-xs text-gray-300">STC Pay</span>
              </div>
              <div className="bg-primary-800 border border-gold-500/20 px-3 py-2 rounded-lg flex items-center gap-2">
                <Banknote className="w-4 h-4 text-gold-400" />
                <span className="text-xs text-gray-300">تحويل</span>
              </div>
            </div>
          </div>
        </div>

        {/* حقوق النشر */}
        <div className="border-t border-gold-500/20 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            جميع الحقوق محفوظة © {new Date().getFullYear()} <span className="text-gold-400">ALHARIRI REAL ESTATE</span> | الحريري للعقارات
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
