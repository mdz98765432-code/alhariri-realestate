import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore'
import { db } from './firebase'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import PropertiesPage from './pages/PropertiesPage'
import AddPropertyPage from './pages/AddPropertyPage'
import CreateContractPage from './pages/CreateContractPage'
import ContractsPage from './pages/ContractsPage'
import AdminPage from './pages/AdminPage'
import PaymentModal from './components/PaymentModal'
import CertificateModal from './components/CertificateModal'

// بيانات تجريبية تُضاف تلقائياً عند فراغ قاعدة البيانات
const SEED_PROPERTIES = [
  {
    title: 'شقة فاخرة في حي الروضة',
    location: 'حي الروضة، الرياض',
    city: 'الرياض',
    neighborhood: 'حي الروضة',
    price: 3500,
    type: 'rent',
    purpose: 'rent',
    category: 'residential',
    propertyType: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    description: 'شقة فاخرة مجددة بالكامل في موقع متميز، قريبة من جميع الخدمات. تتميز بإطلالة رائعة وتشطيبات عالية الجودة.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    title: 'فيلا فاخرة في حي الحمراء',
    location: 'حي الحمراء، جدة',
    city: 'جدة',
    neighborhood: 'حي الحمراء',
    price: 2500000,
    type: 'sale',
    purpose: 'sale',
    category: 'residential',
    propertyType: 'villa',
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    description: 'فيلا عصرية فاخرة بتصميم معماري حديث، حديقة خاصة ومسبح. تقع في حي راقٍ وهادئ مع جميع الخدمات.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    title: 'مكتب تجاري في حي العليا',
    location: 'حي العليا، الرياض',
    city: 'الرياض',
    neighborhood: 'حي العليا',
    price: 8000,
    type: 'rent',
    purpose: 'rent',
    category: 'commercial',
    propertyType: 'office',
    bedrooms: 0,
    bathrooms: 2,
    area: 120,
    description: 'مكتب تجاري راقٍ في موقع استراتيجي وسط الأعمال، مجهز بالكامل بأحدث التقنيات والتشطيبات الفاخرة.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString()
  }
]

// مكون Skeleton لبطاقات العقارات أثناء التحميل
const PropertySkeleton = () => (
  <div className="bg-primary-800 rounded-xl overflow-hidden border border-primary-700 animate-pulse">
    <div className="h-48 bg-primary-700" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-primary-700 rounded w-3/4" />
      <div className="h-3 bg-primary-700 rounded w-1/2" />
      <div className="flex gap-4">
        <div className="h-3 bg-primary-700 rounded w-16" />
        <div className="h-3 bg-primary-700 rounded w-16" />
        <div className="h-3 bg-primary-700 rounded w-16" />
      </div>
      <div className="h-5 bg-primary-700 rounded w-1/3" />
      <div className="h-10 bg-primary-700 rounded" />
    </div>
  </div>
)

// مكون زر الواتساب العائم
const WhatsAppFloatingButton = () => {
  const phoneNumber = '966550552045'
  const message = 'السلام عليكم، أرغب في الاستفسار عن خدماتكم العقارية'
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      title="تواصل معنا عبر الواتساب"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  )
}

