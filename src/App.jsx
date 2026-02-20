import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
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

// معرّفات العقارات الافتراضية القديمة لحذفها
const OLD_DEFAULT_IDS = [1, 2]

// دالة لتحميل العقارات من localStorage
const loadProperties = () => {
  try {
    const saved = localStorage.getItem('properties')
    if (saved) {
      const parsed = JSON.parse(saved)
      // حذف العقارات الافتراضية القديمة إن وُجدت
      const cleaned = parsed.filter(p => !OLD_DEFAULT_IDS.includes(p.id))
      if (cleaned.length !== parsed.length) {
        localStorage.setItem('properties', JSON.stringify(cleaned))
      }
      return cleaned
    }
  } catch (error) {
    console.error('Error loading properties:', error)
  }
  localStorage.setItem('properties', JSON.stringify([]))
  return []
}

// دالة لحفظ العقارات في localStorage
const saveProperties = (properties) => {
  try {
    localStorage.setItem('properties', JSON.stringify(properties))
  } catch (error) {
    console.error('Error saving properties:', error)
  }
}

function App() {
  const navigate = useNavigate()
  const [properties, setProperties] = useState(loadProperties)
  const [contracts, setContracts] = useState([])
  const [selectedProperty, setSelectedProperty] = useState(null)

  // حالات النوافذ المنبثقة
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showCertificateModal, setShowCertificateModal] = useState(false)
  const [certificateType, setCertificateType] = useState(null)

  // حفظ العقارات عند تغييرها
  useEffect(() => {
    saveProperties(properties)
  }, [properties])

  // الاستماع لتغييرات localStorage من صفحة الإدارة
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('properties')
      if (saved) {
        try {
          setProperties(JSON.parse(saved))
        } catch (e) {
          console.error('Error parsing properties:', e)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // الاستماع للتغييرات من AdminPage في نفس التبويب
    window.addEventListener('propertiesChanged', handleStorageChange)

    // أيضاً نتحقق عند التركيز على النافذة
    const handleFocus = () => {
      const saved = localStorage.getItem('properties')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setProperties(parsed)
        } catch (e) {
          console.error('Error parsing properties:', e)
        }
      }
    }

    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('propertiesChanged', handleStorageChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  // دوال إدارة العقارات (للمدير فقط)
  const addProperty = (property) => {
    const newProperty = {
      ...property,
      id: Date.now(),
      image: property.image || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
    }
    setProperties([...properties, newProperty])
  }

  const updateProperty = (updatedProperty) => {
    setProperties(properties.map(p =>
      p.id === updatedProperty.id ? updatedProperty : p
    ))
  }

  const deleteProperty = (id) => {
    setProperties(properties.filter(p => p.id !== id))
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

  // دوال النوافذ المنبثقة
  const openPaymentModal = (property) => {
    setSelectedProperty(property)
    setShowPaymentModal(true)
  }

  const openCertificateModal = (type) => {
    setCertificateType(type)
    setShowCertificateModal(true)
  }

  // التنقل مع اختيار عقار للعقد
  const navigateToContract = (property) => {
    setSelectedProperty(property)
    navigate('/create-contract')
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
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>

      <Footer onShowCertificate={openCertificateModal} />

      {/* زر الواتساب العائم */}
      <WhatsAppFloatingButton />

      {/* نافذة الدفع */}
      {showPaymentModal && (
        <PaymentModal
          property={selectedProperty}
          onClose={() => setShowPaymentModal(false)}
        />
      )}

      {/* نافذة الشهادات */}
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
