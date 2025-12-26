import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

const HomePage = ({ donations }) => {
  const totalAmount = donations.reduce((sum, donation) => sum + parseFloat(donation.amount || 0), 0)
  const totalPeople = donations.length

  // Enhanced Bengali to Roman transliteration with compound characters
  const transliterateBengali = (text) => {
    if (!text) return '';
    
    // Check if text contains Bengali characters
    const hasBengali = /[\u0980-\u09FF]/.test(text);
    if (!hasBengali) return text;

    // Improved Bengali to Roman mapping
    const bengaliMap = {
      // Vowels
      'অ': 'O', 'আ': 'A', 'ই': 'I', 'ঈ': 'I', 'উ': 'U', 'ঊ': 'U', 'ঋ': 'Ri',
      'এ': 'E', 'ঐ': 'Oi', 'ও': 'O', 'ঔ': 'Ou',
      
      // Consonants
      'ক': 'K', 'খ': 'Kh', 'গ': 'G', 'ঘ': 'Gh', 'ঙ': 'Ng',
      'চ': 'Ch', 'ছ': 'Chh', 'জ': 'J', 'ঝ': 'Jh', 'ঞ': 'Ng',
      'ট': 'T', 'ঠ': 'Th', 'ড': 'D', 'ঢ': 'Dh', 'ণ': 'N',
      'ত': 'T', 'থ': 'Th', 'দ': 'D', 'ধ': 'Dh', 'ন': 'N',
      'প': 'P', 'ফ': 'F', 'ব': 'B', 'ভ': 'Bh', 'ম': 'M',
      'য': 'J', 'র': 'R', 'ল': 'L', 'শ': 'Sh', 'ষ': 'Sh', 'স': 'S', 'হ': 'H',
      
      // Additional characters
      'ড়': 'R', 'ঢ়': 'Rh', 'য়': 'Y', 'ৎ': 'T',
      'ং': 'ng', 'ঃ': 'h', 'ঁ': 'n',
      
      // Vowel signs (kar)
      'া': 'a', 'ি': 'i', 'ী': 'i', 'ু': 'u', 'ূ': 'u', 'ৃ': 'ri',
      'ে': 'e', 'ৈ': 'oi', 'ো': 'o', 'ৌ': 'ou',
      
      // Special
      '্': '', 'ঀ': '', '়': '',
      
      // Numbers
      '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
      '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
    };

    let result = '';
    let i = 0;
    
    while (i < text.length) {
      const char = text[i];
      const nextChar = text[i + 1];
      
      // Handle hasant (্) - skip it as it joins consonants
      if (nextChar === '্') {
        result += bengaliMap[char] || char;
        i += 2; // Skip current char and hasant
        continue;
      }
      
      // Map character or keep as-is
      result += bengaliMap[char] || char;
      i++;
    }
    
    return result;
  }

  const generatePDF = async () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.width
    const pageHeight = doc.internal.pageSize.height
    
    // Add logo
    try {
      const img = new Image()
      img.src = '/logo.png'
      await new Promise((resolve, reject) => {
        img.onload = () => {
          // Center the logo
          const imgWidth = 35
          const imgHeight = 35
          const xPos = (pageWidth - imgWidth) / 2
          doc.addImage(img, 'PNG', xPos, 15, imgWidth, imgHeight)
          resolve()
        }
        img.onerror = reject
        setTimeout(reject, 3000) // Timeout after 3 seconds
      }).catch(() => {
        console.log('Logo not loaded, continuing without it')
      })
    } catch (error) {
      console.log('Logo loading error:', error)
    }
    
    // Organization name
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.setTextColor(22, 163, 74) // Green color
    doc.text('Ghoshgram Al-Ihsan Welfare Society', pageWidth / 2, 58, { align: 'center' })
    
    // Subtitle
    doc.setFontSize(14)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(0, 0, 0)
    doc.text('Donation Report', pageWidth / 2, 68, { align: 'center' })
    
    // Decorative line
    doc.setLineWidth(0.8)
    doc.setDrawColor(16, 185, 129)
    doc.line(20, 73, pageWidth - 20, 73)
    
    // Summary section - Elegant box design
    const summaryY = 85
    const summaryHeight = 28
    const summaryX = 15
    const summaryWidth = pageWidth - 30
    
    // Gradient effect (simulated with rectangles)
    doc.setFillColor(236, 253, 245) // Very light green
    doc.roundedRect(summaryX, summaryY, summaryWidth, summaryHeight, 3, 3, 'F')
    
    // Border
    doc.setDrawColor(16, 185, 129)
    doc.setLineWidth(0.5)
    doc.roundedRect(summaryX, summaryY, summaryWidth, summaryHeight, 3, 3, 'S')
    
    // Summary title
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(5, 150, 105)
    doc.text('SUMMARY', summaryX + 5, summaryY + 8)
    
    // Summary details in single row
    const rowY = summaryY + 17
    
    // Total Donations (Left side)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text('Total Donations:', summaryX + 5, rowY)
    
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(22, 163, 74)
    doc.setFontSize(11)
    const roundedTotal = Math.round(totalAmount * 100) / 100
    doc.text(`${roundedTotal.toFixed(2)} BDT`, summaryX + 45, rowY)
    
    // Total Donors (Right side)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text('Total Donors:', summaryX + 100, rowY)
    
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(59, 130, 246)
    doc.setFontSize(11)
    doc.text(`${totalPeople}`, summaryX + 130, rowY)
    
    // Generated date/time
    doc.setTextColor(100, 100, 100)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'italic')
    const now = new Date()
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
    const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    doc.text(`Generated: ${dateStr} at ${timeStr}`, summaryX + 5, summaryY + 24)
    
    // Table with transliterated Bengali names
    const tableData = donations.map((donation, index) => {
      const dateStr = donation.date || ''
      // Transliterate Bengali name to Roman characters for PDF
      const nameStr = transliterateBengali(donation.name) || ''
      // Fix decimal precision for each amount
      const amount = Math.round(parseFloat(donation.amount) * 100) / 100
      const amountStr = amount.toFixed(2)
      const paymentTypeStr = donation.paymentType || ''
      
      return [
        index + 1,
        dateStr,
        nameStr,
        amountStr,
        paymentTypeStr
      ]
    })
    
    doc.autoTable({
      startY: 120,
      head: [['#', 'Date', 'Name', 'Amount (BDT)', 'Payment Type']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [16, 185, 129],
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold',
        halign: 'center',
        cellPadding: 4
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [0, 0, 0],
        cellPadding: 3
      },
      columnStyles: {
        0: { cellWidth: 15, halign: 'center', fontStyle: 'bold' },
        1: { cellWidth: 30, halign: 'center' },
        2: { cellWidth: 70, halign: 'left' },
        3: { cellWidth: 35, halign: 'right', fontStyle: 'bold', textColor: [22, 163, 74] },
        4: { cellWidth: 35, halign: 'center' }
      },
      alternateRowStyles: {
        fillColor: [240, 253, 244]
      },
      styles: {
        lineColor: [200, 200, 200],
        lineWidth: 0.1
      },
      margin: { left: 15, right: 15 },
      showHead: 'everyPage',
      didDrawPage: function (data) {
        // Set proper top margin for all pages
        if (data.pageNumber === 1) {
          // First page already has content above
          data.settings.margin.top = 120
        } else {
          // Subsequent pages start from top
          data.settings.margin.top = 20
        }
        
        // Footer on each page
        doc.setFontSize(8)
        doc.setTextColor(128, 128, 128)
        doc.setFont('helvetica', 'italic')
        
        // Organization name in footer
        doc.text(
          'Ghoshgram Al-Ihsan Welfare Society',
          15,
          pageHeight - 10
        )
        
        // Page number
        const pageCount = doc.internal.getNumberOfPages()
        doc.text(
          `Page ${data.pageNumber} of ${pageCount}`,
          pageWidth - 15,
          pageHeight - 10,
          { align: 'right' }
        )
        
        // Footer line
        doc.setLineWidth(0.3)
        doc.setDrawColor(200, 200, 200)
        doc.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15)
      }
    })
    
    // Add total at the end of the table if there are donations
    if (donations.length > 0) {
      const finalY = doc.lastAutoTable.finalY || 120
      
      // Calculate total width to match table columns exactly
      const totalTableWidth = 15 + 30 + 70 + 35 + 35 // sum of all column widths
      const startX = 15 // same as table margin left
      
      // Total row background
      doc.setFillColor(236, 253, 245)
      doc.rect(startX, finalY + 2, totalTableWidth, 10, 'F')
      
      // Border
      doc.setDrawColor(16, 185, 129)
      doc.setLineWidth(0.5)
      doc.rect(startX, finalY + 2, totalTableWidth, 10, 'S')
      
      // "GRAND TOTAL" text (left side, spanning first 3 columns)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.setTextColor(5, 150, 105)
      doc.text('GRAND TOTAL', startX + 5, finalY + 8.5)
      
      // Amount (aligned with amount column)
      doc.setTextColor(22, 163, 74)
      doc.setFontSize(12)
      const roundedTotal = Math.round(totalAmount * 100) / 100
      const amountX = startX + 15 + 30 + 70 + 35 // position at end of amount column
      doc.text(`${roundedTotal.toFixed(2)}`, amountX - 2, finalY + 8.5, { align: 'right' })
    }
    
    // Save the PDF
    const fileName = `donation-report-${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(fileName)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium mb-1">মোট অনুদান</p>
              <h2 className="text-4xl font-bold">৳{(Math.round(totalAmount * 100) / 100).toFixed(2)}</h2>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-full">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">মোট দাতা</p>
              <h2 className="text-4xl font-bold">{totalPeople}</h2>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-full">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600">
          <h3 className="text-xl font-bold text-white text-center">দান তালিকা</h3>
        </div>
        
        {donations.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-lg">কোনো দান এখনো যোগ করা হয়নি</p>
            <p className="text-gray-400 text-sm mt-2">দান যোগ করতে উপরের বাটনে ক্লিক করুন</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">তারিখ</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">নাম</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">পরিমাণ</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">পেমেন্ট টাইপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {donations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{donation.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 font-semibold">
                      ৳{(Math.round(parseFloat(donation.amount) * 100) / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        donation.paymentType === 'Bkash' ? 'bg-pink-100 text-pink-800' :
                        donation.paymentType === 'Bank' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {donation.paymentType}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Print Button */}
      {donations.length > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={generatePDF}
            className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            সারাংশ প্রিন্ট করুন
          </button>
        </div>
      )}
    </div>
  )
}

export default HomePage