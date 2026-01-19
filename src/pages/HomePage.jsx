import { Building2, FileText, Megaphone, ArrowLeft, Shield, Award, CheckCircle, Calendar, Hash, User, Briefcase, FileCheck, CreditCard, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'

function HomePage({ properties, onPayment, onCreateContract }) {
  // عرض أحدث 4 عقارات
  const latestProperties = properties.slice(0, 4)

  const features = [
    {
      icon: Building2,
      title: 'عقارات متنوعة',
      description: 'نوفر لك مجموعة واسعة من العقارات السكنية والتجارية للإيجار والبيع',
      color: 'bg-blue-500'
    },
    {
      icon: FileText,
      title: 'عقود سكنية وتجارية',
      description: 'إنشاء عقود إيجار إلكترونية موثقة للعقارات السكنية والتجارية',
      color: 'bg-green-500'
    },
    {
      icon: Megaphone,
      title: 'التسويق العقاري',
      description: 'نقدم خدمات تسويق عقاري احترافية لعرض عقارك بأفضل طريقة',
      color: 'bg-teal-500'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-950 to-primary-900 text-white py-20 border-b border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gold-400">
              DAR ALHARIRI REAL ESTATE
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              دار الحريري العقارية
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              حلول متكاملة للعقارات السكنية والتجارية
              مع عقود إلكترونية موثقة وتسويق عقاري احترافي
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/properties"
                className="bg-gold-500 hover:bg-gold-600 text-black px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
              >
                <span>تصفح العقارات</span>
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link
                to="/add"
                className="bg-primary-700 hover:bg-primary-600 text-gold-400 px-8 py-3 rounded-xl font-bold transition-all border border-gold-500/30"
              >
                إضافة عقار جديد
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-primary-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gold-400 mb-12">
            مميزات المنصة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-primary-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center border border-gold-500/20 hover:border-gold-500/40"
                >
                  <div className="bg-gold-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Licenses & Certifications Section */}
      <section className="py-16 bg-primary-800 border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold-500/10 px-4 py-2 rounded-full mb-4">
              <Shield className="w-5 h-5 text-gold-400" />
              <span className="text-gold-400 font-medium">موثوق ومعتمد</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gold-400 mb-3">
              مرخص ومعتمد رسمياً
            </h2>
            <p className="text-gray-400 text-lg">
              نعمل وفق الأنظمة والتشريعات السعودية
            </p>
          </div>

          {/* License Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* Card 1 - FAL License */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d4a6f] via-[#1a5a7a] to-[#2dd4bf]/30 p-1 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#2dd4bf]/20 transition-all duration-300">
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-gold-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  مرخص
                </span>
              </div>
              <div className="bg-primary-900/95 backdrop-blur rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0d4a6f] to-[#2dd4bf] rounded-xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">رخصة فال العقارية</h3>
                    <p className="text-[#2dd4bf] text-sm">الهيئة العامة للعقار</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-primary-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-[#2dd4bf]" />
                      <span className="text-gray-400 text-sm">رقم الرخصة</span>
                    </div>
                    <span className="text-white font-bold" dir="ltr">1100278011</span>
                  </div>
                  <div className="flex items-center justify-between bg-primary-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#2dd4bf]" />
                      <span className="text-gray-400 text-sm">اسم المرخص</span>
                    </div>
                    <span className="text-white font-bold text-sm">ريان ضيف الله محمد الزهراني</span>
                  </div>
                  <div className="flex items-center justify-between bg-primary-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#2dd4bf]" />
                      <span className="text-gray-400 text-sm">النشاط</span>
                    </div>
                    <span className="text-white font-bold text-sm">فال للوساطة والتسويق</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-primary-800/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-[#2dd4bf]" />
                        <span className="text-gray-400 text-xs">تاريخ الإصدار</span>
                      </div>
                      <span className="text-white font-bold text-sm" dir="ltr">22/01/2025</span>
                    </div>
                    <div className="bg-primary-800/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-[#2dd4bf]" />
                        <span className="text-gray-400 text-xs">تاريخ الانتهاء</span>
                      </div>
                      <span className="text-white font-bold text-sm" dir="ltr">22/01/2027</span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-4 flex items-center justify-center gap-2 bg-success-500/20 text-success-400 py-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-bold">حالة الرخصة: سارية</span>
                </div>
              </div>
            </div>

            {/* Card 2 - Freelance Document */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-success-600 via-success-500 to-emerald-400/30 p-1 hover:-translate-y-2 hover:shadow-2xl hover:shadow-success-500/20 transition-all duration-300">
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-white text-success-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  معتمد
                </span>
              </div>
              <div className="bg-primary-900/95 backdrop-blur rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-success-600 to-emerald-400 rounded-xl flex items-center justify-center">
                    <FileCheck className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">وثيقة العمل الحر</h3>
                    <p className="text-success-400 text-sm">وزارة الموارد البشرية والتنمية الاجتماعية</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-primary-800/50 rounded-lg p-2.5">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-success-400" />
                      <span className="text-gray-400 text-sm">الاسم</span>
                    </div>
                    <span className="text-white font-bold text-sm">ريان ضيف الله محمد الزهراني</span>
                  </div>
                  <div className="flex items-center justify-between bg-primary-800/50 rounded-lg p-2.5">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-success-400" />
                      <span className="text-gray-400 text-sm">رقم الهوية</span>
                    </div>
                    <span className="text-white font-bold" dir="ltr">1115463349</span>
                  </div>
                  <div className="flex items-center justify-between bg-primary-800/50 rounded-lg p-2.5">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-success-400" />
                      <span className="text-gray-400 text-sm">رمز الوثيقة</span>
                    </div>
                    <span className="text-white font-bold" dir="ltr">FL-486916566</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center justify-between bg-primary-800/50 rounded-lg p-2.5">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-success-400" />
                        <span className="text-gray-400 text-sm">الفئة</span>
                      </div>
                      <span className="text-white font-bold text-xs">الخدمات العقارية</span>
                    </div>
                    <div className="flex items-center justify-between bg-primary-800/50 rounded-lg p-2.5">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-success-400" />
                        <span className="text-gray-400 text-sm">المهنة</span>
                      </div>
                      <span className="text-white font-bold text-xs">الوساطة العقارية</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-primary-800/50 rounded-lg p-2.5">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-success-400" />
                        <span className="text-gray-400 text-xs">تاريخ الإصدار</span>
                      </div>
                      <span className="text-white font-bold text-sm" dir="ltr">20/01/2026</span>
                    </div>
                    <div className="bg-primary-800/50 rounded-lg p-2.5">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-success-400" />
                        <span className="text-gray-400 text-xs">تاريخ الانتهاء</span>
                      </div>
                      <span className="text-white font-bold text-sm" dir="ltr">20/01/2027</span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-3 flex items-center justify-center gap-2 bg-success-500/20 text-success-400 py-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-bold">الحالة: سارية</span>
                </div>
              </div>
            </div>

          </div>

          {/* Trust Badge */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm">
              يمكن التحقق من صحة الرخص والوثائق عبر المواقع الرسمية للجهات المختصة
            </p>
          </div>
        </div>
      </section>

      {/* Latest Properties Section */}
      <section className="py-16 bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gold-400">أحدث العقارات</h2>
            <Link
              to="/properties"
              className="text-gold-500 hover:text-gold-400 font-medium flex items-center gap-2"
            >
              <span>عرض الكل</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>

          {latestProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onPayment={onPayment}
                  onCreateContract={onCreateContract}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  showActions={false}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-primary-700 rounded-2xl border border-gold-500/20">
              <Building2 className="w-16 h-16 text-gold-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">لا توجد عقارات حالياً</p>
              <Link
                to="/add"
                className="mt-4 text-gold-500 hover:text-gold-400 font-medium inline-block"
              >
                إضافة عقار جديد
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary-950 text-white py-16 border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">+500</div>
              <div className="text-gray-400">عقار متاح</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">+1000</div>
              <div className="text-gray-400">عميل راضٍ</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">+300</div>
              <div className="text-gray-400">عقد منجز</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">+10</div>
              <div className="text-gray-400">سنوات خبرة</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
