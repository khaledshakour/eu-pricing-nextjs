import { useState, useRef, useEffect } from "react";

const LOGO_B64 = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCACbAnEDASIAAhEBAxEB/8QAHAABAAICAwEAAAAAAAAAAAAAAAYHBQgBAwQC/8QAXRAAAQMDAQQEBgkPBwkHBQAAAQACAwQFEQYHEiExQVFhcRMUFoGR0hUXIiMyQpKToQhSVVZicoKio7HB0dPi4yYzVIOUssM0NjdDRlNzs8IkRFdjdITwJSc1RWX/xAAcAQEAAwEBAQEBAAAAAAAAAAAABAYHBQMBAgj/xABDEQABAwECCgkCAwYFBQEAAAABAAIDBAURBhIUITFBUVJh0RMVInGBkZKhscHhQlPSFjNVk/DxIzI1VHIHJDRDYqL/2gAMAwEAAhEDEQA/ANMkRERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERTrQOgINX0D5qTUEMFREcS074CXN6jz4g9aIoKiuBuw6p+NqKDzUx9Zc+0dUfbHD/ZT6yIqeRXF7Rs/2xxf2U+sufaNm+2OP+yn1kRU4iuMbDZenUcf9lPrLj2jpvtji/sp9ZEVOorjGw6Xp1HH/AGU+sodr3RlHpeRtI29eP3Bw3jTxU5G43pLjk4RFDURERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERFlNK3W52e+01ZaJHNqg8Ma0cpMnG6R0grFqc7EbN7La7ppZGb0FC01L8jhkcGj0kHzIi2QhMhhYZWhshaN8DkDjiFC9smpqrTWmI326XwVdVTCOJ26DugcXHB9HnU2VN7RKhl/2tUFpc7eorTH4ap48BgeEfnzBoRFj5blrinY32S17Q0Mrmh3gZHt32gjPEbvBIr9qZjst2lWuTseW4/Mq21BcZLte6y5SfCqJnPx1DPAeYYC8KIrupNVbQbdD49J7F6ht8fupjRvBe1vXwwR6CrQsVzpbzaKa50Ty6CojD255jrB7RyWp9ju1fZbhHXW6odDMw9HJw6nDpHYrg0frujodF10tDS/9tlrC2joW8cyyAEgD6wOyfoRFKtomr5bS+OxWOLxu/VbfemDiIGn47v0elUvfrrFZ2VVBQ1Xj11qci43IneJJ5xxnq6Celfeo7vPaXVlKyq8YvlaSbnWg5LM/6lh6AORPmChiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIrc2C6UZM9+qLhCHsjcY6Jj25Bf8aTHZyHbnqUWsq2UkLppNA/q5Q6+ujoad08mge+wKqG01Q4ZbTykdYYU8WqM48Xlz94Vt+2aVow2R7R2HCGab/evP4Sq/7YR/lHz+ypn7eRfknz+y1B8Vqc48Xmz1bhXStp9d6pGldOT3R79+oPvVLGT/OSkcM9gHE92Ola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YKdsIIaSb9pJ+UREXqvdERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERf//Z";

// ========== FULL TRANSLATIONS ==========
const TR = {
  ar: {
    dir: "rtl", newPricing: "تسعير جديد", quotations: "عروض الأسعار", priceDb: "قاعدة الأسعار",
    inputBoq: "إدخال BOQ أو ملف المشروع", uploadFile: "ارفع ملف (PDF, Excel, Word, CSV)",
    pasteBoq: "أو الصق BOQ / وصف المشروع هنا...", analyze3: "تحليل وتسعير من 3 مصادر",
    analyzing: "جاري التحليل...", scopeDetected: "نطاق العمل المكتشف:",
    db: "قاعدة البيانات", ai: "ذكاء اصطناعي", web: "أسعار الإنترنت",
    showAll: "عرض الكل", compare: "مقارنة", saveQuote: "حفظ كعرض سعر والتعديل",
    pricingFrom: "تسعير من", loading: "جاري...", noData: "لا تتوفر أسعار من",
    takesSec: "قد يستغرق 10-30 ثانية",
    sections: "الأقسام", items: "البنود", matched: "مطابق", totalVat: "الإجمالي شامل الضريبة", sar: "ر.س",
    readingFile: "جاري قراءة", fileRead: "تم قراءة",
    si: "توريد وتركيب", io: "تركيب فقط", so: "توريد فقط", svc: "خدمات",
    editPrices: "تعديل الأسعار", closeEdit: "إغلاق التعديل",
    approveAll: "اعتماد الكل", cancelApprove: "إلغاء اعتماد الكل",
    setScopeAll: "تحديد نطاق العمل للكل", printQuote: "طباعة عرض السعر", sendOdoo: "إرسال إلى Odoo",
    noQuotes: "لا توجد عروض أسعار", createFirst: "أنشئ تسعير جديد ثم احفظه هنا",
    draft: "مسودة", sent: "تم الإرسال", approved: "معتمد",
    desc: "الوصف", scope: "نطاق العمل", qty: "الكمية", unit: "الوحدة", unitPrice: "سعر الوحدة",
    total: "الإجمالي", status: "حالة", confidence: "الثقة", source: "المصدر", finalPrice: "السعر النهائي",
    img: "صورة", editTip: "اضغط على أي سعر من أعمدة DB/AI/Web لنسخه — غيّر نطاق العمل لكل بند",
    learned: "منتجات مُتعلَّمة تلقائياً", learnedDesc: "تتحدث تلقائياً من عروض الأسعار المعتمدة",
    addManual: "إضافة يدوية", addProduct: "إضافة منتج جديد", prodName: "اسم المنتج",
    price: "السعر", lastUpdate: "آخر تحديث", save: "حفظ", search: "ابحث عن منتج...",
    builtin: "مدمج", auto: "تلقائي", manual: "يدوي",
    terms: "الشروط والأحكام", signature: "التوقيع",
    approveFirst: "اعتمد بنود أولاً", high: "عالية", medium: "متوسطة", low: "منخفضة",
    chooseScope: "اختر نطاق العمل:\n1=توريد وتركيب\n2=تركيب فقط\n3=توريد فقط\n4=خدمات",
    sentMsg: (n, t) => `✅ تم إرسال ${n} بند إلى Odoo!\n✅ تم تحديث قاعدة الأسعار تلقائياً\nالإجمالي: ${t} ر.س`,
    quotationDate: "تاريخ العرض", quotationNo: "رقم العرض", customer: "العميل", address: "العنوان",
    deliveryDate: "تاريخ التسليم", projectTitle: "عنوان المشروع", projectCode: "كود المشروع",
    vendorCode: "كود المورد", notes: "ملاحظات", from: "من", to: "إلى", clientName: "اسم العميل",
    expiryDate: "تاريخ الانتهاء", pricelist: "قائمة الأسعار", paymentTerms: "شروط السداد",
    email: "البريد الإلكتروني", pm: "مدير المشروع", pmPhone: "هاتف المدير",
    presales: "Presales", presalesPhone: "هاتف Presales",
    progressStatus: "حالة التقدم", poNumber: "رقم أمر الشراء", poDate: "تاريخ أمر الشراء",
    totalExVat: "الإجمالي قبل الضريبة", partNo: "رقم القطعة", amount: "المبلغ",
    payTermsLabel: "شروط الدفع",
    // Print
    pQuotation: "عرض سعر", pScopeWork: "نطاق العمل:", pPayment: "الدفع:", pConditions: "الشروط:",
    defaultTerms: `نطاق العمل:\n1- هذا العرض لا يشمل رسومات ورشة أو رسومات كما بنيت، فقط رسومات خطوط حمراء.\n2- يشمل هذا العرض جميع أعمال التحميل والتفريغ والتركيب.\n3- يشمل هذا العرض جميع الأدوات المطلوبة.\n4- أي انحراف عن النطاق أعلاه يعتبر أمر تغيير مدفوع.\n5- لا يشمل هذا النطاق أي أعمال مدنية.\n\nالدفع:\n1- 100% تدريجي خلال 60 يوم من تاريخ فاتورتنا.\n2- يمكن الدفع عبر:\n- شيك باسم اتحاد الامتياز\n- تحويل بنكي لبنك الرياض حساب (2620855259940) آيبان (SA0220000002620855259940)\n\nالشروط:\n1- هذا العرض ساري لمدة شهرين.\n2- جاهزية الموقع وتصاريح الدخول مسؤولية العميل.\n3- استلام المواد والأعمال مسؤولية العميل.`,
  },
  en: {
    dir: "ltr", newPricing: "New Pricing", quotations: "Quotations", priceDb: "Price Database",
    inputBoq: "Input BOQ or Project File", uploadFile: "Upload file (PDF, Excel, Word, CSV)",
    pasteBoq: "Or paste BOQ / project description here...", analyze3: "Analyze & Price from 3 Sources",
    analyzing: "Analyzing...", scopeDetected: "Detected Scope of Work:",
    db: "Database", ai: "AI Pricing", web: "Web Prices",
    showAll: "Show All", compare: "Compare", saveQuote: "Save as Quotation & Edit",
    pricingFrom: "Pricing from", loading: "Loading...", noData: "No prices from",
    takesSec: "May take 10-30 seconds",
    sections: "Sections", items: "Items", matched: "Matched", totalVat: "Total inc. VAT", sar: "SAR",
    readingFile: "Reading", fileRead: "Read",
    si: "Supply & Install", io: "Installation Only", so: "Supply Only", svc: "Service",
    editPrices: "Edit Prices", closeEdit: "Close Editing",
    approveAll: "Approve All", cancelApprove: "Cancel Approve All",
    setScopeAll: "Set Scope for All", printQuote: "Print Quotation", sendOdoo: "Send to Odoo",
    noQuotes: "No Quotations", createFirst: "Create a new pricing and save it here",
    draft: "Draft", sent: "Sent", approved: "Approved",
    desc: "Description", scope: "Scope", qty: "QTY", unit: "Unit", unitPrice: "Unit Price",
    total: "Total", status: "Status", confidence: "Confidence", source: "Source", finalPrice: "Final Price",
    img: "Image", editTip: "Click any price from DB/AI/Web to copy as final price — change scope per item",
    learned: "Auto-Learned Products", learnedDesc: "Auto-updated from approved quotations",
    addManual: "Add Manual", addProduct: "Add New Product", prodName: "Product Name",
    price: "Price", lastUpdate: "Last Update", save: "Save", search: "Search product...",
    builtin: "Built-in", auto: "Auto", manual: "Manual",
    terms: "Terms & Conditions", signature: "Signature",
    approveFirst: "Approve items first", high: "High", medium: "Medium", low: "Low",
    chooseScope: "Choose scope:\n1=Supply & Install\n2=Installation Only\n3=Supply Only\n4=Service",
    sentMsg: (n, t) => `✅ Sent ${n} items to Odoo!\n✅ Auto-updated price database\nTotal: ${t} SAR`,
    quotationDate: "Quotation Date", quotationNo: "Quotation No", customer: "Customer", address: "Address",
    deliveryDate: "Delivery Date", projectTitle: "Project Title", projectCode: "Project Code",
    vendorCode: "Vendor Code", notes: "Notes", from: "From", to: "To", clientName: "Client Name",
    expiryDate: "Expiry Date", pricelist: "Pricelist", paymentTerms: "Payment Terms",
    email: "Email Address", pm: "Project Manager", pmPhone: "Manager Phone",
    presales: "Presales", presalesPhone: "Presales Phone",
    progressStatus: "Progress Status", poNumber: "PO Number", poDate: "PO Date",
    totalExVat: "Total (Excluded VAT)", partNo: "Part No", amount: "Amount",
    payTermsLabel: "Payment terms",
    pQuotation: "QUOTATION", pScopeWork: "Scope of Work:", pPayment: "Payment:", pConditions: "Conditions:",
    defaultTerms: `Scope of work:\n1- This proposal covers no shop or as-built drawing only red lines drawing.\n2- This proposal covers all loading unloading mounting.\n3- This proposal covers all Tools needed for the above services.\n4- Above scope is based on the given information any deviation from that is a payable change order.\n5- This scope does not include any civil works.\n\nPayment:\n1- 100% Progressive no later than 60 days from our invoice date.\n2- Payment could be processed via:\n- Check under the name of Excellency Union (اتحاد الامتياز)\n- Wire transfer to our Riyad Bank account number (2620855259940) IBAN number (SA0220000002620855259940)\n\nConditions:\n1- This proposal is valid for 2 months.\n2- Site readiness and gate pass are the responsibility of the client.\n3- Materials and works acceptance are the responsibility of the client.`,
  }
};

