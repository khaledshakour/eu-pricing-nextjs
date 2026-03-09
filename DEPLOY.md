# 🚀 دليل نشر نظام التسعير الذكي مع Gemini AI

## الملفات:
```
eu-nextjs/
├── .env.example          ← مثال على إعدادات البيئة
├── .gitignore            ← ملفات يتم تجاهلها
├── next.config.js        ← إعدادات Next.js
├── package.json          ← إعدادات المشروع
├── pages/
│   ├── _document.js      ← إعدادات HTML
│   ├── index.jsx         ← الصفحة الرئيسية (النظام كامل)
│   └── api/
│       └── ai-price.js   ← API Route للذكاء الاصطناعي (يعمل على السيرفر)
└── public/               ← ملفات ثابتة
```

## الخطوات:

### 1. رفع المشروع على GitHub
- أنشئ مستودع جديد: `eu-pricing-nextjs`
- ارفع كل الملفات (ما عدا .env)

### 2. النشر على Vercel
- ادخل vercel.com واختر المستودع
- Vercel سيكتشف تلقائياً أنه Next.js
- **مهم:** قبل الضغط Deploy، أضف Environment Variable:
  - اضغط "Environment Variables"
  - Name: `GEMINI_API_KEY`
  - Value: (الصق API Key من Google)
  - اضغط Add
- اضغط Deploy

### 3. ربط الدومين
- Settings → Domains → pricing.exunion.co
- أضف CNAME: pricing → cname.vercel-dns.com
