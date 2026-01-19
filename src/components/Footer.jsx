import {
  Phone,
  Mail,
  MapPin,
  FileCheck,
  Award,
  Home,
  Building2,
  PlusCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'

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
                <span className="text-lg font-bold leading-tight text-gold-400">DAR ALHARIRI REAL ESTATE</span>
                <span className="text-sm text-gray-400">دار الحريري العقارية</span>
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
                <Award className="w-5 h-5 text-gold-400" />
                <span className="text-sm text-gold-400">رخصة فال</span>
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
                <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors">
                  <Home className="w-4 h-4" />
                  <span>الصفحة الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link to="/properties" className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors">
                  <Building2 className="w-4 h-4" />
                  <span>العقارات</span>
                </Link>
              </li>
              <li>
                <Link to="/add" className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors">
                  <PlusCircle className="w-4 h-4" />
                  <span>إضافة عقار</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* معلومات التواصل */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold-400">تواصل معنا</h3>
            <ul className="space-y-3">
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
          </div>
        </div>

        {/* حقوق النشر */}
        <div className="border-t border-gold-500/20 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            جميع الحقوق محفوظة © {new Date().getFullYear()} <span className="text-gold-400">DAR ALHARIRI REAL ESTATE</span> | دار الحريري العقارية
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
