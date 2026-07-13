import {
  BadgeCheck,
  BookOpen,
  Camera,
  ClipboardCheck,
  CreditCard,
  FileCheck,
  FileText,
  IdCard,
  School,
  UserCheck,
} from "lucide-react";

/* ============================================
   Admission Process
============================================ */

export const admissionSteps = [
  {
    step: "01",
    title: "Registration",
    description: "Fill out the admission registration form at the school office.",
    icon: ClipboardCheck,
  },
  {
    step: "02",
    title: "School Visit",
    description: "Visit the campus and interact with our admission team.",
    icon: School,
  },
  {
    step: "03",
    title: "Document Verification",
    description: "Submit the required documents for verification.",
    icon: FileCheck,
  },
  {
    step: "04",
    title: "Fee Submission",
    description: "Complete the admission process by submitting the applicable fees.",
    icon: CreditCard,
  },
  {
    step: "05",
    title: "Admission Confirmed",
    description: "Welcome to the Dynamic English School family.",
    icon: BadgeCheck,
  },
];

/* ============================================
   Required Documents
============================================ */

export const requiredDocuments = [
  {
    title: "Birth Certificate",
    icon: FileText,
  },
  {
    title: "Student Aadhaar Card",
    icon: IdCard,
  },
  {
    title: "Passport Size Photographs",
    icon: Camera,
  },
  {
    title: "Previous Report Card",
    icon: BookOpen,
  },
  {
    title: "Transfer Certificate (If Applicable)",
    icon: FileCheck,
  },
  {
    title: "Parent / Guardian ID Proof",
    icon: UserCheck,
  },
];

/* ============================================
   Fee Structure
============================================ */

export const feeStructure = [
  {
    id: 1,
    className: "Nursery",
    badge: "Pre-Primary",
    registration: "₹500",
    development: "₹3,000",
    uniform: "₹2,200",
    idCardDiary: "₹400",
    monthly: "₹1,200",
    examination: "₹500",
    popular: false,
  },
  {
    id: 2,
    className: "L.K.G.",
    badge: "Pre-Primary",
    registration: "₹500",
    development: "₹3,000",
    uniform: "₹2,200",
    idCardDiary: "₹400",
    monthly: "₹1,200",
    examination: "₹500",
    popular: false,
  },
  {
    id: 3,
    className: "U.K.G.",
    badge: "Pre-Primary",
    registration: "₹600",
    development: "₹3,200",
    uniform: "₹2,300",
    idCardDiary: "₹450",
    monthly: "₹1,300",
    examination: "₹550",
    popular: false,
  },
  {
    id: 4,
    className: "Class I",
    badge: "Primary",
    registration: "₹700",
    development: "₹3,500",
    uniform: "₹2,500",
    idCardDiary: "₹500",
    monthly: "₹1,400",
    examination: "₹600",
    popular: true,
  },
  {
    id: 5,
    className: "Class II",
    badge: "Primary",
    registration: "₹700",
    development: "₹3,600",
    uniform: "₹2,500",
    idCardDiary: "₹500",
    monthly: "₹1,500",
    examination: "₹600",
    popular: false,
  },
  {
    id: 6,
    className: "Class III",
    badge: "Primary",
    registration: "₹800",
    development: "₹3,800",
    uniform: "₹2,600",
    idCardDiary: "₹500",
    monthly: "₹1,600",
    examination: "₹650",
    popular: false,
  },
  {
    id: 7,
    className: "Class IV",
    badge: "Primary",
    registration: "₹800",
    development: "₹4,000",
    uniform: "₹2,700",
    idCardDiary: "₹550",
    monthly: "₹1,700",
    examination: "₹650",
    popular: false,
  },
  {
    id: 8,
    className: "Class V",
    badge: "Primary",
    registration: "₹900",
    development: "₹4,200",
    uniform: "₹2,800",
    idCardDiary: "₹550",
    monthly: "₹1,800",
    examination: "₹700",
    popular: false,
  },
  {
    id: 9,
    className: "Class VI",
    badge: "Middle School",
    registration: "₹900",
    development: "₹4,500",
    uniform: "₹2,900",
    idCardDiary: "₹600",
    monthly: "₹1,900",
    examination: "₹750",
    popular: false,
  },
  {
    id: 10,
    className: "Class VII",
    badge: "Middle School",
    registration: "₹1,000",
    development: "₹4,800",
    uniform: "₹3,000",
    idCardDiary: "₹600",
    monthly: "₹2,000",
    examination: "₹800",
    popular: false,
  },
  {
    id: 11,
    className: "Class VIII",
    badge: "Middle School",
    registration: "₹1,000",
    development: "₹5,000",
    uniform: "₹3,200",
    idCardDiary: "₹650",
    monthly: "₹2,100",
    examination: "₹850",
    popular: false,
  },
];

/* ============================================
   Important Notes
============================================ */

export const feeNotes = [
  "Registration, Development, Uniform, and ID Card & School Diary charges are payable only at the time of admission.",
  "Monthly tuition fee is payable every month.",
  "Examination fee is charged separately as per the examination schedule.",
  "Fee once paid is non-refundable under normal circumstances.",
  "The school management reserves the right to revise the fee structure whenever necessary.",
];

/* ============================================
   CTA
============================================ */

export const admissionCTA = {
  title: "Ready to Begin Your Child's Learning Journey?",
  description:
    "Admissions are now open for the new academic session. Visit our campus or contact us today to learn more about the admission process.",
  primaryButton: {
    text: "Contact Us",
    href: "/contact",
  },
  secondaryButton: {
    text: "Call Now",
    href: "tel:+919999999999",
  },
};