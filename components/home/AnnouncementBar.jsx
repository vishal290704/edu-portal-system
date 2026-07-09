import { Bell, Phone, Mail } from "lucide-react";
import Container from "../layout/Container";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#0F4C81] text-white">
      <Container className="flex h-10 items-center justify-between text-sm">

        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4" />

          <span>
            Admissions Open for Session 2026–27
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">

          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            +91 9653087078
          </div>

          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            desvaranasi001@gmail.com
          </div>

        </div>

      </Container>
    </div>
  );
}