function App() {
  const navigate = useNavigate()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [seeding, setSeeding] = useState(false)
  const [contracts, setContracts] = useState([])
  const [selectedProperty, setSelectedProperty] = useState(null)

  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showCertificateModal, setShowCertificateModal] = useState(false)
  const [certificateType, setCertificateType] = useState(null)

  useEffect(() => {
    // timeout احتياطي — لا نعرض loading أكثر من 4 ثوانٍ
    const loadingTimeout = setTimeout(() => setLoading(false), 4000)

    const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      clearTimeout(loadingTimeout)

      // إذا كانت قاعدة البيانات فارغة للمرة الأولى، أضف بيانات تجريبية
      if (snapshot.empty && !seeding) {
        setSeeding(true)
        try {
          for (const prop of SEED_PROPERTIES) {
            await addDoc(collection(db, 'properties'), prop)
          }
        } catch (err) {
          console.error('Seed error:', err)
        }
        // onSnapshot سيستدعى تلقائياً بعد الإضافة
        return
      }

      const props = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      }))
      setProperties(props)
      setLoading(false)
    }, (error) => {
      clearTimeout(loadingTimeout)
      console.error('Firestore error:', error)
      setLoading(false)
    })

    return () => {
      clearTimeout(loadingTimeout)
      unsubscribe()
    }
  }, [])

  // إضافة عقار جديد إلى Firestore
  const addProperty = async (newProperty) => {
    const { id, ...data } = newProperty
    await addDoc(collection(db, 'properties'), {
      ...data,
      createdAt: new Date().toISOString()
    })
  }

  // تحديث عقار في Firestore
  const updateProperty = async (updatedProperty) => {
    const { id, ...data } = updatedProperty
    await updateDoc(doc(db, 'properties', id), data)
  }

  // حذف عقار من Firestore
  const deleteProperty = async (id) => {
    await deleteDoc(doc(db, 'properties', id))
  }

  // دوال إدارة العقود
  const addContract = (contract) => {
    const newContract = {
      ...contract,
      id: Date.now(),
      createdAt: new Date().toLocaleDateString('ar-SA')
    }
    setContracts([...contracts, newContract])
    navigate('/contracts')
  }

  const openPaymentModal = (property) => {
    setSelectedProperty(property)
    setShowPaymentModal(true)
  }

  const openCertificateModal = (type) => {
    setCertificateType(type)
    setShowCertificateModal(true)
  }

  const navigateToContract = (property) => {
    setSelectedProperty(property)
    navigate('/create-contract')
  }

  // Skeleton loader — يظهر هيكل الصفحة فوراً بدلاً من شاشة بيضاء
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-primary-900">
        <Navbar />
        <main className="flex-grow">
          {/* Hero skeleton */}
          <div className="bg-gradient-to-br from-primary-900 via-primary-950 to-primary-900 py-20 border-b border-gold-500/20 animate-pulse">
            <div className="container mx-auto px-4 max-w-3xl text-center space-y-4">
              <div className="h-10 bg-primary-800 rounded-xl w-3/4 mx-auto" />
              <div className="h-6 bg-primary-800 rounded-xl w-1/2 mx-auto" />
              <div className="h-4 bg-primary-800 rounded w-2/3 mx-auto" />
              <div className="flex justify-center gap-4 pt-2">
                <div className="h-12 bg-primary-700 rounded-xl w-36" />
                <div className="h-12 bg-primary-700 rounded-xl w-36" />
              </div>
            </div>
          </div>
          {/* Properties skeleton */}
          <div className="py-16 bg-primary-900">
            <div className="container mx-auto px-4">
              <div className="h-8 bg-primary-800 rounded w-48 mb-8 animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => <PropertySkeleton key={i} />)}
              </div>
            </div>
          </div>
        </main>
        <Footer onShowCertificate={openCertificateModal} />
        <WhatsAppFloatingButton />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary-900">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <HomePage
              properties={properties}
              onPayment={openPaymentModal}
              onCreateContract={navigateToContract}
            />
          } />
          <Route path="/properties" element={
            <PropertiesPage
              properties={properties}
              onPayment={openPaymentModal}
              onCreateContract={navigateToContract}
            />
          } />
          <Route path="/add" element={<AddPropertyPage />} />
          <Route path="/create-contract" element={
            <CreateContractPage
              properties={properties}
              selectedProperty={selectedProperty}
              onAdd={addContract}
            />
          } />
          <Route path="/contracts" element={<ContractsPage contracts={contracts} />} />
          <Route path="/admin" element={
            <AdminPage
              properties={properties}
              onAdd={addProperty}
              onUpdate={updateProperty}
              onDelete={deleteProperty}
            />
          } />
        </Routes>
      </main>

      <Footer onShowCertificate={openCertificateModal} />
      <WhatsAppFloatingButton />

      {showPaymentModal && (
        <PaymentModal
          property={selectedProperty}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
      {showCertificateModal && (
        <CertificateModal
          type={certificateType}
          onClose={() => setShowCertificateModal(false)}
        />
      )}
    </div>
  )
}

export default App
