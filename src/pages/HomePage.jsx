import { Building2, FileText, Megaphone, ArrowLeft, Shield, CheckCircle, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import PropertyCard from '../components/PropertyCard'

// تكوين pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

function HomePage({ properties, onPayment, onCreateContract }) {
  // عرض أحدث 4 عقارات
  const latestProperties = properties.slice(0, 4)

  // حالة عرض الصورة المكبرة
  const [selectedImage, setSelectedImage] = useState(null)

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

      {/* Contract Documentation Banner */}
      <section className="py-0">
        <a
          href="https://wa.me/966550552045?text=السلام عليكم، أرغب في توثيق عقد إيجار"
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <div
            className="relative overflow-hidden transition-all duration-300 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F4C430 25%, #DAA520 50%, #B8860B 75%, #CD853F 100%)',
              minHeight: '280px'
            }}
          >
            {/* Decorative Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                {/* Text Content */}
                <div className="flex items-center gap-6 text-center md:text-right">
                  {/* Document Icon */}
                  <div className="hidden md:flex w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-center shrink-0">
                    <FileText className="w-10 h-10 text-white" />
                  </div>

                  <div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                      وثّق عقدك الآن
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 font-medium">
                      عقود إيجار إلكترونية موثقة ومعتمدة
                    </p>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <div className="shrink-0">
                  <div className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all duration-300 group-hover:scale-105 shadow-xl">
                    <svg className="w-7 h-7 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>تواصل معنا عبر واتساب</span>
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Shine Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
        </a>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

            {/* Card 1 - FAL License */}
            <div className="group">
              <div
                onClick={() => setSelectedImage({ src: '/fal-license.pdf', title: 'رخصة فال العقارية', isPdf: true })}
                className="cursor-pointer relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-primary-700 to-primary-800 p-3"
                style={{
                  boxShadow: '0 0 0 3px #D4AF37, 0 0 20px rgba(212, 175, 55, 0.3), 0 10px 40px rgba(0,0,0,0.3)'
                }}
              >
                {/* PDF Preview Image */}
                <div className="aspect-[3/4] bg-white rounded-xl overflow-hidden relative">
                  <Document file="/fal-license.pdf" loading={
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="animate-pulse text-gray-400">جاري التحميل...</div>
                    </div>
                  }>
                    <Page
                      pageNumber={1}
                      width={350}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </Document>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-gold-500 text-black px-4 py-2 rounded-full font-bold text-sm">
                      اضغط للعرض
                    </span>
                  </div>
                </div>
                {/* Badge */}
                <div className="absolute top-5 right-5">
                  <span className="bg-gold-500 text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                    <CheckCircle className="w-3.5 h-3.5" />
                    مرخص
                  </span>
                </div>
              </div>
              {/* License Name & Status */}
              <div className="mt-5 text-center">
                <h4 className="text-lg font-bold text-white mb-2">رخصة فال العقارية</h4>
                <div className="inline-flex items-center gap-2 bg-success-500/20 text-success-400 px-4 py-1.5 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>سارية</span>
                </div>
              </div>
            </div>

            {/* Card 2 - Freelance Certificate */}
            <div className="group">
              <div
                onClick={() => setSelectedImage({ src: '/freelance-certificate.pdf', title: 'وثيقة العمل الحر', isPdf: true })}
                className="cursor-pointer relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-primary-700 to-primary-800 p-3"
                style={{
                  boxShadow: '0 0 0 3px #D4AF37, 0 0 20px rgba(212, 175, 55, 0.3), 0 10px 40px rgba(0,0,0,0.3)'
                }}
              >
                {/* PDF Preview Image - Rotated 90deg and scaled to fill */}
                <div className="aspect-[3/4] bg-white rounded-xl overflow-hidden relative flex items-center justify-center">
                  <div style={{
                    transform: 'rotate(-90deg) scale(1.4)',
                    transformOrigin: 'center center',
                  }}>
                    <Document file="/freelance-certificate.pdf" loading={
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <div className="animate-pulse text-gray-400">جاري التحميل...</div>
                      </div>
                    }>
                      <Page
                        pageNumber={1}
                        height={400}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    </Document>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-gold-500 text-black px-4 py-2 rounded-full font-bold text-sm">
                      اضغط للعرض
                    </span>
                  </div>
                </div>
                {/* Badge */}
                <div className="absolute top-5 right-5">
                  <span className="bg-success-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                    <CheckCircle className="w-3.5 h-3.5" />
                    معتمد
                  </span>
                </div>
              </div>
              {/* License Name & Status */}
              <div className="mt-5 text-center">
                <h4 className="text-lg font-bold text-white mb-2">وثيقة العمل الحر</h4>
                <div className="inline-flex items-center gap-2 bg-success-500/20 text-success-400 px-4 py-1.5 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>سارية</span>
                </div>
              </div>
            </div>

          </div>

          {/* Trust Badge */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm">
              اضغط على البطاقة لعرض الرخصة كاملة • يمكن التحقق من صحة الرخص عبر المواقع الرسمية للجهات المختصة
            </p>
          </div>
        </div>
      </section>

      {/* PDF/Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="w-full max-w-5xl h-[90vh] animate-slideUp" onClick={e => e.stopPropagation()}>
            <p className="text-center text-white mb-4 text-xl font-bold">{selectedImage.title}</p>
            {selectedImage.isPdf ? (
              <iframe
                src={selectedImage.src}
                title={selectedImage.title}
                className="w-full h-[calc(100%-3rem)] rounded-lg bg-white"
              />
            ) : (
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl mx-auto"
              />
            )}
          </div>
        </div>
      )}

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
