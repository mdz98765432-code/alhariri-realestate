import { useState } from 'react'
import { Building2, Search, Filter } from 'lucide-react'
import PropertyCard from '../components/PropertyCard'

function PropertiesPage({ properties, onDelete, onEdit, onPayment, onCreateContract }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  // تصفية العقارات
  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title.includes(searchTerm) ||
      property.location.includes(searchTerm)
    const matchesType = filterType === 'all' || property.type === filterType
    const matchesCategory = filterCategory === 'all' || property.category === filterCategory
    return matchesSearch && matchesType && matchesCategory
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gold-400 mb-2">جميع العقارات</h1>
        <p className="text-gray-400">تصفح وإدارة جميع العقارات المتاحة</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-primary-800 rounded-xl shadow-lg p-6 mb-8 border border-gold-500/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500" />
            <input
              type="text"
              placeholder="البحث عن عقار..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pr-10"
            />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="form-select pr-10"
            >
              <option value="all">جميع الأنواع</option>
              <option value="rent">للإيجار</option>
              <option value="sale">للبيع</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="form-select pr-10"
            >
              <option value="all">جميع التصنيفات</option>
              <option value="residential">سكني</option>
              <option value="commercial">تجاري</option>
            </select>
          </div>
        </div>
      </div>

      {/* Properties Count */}
      <div className="mb-6">
        <span className="text-gray-400">
          عدد النتائج: <span className="font-bold text-gold-400">{filteredProperties.length}</span> عقار
        </span>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onDelete={onDelete}
              onEdit={onEdit}
              onPayment={onPayment}
              onCreateContract={onCreateContract}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-primary-800 rounded-2xl border border-gold-500/20">
          <Building2 className="w-20 h-20 text-gold-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">لا توجد عقارات</h3>
          <p className="text-gray-400">
            {searchTerm || filterType !== 'all' || filterCategory !== 'all'
              ? 'لا توجد نتائج تطابق معايير البحث'
              : 'لم يتم إضافة أي عقارات بعد'}
          </p>
        </div>
      )}
    </div>
  )
}

export default PropertiesPage
