import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";


export const metadata = {
  title: "Contact Us | Dynamic English School",
  description:
    "Get in touch with Dynamic English School for admissions, enquiries, campus visits, and more.",
};

export default function ContactPage() {
  return (
    <main className="overflow-hidden">
      <ContactHero />
      <ContactInfo/>
      <ContactForm/>

    </main>
  );
}