const scopeKey = { supply_and_install: "si", install_only: "io", supply_only: "so", service: "svc" };
const scopeIcon = { supply_and_install: "📦🔧", install_only: "🔧", supply_only: "📦", service: "🛠️" };
const scopeColor = { supply_and_install: "#059669", install_only: "#d97706", supply_only: "#2563eb", service: "#8b5cf6" };

// ========== PRICE DB ==========
const PRICE_DB = {
  security: { name: "Security Control Room", icon: "🖥️", items: [
    { id:"SCR-001",name:"CCTV Management Client",unit:"Each",price:350 },{ id:"SCR-003",name:"Monitor",unit:"Each",price:350 },
    { id:"SCR-008",name:"Card Reader (SCR)",unit:"Each",price:800 },{ id:"SCR-010",name:"NVR",unit:"Each",price:300 },
    { id:"SCR-011",name:"Storage Unit 128 TB",unit:"Each",price:500 },
  ]},
  cctv: { name: "CCTV System", icon: "📹", items: [
    { id:"CCTV-001",name:"Outdoor PTZ Camera",unit:"Each",price:1700 },{ id:"CCTV-003",name:"Outdoor Fixed Box Camera",unit:"Each",price:1000 },
    { id:"CCTV-005",name:"Indoor Fixed Dome Camera",unit:"Each",price:750 },
  ]},
  acs: { name: "Access Control", icon: "🔐", items: [
    { id:"ACS-001",name:"Advanced Central Controller",unit:"Each",price:1000 },{ id:"ACS-009",name:"Card Reader (ACS)",unit:"Each",price:1200 },
    { id:"ACS-011",name:"Electromagnetic Lock",unit:"Each",price:1000 },{ id:"ACS-012",name:"Break Glass Unit",unit:"Each",price:850 },
    { id:"ACS-013",name:"REX",unit:"Each",price:850 },{ id:"ACS-014",name:"Door Contact",unit:"Each",price:850 },
    { id:"ACS-015",name:"Suprema Fingerprint",unit:"Each",price:900 },
  ]},
  intercom: { name: "Intercom", icon: "📞", items: [
    { id:"INT-001",name:"IP Master Station",unit:"Each",price:1400 },{ id:"INT-003",name:"Intercom Sub Station",unit:"Each",price:1000 },
  ]},
  cable: { name: "Conduit & Cabling", icon: "🔌", items: [
    { id:"CC-001",name:"RGS Pipe Supply and Installation",unit:"Meter",price:90 },{ id:"CC-002",name:"Cat6 Cable",unit:"Meter",price:15 },
  ]},
  elec: { name: "Electrical", icon: "⚡", items: [
    { id:"EL-001",name:"Main Distribution Board MDB",unit:"Each",price:15000 },{ id:"EL-002",name:"Sub Distribution Board SDB",unit:"Each",price:5000 },
  ]},
};

const S = { font:"'Tajawal',sans-serif", dark:"#0a1628", navy:"#1a2d50", gold:"#c8973e", goldL:"#e8c068", bg:"#f3f5f8", white:"#fff", gray:"#7a8a9e", gl:"#e4e8ee", green:"#10b981", red:"#ef4444", blue:"#3b82f6", purple:"#8b5cf6" };

function matchDB(text, learned) {
  const l = text.toLowerCase().trim(); let best=null, bs=0;
  Object.values(PRICE_DB).forEach(c=>c.items.forEach(i=>{const n=i.name.toLowerCase();let sc=n===l?100:n.includes(l)||l.includes(n)?85:l.split(/\s+/).filter(w=>w.length>2&&n.includes(w)).length/Math.max(l.split(/\s+/).length,1)*70;if(sc>bs){bs=sc;best={...i,score:sc}}}));
  if(learned)learned.forEach(i=>{const n=i.name.toLowerCase();let sc=n===l?105:n.includes(l)||l.includes(n)?90:l.split(/\s+/).filter(w=>w.length>2&&n.includes(w)).length/Math.max(l.split(/\s+/).length,1)*75;if(sc>bs){bs=sc;best={...i,score:sc}}});
  return bs>=25?best:null;
}

const loadScript=(url)=>new Promise((r,j)=>{if(document.querySelector(`script[src="${url}"]`)){r();return}const s=document.createElement("script");s.src=url;s.onload=r;s.onerror=()=>j();document.head.appendChild(s)});

function detectScope(t){const l=t.toLowerCase();if(/installation\s*only|تركيب\s*فقط/.test(l))return"install_only";if(/supply\s*only|توريد\s*فقط/.test(l))return"supply_only";if(/supply\s*(and|&)\s*install|توريد.*(و|وتركيب)/.test(l))return"supply_and_install";if(/maintenance|service|صيانة|خدم/.test(l))return"service";if(/install|تركيب/.test(l))return"install_only";return"supply_and_install"}

function parseInput(text){const lines=text.split(/\n/).filter(l=>l.trim());const sections=[];let cur={name:"General",scope:"supply_and_install",items:[]};let hI=-1,cm={desc:-1,unit:-1,qty:-1,price:-1,pn:-1};
cur.scope=detectScope(text);
for(let i=0;i<Math.min(lines.length,10);i++){if(/item.*desc|desc.*unit.*qty|ITEM.*Part/i.test(lines[i])){hI=i;lines[i].split(",").forEach((c,idx)=>{const cl=c.trim().toLowerCase();if(/desc|item\s*desc/.test(cl))cm.desc=idx;else if(/^unit$/.test(cl))cm.unit=idx;else if(/^qty$|quant/.test(cl))cm.qty=idx;else if(/unit\s*price/.test(cl))cm.price=idx;else if(/part\s*no/.test(cl))cm.pn=idx});break}}
for(let i=hI>=0?hI+1:0;i<lines.length;i++){const l=lines[i].trim();if(!l||/^total|^المجموع/i.test(l))continue;const parts=l.split(",").map(p=>p.trim());
if(/^scope\s*:/i.test(l)||(parts.length<=2&&!/^\d/.test(parts[0]||"")&&(parts[0]||"").length>5&&!parts.some(p=>/^\d+\.?\d*$/.test(p)))){if(cur.items.length>0)sections.push(cur);cur={name:l.replace(/^scope\s*:\s*/i,"").replace(/,+/g," ").trim(),scope:detectScope(l),items:[]};continue}
if(/^-\s/.test(l)&&cur.items.length>0){cur.items[cur.items.length-1].description+=" | "+l.replace(/^-\s*/,"");continue}
const dI=cm.desc>=0?cm.desc:hI>=0?2:0;const desc=(parts[dI]||parts[0]||"").replace(/^(Low Current|Electrical)\s*/i,"").trim();
if(!desc||desc.length<3||/^BHD|^SAR|^ITEM$/i.test(desc))continue;
let qty=1;if(cm.qty>=0){const q=parseFloat(parts[cm.qty]);if(!isNaN(q)&&q>0)qty=q}else parts.forEach(p=>{const n=parseFloat(p);if(!isNaN(n)&&n>0&&n<100000&&p===String(n))qty=n});
let pr=0;if(cm.price>=0){const p=parseFloat((parts[cm.price]||"").replace(/[^0-9.]/g,""));if(!isNaN(p))pr=p}
const un=cm.unit>=0?(parts[cm.unit]||"Each").replace(/^EA$/i,"Each"):"Each";const pn=cm.pn>=0?parts[cm.pn]||"":"";
cur.items.push({id:`i-${i}-${Math.random().toString(36).substr(2,4)}`,description:pn?`${desc} (${pn})`:desc,qty,unit:un,originalPrice:pr,partNo:pn})}
if(cur.items.length>0)sections.push(cur);return sections}

async function getAIPricing(sections){
  const allItems=sections.flatMap(s=>s.items);
  const list=allItems.map((i,idx)=>`${idx+1}. ${i.description} | Qty:${i.qty} | Unit:${i.unit}`).join("\n");
  const scopeInfo=sections.map(s=>`Section "${s.name}" scope: ${s.scope}`).join("; ");
  try{
    const r=await fetch("/api/ai-price",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({items:`${scopeInfo}\n\nItems (return prices in SAME ORDER):\n${list}`,mode:"ai"})
    });
    if(!r.ok){console.error("AI API status:",r.status);return null}
    const d=await r.json();
    return d.results||null;
  }catch(e){console.error("AI pricing error:",e);return null}
}

async function getWebPricing(sections){
  const allItems=sections.flatMap(s=>s.items).slice(0,15);
  const list=allItems.map((i,idx)=>`${idx+1}. ${i.description.replace(/\(.*?\)/g,"").trim()}`).join("\n");
  try{
    const r=await fetch("/api/ai-price",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({items:`Return prices in SAME ORDER:\n${list}`,mode:"web"})
    });
    if(!r.ok){console.error("Web API status:",r.status);return null}
    const d=await r.json();
    return d.results||null;
  }catch(e){console.error("Web pricing error:",e);return null}
}

