import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import PropertiesPage from './pages/PropertiesPage'
import AddPropertyPage from './pages/AddPropertyPage'
import CreateContractPage from './pages/CreateContractPage'
import ContractsPage from './pages/ContractsPage'
import ApprovalsPage from './pages/ApprovalsPage'
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

// البيانات التجريبية الأولية
const initialProperties = [
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
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    status: 'approved'
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
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    status: 'approved'
  }
]

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [properties, setProperties] = useState(initialProperties)
  const [contracts, setContracts] = useState([])
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [editingProperty, setEditingProperty] = useState(null)

  // حالات النوافذ المنبثقة
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showCertificateModal, setShowCertificateModal] = useState(false)
  const [certificateType, setCertificateType] = useState(null)

  // دوال إدارة العقارات
  const addProperty = (property) => {
    const newProperty = {
      ...property,
      id: Date.now(),
      image: property.image || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      status: 'pending'
    }
    setProperties([...properties, newProperty])
    setCurrentPage('properties')
    alert('تم إضافة العقار بنجاح! سيظهر في الموقع بعد موافقة الإدارة.')
  }

  // دوال إدارة الموافقات
  const approveProperty = (id) => {
    setProperties(properties.map(p =>
      p.id === id ? { ...p, status: 'approved' } : p
    ))
  }

  const rejectProperty = (id) => {
    if (confirm('هل أنت متأكد من رفض هذا العقار؟')) {
      setProperties(properties.map(p =>
        p.id === id ? { ...p, status: 'rejected' } : p
      ))
    }
  }

  const updateProperty = (updatedProperty) => {
    setProperties(properties.map(p =>
      p.id === updatedProperty.id ? updatedProperty : p
    ))
    setEditingProperty(null)
    setCurrentPage('properties')
  }

  const deleteProperty = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا العقار؟')) {
      setProperties(properties.filter(p => p.id !== id))
    }
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

  // التنقل للتعديل
  const navigateToEdit = (property) => {
    setEditingProperty(property)
    setCurrentPage('addProperty')
  }

  // فلترة العقارات المعتمدة فقط للعرض العام
  const approvedProperties = properties.filter(p => p.status === 'approved')
  const pendingProperties = properties.filter(p => p.status === 'pending')

  // عرض الصفحة الحالية
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            properties={approvedProperties}
            onNavigate={setCurrentPage}
            onPayment={openPaymentModal}
            onCreateContract={navigateToContract}
          />
        )
      case 'properties':
        return (
          <PropertiesPage
            properties={approvedProperties}
            onDelete={deleteProperty}
            onEdit={navigateToEdit}
            onPayment={openPaymentModal}
            onCreateContract={navigateToContract}
          />
        )
      case 'addProperty':
        return (
          <AddPropertyPage
            onAdd={addProperty}
            onUpdate={updateProperty}
            editingProperty={editingProperty}
            onCancel={() => {
              setEditingProperty(null)
              setCurrentPage('properties')
            }}
          />
        )
      case 'createContract':
        return (
          <CreateContractPage
            properties={approvedProperties}
            selectedProperty={selectedProperty}
            onAdd={addContract}
            onCancel={() => setCurrentPage('properties')}
          />
        )
      case 'contracts':
        return (
          <ContractsPage contracts={contracts} />
        )
      case 'approvals':
        return (
          <ApprovalsPage
            properties={properties}
            pendingCount={pendingProperties.length}
            onApprove={approveProperty}
            onReject={rejectProperty}
            onDelete={deleteProperty}
          />
        )
      case 'admin':
        return (
          <AdminPage
            properties={properties}
            onApprove={approveProperty}
            onReject={rejectProperty}
            onDelete={deleteProperty}
          />
        )
      default:
        return <HomePage properties={approvedProperties} onNavigate={setCurrentPage} />
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
