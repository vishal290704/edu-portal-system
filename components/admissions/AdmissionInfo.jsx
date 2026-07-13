import {
  admissionSteps,
  requiredDocuments,
} from "@/constants/admissions";

import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function AdmissionInfo() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">

        {/* Heading */}

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-primary">
            Admission Guide
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Simple Admission Process
          </h2>

          <p className="mt-4 text-slate-600">
            Follow these simple steps to complete your child's admission at
            Dynamic English School.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Process */}

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">

            <h3 className="mb-8 text-2xl font-bold">
              Admission Process
            </h3>

            <div className="space-y-5">

              {admissionSteps.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={index}>

                    <div className="flex gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">

                        <Icon size={22} />

                      </div>

                      <div>

                        <h4 className="font-semibold">
                          {item.title}
                        </h4>

                        <p className="mt-1 text-sm text-slate-600">
                          {item.description}
                        </p>

                      </div>

                    </div>

                    {index !== admissionSteps.length - 1 && (
                      <ArrowRight className="ml-5 mt-4 h-5 w-5 rotate-90 text-primary" />
                    )}

                  </div>
                );
              })}

            </div>

          </div>

          {/* Documents */}

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

            <h3 className="mb-8 text-2xl font-bold">
              Required Documents
            </h3>

            <div className="grid gap-4">

              {requiredDocuments.map((doc, index) => {
                const Icon = doc.icon;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:border-primary hover:shadow-md"
                  >
                    <div className="rounded-full bg-blue-100 p-3 text-primary">
                      <Icon size={20} />
                    </div>

                    <p className="font-medium">
                      {doc.title}
                    </p>

                    <CheckCircle2
                      size={18}
                      className="ml-auto text-green-500"
                    />

                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}