// ========== UI COMPONENTS ==========
function Header({activeTab,setActiveTab,lang,setLang,t}){return(
<div>
<div style={{background:`linear-gradient(135deg,${S.dark},${S.navy})`,padding:"16px 22px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`3px solid ${S.gold}`}}>
  <div style={{display:"flex",alignItems:"center",gap:11}}>
    <div style={{width:40,height:40,borderRadius:9,background:`linear-gradient(135deg,${S.gold},${S.goldL})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,fontWeight:900,color:S.dark,fontFamily:S.font,overflow:"hidden",padding:2}}>
      <img src={LOGO_B64} alt="EU" style={{width:"100%",height:"100%",objectFit:"contain"}} /></div>
    <div><div style={{fontSize:16,fontWeight:800,color:"#fff",fontFamily:S.font}}>Excellency Union</div><div style={{fontSize:9,color:S.gold,fontFamily:S.font,letterSpacing:2}}>AI PRICING V4</div></div>
  </div>
  <div style={{display:"flex",alignItems:"center",gap:3,background:"rgba(255,255,255,0.08)",borderRadius:7,padding:2}}>
    <button onClick={()=>setLang("ar")} style={{padding:"4px 11px",borderRadius:5,border:"none",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:S.font,background:lang==="ar"?S.gold:"transparent",color:lang==="ar"?"#fff":"#ffffff60"}}>العربية</button>
    <button onClick={()=>setLang("en")} style={{padding:"4px 11px",borderRadius:5,border:"none",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Arial",background:lang==="en"?S.gold:"transparent",color:lang==="en"?"#fff":"#ffffff60"}}>English</button>
  </div>
</div>
<div style={{background:S.white,borderBottom:`1px solid ${S.gl}`,display:"flex",padding:"0 18px",overflowX:"auto"}}>
  {[{id:"pricing",label:t.newPricing,icon:"🧮"},{id:"quotations",label:t.quotations,icon:"📋"},{id:"database",label:t.priceDb,icon:"💾"}].map(tab=>(
    <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{padding:"10px 16px",border:"none",background:"transparent",borderBottom:activeTab===tab.id?`3px solid ${S.gold}`:"3px solid transparent",color:activeTab===tab.id?S.gold:S.gray,fontWeight:activeTab===tab.id?700:500,fontSize:12,fontFamily:S.font,cursor:"pointer",display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}>{tab.icon} {tab.label}</button>
  ))}
</div></div>)}

function Results({sections,src,color,icon,label,loading,total,t,error}){
  if(loading)return(<div style={{background:S.white,borderRadius:11,border:`1px solid ${S.gl}`,padding:"35px 18px",textAlign:"center"}}><div style={{width:24,height:24,border:`3px solid ${color}30`,borderTopColor:color,borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 10px"}}/><div style={{fontSize:13,fontWeight:700,color,fontFamily:S.font}}>{icon} {t.pricingFrom} {label}...</div><div style={{fontSize:10,color:S.gray,fontFamily:S.font,marginTop:3}}>{t.takesSec}</div></div>);
  if(error)return(<div style={{background:S.white,borderRadius:11,border:`1px solid #fca5a5`,padding:"20px 18px",textAlign:"center"}}><div style={{fontSize:24,marginBottom:6}}>⚠️</div><div style={{fontSize:12,color:S.red,fontFamily:S.font,fontWeight:600}}>{icon} {t.noData} {label}</div><div style={{fontSize:10,color:S.gray,fontFamily:S.font,marginTop:4}}>حدث خطأ — An error occurred</div></div>);
  if(!sections||!sections.length)return(<div style={{background:S.white,borderRadius:11,border:`1px solid ${S.gl}`,padding:"25px 18px",textAlign:"center"}}><div style={{fontSize:12,color:S.gray,fontFamily:S.font}}>{icon} {t.noData} {label}</div></div>);
  return(<div style={{background:S.white,borderRadius:11,border:`1px solid ${S.gl}`,overflow:"hidden"}}>
  <div style={{padding:"10px 14px",borderBottom:`1px solid ${S.gl}`,display:"flex",justifyContent:"space-between",alignItems:"center",background:`${color}08`}}>
    <span style={{fontSize:12,fontWeight:700,color,fontFamily:S.font}}>{icon} {t.pricingFrom} {label}</span>
    <span style={{fontSize:14,fontWeight:900,color,fontFamily:S.font}}>{total.toLocaleString()} {t.sar}</span></div>
  <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontFamily:S.font,minWidth:450}}>
    <thead><tr style={{background:"#f7f8fa"}}>{["#",t.desc,t.qty,t.unitPrice,t.total,...(src==="ai"?[t.confidence]:src==="web"?[t.source]:[])].map((h,i)=>(<th key={i} style={{padding:"7px 8px",fontSize:9,fontWeight:700,color:S.gray,textAlign:i>1?"center":"right",borderBottom:`1px solid ${S.gl}`}}>{h}</th>))}</tr></thead>
    <tbody>{sections.flatMap(s=>s.items).map((item,i)=>(<tr key={i} style={{borderBottom:"1px solid #f2f4f6"}}>
      <td style={{padding:"6px 8px",fontSize:9,color:S.gray}}>{i+1}</td>
      <td style={{padding:"6px 8px",fontSize:11,fontWeight:600,color:S.dark}}>{item.description}{item.notes&&<div style={{fontSize:9,color:S.gray}}>{item.notes}</div>}</td>
      <td style={{padding:"6px",textAlign:"center",fontSize:11,fontWeight:600}}>{item.qty}</td>
      <td style={{padding:"6px",textAlign:"center",fontSize:11,fontWeight:700,color}}>{item.unitPrice?.toLocaleString()||0}</td>
      <td style={{padding:"6px",textAlign:"center",fontSize:11,fontWeight:800,color:S.dark}}>{((item.qty||1)*(item.unitPrice||0)).toLocaleString()}</td>
      {src==="ai"&&<td style={{padding:"6px",textAlign:"center"}}><span style={{padding:"2px 5px",borderRadius:3,fontSize:8,fontWeight:700,background:item.confidence==="high"?"#ecfdf5":item.confidence==="medium"?"#fffbeb":"#fef2f2",color:item.confidence==="high"?S.green:item.confidence==="medium"?"#d97706":S.red}}>{t[item.confidence]||item.confidence}</span></td>}
      {src==="web"&&<td style={{padding:"6px",textAlign:"center",fontSize:8,color:S.blue,maxWidth:80,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.source||"-"}</td>}
    </tr>))}</tbody></table></div></div>)
}

function PricingTab({onSave,goToQuotations,learnedItems,lang,t}){
  const[inputText,setInputText]=useState("");const[parsed,setParsed]=useState(null);
  const[dbR,setDbR]=useState(null);const[aiR,setAiR]=useState(null);const[webR,setWebR]=useState(null);
  const[lDb,setLDb]=useState(false);const[lAi,setLAi]=useState(false);const[lWeb,setLWeb]=useState(false);
  const[aiError,setAiError]=useState(false);const[webError,setWebError]=useState(false);
  const[fStatus,setFStatus]=useState("");const[fName,setFName]=useState("");const[src,setSrc]=useState("all");
  const fileRef=useRef(null);const resRef=useRef(null);

  const handleFile=async(file)=>{if(!file)return;setFName(file.name);setFStatus("loading");setInputText("");
    const r=new FileReader();const n=file.name.toLowerCase();
    if(/\.csv|\.txt|\.md$/.test(n)){r.onload=e=>{setInputText(e.target.result);setFStatus("done")};r.readAsText(file)}
    else if(/\.xlsx?$/.test(n)){r.onload=async e=>{try{await loadScript("https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js");const X=window.XLSX;const wb=X.read(new Uint8Array(e.target.result),{type:"array"});let t="";wb.SheetNames.forEach(s=>{t+=X.utils.sheet_to_csv(wb.Sheets[s])+"\n"});setInputText(t);setFStatus("done")}catch{setFStatus("error")}};r.readAsArrayBuffer(file)}
    else if(n.endsWith(".pdf")){r.onload=async e=>{try{await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js");window.pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";const pdf=await window.pdfjsLib.getDocument({data:new Uint8Array(e.target.result)}).promise;let t="";for(let i=1;i<=pdf.numPages;i++){const pg=await pdf.getPage(i);const c=await pg.getTextContent();t+=c.items.map(x=>x.str).join(" ")+"\n"}setInputText(t);setFStatus("done")}catch{setFStatus("error")}};r.readAsArrayBuffer(file)}
    else if(n.endsWith(".docx")){r.onload=async e=>{try{await loadScript("https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js");const res=await window.mammoth.extractRawText({arrayBuffer:e.target.result});setInputText(res.value);setFStatus("done")}catch{setFStatus("error")}};r.readAsArrayBuffer(file)}
    else{r.onload=e=>{setInputText(e.target.result);setFStatus("done")};r.readAsText(file)}};

  const analyze=async()=>{if(!inputText.trim())return;const secs=parseInput(inputText);setParsed(secs);setSrc("all");setAiError(false);setWebError(false);setAiR(null);setWebR(null);setTimeout(()=>resRef.current?.scrollIntoView({behavior:"smooth"}),200);
    // Flatten items for index matching
    const allItems=secs.flatMap(s=>s.items);
    setLDb(true);setTimeout(()=>{setDbR(secs.map(s=>({...s,items:s.items.map(i=>{const m=matchDB(i.description,learnedItems);return{...i,unitPrice:i.originalPrice>0?i.originalPrice:(m?.price||0),matched:!!m}})})));setLDb(false)},800);
    setLAi(true);try{const ai=await getAIPricing(secs);if(ai&&ai.length>0){let idx=0;setAiR(secs.map(s=>({...s,items:s.items.map(i=>{const aiItem=ai[idx]||ai.find(p=>{const d=(p.description||"").toLowerCase();const id=i.description.toLowerCase();return id.includes(d.split(" ")[0])||d.includes(id.split(" ")[0])||id.split(/\s+/).filter(w=>w.length>3).some(w=>d.includes(w))})||{};idx++;return{...i,unitPrice:aiItem.unitPrice||0,confidence:aiItem.confidence||"low",notes:aiItem.notes||""}})})))}else{setAiError(true)}}catch(e){console.error(e);setAiError(true)}setLAi(false);
    setLWeb(true);try{const wp=await getWebPricing(secs);if(wp&&wp.length>0){let idx=0;setWebR(secs.map(s=>({...s,items:s.items.map(i=>{const wItem=wp[idx]||wp.find(p=>{const d=(p.description||"").toLowerCase();const id=i.description.toLowerCase();return id.includes(d.split(" ")[0])||d.includes(id.split(" ")[0])||id.split(/\s+/).filter(w=>w.length>3).some(w=>d.includes(w))})||{};idx++;return{...i,unitPrice:wItem.unitPrice||0,source:wItem.source||"",notes:wItem.notes||""}})})))}else{setWebError(true)}}catch(e){console.error(e);setWebError(true)}setLWeb(false)};

  const calc=(s)=>s?s.reduce((a,sec)=>a+sec.items.reduce((b,i)=>b+(i.qty||1)*(i.unitPrice||0),0),0):0;
  const sources=[{id:"all",label:t.showAll,icon:"📊",c:S.dark},{id:"db",label:t.db,icon:"💾",c:S.green},{id:"ai",label:t.ai,icon:"🤖",c:S.purple},{id:"web",label:t.web,icon:"🌐",c:S.blue},{id:"compare",label:t.compare,icon:"⚖️",c:S.gold}];

  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{background:S.white,borderRadius:11,border:`1px solid ${S.gl}`,overflow:"hidden"}}>
      <div style={{padding:"12px 16px",borderBottom:`1px solid ${S.gl}`,display:"flex",alignItems:"center",gap:7}}><span style={{fontSize:15}}>📥</span><span style={{fontSize:13,fontWeight:700,color:S.dark,fontFamily:S.font}}>{t.inputBoq}</span></div>
      <div style={{padding:14}}>
        <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv,.txt,.pdf,.docx,.md" style={{display:"none"}} onChange={e=>{handleFile(e.target.files?.[0]);e.target.value=""}}/>
        <div onClick={()=>fileRef.current?.click()} style={{border:`2px dashed ${fStatus==="done"?S.green:S.gl}`,borderRadius:9,padding:fStatus?"10px 14px":"18px 14px",textAlign:"center",cursor:"pointer",background:fStatus==="done"?"#f0faf1":"#f9fafb",marginBottom:10}}>
          {fStatus==="loading"?<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7}}><div style={{width:14,height:14,border:`2px solid ${S.gold}40`,borderTopColor:S.gold,borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/><span style={{fontSize:11,fontWeight:600,color:S.gold,fontFamily:S.font}}>{t.readingFile} {fName}...</span></div>
          :fStatus==="done"?<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7}}><span style={{fontSize:11,fontWeight:600,color:S.green,fontFamily:S.font}}>✅ {t.fileRead} {fName}</span><button onClick={e=>{e.stopPropagation();setFStatus("");setFName("");setInputText("")}} style={{padding:"2px 7px",background:"#fee2e2",border:"1px solid #fca5a5",borderRadius:4,color:S.red,fontSize:9,cursor:"pointer",fontFamily:S.font}}>✕</button></div>
          :<><div style={{fontSize:22,marginBottom:3}}>📎</div><div style={{fontSize:11,fontWeight:600,color:S.dark,fontFamily:S.font}}>{t.uploadFile}</div></>}
        </div>
        <textarea value={inputText} onChange={e=>setInputText(e.target.value)} dir={t.dir} placeholder={t.pasteBoq} style={{width:"100%",minHeight:90,border:`1.5px solid ${S.gl}`,borderRadius:9,padding:10,fontSize:12,lineHeight:1.7,fontFamily:S.font,color:S.dark,resize:"vertical",outline:"none",boxSizing:"border-box"}} onFocus={e=>e.target.style.borderColor=S.gold} onBlur={e=>e.target.style.borderColor=S.gl}/>
        <button onClick={analyze} disabled={!inputText.trim()||lAi||lWeb} style={{marginTop:9,width:"100%",padding:"11px",background:inputText.trim()?`linear-gradient(135deg,${S.dark},${S.navy})`:"#d0d5de",color:"#fff",border:"none",borderRadius:9,fontSize:13,fontWeight:700,fontFamily:S.font,cursor:inputText.trim()?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
          {(lAi||lWeb)?<><div style={{width:14,height:14,border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite"}}/>{t.analyzing}</>:`🤖 ${t.analyze3}`}
        </button>
      </div>
    </div>

    {parsed&&(<div ref={resRef} style={{display:"flex",flexDirection:"column",gap:12}}>
      {/* Scope */}
      <div style={{background:S.white,borderRadius:9,border:`1px solid ${S.gl}`,padding:"10px 14px"}}>
        <div style={{fontSize:11,fontWeight:700,color:S.dark,fontFamily:S.font,marginBottom:6}}>📋 {t.scopeDetected}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{parsed.map((s,i)=>{const sc=scopeColor[s.scope]||"#059669";return(<div key={i} style={{padding:"5px 10px",borderRadius:7,background:`${sc}10`,border:`1px solid ${sc}30`,display:"flex",alignItems:"center",gap:5}}>
          <span style={{fontSize:12}}>{scopeIcon[s.scope]}</span><div><div style={{fontSize:10,fontWeight:700,color:sc,fontFamily:S.font}}>{s.name.substring(0,35)}</div><div style={{fontSize:9,color:S.gray,fontFamily:S.font}}>{t[scopeKey[s.scope]]} — {s.items.length} {t.items}</div></div></div>)})}</div></div>
      {/* Cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:8}}>
        {[{l:`💾 ${t.db}`,v:calc(dbR),c:S.green,ld:lDb},{l:`🤖 ${t.ai}`,v:calc(aiR),c:S.purple,ld:lAi},{l:`🌐 ${t.web}`,v:calc(webR),c:S.blue,ld:lWeb}].map((c,i)=>(<div key={i} style={{background:S.white,borderRadius:9,padding:"10px 12px",border:`1px solid ${S.gl}`,borderTop:`3px solid ${c.c}`}}>
          <div style={{fontSize:9,color:S.gray,fontFamily:S.font,marginBottom:3}}>{c.l}</div>
          {c.ld?<div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:12,height:12,border:`2px solid ${c.c}30`,borderTopColor:c.c,borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/><span style={{fontSize:10,color:S.gray,fontFamily:S.font}}>{t.loading}</span></div>
          :<div style={{fontSize:16,fontWeight:900,color:c.c,fontFamily:S.font}}>{c.v.toLocaleString()} <span style={{fontSize:9}}>{t.sar}</span></div>}
        </div>))}
      </div>
      {/* Source Tabs */}
      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{sources.map(s=>(<button key={s.id} onClick={()=>setSrc(s.id)} style={{padding:"6px 12px",border:src===s.id?`2px solid ${s.c}`:`1px solid ${S.gl}`,background:src===s.id?`${s.c}10`:S.white,borderRadius:7,fontSize:10,fontWeight:700,color:src===s.id?s.c:S.gray,fontFamily:S.font,cursor:"pointer",display:"flex",alignItems:"center",gap:3}}>{s.icon} {s.label}</button>))}</div>
      {(src==="all"||src==="db")&&<Results sections={dbR} src="db" color={S.green} icon="💾" label={t.db} loading={lDb} total={calc(dbR)} t={t}/>}
      {(src==="all"||src==="ai")&&<Results sections={aiR} src="ai" color={S.purple} icon="🤖" label={t.ai} loading={lAi} total={calc(aiR)} t={t} error={aiError}/>}
      {(src==="all"||src==="web")&&<Results sections={webR} src="web" color={S.blue} icon="🌐" label={t.web} loading={lWeb} total={calc(webR)} t={t} error={webError}/>}
      {src==="compare"&&parsed&&<div style={{background:S.white,borderRadius:11,border:`1px solid ${S.gl}`,overflow:"hidden"}}>
        <div style={{padding:"10px 14px",borderBottom:`1px solid ${S.gl}`,background:`${S.gold}08`}}><span style={{fontSize:12,fontWeight:700,color:S.gold,fontFamily:S.font}}>⚖️ {t.compare}</span></div>
        <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontFamily:S.font,minWidth:550}}>
          <thead><tr style={{background:"#f7f8fa"}}>{["#",t.desc,t.qty,`💾 ${t.db}`,`🤖 ${t.ai}`,`🌐 ${t.web}`].map((h,i)=>(<th key={i} style={{padding:"7px 7px",fontSize:9,fontWeight:700,color:S.gray,textAlign:i>1?"center":"right",borderBottom:`2px solid ${S.gl}`}}>{h}</th>))}</tr></thead>
          <tbody>{parsed.flatMap(s=>s.items).map((item,i)=>{const dp=dbR?.flatMap(s=>s.items)?.[i]?.unitPrice||0;const ap=aiR?.flatMap(s=>s.items)?.[i]?.unitPrice||0;const wp=webR?.flatMap(s=>s.items)?.[i]?.unitPrice||0;const ps=[dp,ap,wp].filter(p=>p>0);const best=ps.length?Math.min(...ps):0;
          return(<tr key={i} style={{borderBottom:"1px solid #f2f4f6"}}><td style={{padding:"6px 7px",fontSize:9,color:S.gray}}>{i+1}</td><td style={{padding:"6px 7px",fontSize:10,fontWeight:600,color:S.dark}}>{item.description}</td><td style={{padding:"6px",textAlign:"center",fontSize:11,fontWeight:600}}>{item.qty}</td>
          <td style={{padding:"6px",textAlign:"center",fontSize:11,fontWeight:700,color:dp===best&&best>0?S.green:S.dark}}>{dp>0?dp.toLocaleString():"-"}</td>
          <td style={{padding:"6px",textAlign:"center",fontSize:11,fontWeight:700,color:ap===best&&best>0?S.green:S.dark}}>{ap>0?ap.toLocaleString():lAi?"...":"-"}</td>
          <td style={{padding:"6px",textAlign:"center",fontSize:11,fontWeight:700,color:wp===best&&best>0?S.green:S.dark}}>{wp>0?wp.toLocaleString():lWeb?"...":"-"}</td></tr>)})}</tbody></table></div></div>}
      {/* Save */}
      {(dbR||aiR||webR)&&<div style={{display:"flex",justifyContent:"center",padding:"6px 0"}}><button onClick={()=>{
        const q={id:`Q-${Date.now()}`,date:new Date().toLocaleDateString(lang==="ar"?"ar-SA":"en-US"),info:{quotationDate:new Date().toISOString().split("T")[0],quotationNo:`EXUQ-${new Date().toISOString().slice(0,10)}-001`,customer:"",customerAddress:"",projectTitle:"",projectCode:"quotation",vendorCode:"",deliveryDate:"",notes:"",emailAddress:"",projectManager:"",projectManagerPhone:"",presales:"Eng. Khaled S. Shakour",presalesPhone:"+966592345364",progressStatus:"quotation",poNumber:"",poDate:"",pricelist:"",paymentTerms:"",fromName:"Eng. Khaled S. Shakour",toName:"",clientName:"",expiryDate:"",terms:t.defaultTerms},
        sections:parsed,dbPricing:dbR,aiPricing:aiR,webPricing:webR,status:"draft",
        items:(dbR||parsed||[]).flatMap((s,sI)=>s.items.map(i=>({...i,dbPrice:0,aiPrice:0,webPrice:0,finalPrice:i.unitPrice||0,approved:false,scope:parsed?.[sI]?.scope||"supply_and_install"})))};
        q.items.forEach((item,idx)=>{item.dbPrice=dbR?.flatMap(s=>s.items)?.[idx]?.unitPrice||0;item.aiPrice=aiR?.flatMap(s=>s.items)?.[idx]?.unitPrice||0;item.webPrice=webR?.flatMap(s=>s.items)?.[idx]?.unitPrice||0;item.finalPrice=item.dbPrice||item.aiPrice||item.webPrice||0});
        onSave(q);goToQuotations()}} style={{padding:"10px 28px",background:`linear-gradient(135deg,${S.gold},${S.goldL})`,color:"#fff",border:"none",borderRadius:9,fontSize:13,fontWeight:700,fontFamily:S.font,cursor:"pointer",display:"flex",alignItems:"center",gap:7}}>📋 {t.saveQuote}</button></div>}
    </div>)}
  </div>)
}

function QuotationsTab({quotations,setQuotations,onLearn,onDelete,lang,t}){
  const[editId,setEditId]=useState(null);
  const upItem=(qId,i,f,v)=>setQuotations(p=>p.map(q=>q.id===qId?{...q,items:q.items.map((it,idx)=>idx===i?{...it,[f]:v}:it)}:q));
  const upInfo=(qId,f,v)=>setQuotations(p=>p.map(q=>q.id===qId?{...q,info:{...q.info,[f]:v}}:q));
  const toggleApprove=(qId,i)=>setQuotations(p=>p.map(q=>q.id===qId?{...q,items:q.items.map((it,idx)=>idx===i?{...it,approved:!it.approved}:it)}:q));
  const approveAll=(qId)=>setQuotations(p=>p.map(q=>{if(q.id!==qId)return q;const all=q.items.every(i=>i.approved);return{...q,items:q.items.map(i=>({...i,approved:!all}))}}));
  const sendOdoo=(q)=>{const ap=q.items.filter(i=>i.approved);if(!ap.length){alert(t.approveFirst);return}onLearn(ap);
    // Generate CSV for Odoo import (sale.order.line format)
    const headers=["product_id","name","product_uom_qty","product_uom","price_unit"];
    const csvRows=[headers.join(",")];
    ap.forEach(item=>{
      const row=[
        '"Low Current"', // product = Low Current for all
        `"${(item.description||"").replace(/"/g,'""')}"`, // name = description
        item.qty||1, // product_uom_qty
        `"${item.unit==="Meter"?"m":"Units"}"`, // product_uom
        item.finalPrice||0, // price_unit
      ];
      csvRows.push(row.join(","));
    });
    const csvContent=csvRows.join("\n");
    
    // Also generate Excel-compatible format
    const xlsRows=[["المنتج","الوصف","الكمية","وحدة القياس","سعر الوحدة","غير شامل الضريبة"]];
    ap.forEach(item=>{
      xlsRows.push(["Low Current",item.description||"",item.qty||1,item.unit||"Each",item.finalPrice||0,(item.qty||1)*(item.finalPrice||0)]);
    });
    const total=ap.reduce((s,i)=>s+i.qty*i.finalPrice,0);
    xlsRows.push(["","","","",lang==="ar"?"الإجمالي:":"Total:",total]);
    
    // Download CSV
    const blob=new Blob(["\uFEFF"+csvContent],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download=`odoo-import-${(q.info?.quotationNo||q.id).replace(/[^a-zA-Z0-9-]/g,"_")}.csv`;
    document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
    
    setQuotations(p=>p.map(qo=>qo.id===q.id?{...qo,status:"sent"}:qo));
    alert(t.sentMsg(ap.length,total.toLocaleString()));
  };

  if(!quotations.length)return(<div style={{background:S.white,borderRadius:11,border:`1px solid ${S.gl}`,padding:35,textAlign:"center"}}><div style={{fontSize:36,marginBottom:10}}>📋</div><div style={{fontSize:15,fontWeight:700,color:S.dark,fontFamily:S.font}}>{t.noQuotes}</div><div style={{fontSize:11,color:S.gray,fontFamily:S.font,marginTop:5}}>{t.createFirst}</div></div>);

  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
    {quotations.map(q=>{const total=q.items.reduce((s,i)=>s+i.qty*i.finalPrice,0);const appCt=q.items.filter(i=>i.approved).length;const isEdit=editId===q.id;const info=q.info||{};
    return(<div key={q.id} style={{background:S.white,borderRadius:11,border:`1px solid ${S.gl}`,overflow:"hidden"}}>
      {/* Header */}
      <div style={{padding:"12px 16px",borderBottom:`1px solid ${S.gl}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:7,background:`${S.gold}05`}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:18}}>{q.status==="sent"?"✅":"📋"}</span><div><div style={{fontSize:13,fontWeight:700,color:S.dark,fontFamily:S.font}}>{info.quotationNo||q.id}</div><div style={{fontSize:10,color:S.gray,fontFamily:S.font}}>{q.date} — {q.items.length} {t.items} — {appCt} {t.approved}</div></div></div>
        <div style={{display:"flex",gap:5,alignItems:"center"}}>
          <span style={{padding:"3px 9px",borderRadius:5,fontSize:10,fontWeight:700,fontFamily:S.font,background:q.status==="sent"?"#ecfdf5":"#fffbeb",color:q.status==="sent"?S.green:"#d97706"}}>{q.status==="sent"?`✅ ${t.sent}`:`⏳ ${t.draft}`}</span>
          <span style={{fontSize:14,fontWeight:900,color:S.gold,fontFamily:S.font}}>{total.toLocaleString()} {t.sar}</span>
          <button onClick={()=>{if(confirm(lang==="ar"?"حذف هذا العرض؟":"Delete this quotation?"))onDelete(q.id)}} style={{padding:"3px 8px",background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:5,color:S.red,fontSize:11,cursor:"pointer",fontFamily:S.font}}>🗑️</button>
        </div>
      </div>

      {/* Info Form */}
      <div style={{padding:"12px 16px",borderBottom:`1px solid ${S.gl}`,background:"#fafbfc"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,border:`1px solid ${S.gl}`,borderRadius:7,overflow:"hidden"}}>
          {[[{k:"quotationDate",l:t.quotationDate},{k:"quotationNo",l:t.quotationNo},{k:"customer",l:t.customer},{k:"customerAddress",l:t.address},{k:"deliveryDate",l:t.deliveryDate},{k:"projectTitle",l:t.projectTitle},{k:"projectCode",l:t.projectCode},{k:"fromName",l:t.from},{k:"toName",l:t.to},{k:"clientName",l:t.clientName}],
            [{k:"expiryDate",l:t.expiryDate},{k:"pricelist",l:t.pricelist},{k:"paymentTerms",l:t.paymentTerms},{k:"emailAddress",l:t.email},{k:"projectManager",l:t.pm},{k:"presales",l:t.presales},{k:"progressStatus",l:t.progressStatus},{k:"poNumber",l:t.poNumber},{k:"poDate",l:t.poDate},{k:"notes",l:t.notes}]
          ].map((col,cI)=>(<div key={cI} style={{borderRight:cI===0?`1px solid ${S.gl}`:"none"}}>{col.map((f,fI)=>(<div key={f.k} style={{display:"flex",alignItems:"center",borderBottom:fI<col.length-1?`1px solid ${S.gl}`:"none",minHeight:30}}>
            <div style={{width:110,padding:"5px 8px",fontSize:9,fontWeight:700,color:S.dark,fontFamily:S.font,background:"#f0f2f5",borderRight:`1px solid ${S.gl}`,flexShrink:0,minHeight:30,display:"flex",alignItems:"center"}}>{f.l}</div>
            <input value={info[f.k]||""} onChange={e=>upInfo(q.id,f.k,e.target.value)} style={{flex:1,border:"none",padding:"5px 8px",fontSize:10,fontFamily:S.font,color:S.dark,outline:"none",background:"transparent",minHeight:30}}/>
          </div>))}</div>))}
        </div>
        {/* Terms */}
        <div style={{marginTop:10}}><div style={{fontSize:11,fontWeight:700,color:S.dark,fontFamily:S.font,marginBottom:5}}>📝 {t.terms}:</div>
          <textarea value={info.terms||t.defaultTerms} onChange={e=>upInfo(q.id,"terms",e.target.value)} dir={t.dir} style={{width:"100%",minHeight:120,border:`1px solid ${S.gl}`,borderRadius:7,padding:10,fontSize:10,lineHeight:1.7,fontFamily:S.font,color:S.dark,resize:"vertical",outline:"none",boxSizing:"border-box"}}/></div>
      </div>

      {/* Actions */}
      <div style={{padding:"9px 16px",borderBottom:`1px solid ${S.gl}`,display:"flex",gap:5,flexWrap:"wrap"}}>
        <button onClick={()=>setEditId(isEdit?null:q.id)} style={{padding:"5px 12px",background:isEdit?S.gold:`${S.gold}10`,border:`1px solid ${S.gold}40`,borderRadius:5,color:isEdit?"#fff":S.gold,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:S.font}}>{isEdit?`💾 ${t.closeEdit}`:`✏️ ${t.editPrices}`}</button>
        <button onClick={()=>approveAll(q.id)} style={{padding:"5px 12px",background:`${S.green}10`,border:`1px solid ${S.green}40`,borderRadius:5,color:S.green,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:S.font}}>{q.items.every(i=>i.approved)?`↩ ${t.cancelApprove}`:`✅ ${t.approveAll}`}</button>
        <button onClick={()=>{const r=prompt(t.chooseScope);const m={"1":"supply_and_install","2":"install_only","3":"supply_only","4":"service"};if(m[r])setQuotations(p=>p.map(qo=>qo.id===q.id?{...qo,items:qo.items.map(i=>({...i,scope:m[r]}))}:qo))}} style={{padding:"5px 12px",background:"#f5f3ff",border:"1px solid #c4b5fd",borderRadius:5,color:S.purple,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:S.font}}>📋 {t.setScopeAll}</button>
        {/* PRINT */}
        <button onClick={()=>{
          const pi=q.items.filter(i=>i.approved);if(!pi.length){alert(t.approveFirst);return}
          const tot=pi.reduce((s,i)=>s+i.qty*i.finalPrice,0);const vat=tot*0.15;
          const sl=(sc)=>t[scopeKey[sc]]||t.si;
          const infoFields=[
            [t.quotationDate,info.quotationDate],[t.quotationNo,info.quotationNo||q.id],[t.projectTitle,info.projectTitle],
            [t.from,info.fromName],[t.to,info.toName],[t.clientName,info.clientName||info.customer],
            [t.customer,info.customer],[t.email,info.emailAddress],[t.pm,info.projectManager],
            [t.presales,info.presales],[t.poNumber,info.poNumber],[t.deliveryDate,info.deliveryDate],
          ].filter(([_,v])=>v&&v.trim());
          const w=window.open("","_blank");
          w.document.write(`<!DOCTYPE html><html dir="${t.dir}"><head><meta charset="utf-8"><title>${t.pQuotation} - EU</title>
          <style>@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;600;700;800&display=swap');
          *{box-sizing:border-box;margin:0;padding:0}body{font-family:'Tajawal',Arial,sans-serif;padding:25px 35px;color:#222;font-size:12px;line-height:1.5}
          .hdr{text-align:${lang==="ar"?"right":"right"};margin-bottom:10px;padding-bottom:15px;border-bottom:2px solid #333}
          .hdr h1{font-size:22px;font-weight:900}.hdr .sub{font-size:13px;color:#555}.hdr .ar{font-size:16px;font-family:'Tajawal'}.hdr .vat{font-size:11px;color:#666;margin-top:4px}
          .qtitle{text-align:center;font-size:22px;font-style:italic;font-weight:700;margin:16px 0 12px}
          .info{display:grid;grid-template-columns:auto 1fr auto 1fr;gap:0;font-size:11px;margin-bottom:14px}.info .l{font-weight:700;padding:3px 6px}.info .v{padding:3px 6px}
          table{width:100%;border-collapse:collapse;margin:10px 0}th{border:1px solid #999;padding:6px 8px;font-size:10px;font-weight:700;text-align:center;background:#f0f0f0}
          td{border:1px solid #ccc;padding:5px 8px;font-size:11px}.amt{text-align:right;font-weight:700}.dsc{text-align:left}
          .stag{display:inline-block;padding:1px 5px;border-radius:3px;font-size:9px;font-weight:700;background:#eee}
          .tot td{font-weight:800;background:#f8f8f8}.terms{margin:14px 0;font-size:11px;line-height:1.7;white-space:pre-line}
          .ftr{margin-top:18px;font-size:10px;color:#666;text-align:center;border-top:2px solid #333;padding-top:10px}
          @media print{body{padding:15px 25px}}</style></head><body>
          <div class="hdr"><div style="display:flex;justify-content:space-between;align-items:center"><div><h1>EXCELLENCY UNION CO. LTD.</h1><div class="sub">COMPANY ITTIHAD ALILIMTIYAZ FOR CONTRACTING</div><div class="ar">شركة اتحاد الامتياز للمقاولات</div><div class="vat">Vat 310212200200003 - CR: 1010368398</div></div><img src="${LOGO_B64}" alt="Logo" style="height:60px;object-fit:contain"/></div></div>
          ${info.customer?`<div style="text-align:right;margin:12px 0;font-size:11px">${info.customer}<br>${info.customerAddress||""}</div>`:""}
          <div class="qtitle">${t.pQuotation}</div>
          <div class="info">${infoFields.map(([l,v])=>`<span class="l">${l}:</span><span class="v">${v}</span>`).join("")}</div>
          <table><thead><tr><th>${t.desc}</th><th>${t.scope}</th><th>${t.qty}</th><th>${t.unitPrice}</th><th>${t.amount}</th></tr></thead><tbody>
          ${pi.map(i=>`<tr><td class="dsc">${i.description}</td><td style="text-align:center"><span class="stag">${sl(i.scope)}</span></td><td style="text-align:center">${i.qty.toFixed(2)} ${i.unit||"Each"}</td><td class="amt">${i.finalPrice.toLocaleString("en",{minimumFractionDigits:2})}</td><td class="amt">${(i.qty*i.finalPrice).toLocaleString("en",{minimumFractionDigits:2})}</td></tr>`).join("")}
          <tr class="tot"><td colspan="3"></td><td style="text-align:center;font-weight:700">${t.totalExVat}</td><td class="amt">${tot.toLocaleString("en",{minimumFractionDigits:2})}</td></tr></tbody></table>
          <div class="terms">${(info.terms||t.defaultTerms).replace(/\n/g,"<br>")}</div>
          ${info.paymentTerms?`<p style="font-size:11px">${t.payTermsLabel}: ${info.paymentTerms}</p>`:""}
          <div class="ftr">Vat 310212200200003 - CR: 1010368398<br><strong>EXCELLENCY UNION CO. LTD.</strong><br>شركة اتحاد الامتياز للمقاولات</div>
          <script>setTimeout(()=>window.print(),500)<\/script></body></html>`);w.document.close()
        }} style={{padding:"5px 12px",background:`linear-gradient(135deg,${S.dark},${S.navy})`,border:"none",borderRadius:5,color:"#fff",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:S.font}}>🖨️ {t.printQuote}</button>
        {q.status!=="sent"&&<button onClick={()=>sendOdoo(q)} style={{padding:"5px 12px",background:`linear-gradient(135deg,${S.green},#34d399)`,border:"none",borderRadius:5,color:"#fff",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:S.font}}>🚀 {t.sendOdoo} (CSV)</button>}
      </div>

      {/* Items Table */}
      <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontFamily:S.font,minWidth:700}}>
        <thead><tr style={{background:"#f7f8fa"}}>{["✓","#",t.desc,t.scope,t.qty,`💾`,`🤖`,`🌐`,t.finalPrice,t.total].map((h,i)=>(<th key={i} style={{padding:"7px 5px",fontSize:9,fontWeight:700,color:S.gray,textAlign:"center",borderBottom:`2px solid ${S.gl}`,whiteSpace:"nowrap"}}>{h}</th>))}</tr></thead>
        <tbody>{q.items.map((item,iI)=>{const sc=scopeColor[item.scope]||"#059669";return(
          <tr key={iI} style={{borderBottom:"1px solid #f2f4f6",background:item.approved?"#f0faf108":""}}>
            <td style={{padding:"5px",textAlign:"center"}}><input type="checkbox" checked={item.approved} onChange={()=>toggleApprove(q.id,iI)} style={{width:15,height:15,cursor:"pointer",accentColor:S.green}}/></td>
            <td style={{padding:"5px",fontSize:9,color:S.gray,textAlign:"center"}}>{iI+1}</td>
            <td style={{padding:"5px 7px",fontSize:10,fontWeight:600,color:S.dark,textAlign:"right",maxWidth:170}}>{item.description}</td>
            <td style={{padding:"4px",textAlign:"center"}}>{isEdit?<select value={item.scope||"supply_and_install"} onChange={e=>upItem(q.id,iI,"scope",e.target.value)} style={{padding:"3px",border:`1.5px solid ${sc}`,borderRadius:4,fontSize:8,fontWeight:700,fontFamily:S.font,outline:"none",color:sc,background:`${sc}10`,cursor:"pointer"}}>
              <option value="supply_and_install">{t.si}</option><option value="install_only">{t.io}</option><option value="supply_only">{t.so}</option><option value="service">{t.svc}</option></select>
              :<span style={{padding:"2px 5px",borderRadius:4,fontSize:8,fontWeight:700,fontFamily:S.font,background:`${sc}12`,color:sc,whiteSpace:"nowrap"}}>{scopeIcon[item.scope]} {t[scopeKey[item.scope]]}</span>}</td>
            <td style={{padding:"5px",textAlign:"center",fontSize:11,fontWeight:600}}>{item.qty}</td>
            <td style={{padding:"5px",textAlign:"center",fontSize:10,color:S.green,cursor:isEdit?"pointer":"default"}} onClick={()=>isEdit&&upItem(q.id,iI,"finalPrice",item.dbPrice)}>{item.dbPrice>0?item.dbPrice.toLocaleString():"-"}</td>
            <td style={{padding:"5px",textAlign:"center",fontSize:10,color:S.purple,cursor:isEdit?"pointer":"default"}} onClick={()=>isEdit&&upItem(q.id,iI,"finalPrice",item.aiPrice)}>{item.aiPrice>0?item.aiPrice.toLocaleString():"-"}</td>
            <td style={{padding:"5px",textAlign:"center",fontSize:10,color:S.blue,cursor:isEdit?"pointer":"default"}} onClick={()=>isEdit&&upItem(q.id,iI,"finalPrice",item.webPrice)}>{item.webPrice>0?item.webPrice.toLocaleString():"-"}</td>
            <td style={{padding:"5px",textAlign:"center"}}>{isEdit?<input type="number" value={item.finalPrice} onChange={e=>upItem(q.id,iI,"finalPrice",Number(e.target.value))} style={{width:65,padding:"3px",border:`2px solid ${S.gold}`,borderRadius:5,textAlign:"center",fontSize:11,fontFamily:S.font,fontWeight:700,outline:"none",color:S.gold}}/>:<span style={{fontSize:12,fontWeight:800,color:S.gold}}>{item.finalPrice.toLocaleString()}</span>}</td>
            <td style={{padding:"5px",textAlign:"center",fontSize:11,fontWeight:800,color:S.dark}}>{(item.qty*item.finalPrice).toLocaleString()}</td>
          </tr>)})}</tbody></table></div>
      {isEdit&&<div style={{padding:"8px 16px",background:"#fffbeb",borderTop:`1px solid ${S.gl}`,fontSize:10,color:"#92400e",fontFamily:S.font}}>💡 {t.editTip}</div>}
    </div>)})}
  </div>)
}

function DatabaseTab({learnedItems,onAdd,onDelete,onUpdate,onImport,onReset,lang,t}){
  const[search,setSearch]=useState("");const[showAdd,setShowAdd]=useState(false);const[ni,setNi]=useState({name:"",unit:"Each",price:0,partNo:""});
  const[importing,setImporting]=useState(false);const[importResult,setImportResult]=useState(null);
  const importRef=useRef(null);
  const fl=learnedItems.filter(i=>!search||i.name.toLowerCase().includes(search.toLowerCase()));

  const handleImportFile=async(file)=>{
    if(!file)return;setImporting(true);setImportResult(null);
    const r=new FileReader();const n=file.name.toLowerCase();
    const processText=(text)=>{
      const items=parseOldQuotation(text);
      if(items.length>0){onImport(items);setImportResult({success:true,count:items.length})}
      else{setImportResult({success:false,count:0})}
      setImporting(false);
    };
    if(/\.csv|\.txt|\.md$/.test(n)){r.onload=e=>processText(e.target.result);r.readAsText(file)}
    else if(/\.xlsx?$/.test(n)){r.onload=async e=>{try{await loadScript("https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js");const X=window.XLSX;const wb=X.read(new Uint8Array(e.target.result),{type:"array"});let t="";wb.SheetNames.forEach(s=>{t+=X.utils.sheet_to_csv(wb.Sheets[s])+"\n"});processText(t)}catch{setImporting(false);setImportResult({success:false,count:0})}};r.readAsArrayBuffer(file)}
    else if(n.endsWith(".pdf")){r.onload=async e=>{try{await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js");window.pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";const pdf=await window.pdfjsLib.getDocument({data:new Uint8Array(e.target.result)}).promise;let t="";for(let i=1;i<=pdf.numPages;i++){const pg=await pdf.getPage(i);const c=await pg.getTextContent();t+=c.items.map(x=>x.str).join(" ")+"\n"}processText(t)}catch{setImporting(false);setImportResult({success:false,count:0})}};r.readAsArrayBuffer(file)}
    else{r.onload=e=>processText(e.target.result);r.readAsText(file)}
  };

  return(<div style={{display:"flex",flexDirection:"column",gap:10}}>
    <div style={{background:S.white,borderRadius:9,border:`1px solid ${S.gl}`,padding:"10px 12px",display:"flex",alignItems:"center",gap:7,flexWrap:"wrap"}}>
      <span>🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search} dir={t.dir} style={{flex:1,minWidth:120,border:"none",outline:"none",fontSize:12,fontFamily:S.font}}/>
      <span style={{fontSize:10,color:S.gray,fontFamily:S.font}}>{Object.values(PRICE_DB).reduce((s,c)=>s+c.items.length,0)+learnedItems.length}</span>
      <button onClick={()=>setShowAdd(!showAdd)} style={{padding:"4px 10px",background:`${S.green}10`,border:`1px solid ${S.green}40`,borderRadius:5,color:S.green,fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:S.font}}>+ {t.addManual}</button>
    </div>

    {/* Import Old Quotations */}
    <div style={{background:S.white,borderRadius:9,border:`1px solid ${S.purple}30`,padding:14}}>
      <input ref={importRef} type="file" accept=".pdf,.xlsx,.xls,.csv,.txt,.docx" style={{display:"none"}} onChange={e=>{handleImportFile(e.target.files?.[0]);e.target.value=""}}/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
        <div>
          <div style={{fontSize:12,fontWeight:700,color:S.purple,fontFamily:S.font}}>📚 {lang==="ar"?"رفع تسعيرات سابقة لتعليم القاعدة":"Upload Old Quotations to Train Database"}</div>
          <div style={{fontSize:10,color:S.gray,fontFamily:S.font,marginTop:2}}>{lang==="ar"?"ارفع ملفات تسعيرات قديمة (PDF, Excel, CSV) وسيتم استخراج الأسعار تلقائياً":"Upload old quotation files (PDF, Excel, CSV) and prices will be extracted automatically"}</div>
        </div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>importRef.current?.click()} disabled={importing} style={{padding:"7px 16px",background:importing?"#ddd":`linear-gradient(135deg,${S.purple},#a78bfa)`,border:"none",borderRadius:7,color:"#fff",fontSize:11,fontWeight:700,cursor:importing?"not-allowed":"pointer",fontFamily:S.font,display:"flex",alignItems:"center",gap:5}}>
            {importing?<><div style={{width:12,height:12,border:"2px solid #fff3",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite"}}/>...</>:"📎 "+(lang==="ar"?"رفع ملف تسعيرة":"Upload Quotation File")}
          </button>
          <button onClick={onReset} style={{padding:"7px 12px",background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:7,color:S.red,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:S.font}}>🗑️ {lang==="ar"?"مسح الكل":"Reset All"}</button>
        </div>
      </div>
      {importResult&&(<div style={{marginTop:8,padding:"8px 12px",borderRadius:6,fontSize:11,fontWeight:600,fontFamily:S.font,background:importResult.success?"#ecfdf5":"#fef2f2",color:importResult.success?S.green:S.red}}>
        {importResult.success?`✅ ${lang==="ar"?"تم استيراد":"Imported"} ${importResult.count} ${lang==="ar"?"بند بنجاح":"items successfully"}`:`⚠️ ${lang==="ar"?"لم يتم العثور على بنود بأسعار — تأكد من صيغة الملف":"No priced items found — check file format"}`}
      </div>)}
    </div>

    {/* Stats */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:8}}>
      {[
        {l:lang==="ar"?"📊 إجمالي البنود":"📊 Total Items",v:Object.values(PRICE_DB).reduce((s,c)=>s+c.items.length,0)+learnedItems.length,c:S.dark},
        {l:lang==="ar"?"🧠 متعلَّمة تلقائياً":"🧠 Auto-Learned",v:learnedItems.filter(i=>i.source==="learned").length,c:S.purple},
        {l:lang==="ar"?"📚 مستوردة":"📚 Imported",v:learnedItems.filter(i=>i.source==="imported").length,c:S.blue},
        {l:lang==="ar"?"✏️ يدوية":"✏️ Manual",v:learnedItems.filter(i=>i.source==="manual").length,c:S.green},
      ].map((c,i)=>(<div key={i} style={{background:S.white,borderRadius:8,padding:"9px 12px",border:`1px solid ${S.gl}`}}>
        <div style={{fontSize:9,color:S.gray,fontFamily:S.font}}>{c.l}</div>
        <div style={{fontSize:18,fontWeight:900,color:c.c,fontFamily:S.font}}>{c.v}</div>
      </div>))}
    </div>
    {showAdd&&<div style={{background:S.white,borderRadius:9,border:`1px solid ${S.green}40`,padding:12}}>
      <div style={{fontSize:11,fontWeight:700,color:S.green,fontFamily:S.font,marginBottom:8}}>➕ {t.addProduct}</div>
      <div style={{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center"}}>
        <input placeholder={t.prodName} value={ni.name} onChange={e=>setNi(p=>({...p,name:e.target.value}))} style={{flex:1,minWidth:150,padding:"5px 8px",border:`1px solid ${S.gl}`,borderRadius:5,fontSize:11,fontFamily:S.font,outline:"none"}}/>
        <select value={ni.unit} onChange={e=>setNi(p=>({...p,unit:e.target.value}))} style={{padding:"5px",border:`1px solid ${S.gl}`,borderRadius:5,fontSize:10,fontFamily:S.font}}>{["Each","Meter","Set","Lot"].map(u=><option key={u}>{u}</option>)}</select>
        <input type="number" placeholder={t.price} value={ni.price||""} onChange={e=>setNi(p=>({...p,price:Number(e.target.value)}))} style={{width:75,padding:"5px",border:`1px solid ${S.gl}`,borderRadius:5,fontSize:11,fontFamily:S.font,outline:"none",textAlign:"center"}}/>
        <button onClick={()=>{if(!ni.name||!ni.price){alert("!");return}onAdd(ni);setNi({name:"",unit:"Each",price:0,partNo:""});setShowAdd(false)}} style={{padding:"5px 12px",background:S.green,border:"none",borderRadius:5,color:"#fff",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:S.font}}>{t.save}</button>
      </div></div>}
    {fl.length>0&&<div style={{background:S.white,borderRadius:9,border:`1px solid ${S.gl}`,overflow:"hidden"}}>
      <div style={{padding:"9px 12px",background:`${S.purple}08`,borderBottom:`1px solid ${S.gl}`,display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,fontWeight:700,color:S.purple,fontFamily:S.font}}>🧠 {t.learned} ({fl.length})</span><span style={{fontSize:9,color:S.gray,fontFamily:S.font}}>{t.learnedDesc}</span></div>
      <table style={{width:"100%",borderCollapse:"collapse",fontFamily:S.font}}><tbody>{fl.map(item=>(<tr key={item.id} style={{borderBottom:"1px solid #f2f4f6"}}>
        <td style={{padding:"5px 8px",fontSize:9,color:S.purple,fontWeight:600,width:60}}>{item.id}</td>
        <td style={{padding:"5px 8px",fontSize:10,fontWeight:600,color:S.dark}}>{item.name}</td>
        <td style={{padding:"5px",fontSize:9,color:S.gray,width:45}}>{item.unit}</td>
        <td style={{padding:"5px",textAlign:"center",width:70}}><input type="number" value={item.price} onChange={e=>onUpdate(item.id,"price",Number(e.target.value))} style={{width:60,padding:"2px 4px",border:`1px solid ${S.gl}`,borderRadius:3,textAlign:"center",fontSize:11,fontFamily:S.font,fontWeight:800,color:S.gold,outline:"none"}}/></td>
        <td style={{padding:"5px",fontSize:8,color:S.gray,width:65}}>{item.lastUpdated}</td>
        <td style={{padding:"5px",textAlign:"center",width:50}}><span style={{padding:"1px 5px",borderRadius:3,fontSize:8,fontWeight:700,background:item.source==="learned"?`${S.purple}12`:`${S.blue}12`,color:item.source==="learned"?S.purple:S.blue}}>{item.source==="learned"?`🧠 ${t.auto}`:`✏️ ${t.manual}`}</span></td>
        <td style={{padding:"5px",width:25}}><button onClick={()=>onDelete(item.id)} style={{background:"none",border:"none",color:"#ddd",cursor:"pointer",fontSize:12}} onMouseEnter={e=>e.target.style.color=S.red} onMouseLeave={e=>e.target.style.color="#ddd"}>×</button></td>
      </tr>))}</tbody></table></div>}
    {Object.entries(PRICE_DB).map(([k,cat])=>{const items=cat.items.filter(i=>!search||i.name.toLowerCase().includes(search.toLowerCase()));if(search&&!items.length)return null;return(
      <div key={k} style={{background:S.white,borderRadius:9,border:`1px solid ${S.gl}`,overflow:"hidden"}}>
        <div style={{padding:"8px 12px",background:`${S.dark}05`,borderBottom:`1px solid ${S.gl}`,display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,fontWeight:700,color:S.dark,fontFamily:S.font}}>{cat.icon} {cat.name}</span><span style={{fontSize:9,color:S.gray,fontFamily:S.font}}>{items.length} — {t.builtin}</span></div>
        <table style={{width:"100%",borderCollapse:"collapse",fontFamily:S.font}}><tbody>{items.map(i=>(<tr key={i.id} style={{borderBottom:"1px solid #f2f4f6"}}>
          <td style={{padding:"5px 8px",fontSize:9,color:S.blue,fontWeight:600,width:60}}>{i.id}</td><td style={{padding:"5px 8px",fontSize:10,fontWeight:600,color:S.dark}}>{i.name}</td>
          <td style={{padding:"5px",fontSize:9,color:S.gray,width:45}}>{i.unit}</td><td style={{padding:"5px 8px",fontSize:11,fontWeight:800,color:S.gold,width:60,textAlign:"center"}}>{i.price.toLocaleString()}</td>
        </tr>))}</tbody></table></div>)})}
  </div>)
}

// ========== PERSISTENT STORAGE ==========
async function storageGet(key) {
  try {
    if (typeof window !== "undefined" && window.storage) {
      const r = await window.storage.get(key);
      return r ? JSON.parse(r.value) : null;
    }
  } catch (e) { console.log("Storage get error:", e); }
  // Fallback to memory
  return window["__mem_" + key] || null;
}

async function storageSet(key, value) {
  try {
    if (typeof window !== "undefined" && window.storage) {
      await window.storage.set(key, JSON.stringify(value));
      return;
    }
  } catch (e) { console.log("Storage set error:", e); }
  window["__mem_" + key] = value;
}

// Parse uploaded old quotation files to learn prices
function parseOldQuotation(text) {
  const items = [];
  const lines = text.split(/\n/).filter(l => l.trim());
  
  // Method 1: Try CSV/Excel format with headers
  let headerIdx = -1;
  let colMap = { desc: -1, qty: -1, price: -1, unit: -1, partNo: -1, amount: -1 };
  
  for (let i = 0; i < Math.min(lines.length, 15); i++) {
    const l = lines[i].toLowerCase();
    if (/desc.*qty|desc.*price|item.*price|description.*quantity|الوصف.*الكمية|description.*unit\s*price/i.test(l)) {
      headerIdx = i;
      l.split(/[,\t|]+/).forEach((c, idx) => {
        const cl = c.trim();
        if (/desc|الوصف|item\s*desc|بند/.test(cl)) colMap.desc = idx;
        else if (/^qty|كمية|quantity/.test(cl)) colMap.qty = idx;
        else if (/unit\s*price|سعر الوحدة/.test(cl) && !/total/.test(cl)) colMap.price = idx;
        else if (/^unit$|الوحدة/.test(cl)) colMap.unit = idx;
        else if (/part|رقم/.test(cl)) colMap.partNo = idx;
        else if (/amount|total\s*price|الإجمالي|المبلغ/.test(cl)) colMap.amount = idx;
      });
      break;
    }
  }

  // Method 2: PDF quotation pattern detection
  // Pattern: "Description" line followed by "qty unit" line followed by "price" line followed by "amount" line
  let inTable = false;
  let pendingDesc = null;
  
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (!l) continue;
    
    // Skip headers and footer sections
    if (/^(DESCRIPTION|QUANTITY|UNIT PRICE|AMOUNT|Total|Scope|Payment|Condition|EXCELLENCY|COMPANY|Vat |CR:|SIEMENS|Quotation|From:|To:|Project|Client|Payment terms)/i.test(l)) {
      if (/^DESCRIPTION/i.test(l)) inTable = true;
      if (/^(Total|Scope|Payment)/i.test(l)) inTable = false;
      continue;
    }
    
    if (inTable || headerIdx < 0) {
      // Check if line matches "number.number Unit" pattern (qty line)
      const qtyMatch = l.match(/^([\d,.]+)\s*(Each|EA|Meter|Set|Lot|عدد|م\.ط)/i);
      if (qtyMatch && pendingDesc) {
        const qty = parseFloat(qtyMatch[1].replace(/,/g, ""));
        const unit = qtyMatch[2].replace(/^EA$/i, "Each");
        // Next line(s) should be price and amount
        let price = 0, amount = 0;
        for (let j = i + 1; j < Math.min(i + 3, lines.length); j++) {
          const numMatch = lines[j].trim().match(/^[\s]*([\d,]+\.?\d*)\s*$/);
          if (numMatch) {
            const val = parseFloat(numMatch[1].replace(/,/g, ""));
            if (price === 0) price = val;
            else if (amount === 0) amount = val;
          }
        }
        if (price > 0) {
          items.push({ name: pendingDesc, price, qty, unit, source: "imported" });
        }
        pendingDesc = null;
        continue;
      }
      
      // Check if it's a description line (text without numbers or with minimal numbers)
      const isDesc = /^[A-Za-z\u0600-\u06FF]/.test(l) && !/^\d+\.?\d*\s*$/.test(l) && l.length > 2;
      if (isDesc && !qtyMatch) {
        pendingDesc = l;
        continue;
      }
    }
    
    // Method 1 continued: CSV/Excel structured parsing
    if (headerIdx >= 0) {
      const parts = l.split(/[,\t|]+/).map(p => p.trim());
      if (parts.length < 2) continue;
      
      const desc = (colMap.desc >= 0 ? parts[colMap.desc] : parts[0] || "").trim().replace(/^[\d.]+\s*/, "");
      if (!desc || desc.length < 3 || /^BHD|^SAR|^total/i.test(desc)) continue;
      
      let price = 0, qty = 1;
      if (colMap.price >= 0) { const p = parseFloat((parts[colMap.price] || "").replace(/[^0-9.]/g, "")); if (!isNaN(p) && p > 0) price = p; }
      if (colMap.qty >= 0) { const q = parseFloat(parts[colMap.qty]); if (!isNaN(q) && q > 0) qty = q; }
      // If no unit price, try amount / qty
      if (price === 0 && colMap.amount >= 0 && qty > 0) { const a = parseFloat((parts[colMap.amount] || "").replace(/[^0-9.]/g, "")); if (!isNaN(a) && a > 0) price = a / qty; }
      const unit = colMap.unit >= 0 ? (parts[colMap.unit] || "Each").replace(/^EA$/i, "Each") : "Each";
      
      if (price > 0) items.push({ name: desc, price, qty, unit, source: "imported" });
    }
  }
  
  // Method 3: Fallback - find any line with text and numbers that look like prices
  if (items.length === 0) {
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i].trim();
      if (/^(DESCRIPTION|Total|Scope|Payment|Condition|EXCELLENCY|COMPANY|Vat|SIEMENS|Quotation|From|To|Project|Client)/i.test(l)) continue;
      
      // Pattern: "text  number  number  number" 
      const match = l.match(/^(.{3,}?)\s+([\d,.]+)\s+([\d,.]+)\s+([\d,.]+)/);
      if (match) {
        const desc = match[1].trim();
        const nums = [match[2], match[3], match[4]].map(n => parseFloat(n.replace(/,/g, "")));
        if (desc.length > 2 && nums[1] > 0) {
          items.push({ name: desc, qty: nums[0], price: nums[1], unit: "Each", source: "imported" });
        }
      }
    }
  }

  return items;
}

export default function App(){
  const[activeTab,setActiveTab]=useState("pricing");
  const[saved,setSaved]=useState([]);
  const[learned,setLearned]=useState([]);
  const[lang,setLang]=useState("ar");
  const[storageReady,setStorageReady]=useState(false);

  // Load from persistent storage on mount
  useEffect(()=>{
    (async()=>{
      try{
        const savedQ=await storageGet("quotations");
        const savedL=await storageGet("learned-items");
        if(savedQ)setSaved(savedQ);
        if(savedL)setLearned(savedL);
      }catch(e){console.log("Load error:",e)}
      setStorageReady(true);
    })();
  },[]);

  // Save to persistent storage on changes
  useEffect(()=>{if(storageReady)storageSet("quotations",saved)},[saved,storageReady]);
  useEffect(()=>{if(storageReady)storageSet("learned-items",learned)},[learned,storageReady]);

  const t=TR[lang];
  const saveQ=(q)=>setSaved(p=>[q,...p]);
  
  const deleteQuotation=(id)=>setSaved(p=>p.filter(q=>q.id!==id));
  
  const learn=(items)=>{setLearned(p=>{const u=[...p];items.forEach(item=>{if(!item.finalPrice||item.finalPrice<=0)return;const cd=item.description.replace(/\(.*?\)/g,"").trim().toLowerCase();const ei=u.findIndex(l=>l.name.toLowerCase()===cd||l.name.toLowerCase().includes(cd)||cd.includes(l.name.toLowerCase()));if(ei>=0)u[ei]={...u[ei],price:item.finalPrice,unit:item.unit||u[ei].unit,lastUpdated:new Date().toISOString().split("T")[0],usageCount:(u[ei].usageCount||1)+1};else u.push({id:`LRN-${String(u.length+1).padStart(3,"0")}`,name:item.description.replace(/\(.*?\)/g,"").trim(),partNo:item.partNo||"",unit:item.unit||"Each",price:item.finalPrice,source:"learned",lastUpdated:new Date().toISOString().split("T")[0],usageCount:1})});return u})};

  const learnFromImport=(items)=>{setLearned(p=>{const u=[...p];items.forEach(item=>{if(!item.price||item.price<=0)return;const cd=item.name.toLowerCase();const ei=u.findIndex(l=>l.name.toLowerCase()===cd||l.name.toLowerCase().includes(cd)||cd.includes(l.name.toLowerCase()));if(ei>=0)u[ei]={...u[ei],price:item.price,unit:item.unit||u[ei].unit,lastUpdated:new Date().toISOString().split("T")[0],usageCount:(u[ei].usageCount||1)+1,source:"imported"};else u.push({id:`IMP-${String(u.length+1).padStart(3,"0")}`,name:item.name,partNo:"",unit:item.unit||"Each",price:item.price,source:"imported",lastUpdated:new Date().toISOString().split("T")[0],usageCount:1})});return u})};

  const addM=(item)=>setLearned(p=>[...p,{id:`MAN-${String(p.length+1).padStart(3,"0")}`, ...item,source:"manual",lastUpdated:new Date().toISOString().split("T")[0],usageCount:0}]);
  const delL=(id)=>setLearned(p=>p.filter(i=>i.id!==id));
  const upL=(id,f,v)=>setLearned(p=>p.map(i=>i.id===id?{...i,[f]:v,lastUpdated:new Date().toISOString().split("T")[0]}:i));

  // Reset all data
  const resetAll=async()=>{
    if(confirm(lang==="ar"?"هل أنت متأكد من حذف جميع البيانات المحفوظة؟":"Are you sure you want to delete all saved data?")){
      setSaved([]);setLearned([]);
      await storageSet("quotations",[]);
      await storageSet("learned-items",[]);
    }
  };

  return(<div dir={t.dir} style={{minHeight:"100vh",background:S.bg,fontFamily:S.font}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;600;700;800;900&display=swap');@keyframes spin{to{transform:rotate(360deg)}}*{box-sizing:border-box;margin:0;padding:0}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none}input[type=number]{-moz-appearance:textfield}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:#f0f2f5}::-webkit-scrollbar-thumb{background:#c8973e;border-radius:3px}`}</style>
    <Header activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} setLang={setLang} t={t}/>
    <div style={{maxWidth:1000,margin:"0 auto",padding:"14px 10px 50px"}}>
      {activeTab==="pricing"&&<PricingTab onSave={saveQ} goToQuotations={()=>setActiveTab("quotations")} learnedItems={learned} lang={lang} t={t}/>}
      {activeTab==="quotations"&&<QuotationsTab quotations={saved} setQuotations={setSaved} onLearn={learn} onDelete={deleteQuotation} lang={lang} t={t}/>}
      {activeTab==="database"&&<DatabaseTab learnedItems={learned} onAdd={addM} onDelete={delL} onUpdate={upL} onImport={learnFromImport} onReset={resetAll} lang={lang} t={t}/>}
    </div></div>)
}
