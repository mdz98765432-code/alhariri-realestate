import { Building2, FileText, Megaphone, ArrowLeft } from 'lucide-react'
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
              ALHARIRI REAL ESTATE
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              الحريري للعقارات
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

      {/* Latest Properties Section */}
      <section className="py-16 bg-primary-800">
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
