import { X, FileCheck, Calendar, Hash, Building2, Briefcase, User, CreditCard, Tag } from 'lucide-react'

// شعار الهيئة العامة للعقار
const RegaLogo = ({ className }) => (
  <svg viewBox="0 0 60 60" className={className} fill="none">
    <path
      d="M30 3L57 30L30 57L3 30L30 3Z"
      fill="url(#regaGrad)"
      stroke="#0d4a6f"
      strokeWidth="2"
    />
    <path
      d="M30 12L48 30L30 48L12 30L30 12Z"
      fill="none"
      stroke="#2dd4bf"
      strokeWidth="1.5"
    />
    <path
      d="M30 21L39 30L30 39L21 30L30 21Z"
      fill="#2dd4bf"
    />
    <defs>
      <linearGradient id="regaGrad" x1="3" y1="3" x2="57" y2="57">
        <stop offset="0%" stopColor="#0d4a6f" />
        <stop offset="100%" stopColor="#1e6a8a" />
      </linearGradient>
    </defs>
  </svg>
)

function CertificateModal({ type, onClose }) {
  const certificates = {
    marketing: {
      title: 'رخصة فال لممارسة النشاط العقاري',
      authority: 'الهيئة العامة للعقار',
      authorityEn: 'REAL ESTATE GENERAL AUTHORITY',
      isRega: true,
      color: 'rega',
      pdfUrl: '/fal-license.pdf',
      details: [
        { label: 'رقم الرخصة', value: '1100278011', icon: Hash },
        { label: 'اسم المرخص', value: 'ريان ضيف الله محمد الزهراني', icon: User },
        { label: 'النشاط العقاري', value: 'فال للوساطة والتسويق', icon: Briefcase },
        { label: 'تاريخ الإصدار', value: '22/01/2025', icon: Calendar },
        { label: 'تاريخ الانتهاء', value: '22/01/2027', icon: Calendar },
      ]
    },
    freelance: {
      title: 'وثيقة العمل الحر',
      authority: 'وزارة الموارد البشرية والتنمية الاجتماعية',
      authorityEn: '',
      isRega: false,
      icon: FileCheck,
      color: 'green',
      details: [
        { label: 'اسم المستفيد', value: 'ريان ضيف الله محمد الزهراني', icon: User },
        { label: 'رقم الهوية', value: '1115463349', icon: CreditCard },
        { label: 'الفئة', value: 'الخدمات العقارية', icon: Tag },
        { label: 'المهنة', value: 'الوساطة العقارية', icon: Briefcase },
        { label: 'رمز الوثيقة', value: 'FL-486916566', icon: Hash },
        { label: 'تاريخ الإصدار', value: '20 يناير 2026', icon: Calendar },
        { label: 'تاريخ الانتهاء', value: '20 يناير 2027', icon: Calendar },
      ]
    }
  }

  const cert = certificates[type]
  if (!cert) return null

  const colorClasses = {
    rega: {
      bg: 'bg-gradient-to-br from-[#0d4a6f] to-[#1e6a8a]',
      light: 'bg-cyan-50',
      border: 'border-cyan-200',
      text: 'text-[#0d4a6f]'
    },
    green: {
      bg: 'bg-success-500',
      light: 'bg-success-50',
      border: 'border-green-200',
      text: 'text-success-600'
    }
  }

  const colors = colorClasses[cert.color]

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-primary-800 rounded-2xl w-full max-w-md overflow-hidden animate-slideUp max-h-[90vh] overflow-y-auto border border-gold-500/20">
        {/* Header */}
        <div className="bg-gold-500 text-black p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {cert.isRega ? (
                <div className="bg-black/10 p-2 rounded-xl">
                  <RegaLogo className="w-10 h-10" />
                </div>
              ) : (
                <div className="bg-black/10 p-3 rounded-xl">
                  <cert.icon className="w-8 h-8" />
                </div>
              )}
              <div>
                <h2 className="text-lg font-bold leading-tight">{cert.title}</h2>
                <p className="text-black/70 text-sm">{cert.authority}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-black/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Logo/Badge Area */}
          <div className="bg-primary-700 border border-gold-500/30 rounded-xl p-5 mb-6 text-center">
            {cert.isRega ? (
              <>
                <div className="flex justify-center items-center mb-4">
                  <RegaLogo className="w-16 h-16" />
                </div>
                <h3 className="text-lg font-bold text-gold-400">الهيئة العامة للعقار</h3>
                <p className="text-gray-400 text-xs font-medium tracking-wide mt-1">REAL ESTATE GENERAL AUTHORITY</p>
                <div className="mt-3 flex justify-center">
                  <span className="inline-block bg-gold-500 text-black text-xs px-3 py-1 rounded-full font-medium">
                    مرخص ومعتمد
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">وزارة الموارد البشرية</h3>
                <p className="text-gray-400 text-xs mt-1">والتنمية الاجتماعية</p>
                <div className="mt-3 flex justify-center">
                  <span className="inline-block bg-success-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    مستقل معتمد
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Certificate Details */}
          <div className="space-y-3">
            {cert.details.map((detail, index) => {
              const DetailIcon = detail.icon
              return (
                <div
                  key={index}
                  className="flex items-center justify-between bg-primary-700 rounded-xl p-3 border border-gold-500/20"
                >
                  <div className="flex items-center gap-3">
                    <DetailIcon className="w-5 h-5 text-gold-500" />
                    <span className="text-gray-400 text-sm">{detail.label}</span>
                  </div>
                  <span className="font-bold text-white text-sm" dir="ltr">{detail.value}</span>
                </div>
              )
            })}
          </div>

          {/* Document Note */}
          <div className="mt-4 bg-primary-700 border border-gold-500/30 rounded-xl p-3 text-center">
            <p className="text-sm text-gold-400">
              {cert.isRega
                ? 'هذه الوثيقة صادرة من النظام الإلكتروني ولا تحتاج إلى توقيع'
                : 'هذه الوثيقة تؤكد تسجيل الفرد كمستقل في نظام وزارة الموارد البشرية والتنمية الاجتماعية'
              }
            </p>
          </div>

          {/* Verification Note */}
          <div className="mt-4 bg-primary-700 border border-gold-500/30 rounded-xl p-3 text-center">
            <p className="text-sm text-gray-400">
              {cert.isRega
                ? 'يمكن التحقق من صحة هذه الرخصة عبر الموقع الرسمي للهيئة العامة للعقار'
                : 'يمكن التحقق من صحة هذه الوثيقة عبر منصة العمل الحر'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificateModal
