import { useState, useEffect } from 'react'
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

// البيانات الافتراضية
const defaultProperties = [
  {
    id: 1,
    title: 'شقة فاخرة في حي الروضة',
    location: 'حي الروضة، الرياض',
    price: 3500,
    type: 'rent',
    category: 'residential',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    description: 'شقة فاخرة مجددة بالكامل في موقع متميز، قريبة من جميع الخدمات. تتميز بإطلالة رائعة وتشطيبات عالية الجودة.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'
  },
  {
    id: 2,
    title: 'فيلا عصرية في الحمراء',
    location: 'حي الحمراء، جدة',
    price: 2500000,
    type: 'sale',
    category: 'residential',
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    description: 'فيلا عصرية فاخرة بتصميم معماري حديث، حديقة خاصة ومسبح. تقع في حي راقٍ وهادئ مع جميع الخدمات.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop'
  }
]

// دالة لتحميل العقارات من localStorage
const loadProperties = () => {
  try {
    const saved = localStorage.getItem('alhariri_properties')
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.error('Error loading properties:', error)
  }
  return defaultProperties
}

// دالة لحفظ العقارات في localStorage
const saveProperties = (properties) => {
  try {
    localStorage.setItem('alhariri_properties', JSON.stringify(properties))
  } catch (error) {
    console.error('Error saving properties:', error)
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')
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
    setCurrentPage('contracts')
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
    setCurrentPage('createContract')
  }

  // عرض الصفحة الحالية
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            properties={properties}
            onNavigate={setCurrentPage}
            onPayment={openPaymentModal}
            onCreateContract={navigateToContract}
          />
        )
      case 'properties':
        return (
          <PropertiesPage
            properties={properties}
            onPayment={openPaymentModal}
            onCreateContract={navigateToContract}
          />
        )
      case 'addProperty':
        return (
          <AddPropertyPage />
        )
      case 'createContract':
        return (
          <CreateContractPage
            properties={properties}
            selectedProperty={selectedProperty}
            onAdd={addContract}
            onCancel={() => setCurrentPage('properties')}
          />
        )
      case 'contracts':
        return (
          <ContractsPage contracts={contracts} />
        )
      case 'admin':
        return (
          <AdminPage
            properties={properties}
            onAdd={addProperty}
            onUpdate={updateProperty}
            onDelete={deleteProperty}
          />
        )
      default:
        return <HomePage properties={properties} onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary-900">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer onShowCertificate={openCertificateModal} onNavigate={setCurrentPage} />

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
