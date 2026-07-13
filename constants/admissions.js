import {
  ClipboardCheck,
  School,
  FileCheck,
  CreditCard,
  BadgeCheck,
  FileText,
  IdCard,
  Camera,
  BookOpen,
  UserCheck,
} from "lucide-react";

export const admissionSteps = [
  {
    step: "01",
    title: "Registration",
    description: "Fill out the admission registration form.",
    icon: ClipboardCheck,
  },
  {
    step: "02",
    title: "School Visit",
    description: "Visit the campus and interact with our staff.",
    icon: School,
  },
  {
    step: "03",
    title: "Document Verification",
    description: "Submit and verify all required documents.",
    icon: FileCheck,
  },
  {
    step: "04",
    title: "Fee Submission",
    description: "Complete admission formalities by paying the fees.",
    icon: CreditCard,
  },
  {
    step: "05",
    title: "Admission Confirmed",
    description: "Welcome to the Dynamic English School family.",
    icon: BadgeCheck,
  },
];

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
    title: "Passport-size Photos",
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
    title: "Parent ID Proof",
    icon: UserCheck,
  },
];

export const admissionCharges = [
  {
    title: "Registration Fee",
    amount: "₹500",
  },
  {
    title: "Development Fee",
    amount: "₹3,000",
  },
  {
    title: "Uniform / Dress Fee",
    amount: "₹2,200",
  },
  {
    title: "ID Card & School Diary",
    amount: "₹450",
  },
];

export const monthlyFees = [
  { className: "Nursery", fee: "₹1,200" },
  { className: "L.K.G.", fee: "₹1,200" },
  { className: "U.K.G.", fee: "₹1,300" },
  { className: "Class I", fee: "₹1,400" },
  { className: "Class II", fee: "₹1,500" },
  { className: "Class III", fee: "₹1,600" },
  { className: "Class IV", fee: "₹1,700" },
  { className: "Class V", fee: "₹1,800" },
  { className: "Class VI", fee: "₹1,900" },
  { className: "Class VII", fee: "₹2,000" },
  { className: "Class VIII", fee: "₹2,100" },
];

export const examinationFee = {
  title: "Examination Fee",
  amount: "₹500 / Term",
};