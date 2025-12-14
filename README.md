# ঘোষগ্রাম আল-ইহসান ওয়েলফেয়ার সোসাইটি - Donation Management System

A minimalist React-based donation management system built with Vite, React Router, and Tailwind CSS. This application allows you to track donations, manage donors, and generate elegant PDF reports with logo.

## Features

- ✅ **Add Donations** - Add donations with Date, Name, Amount, and Payment Type (Bkash/Bank/Cash)
- ✅ **View Dashboard** - Beautiful dashboard showing all donations with summary cards
- ✅ **Manage Donors** - Edit, update, and delete donor information
- ✅ **Search & Filter** - Search donations by name, date, or payment type
- ✅ **PDF Reports** - Generate elegant PDF reports with organization logo
- ✅ **Bengali Support** - Full Bengali language interface (PDF supports English with Bengali names)
- ✅ **Responsive Design** - Works beautifully on all devices
- ✅ **Real-time Updates** - Changes instantly reflect across all pages
- ✅ **No Database** - All data stored in memory (can be enhanced with localStorage)

## Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool & Dev Server
- **React Router DOM** - Client-side Routing
- **Tailwind CSS** - Utility-first CSS Framework
- **jsPDF & jsPDF-AutoTable** - Professional PDF Generation

## Installation

1. Navigate to the project directory:
```bash
cd donation-app
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
donation-app/
├── public/
│   └── logo.png                 # Organization logo
├── src/
│   ├── pages/
│   │   ├── HomePage.jsx         # Dashboard with donation list
│   │   ├── AddDonationPage.jsx  # Form to add new donations
│   │   └── ManageDonorsPage.jsx # Manage, edit, delete donors
│   ├── App.jsx                  # Main app with routing
│   ├── main.jsx                 # Entry point
│   └── index.css                # Tailwind CSS
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Usage Guide

### 1. Home Page (Dashboard)
- View total donation amount (মোট অনুদান)
- See total number of donors (মোট দাতা)
- Browse complete donation list in a beautiful table
- Click "সারাংশ প্রিন্ট করুন" to download PDF report

### 2. Add Donation (দান যোগ করুন)
Navigate to "দান যোগ করুন" and fill in:
- **তারিখ** (Date): Select donation date
- **নাম** (Name): Enter donor's name (supports Bengali text)
- **পরিমাণ** (Amount): Enter donation amount in BDT
- **পেমেন্ট টাইপ** (Payment Type): Select from Bkash, Bank, or Cash

Click "সংরক্ষণ করুন" to save the donation.

### 3. Manage Donors (দাতা পরিচালনা)
Navigate to "দাতা পরিচালনা" to:
- **Search**: Find donors by name, date, or payment type
- **Edit**: Click edit icon to modify donor information
- **Delete**: Click delete icon and confirm to remove a donor
- All changes update instantly on the home page

### 4. Generate PDF Report
1. Go to Home page
2. Click "সারাংশ প্রিন্ট করুন" button
3. PDF automatically downloads with:
   - Organization logo at the top
   - Professional header with organization name
   - Summary section with totals
   - Complete donation table with elegant formatting
   - Page numbers and footer

## Features in Detail

### Bengali Text Support
- Full Bengali interface throughout the app
- Input fields accept Bengali text
- Names in Bengali are preserved in the system
- PDF exports with Bengali names (using standard fonts)

### Elegant PDF Design
- Organization logo prominently displayed
- Professional color scheme matching the brand
- Summary box with key statistics
- Well-formatted table with alternating row colors
- Page numbers and organization name in footer
- Date and time stamp

### Real-time Data Management
- Add donations from one page, see them instantly on home
- Edit in manage page, changes reflect immediately
- Delete with confirmation dialog
- Search and filter without page refresh

### Responsive Design
- Mobile-friendly navigation
- Tables scroll horizontally on small screens
- Touch-friendly buttons and inputs
- Adapts to all screen sizes

## Notes

- Data is stored in React state (memory) and will be lost on page refresh
- For persistent storage, consider adding localStorage or a backend
- All monetary amounts are in Bangladeshi Taka (৳)
- PDF generation works in all modern browsers
- Search is case-insensitive and searches across multiple fields

## Future Enhancements (Optional)

- [ ] Add localStorage for data persistence
- [ ] Export to Excel format
- [ ] Date range filtering for reports
- [ ] Multiple organization support
- [ ] Print receipts for individual donations
- [ ] SMS/Email notifications to donors
- [ ] Dashboard analytics and charts
- [ ] Backup and restore functionality
- [ ] User authentication and roles

## Customization

### Change Logo
Replace `/public/logo.png` with your organization's logo (recommended size: 500x500px)

### Adjust Colors
Edit `src/App.jsx` and page files to change the color scheme. Current colors:
- Primary: Emerald/Teal gradient
- Secondary: Amber/Orange (for manage page)
- Accent colors for payment types

### Modify Payment Types
Edit the payment type options in:
- `src/pages/AddDonationPage.jsx`
- `src/pages/ManageDonorsPage.jsx`

## Troubleshooting

**Logo not showing?**
- Ensure logo.png is in the `/public` folder
- Check image format (PNG recommended)
- Clear browser cache

**PDF not downloading?**
- Check browser console for errors
- Ensure jsPDF libraries are installed
- Try a different browser

**Bengali text not displaying?**
- Install Bengali fonts on your system
- Check browser language settings

## License

This project is open source and available for use by ঘোষগ্রাম আল-ইহসান ওয়েলফেয়ার সোসাইটি.

## Support

For issues or questions, please contact the development team.

---

**Developed with ❤️ for community welfare**
