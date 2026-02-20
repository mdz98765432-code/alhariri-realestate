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
  const [contracts, setContracts] = useState([])
  const [selectedProperty, setSelectedProperty] = useState(null)

  // حالات النوافذ المنبثقة
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showCertificateModal, setShowCertificateModal] = useState(false)
  const [certificateType, setCertificateType] = useState(null)

  // الاستماع لتغييرات Firestore في الوقت الفعلي
  useEffect(() => {
    const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const props = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      }))
      setProperties(props)
      setLoading(false)
    }, (error) => {
      console.error('Firestore error:', error)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // إضافة عقار جديد إلى Firestore
  const addProperty = async (newProperty) => {
    try {
      const { id, ...data } = newProperty
      await addDoc(collection(db, 'properties'), {
        ...data,
        createdAt: new Date().toISOString()
      })
    } catch (error) {
      console.error('Error adding property:', error)
      throw error
    }
  }

  // تحديث عقار في Firestore
  const updateProperty = async (updatedProperty) => {
    try {
      const { id, ...data } = updatedProperty
      await updateDoc(doc(db, 'properties', id), data)
    } catch (error) {
      console.error('Error updating property:', error)
      throw error
    }
  }

  // حذف عقار من Firestore
  const deleteProperty = async (id) => {
    try {
      await deleteDoc(doc(db, 'properties', id))
    } catch (error) {
      console.error('Error deleting property:', error)
      throw error
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

  const navigateToContract = (property) => {
    setSelectedProperty(property)
    navigate('/create-contract')
  }

  // شاشة التحميل
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gold-400 text-lg font-medium">جاري التحميل...</p>
        </div>
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
