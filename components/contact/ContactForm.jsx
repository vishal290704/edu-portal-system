"use client";

import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  GraduationCap,
  MessageSquare,
  Send,
} from "lucide-react";

import { admissionClasses } from "@/constants/contact";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    class: "",
    message: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(form);

    alert("Form submitted successfully!");

    setForm({
      name: "",
      phone: "",
      email: "",
      class: "",
      message: "",
    });
  }

  return (
    <section className="bg-slate-50 py-24">
      <div className="container mx-auto px-6">

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-primary">
            Admission Enquiry
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Send Us a Message
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Fill out the enquiry form and our team will get back to you soon.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl lg:p-12"
        >

          <div className="grid gap-6 md:grid-cols-2">

            <Input
              icon={<User size={18} />}
              label="Parent Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />

            <Input
              icon={<Phone size={18} />}
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />

            <Input
              icon={<Mail size={18} />}
              label="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
            />

            <div>

              <label className="mb-2 block font-medium">
                Class Interested In
              </label>

              <div className="relative">

                <GraduationCap
                  size={18}
                  className="absolute left-4 top-4 text-slate-500"
                />

                <select
                  name="class"
                  value={form.class}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition focus:border-primary"
                >

                  <option value="">
                    Select Class
                  </option>

                  {admissionClasses.map((item) => (

                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>

                  ))}

                </select>

              </div>

            </div>

          </div>

          <div className="mt-6">

            <label className="mb-2 block font-medium">
              Message
            </label>

            <div className="relative">

              <MessageSquare
                size={18}
                className="absolute left-4 top-4 text-slate-500"
              />

              <textarea
                rows={6}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition focus:border-primary"
              />

            </div>

          </div>

          <button
            className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-white transition hover:-translate-y-1 hover:shadow-xl"
          >

            <Send size={18} />

            Send Enquiry

          </button>

        </form>

      </div>
    </section>
  );
}

function Input({
  icon,
  label,
  ...props
}) {
  return (
    <div>

      <label className="mb-2 block font-medium">
        {label}
      </label>

      <div className="relative">

        <div className="absolute left-4 top-4 text-slate-500">
          {icon}
        </div>

        <input
          {...props}
          className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition focus:border-primary"
        />

      </div>

    </div>
  );
}