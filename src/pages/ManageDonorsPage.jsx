import { useState } from 'react'

const ManageDonorsPage = ({ donations, updateDonation, deleteDonation }) => {
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    date: '',
    name: '',
    amount: '',
    paymentType: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)

  const handleEdit = (donation) => {
    setEditingId(donation.id)
    setEditForm({
      date: donation.date,
      name: donation.name,
      amount: donation.amount,
      paymentType: donation.paymentType
    })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm({ date: '', name: '', amount: '', paymentType: '' })
  }

  const handleUpdate = (id) => {
    if (editForm.name && editForm.amount && editForm.date) {
      updateDonation(id, editForm)
      setEditingId(null)
      setEditForm({ date: '', name: '', amount: '', paymentType: '' })
    }
  }

  const handleDelete = (id) => {
    deleteDonation(id)
    setDeleteConfirmId(null)
  }

  const filteredDonations = donations.filter(donation =>
    donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.date.includes(searchTerm) ||
    donation.paymentType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold text-white">দাতা পরিচালনা</h2>
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="নাম, তারিখ বা পেমেন্ট টাইপ খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-lg focus:ring-2 focus:ring-white focus:outline-none text-gray-900"
              />
              <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 py-4 bg-amber-50 border-b">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">মোট দাতা: <span className="font-bold text-gray-900">{donations.length}</span></span>
            <span className="text-gray-600">ফিল্টার করা ফলাফল: <span className="font-bold text-gray-900">{filteredDonations.length}</span></span>
          </div>
        </div>

        {/* Table */}
        {filteredDonations.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-500 text-lg">কোনো দাতা পাওয়া যায়নি</p>
            <p className="text-gray-400 text-sm mt-2">
              {searchTerm ? 'অন্য শব্দ দিয়ে খুঁজুন' : 'দান যোগ করতে "দান যোগ করুন" পেজে যান'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">তারিখ</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">নাম</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">পরিমাণ</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">পেমেন্ট টাইপ</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">কার্যক্রম</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDonations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50 transition-colors">
                    {editingId === donation.id ? (
                      // Edit Mode
                      <>
                        <td className="px-4 py-3">
                          <input
                            type="date"
                            value={editForm.date}
                            onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                            className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-amber-500 text-sm"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-amber-500 text-sm"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={editForm.amount}
                            onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                            step="0.01"
                            className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-amber-500 text-sm"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={editForm.paymentType}
                            onChange={(e) => setEditForm({ ...editForm, paymentType: e.target.value })}
                            className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-amber-500 text-sm"
                          >
                            <option value="Bkash">Bkash</option>
                            <option value="Bank">Bank</option>
                            <option value="Cash">Cash</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleUpdate(donation.id)}
                              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm font-medium"
                            >
                              সংরক্ষণ
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm font-medium"
                            >
                              বাতিল
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      // View Mode
                      <>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{donation.date}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{donation.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-emerald-600 font-semibold">৳{parseFloat(donation.amount).toFixed(2)}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            donation.paymentType === 'Bkash' ? 'bg-pink-100 text-pink-800' :
                            donation.paymentType === 'Bank' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {donation.paymentType}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(donation)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="সম্পাদনা করুন"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(donation.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="মুছে ফেলুন"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">নিশ্চিত করুন</h3>
            <p className="text-gray-600 text-center mb-6">
              আপনি কি এই দাতার তথ্য মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                বাতিল
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                মুছে ফেলুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">পরিচালনা নির্দেশিকা</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• সম্পাদনা বাটনে ক্লিক করে তথ্য পরিবর্তন করুন</li>
              <li>• মুছে ফেলার আগে নিশ্চিত হয়ে নিন</li>
              <li>• সকল পরিবর্তন তাত্ক্ষণিকভাবে হোম পেজে প্রতিফলিত হবে</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageDonorsPage
