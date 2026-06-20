import { useState } from "react";
import {
  Check, ChevronLeft, ChevronRight, GraduationCap, User, BookOpen,
  ClipboardList, CreditCard, CheckCircle2, AlertCircle, X, Plus,
  Phone, Mail, MapPin, Calendar, Upload, Printer, Download,
  Building2, Landmark, Smartphone, Wallet, FileText, Lock,
  ChevronDown, Info, Star, RefreshCw, Smile, Sparkles, Compass, Award, School,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

type ProgramType = "college" | "basic";
type CollegeProgram = { id: string; code: string; name: string; department: string; yearLevel: number; tuitionPerUnit: number };
type Subject = { id: string; code: string; title: string; units: number; schedule: string; room: string; instructor: string; slots: number; enrolled: number; hasLab: boolean; labFee?: number };
type Section = { id: string; grade: string; section: string; adviser: string; slots: number; enrolled: number };
type PaymentMode = "full" | "2installment" | "3installment";
type PaymentMethod = "cash" | "gcash" | "bank" | "online";

interface StudentForm {
  firstName: string; middleName: string; lastName: string; suffix: string;
  dob: string; gender: string; civilStatus: string; nationality: string; religion: string;
  mobile: string; email: string; address: string; city: string; province: string; zip: string;
  emergencyName: string; emergencyRelation: string; emergencyMobile: string;
  prevSchool: string; prevProgram: string; prevYearLevel: string; prevGWA: string;
  lrn: string; studentType: string;
}

// ── Data ───────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Student Information", icon: User },
  { id: 2, label: "Program Selection", icon: GraduationCap },
  { id: 3, label: "Subject / Section", icon: BookOpen },
  { id: 4, label: "Assessment", icon: ClipboardList },
  { id: 5, label: "Payment", icon: CreditCard },
  { id: 6, label: "Confirmation", icon: CheckCircle2 },
];

const COLLEGE_PROGRAMS: CollegeProgram[] = [
  { id: "bscs", code: "BSCS", name: "Bachelor of Science in Computer Science", department: "College of Computing", yearLevel: 2, tuitionPerUnit: 850 },
  { id: "bsit", code: "BSIT", name: "Bachelor of Science in Information Technology", department: "College of Computing", yearLevel: 2, tuitionPerUnit: 820 },
  { id: "bsba", code: "BSBA", name: "Bachelor of Science in Business Administration", department: "College of Business", yearLevel: 2, tuitionPerUnit: 780 },
  { id: "bsed", code: "BSEd", name: "Bachelor of Secondary Education", department: "College of Education", yearLevel: 2, tuitionPerUnit: 760 },
  { id: "bsn", code: "BSN", name: "Bachelor of Science in Nursing", department: "College of Health Sciences", yearLevel: 2, tuitionPerUnit: 1100 },
  { id: "bsarch", code: "BSArch", name: "Bachelor of Science in Architecture", department: "College of Engineering", yearLevel: 2, tuitionPerUnit: 950 },
];

const SUBJECTS: Subject[] = [
  { id: "cc101", code: "CC 101", title: "Introduction to Computing", units: 3, schedule: "MWF 7:30–8:30 AM", room: "CL-201", instructor: "Dr. Santos, R.", slots: 40, enrolled: 34, hasLab: true, labFee: 1500 },
  { id: "cc102", code: "CC 102", title: "Computer Programming 1", units: 3, schedule: "TTh 9:00–10:30 AM", room: "CL-305", instructor: "Prof. Reyes, M.", slots: 35, enrolled: 28, hasLab: true, labFee: 1500 },
  { id: "math101", code: "MATH 101", title: "College Algebra", units: 3, schedule: "MWF 10:30–11:30 AM", room: "GH-112", instructor: "Dr. Cruz, A.", slots: 45, enrolled: 41, hasLab: false },
  { id: "eng101", code: "ENG 101", title: "Purposive Communication", units: 3, schedule: "TTh 1:00–2:30 PM", room: "LH-204", instructor: "Prof. Lim, J.", slots: 40, enrolled: 22, hasLab: false },
  { id: "fil101", code: "FIL 101", title: "Kontekstwalisadong Komunikasyon", units: 3, schedule: "MWF 1:30–2:30 PM", room: "LH-108", instructor: "Prof. Garcia, T.", slots: 40, enrolled: 38, hasLab: false },
  { id: "pe101", code: "PE 101", title: "Physical Education 1", units: 2, schedule: "Sat 8:00–10:00 AM", room: "Gym A", instructor: "Coach Dela Cruz", slots: 50, enrolled: 29, hasLab: false },
  { id: "nstp101", code: "NSTP 101", title: "National Service Training Program 1", units: 3, schedule: "Sat 1:00–4:00 PM", room: "MPH", instructor: "Mr. Aquino, B.", slots: 60, enrolled: 44, hasLab: false },
];

const SECTIONS: Section[] = [
  { id: "gkinder_a", grade: "Kindergarten", section: "Kindergarten – Sampaguita", adviser: "Mrs. Ramos, A.", slots: 25, enrolled: 18 },
  { id: "gkinder_b", grade: "Kindergarten", section: "Kindergarten – Sunshine", adviser: "Mrs. Santos, L.", slots: 25, enrolled: 22 },
  { id: "g1a", grade: "Grade 1", section: "Grade 1 – Daffodil", adviser: "Ms. Ocampo, M.", slots: 35, enrolled: 28 },
  { id: "g2a", grade: "Grade 2", section: "Grade 2 – Tulip", adviser: "Ms. Pascual, J.", slots: 35, enrolled: 30 },
  { id: "g3a", grade: "Grade 3", section: "Grade 3 – Lilac", adviser: "Mr. Aquino, R.", slots: 35, enrolled: 32 },
  { id: "g4a", grade: "Grade 4", section: "Grade 4 – Marigold", adviser: "Ms. Gomez, S.", slots: 35, enrolled: 29 },
  { id: "g5a", grade: "Grade 5", section: "Grade 5 – Begonia", adviser: "Mr. Cruz, D.", slots: 40, enrolled: 34 },
  { id: "g6a", grade: "Grade 6", section: "Grade 6 – Carnation", adviser: "Ms. Reyes, K.", slots: 40, enrolled: 37 },
  { id: "g7a", grade: "Grade 7", section: "Grade 7 – Section A – Sampaguita", adviser: "Ms. Torres, C.", slots: 45, enrolled: 38 },
  { id: "g7b", grade: "Grade 7", section: "Grade 7 – Section B – Ilang-Ilang", adviser: "Mr. Hernandez, P.", slots: 45, enrolled: 41 },
  { id: "g8a", grade: "Grade 8", section: "Grade 8 – Section A – Rosal", adviser: "Ms. Villareal, E.", slots: 45, enrolled: 32 },
  { id: "g8b", grade: "Grade 8", section: "Grade 8 – Section B – Jasmine", adviser: "Mr. Flores, D.", slots: 45, enrolled: 44 },
  { id: "g9a", grade: "Grade 9", section: "Grade 9 – Section A – Orchid", adviser: "Ms. Bautista, L.", slots: 40, enrolled: 35 },
  { id: "g10a", grade: "Grade 10", section: "Grade 10 – Section A – Dahlia", adviser: "Mr. Mendoza, R.", slots: 40, enrolled: 39 },
  { id: "g11stem", grade: "Grade 11", section: "Grade 11 – STEM – Newton", adviser: "Dr. Pascual, V.", slots: 40, enrolled: 28 },
  { id: "g11abm", grade: "Grade 11", section: "Grade 11 – ABM – Rizal", adviser: "Ms. Santos, A.", slots: 40, enrolled: 36 },
  { id: "g11humss", grade: "Grade 11", section: "Grade 11 – HUMSS – Plato", adviser: "Mr. Diaz, A.", slots: 40, enrolled: 35 },
  { id: "g11tvl", grade: "Grade 11", section: "Grade 11 – TVL – Edison", adviser: "Mr. Tan, R.", slots: 40, enrolled: 31 },
  { id: "g12stem", grade: "Grade 12", section: "Grade 12 – STEM – Einstein", adviser: "Dr. Reyes, G.", slots: 40, enrolled: 22 },
  { id: "g12abm", grade: "Grade 12", section: "Grade 12 – ABM – Smith", adviser: "Ms. Lim, C.", slots: 40, enrolled: 25 },
  { id: "g12humss", grade: "Grade 12", section: "Grade 12 – HUMSS – Socrates", adviser: "Mr. Pineda, J.", slots: 40, enrolled: 28 },
  { id: "g12tvl", grade: "Grade 12", section: "Grade 12 – TVL – Tesla", adviser: "Mr. Salazar, E.", slots: 40, enrolled: 20 },
];

const MISC_FEES = [
  { label: "Registration Fee", amount: 500 },
  { label: "Library Fee", amount: 350 },
  { label: "Athletics Fee", amount: 200 },
  { label: "Student Activity Fee", amount: 250 },
  { label: "Medical / Dental Fee", amount: 300 },
  { label: "ID / Insurance", amount: 150 },
];

const BASIC_MISC_FEES = [
  { label: "Registration Fee", amount: 1000 },
  { label: "Library & Materials Fee", amount: 800 },
  { label: "Athletics & Gym Fee", amount: 500 },
  { label: "Student Activity Fee", amount: 500 },
  { label: "Medical / Dental Services", amount: 400 },
  { label: "ID / School Insurance", amount: 300 },
];

// ── Helpers ────────────────────────────────────────────────────────────────

const fmt = (n: number) => n.toLocaleString("en-PH", { style: "currency", currency: "PHP" });

function slotColor(enrolled: number, slots: number) {
  const pct = enrolled / slots;
  if (pct >= 0.95) return "text-red-600 bg-red-50";
  if (pct >= 0.80) return "text-amber-600 bg-amber-50";
  return "text-emerald-700 bg-emerald-50";
}

function slotLabel(enrolled: number, slots: number) {
  const rem = slots - enrolled;
  if (rem === 0) return "Full";
  if (rem <= 3) return `${rem} slot${rem > 1 ? "s" : ""} left`;
  return `${rem} open`;
}

function computeFees(
  programType: ProgramType,
  selectedProgram: CollegeProgram | null,
  selectedSubjects: string[],
  selectedBasicGrade: string,
  selectedStrand: string | null
) {
  if (programType === "college") {
    const subjects = SUBJECTS.filter(s => selectedSubjects.includes(s.id));
    const totalUnits = subjects.reduce((a, s) => a + s.units, 0);
    const tuitionRate = selectedProgram?.tuitionPerUnit ?? 850;
    const tuitionFee = totalUnits * tuitionRate;
    const labFee = subjects.filter(s => s.hasLab).reduce((a, s) => a + (s.labFee ?? 0), 0);
    const miscTotal = MISC_FEES.reduce((a, f) => a + f.amount, 0);
    const totalFee = tuitionFee + labFee + miscTotal;
    return { subjects, totalUnits, tuitionRate, tuitionFee, labFee, miscTotal, totalFee };
  } else {
    // Basic Education Fees
    let tuitionFee = 15000; // default (elementary)
    if (selectedBasicGrade === "Kindergarten") {
      tuitionFee = 12000;
    } else if (
      selectedBasicGrade.startsWith("Grade 7") ||
      selectedBasicGrade.startsWith("Grade 8") ||
      selectedBasicGrade.startsWith("Grade 9") ||
      selectedBasicGrade.startsWith("Grade 10")
    ) {
      tuitionFee = 18000;
    } else if (
      selectedBasicGrade.startsWith("Grade 11") ||
      selectedBasicGrade.startsWith("Grade 12")
    ) {
      tuitionFee = 22000;
    }

    let labFee = 0;
    if (
      (selectedBasicGrade === "Grade 11" || selectedBasicGrade === "Grade 12") &&
      (selectedStrand === "stem" || selectedStrand === "tvl")
    ) {
      labFee = 2000;
    }

    const miscTotal = BASIC_MISC_FEES.reduce((a, f) => a + f.amount, 0);
    const totalFee = tuitionFee + labFee + miscTotal;

    // Subjects list for grade level
    let gradeSubjects: any[] = [];
    if (selectedBasicGrade === "Kindergarten") {
      gradeSubjects = [
        { code: "K-READ", title: "Reading & Writing Readiness", units: 0, schedule: "Mon-Fri 8:00–10:00 AM", room: "K-1", instructor: "Ms. Santos, L.", hasLab: false },
        { code: "K-NUM", title: "Numbers & Counting", units: 0, schedule: "Mon-Fri 10:00–11:00 AM", room: "K-1", instructor: "Ms. Santos, L.", hasLab: false },
        { code: "K-SCI", title: "Discovery & Science Play", units: 0, schedule: "MWF 11:00 AM–12:00 PM", room: "K-1", instructor: "Ms. Santos, L.", hasLab: false },
        { code: "K-ART", title: "Arts, Crafts & Motor Skills", units: 0, schedule: "TTh 11:00 AM–12:00 PM", room: "K-1", instructor: "Mrs. Ramos, A.", hasLab: false },
      ];
    } else if (
      selectedBasicGrade.startsWith("Grade 1") ||
      selectedBasicGrade.startsWith("Grade 2") ||
      selectedBasicGrade.startsWith("Grade 3") ||
      selectedBasicGrade.startsWith("Grade 4") ||
      selectedBasicGrade.startsWith("Grade 5") ||
      selectedBasicGrade.startsWith("Grade 6")
    ) {
      gradeSubjects = [
        { code: "E-MATH", title: "Elementary Mathematics", units: 0, schedule: "Daily 8:30–9:30 AM", room: "ES-102", instructor: "Ms. Ocampo, M.", hasLab: false },
        { code: "E-SCI", title: "General Science", units: 0, schedule: "Daily 9:30–10:30 AM", room: "ES-102", instructor: "Ms. Ocampo, M.", hasLab: false },
        { code: "E-ENG", title: "English Language Arts", units: 0, schedule: "Daily 10:45–11:45 AM", room: "ES-102", instructor: "Ms. Pascual, J.", hasLab: false },
        { code: "E-FIL", title: "Filipino Wika at Panitikan", units: 0, schedule: "Daily 1:00–2:00 PM", room: "ES-102", instructor: "Mr. Aquino, R.", hasLab: false },
        { code: "E-AP", title: "Araling Panlipunan", units: 0, schedule: "MWF 2:00–3:00 PM", room: "ES-102", instructor: "Mr. Aquino, R.", hasLab: false },
        { code: "E-MAPEH", title: "MAPEH (Music, Arts, PE, Health)", units: 0, schedule: "TTh 2:00–3:30 PM", room: "Gym B", instructor: "Ms. Reyes, K.", hasLab: false },
      ];
    } else if (
      selectedBasicGrade.startsWith("Grade 7") ||
      selectedBasicGrade.startsWith("Grade 8") ||
      selectedBasicGrade.startsWith("Grade 9") ||
      selectedBasicGrade.startsWith("Grade 10")
    ) {
      gradeSubjects = [
        { code: "J-MATH", title: "Intermediate Mathematics", units: 0, schedule: "Daily 8:00–9:00 AM", room: "JHS-204", instructor: "Ms. Torres, C.", hasLab: false },
        { code: "J-SCI", title: "Integrated Science", units: 0, schedule: "Daily 9:00–10:00 AM", room: "JHS-204", instructor: "Mr. Hernandez, P.", hasLab: false },
        { code: "J-ENG", title: "English & Literature", units: 0, schedule: "Daily 10:15–11:15 AM", room: "JHS-204", instructor: "Ms. Villareal, E.", hasLab: false },
        { code: "J-FIL", title: "Filipino at Panitikan", units: 0, schedule: "Daily 11:15 AM–12:15 PM", room: "JHS-204", instructor: "Mr. Flores, D.", hasLab: false },
        { code: "J-AP", title: "Araling Panlipunan", units: 0, schedule: "MWF 1:30–2:30 PM", room: "JHS-204", instructor: "Ms. Bautista, L.", hasLab: false },
        { code: "J-TLE", title: "Technology and Livelihood Educ.", units: 0, schedule: "TTh 1:30–3:00 PM", room: "TLE-Lab", instructor: "Mr. Mendoza, R.", hasLab: false },
        { code: "J-MAPEH", title: "MAPEH", units: 0, schedule: "MWF 2:30–3:30 PM", room: "Gym A", instructor: "Coach Dela Cruz", hasLab: false },
      ];
    } else {
      // SHS Grade 11 & 12
      gradeSubjects = [
        { code: "S-CORE1", title: "Oral Communication in Context", units: 0, schedule: "MWF 8:30–9:30 AM", room: "SHS-301", instructor: "Dr. Pascual, V.", hasLab: false },
        { code: "S-CORE2", title: "General Mathematics", units: 0, schedule: "TTh 8:30–10:00 AM", room: "SHS-301", instructor: "Dr. Reyes, G.", hasLab: false },
        { code: "S-CORE3", title: "Earth and Life Science", units: 0, schedule: "MWF 9:30–10:30 AM", room: "SHS-301", instructor: "Dr. Pascual, V.", hasLab: false },
        { code: "S-PE", title: "Physical Education and Health 1", units: 0, schedule: "Sat 10:00 AM–12:00 PM", room: "Gym A", instructor: "Coach Dela Cruz", hasLab: false },
      ];

      if (selectedStrand === "stem") {
        gradeSubjects.push(
          { code: "S-STEM1", title: "Pre-Calculus", units: 0, schedule: "MWF 10:45–11:45 AM", room: "SHS-301", instructor: "Dr. Reyes, G.", hasLab: false },
          { code: "S-STEM2", title: "General Chemistry 1", units: 0, schedule: "TTh 10:30 AM–12:00 PM", room: "Sci-Lab 2", instructor: "Ms. Santos, A.", hasLab: true, labFee: 2000 }
        );
      } else if (selectedStrand === "abm") {
        gradeSubjects.push(
          { code: "S-ABM1", title: "Fundamentals of Accountancy 1", units: 0, schedule: "MWF 10:45–11:45 AM", room: "SHS-302", instructor: "Ms. Santos, A.", hasLab: false },
          { code: "S-ABM2", title: "Organization and Management", units: 0, schedule: "TTh 10:30 AM–12:00 PM", room: "SHS-302", instructor: "Ms. Lim, C.", hasLab: false }
        );
      } else if (selectedStrand === "humss") {
        gradeSubjects.push(
          { code: "S-HUMSS1", title: "Creative Writing", units: 0, schedule: "MWF 10:45–11:45 AM", room: "SHS-303", instructor: "Mr. Diaz, A.", hasLab: false },
          { code: "S-HUMSS2", title: "Philippine Politics & Governance", units: 0, schedule: "TTh 10:30 AM–12:00 PM", room: "SHS-303", instructor: "Mr. Pineda, J.", hasLab: false }
        );
      } else if (selectedStrand === "tvl") {
        gradeSubjects.push(
          { code: "S-TVL1", title: "ICT / HE Specialization Course", units: 0, schedule: "MWF 10:45–11:45 AM", room: "Comp-Lab 1", instructor: "Mr. Tan, R.", hasLab: true, labFee: 2000 },
          { code: "S-TVL2", title: "Work Ethics & Safety Protocols", units: 0, schedule: "TTh 10:30 AM–12:00 PM", room: "SHS-304", instructor: "Mr. Salazar, E.", hasLab: false }
        );
      }
    }

    return { subjects: gradeSubjects, totalUnits: 0, tuitionRate: 0, tuitionFee, labFee, miscTotal, totalFee };
  }
}

// ── Shared subcomponents ───────────────────────────────────────────────────

function StepProgressBar({ current }: { current: number }) {
  return (
    <div className="bg-card border-b border-border px-8 py-5">
      <div className="flex items-center gap-0 max-w-5xl mx-auto">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const done = step.id < current;
          const active = step.id === current;
          const upcoming = step.id > current;
          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5 min-w-[72px]">
                <div className={[
                  "w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-200",
                  done ? "bg-primary border-primary text-primary-foreground" : "",
                  active ? "bg-primary border-primary text-primary-foreground shadow-md shadow-blue-200" : "",
                  upcoming ? "bg-card border-border text-muted-foreground" : "",
                ].join(" ")}>
                  {done ? <Check size={16} strokeWidth={2.5} /> : <Icon size={15} strokeWidth={active ? 2 : 1.5} />}
                </div>
                <span className={[
                  "text-[10px] font-semibold text-center leading-tight max-w-[72px]",
                  active ? "text-primary" : done ? "text-primary/70" : "text-muted-foreground",
                ].join(" ")}>{step.label}</span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={[
                  "flex-1 h-0.5 mt-[-18px] mx-1 rounded-full transition-all duration-300",
                  done ? "bg-primary" : "bg-border",
                ].join(" ")} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StudentCard({
  form,
  programType,
  selectedBasicGrade,
  selectedStrand,
  selectedProgram,
}: {
  form: StudentForm;
  programType: ProgramType;
  selectedBasicGrade: string;
  selectedStrand: string | null;
  selectedProgram: CollegeProgram | null;
}) {
  const fullName = [form.firstName, form.middleName ? form.middleName[0] + "." : "", form.lastName].filter(Boolean).join(" ") || "Juan Dela Cruz";
  const initials = [(form.firstName || "J")[0], (form.lastName || "D")[0]].join("").toUpperCase();

  const displayLevel = programType === "college"
    ? "Year " + (selectedProgram?.yearLevel ?? 2)
    : selectedBasicGrade;

  const displayCourse = programType === "college"
    ? (selectedProgram?.code ?? "BSCS")
    : (selectedStrand ? selectedStrand.toUpperCase() : "Basic Ed");

  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-primary font-bold text-base">{initials}</span>
        </div>
        <div>
          <p className="font-semibold text-foreground text-[13px] leading-tight">{fullName}</p>
          <p className="text-muted-foreground text-[11px] mt-0.5">Student No. 2024-00147</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
            {form.studentType || "Continuing"}
          </span>
        </div>
      </div>
      <div className="border-t border-border" />
      <div className="space-y-2.5">
        {[
          { label: "Academic Year", value: "2025–2026" },
          { label: "Semester", value: programType === "college" ? "1st Semester" : "Full Year" },
          { label: "Grade / Year Level", value: displayLevel },
          { label: "Course / Strand", value: displayCourse },
          { label: "Contact No.", value: form.mobile || "+63 917 234 5678" },
          { label: "Email Address", value: form.email || "jdelacruz@student.edu.ph" },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
            <p className="text-[12px] text-foreground font-medium mt-0.5 break-all">{value}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-border" />
      <div className="bg-accent rounded-lg p-3 space-y-1">
        <p className="text-[10px] font-semibold text-primary/80 uppercase tracking-wide">Last Enrollment</p>
        <p className="text-[12px] font-medium text-foreground">
          {programType === "college" ? "BSCS – 2nd Year" : "Grade 10"}
        </p>
        <p className="text-[11px] text-muted-foreground">
          {programType === "college" ? "1st Sem AY 2024–2025 · 21 units" : "AY 2024–2025"}
        </p>
        <p className="text-[11px] text-muted-foreground">GWA: <span className="font-semibold text-foreground">1.75</span></p>
      </div>
      <div className="space-y-1.5">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Clearance Status</p>
        {[
          { dept: "Registrar", cleared: true },
          { dept: "Finance", cleared: true },
          { dept: "Library", cleared: true },
          { dept: "Clinic", cleared: false },
        ].map(({ dept, cleared }) => (
          <div key={dept} className="flex items-center justify-between">
            <span className="text-[11px] text-foreground">{dept}</span>
            <span className={`flex items-center gap-1 text-[10px] font-semibold ${cleared ? "text-emerald-600" : "text-red-500"}`}>
              {cleared ? <Check size={10} strokeWidth={3} /> : <X size={10} strokeWidth={3} />}
              {cleared ? "Cleared" : "Pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeePanel({
  programType,
  selectedProgram,
  selectedSubjects,
  selectedBasicGrade,
  selectedStrand,
  paymentMode,
}: {
  programType: ProgramType;
  selectedProgram: CollegeProgram | null;
  selectedSubjects: string[];
  selectedBasicGrade: string;
  selectedStrand: string | null;
  paymentMode?: PaymentMode;
}) {
  const { subjects, totalUnits, tuitionRate, tuitionFee, labFee, miscTotal, totalFee } = computeFees(
    programType,
    selectedProgram,
    selectedSubjects,
    selectedBasicGrade,
    selectedStrand
  );
  const labSubjects = subjects.filter(s => s.hasLab);
  const discountedTotal = paymentMode === "full" ? totalFee * 0.95 : totalFee;
  const downPayment = paymentMode === "2installment" ? totalFee * 0.5 : paymentMode === "3installment" ? totalFee * 0.33 : discountedTotal;

  const miscFeesList = programType === "college" ? MISC_FEES : BASIC_MISC_FEES;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden flex flex-col">
      <div className="bg-primary px-5 py-4">
        <p className="text-primary-foreground text-[11px] font-semibold uppercase tracking-widest opacity-80">Assessment Summary</p>
        <p className="text-primary-foreground text-lg font-bold mt-0.5">Fee Computation</p>
        <p className="text-primary-foreground/70 text-[11px] mt-0.5">AY 2025–2026 · {programType === "college" ? "1st Semester" : "Full Year"}</p>
      </div>
      <div className="flex-1 p-5 space-y-5 overflow-y-auto">
        {programType === "college" ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-primary">{totalUnits}</p>
              <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Total Units</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-foreground">{subjects.length}</p>
              <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Subjects</p>
            </div>
          </div>
        ) : (
          <div className="bg-muted rounded-lg p-3 text-center">
            <p className="text-[14px] font-bold text-primary">{selectedBasicGrade}</p>
            <p className="text-[10px] text-muted-foreground font-medium mt-0.5">
              {selectedStrand ? `Strand: ${selectedStrand.toUpperCase()}` : "K-12 Basic Education"}
            </p>
          </div>
        )}
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-2">Tuition Fees</p>
          <div className="space-y-1.5">
            {programType === "college" ? (
              <>
                <div className="flex justify-between text-[12px]"><span className="text-foreground">Rate per unit</span><span className="font-semibold font-mono text-foreground">{fmt(tuitionRate)}</span></div>
                <div className="flex justify-between text-[12px]"><span className="text-foreground">Units enrolled</span><span className="font-semibold font-mono text-foreground">× {totalUnits}</span></div>
              </>
            ) : (
              <div className="flex justify-between text-[12px]"><span className="text-foreground">Base Tuition (Flat Rate)</span><span className="font-semibold font-mono text-foreground">{fmt(tuitionFee)}</span></div>
            )}
            <div className="flex justify-between text-[12px] border-t border-border pt-1.5"><span className="font-semibold text-foreground">Tuition Total</span><span className="font-bold font-mono text-foreground">{fmt(tuitionFee)}</span></div>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-2">Miscellaneous Fees</p>
          <div className="space-y-1.5">
            {miscFeesList.map(({ label, amount }) => (
              <div key={label} className="flex justify-between text-[12px]">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-mono text-foreground">{fmt(amount)}</span>
              </div>
            ))}
            <div className="flex justify-between text-[12px] border-t border-border pt-1.5"><span className="font-semibold text-foreground">Misc Total</span><span className="font-bold font-mono text-foreground">{fmt(miscTotal)}</span></div>
          </div>
        </div>
        {labFee > 0 && (
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-2">Laboratory Fees</p>
            {programType === "college" ? (
              labSubjects.map(s => (
                <div key={s.id} className="flex justify-between text-[12px] mb-1.5">
                  <span className="text-muted-foreground">{s.code} Lab</span>
                  <span className="font-mono text-foreground">{fmt(s.labFee ?? 0)}</span>
                </div>
              ))
            ) : (
              <div className="flex justify-between text-[12px] mb-1.5">
                <span className="text-muted-foreground">Specialized Science Lab</span>
                <span className="font-mono text-foreground">{fmt(labFee)}</span>
              </div>
            )}
            <div className="flex justify-between text-[12px] border-t border-border pt-1.5"><span className="font-semibold text-foreground">Lab Total</span><span className="font-bold font-mono text-foreground">{fmt(labFee)}</span></div>
          </div>
        )}
        {paymentMode === "full" && (
          <div className="flex justify-between text-[12px] text-emerald-700">
            <span className="font-semibold">Full Payment Discount (5%)</span>
            <span className="font-bold font-mono">– {fmt(totalFee * 0.05)}</span>
          </div>
        )}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-wide">
                {paymentMode === "full" ? "Total After Discount" : "Total Balance Due"}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Payable upon confirmation</p>
            </div>
            <p className="text-xl font-bold text-primary font-mono">{fmt(discountedTotal)}</p>
          </div>
        </div>
        {paymentMode && paymentMode !== "full" && (
          <div className="bg-muted rounded-lg p-3 space-y-1.5">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Installment Schedule</p>
            {paymentMode === "2installment" ? (
              <>
                <div className="flex justify-between text-[12px]"><span className="text-foreground">1st (upon enrollment)</span><span className="font-mono font-semibold text-foreground">{fmt(totalFee * 0.5)}</span></div>
                <div className="flex justify-between text-[12px]"><span className="text-foreground">2nd (midterm)</span><span className="font-mono font-semibold text-foreground">{fmt(totalFee * 0.5)}</span></div>
              </>
            ) : (
              <>
                <div className="flex justify-between text-[12px]"><span className="text-foreground">1st (upon enrollment)</span><span className="font-mono font-semibold text-foreground">{fmt(totalFee * 0.33)}</span></div>
                <div className="flex justify-between text-[12px]"><span className="text-foreground">2nd (prelim)</span><span className="font-mono font-semibold text-foreground">{fmt(totalFee * 0.33)}</span></div>
                <div className="flex justify-between text-[12px]"><span className="text-foreground">3rd (midterm)</span><span className="font-mono font-semibold text-foreground">{fmt(totalFee * 0.34)}</span></div>
              </>
            )}
            <div className="flex justify-between text-[12px] border-t border-border pt-1.5">
              <span className="font-bold text-primary">Due Today</span>
              <span className="font-bold font-mono text-primary">{fmt(downPayment)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Step 1: Student Information ────────────────────────────────────────────

function Step1({ form, setForm }: { form: StudentForm; setForm: (f: StudentForm) => void }) {
  const [activeTab, setActiveTab] = useState<"personal" | "contact" | "emergency" | "academic">("personal");

  function field(label: string, key: keyof StudentForm, type = "text", placeholder = "", options?: string[]) {
    return (
      <div key={key}>
        <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">{label}</label>
        {options ? (
          <div className="relative">
            <select
              value={form[key]}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
              className="w-full border border-border rounded-lg px-3 py-2 text-[13px] bg-card text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition"
            >
              <option value="">Select...</option>
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        ) : (
          <input
            type={type}
            value={form[key]}
            placeholder={placeholder}
            onChange={e => setForm({ ...form, [key]: e.target.value })}
            className="w-full border border-border rounded-lg px-3 py-2 text-[13px] bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition"
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Tab navigation */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="flex border-b border-border">
          {([
            { id: "personal", label: "Personal Info", icon: User },
            { id: "contact", label: "Contact Details", icon: Phone },
            { id: "emergency", label: "Emergency Contact", icon: AlertCircle },
            { id: "academic", label: "Academic Records", icon: FileText },
          ] as const).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={[
                "flex items-center gap-2 px-5 py-3.5 text-[12px] font-semibold border-b-2 transition-colors flex-1 justify-center",
                activeTab === tab.id
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50",
              ].join(" ")}
            >
              <tab.icon size={13} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "personal" && (
            <div className="space-y-5">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Full Legal Name</p>
              <div className="grid grid-cols-4 gap-3">
                {field("Last Name", "lastName", "text", "e.g. Dela Cruz")}
                {field("First Name", "firstName", "text", "e.g. Juan")}
                {field("Middle Name", "middleName", "text", "e.g. Santos")}
                {field("Suffix", "suffix", "text", "Jr., Sr., III")}
              </div>
              <div className="border-t border-border pt-5">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">Personal Details</p>
                <div className="grid grid-cols-3 gap-3">
                  {field("Date of Birth", "dob", "date")}
                  {field("Gender", "gender", "text", "", ["Male", "Female", "Prefer not to say"])}
                  {field("Civil Status", "civilStatus", "text", "", ["Single", "Married", "Widowed"])}
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {field("Nationality", "nationality", "text", "", ["Filipino", "American", "Other"])}
                  {field("Religion", "religion", "text", "e.g. Roman Catholic")}
                </div>
              </div>
              <div className="border-t border-border pt-5">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">Student Type</p>
                <div className="grid grid-cols-3 gap-3">
                  {["New Student", "Continuing", "Transferee", "Cross-Enrollee", "Returnee", "Foreign Student"].map(type => (
                    <button
                      key={type}
                      onClick={() => setForm({ ...form, studentType: type })}
                      className={[
                        "px-3 py-2.5 rounded-lg border text-[12px] font-medium transition-all",
                        form.studentType === type
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-foreground hover:border-primary/30 hover:bg-muted/50",
                      ].join(" ")}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-5">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Contact Information</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Mobile Number</label>
                  <div className="relative">
                    <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} placeholder="+63 9XX XXX XXXX" className="w-full border border-border rounded-lg pl-8 pr-3 py-2 text-[13px] bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Email Address</label>
                  <div className="relative">
                    <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="student@email.com" type="email" className="w-full border border-border rounded-lg pl-8 pr-3 py-2 text-[13px] bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition" />
                  </div>
                </div>
              </div>
              <div className="border-t border-border pt-5">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">Home Address</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Street / Barangay</label>
                    <div className="relative">
                      <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="House No., Street, Barangay" className="w-full border border-border rounded-lg pl-8 pr-3 py-2 text-[13px] bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {field("City / Municipality", "city", "text", "e.g. Quezon City")}
                    {field("Province", "province", "text", "e.g. Metro Manila")}
                    {field("ZIP Code", "zip", "text", "e.g. 1100")}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "emergency" && (
            <div className="space-y-5">
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[12px] text-amber-800">Emergency contact information is required. This person will be notified in case of emergencies during school activities.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {field("Emergency Contact Name", "emergencyName", "text", "Full name")}
                {field("Relationship", "emergencyRelation", "text", "", ["Parent", "Guardian", "Spouse", "Sibling", "Relative", "Other"])}
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input value={form.emergencyMobile} onChange={e => setForm({ ...form, emergencyMobile: e.target.value })} placeholder="+63 9XX XXX XXXX" className="w-full border border-border rounded-lg pl-8 pr-3 py-2 text-[13px] bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition" />
                </div>
              </div>
              <div className="border-t border-border pt-5">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">Required Documents</p>
                <div className="space-y-2">
                  {[
                    { label: "Recent 2×2 Photo", status: "uploaded", file: "photo_jdc_2024.jpg" },
                    { label: "PSA Birth Certificate", status: "uploaded", file: "psa_bc_001.pdf" },
                    { label: "Form 137 / Transcript of Records", status: "uploaded", file: "tor_2024.pdf" },
                    { label: "Certificate of Good Moral Character", status: "pending", file: "" },
                    { label: "Medical Certificate", status: "pending", file: "" },
                  ].map(doc => (
                    <div key={doc.label} className={[
                      "flex items-center justify-between p-3 rounded-lg border",
                      doc.status === "uploaded" ? "bg-emerald-50/50 border-emerald-200" : "bg-muted/40 border-border border-dashed",
                    ].join(" ")}>
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${doc.status === "uploaded" ? "bg-emerald-100" : "bg-muted"}`}>
                          {doc.status === "uploaded"
                            ? <Check size={13} className="text-emerald-600" strokeWidth={2.5} />
                            : <Upload size={12} className="text-muted-foreground" />}
                        </div>
                        <div>
                          <p className="text-[12px] font-medium text-foreground">{doc.label}</p>
                          {doc.file && <p className="text-[10px] text-muted-foreground">{doc.file}</p>}
                        </div>
                      </div>
                      <button className={`text-[11px] font-semibold px-3 py-1 rounded-lg border transition-colors ${doc.status === "uploaded" ? "border-emerald-200 text-emerald-700 hover:bg-emerald-100" : "border-primary/30 text-primary hover:bg-primary/5"}`}>
                        {doc.status === "uploaded" ? "Replace" : "Upload"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "academic" && (
            <div className="space-y-5">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Previous School / Academic Records</p>
              <div className="grid grid-cols-2 gap-3">
                {field("Previous School", "prevSchool", "text", "e.g. University of Santo Tomas")}
                {field("Previous Program / Strand", "prevProgram", "text", "e.g. STEM / BSCS")}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {field("Year Level Completed", "prevYearLevel", "text", "", ["1st Year", "2nd Year", "3rd Year", "4th Year", "Grade 12"])}
                {field("General Weighted Average", "prevGWA", "text", "e.g. 1.75")}
                {field("Learner Reference No. (LRN)", "lrn", "text", "12-digit LRN")}
              </div>
              <div className="border-t border-border pt-5">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">Academic Awards / Honors</p>
                <div className="grid grid-cols-2 gap-2">
                  {["With Highest Honors", "With High Honors", "With Honors", "Honorable Mention", "President's Lister", "Dean's Lister", "None"].map(honor => (
                    <div key={honor} className="flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-muted/40 cursor-pointer group">
                      <div className="w-4 h-4 rounded border-2 border-border group-hover:border-primary/50 flex items-center justify-center transition-colors">
                      </div>
                      <span className="text-[12px] text-foreground">{honor}</span>
                      {["With Highest Honors", "With High Honors", "With Honors"].includes(honor) && (
                        <Star size={11} className="ml-auto text-amber-400 fill-amber-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick validation */}
      <div className="bg-card rounded-xl border border-border p-4">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">Form Completion</p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Personal Info", pct: 80, tab: "personal" },
            { label: "Contact Details", pct: 60, tab: "contact" },
            { label: "Emergency Contact", pct: 40, tab: "emergency" },
            { label: "Academic Records", pct: 50, tab: "academic" },
          ].map(({ label, pct, tab }) => (
            <button key={tab} onClick={() => setActiveTab(tab as typeof activeTab)} className="text-left">
              <p className="text-[11px] text-foreground font-medium mb-1">{label}</p>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${pct >= 80 ? "bg-emerald-400" : pct >= 50 ? "bg-amber-400" : "bg-red-400"}`} style={{ width: `${pct}%` }} />
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">{pct}% complete</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Step 2: Program Selection ──────────────────────────────────────────────

function Step2({
  programType, setProgramType,
  selectedProgram, setSelectedProgram,
  selectedBasicGrade, setSelectedBasicGrade,
  selectedStrand, setSelectedStrand,
}: {
  programType: ProgramType; setProgramType: (t: ProgramType) => void;
  selectedProgram: CollegeProgram | null; setSelectedProgram: (p: CollegeProgram | null) => void;
  selectedBasicGrade: string; setSelectedBasicGrade: (g: string) => void;
  selectedStrand: string | null; setSelectedStrand: (s: string | null) => void;
}) {
  let currentStage = "jhs";
  if (selectedBasicGrade === "Kindergarten") currentStage = "kinder";
  else if (selectedBasicGrade.match(/Grade [1-6]/)) currentStage = "elementary";
  else if (selectedBasicGrade.match(/Grade (7|8|9|10)/)) currentStage = "jhs";
  else if (selectedBasicGrade.match(/Grade (11|12)/)) currentStage = "shs";

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-card rounded-xl border border-border p-5">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">Education Level</p>
        <div className="grid grid-cols-2 gap-3">
          {(["college", "basic"] as ProgramType[]).map(type => (
            <button key={type} onClick={() => setProgramType(type)} className={[
              "flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-150",
              programType === type ? "border-primary bg-primary/5 shadow-sm shadow-blue-100" : "border-border bg-muted/40 hover:border-primary/30 hover:bg-muted",
            ].join(" ")}>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${programType === type ? "bg-primary" : "bg-border/60"}`}>
                {type === "college"
                  ? <GraduationCap size={16} className={programType === type ? "text-white" : "text-muted-foreground"} />
                  : <BookOpen size={16} className={programType === type ? "text-white" : "text-muted-foreground"} />}
              </div>
              <div>
                <p className={`text-[13px] font-bold ${programType === type ? "text-primary" : "text-foreground"}`}>
                  {type === "college" ? "College" : "Basic Education"}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {type === "college" ? "Undergraduate Programs" : "K to 12 Basic Education"}
                </p>
              </div>
              {programType === type && <Check size={16} className="ml-auto text-primary shrink-0" strokeWidth={2.5} />}
            </button>
          ))}
        </div>
      </div>

      {programType === "college" && (
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Available Programs</p>
            <span className="text-[10px] text-muted-foreground">{COLLEGE_PROGRAMS.length} programs</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {COLLEGE_PROGRAMS.map(prog => (
              <button key={prog.id} onClick={() => setSelectedProgram(prog)} className={[
                "text-left p-4 rounded-lg border transition-all duration-150",
                selectedProgram?.id === prog.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/30 hover:bg-muted/50",
              ].join(" ")}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] font-bold ${selectedProgram?.id === prog.id ? "text-primary" : "text-foreground"}`}>{prog.code}</p>
                    <p className="text-[11px] text-muted-foreground leading-snug mt-0.5 line-clamp-2">{prog.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 opacity-70 flex items-center gap-1">
                      <Building2 size={10} />{prog.department}
                    </p>
                  </div>
                  {selectedProgram?.id === prog.id && (
                    <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} className="text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-[10px] font-medium px-1.5 py-0.5 bg-muted rounded text-muted-foreground">₱{prog.tuitionPerUnit}/unit</span>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 bg-secondary rounded text-secondary-foreground">Year {prog.yearLevel}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {programType === "basic" && (
        <div className="space-y-4">
          {/* 1. Stage Selection */}
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">K-12 Education Stage</p>
            <div className="grid grid-cols-4 gap-3">
              {[
                { id: "kinder", label: "Kindergarten", desc: "Early Childhood (1 Year)", icon: Smile, range: "Kindergarten" },
                { id: "elementary", label: "Elementary", desc: "Primary (6 Years)", icon: Sparkles, range: "Grade 1 to 6" },
                { id: "jhs", label: "Junior High", desc: "Secondary (4 Years)", icon: Compass, range: "Grade 7 to 10" },
                { id: "shs", label: "Senior High", desc: "Upper Sec (2 Years)", icon: Award, range: "Grade 11 to 12" },
              ].map(stage => {
                const isActive = currentStage === stage.id;
                const Icon = stage.icon;
                return (
                  <button
                    key={stage.id}
                    onClick={() => {
                      if (stage.id === "kinder") {
                        setSelectedBasicGrade("Kindergarten");
                        setSelectedStrand(null);
                      } else if (stage.id === "elementary") {
                        setSelectedBasicGrade("Grade 1");
                        setSelectedStrand(null);
                      } else if (stage.id === "jhs") {
                        setSelectedBasicGrade("Grade 7");
                        setSelectedStrand(null);
                      } else {
                        setSelectedBasicGrade("Grade 11");
                        setSelectedStrand("stem");
                      }
                    }}
                    className={[
                      "flex flex-col p-4 rounded-xl border-2 text-left transition-all duration-150 relative overflow-hidden",
                      isActive
                        ? "border-primary bg-primary/5 shadow-sm shadow-blue-100"
                        : "border-border bg-muted/40 hover:border-primary/30 hover:bg-muted",
                    ].join(" ")}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mb-3 ${isActive ? "bg-primary text-white" : "bg-border/60 text-muted-foreground"}`}>
                      <Icon size={15} />
                    </div>
                    <p className={`text-[13px] font-bold ${isActive ? "text-primary" : "text-foreground"}`}>
                      {stage.label}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">
                      {stage.desc}
                    </p>
                    <span className="text-[9px] mt-2.5 px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-semibold inline-block self-start">
                      {stage.range}
                    </span>
                    {isActive && <Check size={14} className="absolute top-3 right-3 text-primary" strokeWidth={3} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Grade Level Selection */}
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">Grade Level Selection</p>
            {currentStage === "kinder" && (
              <p className="text-[12px] text-muted-foreground">Kindergarten is a single 1-year early childhood education program.</p>
            )}
            {currentStage === "elementary" && (
              <div className="flex flex-wrap gap-2">
                {["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"].map(grade => {
                  const isSel = selectedBasicGrade === grade;
                  return (
                    <button
                      key={grade}
                      onClick={() => setSelectedBasicGrade(grade)}
                      className={`px-4 py-2.5 rounded-lg border text-[12px] font-medium transition-all ${
                        isSel ? "border-primary bg-primary/5 text-primary" : "border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      {grade}
                    </button>
                  );
                })}
              </div>
            )}
            {currentStage === "jhs" && (
              <div className="flex flex-wrap gap-2">
                {["Grade 7", "Grade 8", "Grade 9", "Grade 10"].map(grade => {
                  const isSel = selectedBasicGrade === grade;
                  return (
                    <button
                      key={grade}
                      onClick={() => setSelectedBasicGrade(grade)}
                      className={`px-4 py-2.5 rounded-lg border text-[12px] font-medium transition-all ${
                        isSel ? "border-primary bg-primary/5 text-primary" : "border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      {grade}
                    </button>
                  );
                })}
              </div>
            )}
            {currentStage === "shs" && (
              <div className="flex flex-wrap gap-2">
                {["Grade 11", "Grade 12"].map(grade => {
                  const isSel = selectedBasicGrade === grade;
                  return (
                    <button
                      key={grade}
                      onClick={() => setSelectedBasicGrade(grade)}
                      className={`px-4 py-2.5 rounded-lg border text-[12px] font-medium transition-all ${
                        isSel ? "border-primary bg-primary/5 text-primary" : "border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      {grade}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Strand Selection for Senior High */}
          {currentStage === "shs" && (
            <div className="bg-card rounded-xl border border-border p-5">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">Academic Strand / Track (for SHS)</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "stem", label: "STEM", desc: "Science, Technology, Engineering & Mathematics", color: "text-blue-700 bg-blue-50/50 border-blue-200" },
                  { id: "abm", label: "ABM", desc: "Accountancy, Business & Management", color: "text-emerald-700 bg-emerald-50/50 border-emerald-200" },
                  { id: "humss", label: "HUMSS", desc: "Humanities & Social Sciences", color: "text-violet-700 bg-violet-50/50 border-violet-200" },
                  { id: "tvl", label: "TVL", desc: "Technical-Vocational-Livelihood", color: "text-amber-700 bg-amber-50/50 border-amber-200" },
                ].map(strand => {
                  const isSel = selectedStrand === strand.id;
                  return (
                    <button
                      key={strand.id}
                      onClick={() => setSelectedStrand(strand.id)}
                      className={[
                        `p-4 rounded-lg border text-left cursor-pointer transition-all ${strand.color}`,
                        isSel ? "ring-2 ring-primary ring-offset-2 border-transparent scale-[1.01]" : "opacity-80 hover:opacity-100",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-[13px] font-bold">{strand.label}</p>
                        {isSel && <Check size={14} strokeWidth={3} className="text-foreground shrink-0" />}
                      </div>
                      <p className="text-[11px] mt-0.5 opacity-90">{strand.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Step 3: Subject / Section Selection ───────────────────────────────────

function Step3({
  programType, selectedProgram, selectedSubjects, setSelectedSubjects, selectedSection, setSelectedSection,
  selectedBasicGrade, selectedStrand,
}: {
  programType: ProgramType; selectedProgram: CollegeProgram | null;
  selectedSubjects: string[]; setSelectedSubjects: (s: string[]) => void;
  selectedSection: string; setSelectedSection: (s: string) => void;
  selectedBasicGrade: string; selectedStrand: string | null;
}) {
  function toggleSubject(id: string) {
    setSelectedSubjects(selectedSubjects.includes(id) ? selectedSubjects.filter(s => s !== id) : [...selectedSubjects, id]);
  }
  const { totalUnits } = computeFees(
    programType,
    selectedProgram,
    selectedSubjects,
    selectedBasicGrade,
    selectedStrand
  );

  let gradeSections = SECTIONS.filter(s => s.grade === selectedBasicGrade);
  if (selectedBasicGrade === "Grade 11" || selectedBasicGrade === "Grade 12") {
    if (selectedStrand) {
      gradeSections = gradeSections.filter(s => s.id.includes(selectedStrand));
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {programType === "college" ? (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div>
              <p className="text-[13px] font-bold text-foreground">Subject Enrollment</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{selectedProgram?.name ?? "—"} · Check subjects to enroll</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${totalUnits >= 15 && totalUnits <= 25 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                {totalUnits} / 21 units
              </span>
              <span className="text-[11px] text-muted-foreground">{selectedSubjects.length} selected</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="bg-muted/60 border-b border-border">
                  <th className="px-4 py-2.5 text-left w-8"></th>
                  <th className="px-3 py-2.5 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Code</th>
                  <th className="px-3 py-2.5 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Subject Title</th>
                  <th className="px-3 py-2.5 text-center text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Units</th>
                  <th className="px-3 py-2.5 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Schedule</th>
                  <th className="px-3 py-2.5 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Room</th>
                  <th className="px-3 py-2.5 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Instructor</th>
                  <th className="px-3 py-2.5 text-center text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Slots</th>
                </tr>
              </thead>
              <tbody>
                {SUBJECTS.map((subj, idx) => {
                  const checked = selectedSubjects.includes(subj.id);
                  const full = subj.enrolled >= subj.slots;
                  return (
                    <tr key={subj.id} onClick={() => !full && toggleSubject(subj.id)} className={[
                      "border-b border-border last:border-0 transition-colors duration-100",
                      full ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-muted/40",
                      checked ? "bg-primary/5" : idx % 2 === 0 ? "" : "bg-muted/20",
                    ].join(" ")}>
                      <td className="px-4 py-3">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${checked ? "bg-primary border-primary" : "border-border bg-card"}`}>
                          {checked && <Check size={10} className="text-white" strokeWidth={3} />}
                        </div>
                      </td>
                      <td className="px-3 py-3"><span className="font-bold text-primary font-mono text-[11px]">{subj.code}</span></td>
                      <td className="px-3 py-3">
                        <span className="font-medium text-foreground">{subj.title}</span>
                        {subj.hasLab && <span className="ml-2 text-[9px] font-bold px-1.5 py-0.5 bg-violet-50 text-violet-700 border border-violet-200 rounded">+ Lab</span>}
                      </td>
                      <td className="px-3 py-3 text-center"><span className="font-semibold text-foreground">{subj.units}</span></td>
                      <td className="px-3 py-3 text-muted-foreground whitespace-nowrap">{subj.schedule}</td>
                      <td className="px-3 py-3 text-muted-foreground font-mono text-[11px]">{subj.room}</td>
                      <td className="px-3 py-3 text-muted-foreground">{subj.instructor}</td>
                      <td className="px-3 py-3 text-center">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${slotColor(subj.enrolled, subj.slots)}`}>
                          {slotLabel(subj.enrolled, subj.slots)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 bg-muted/30 border-t border-border flex items-center gap-3">
            <Info size={13} className="text-muted-foreground shrink-0" />
            <p className="text-[11px] text-muted-foreground">Minimum of 15 units required. Maximum of 24 units per semester. Lab subjects include an additional laboratory fee.</p>
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[13px] font-bold text-foreground">Section Assignment</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Grade Level: <span className="font-bold text-primary">{selectedBasicGrade}</span>
                {selectedStrand && <span> · Strand: <span className="font-bold text-primary">{selectedStrand.toUpperCase()}</span></span>}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {gradeSections.map(sec => {
              const active = selectedSection === sec.id;
              const rem = sec.slots - sec.enrolled;
              return (
                <button key={sec.id} onClick={() => setSelectedSection(sec.id)} className={[
                  "text-left p-3.5 rounded-lg border-2 transition-all duration-150",
                  active ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/30 hover:bg-muted/50",
                ].join(" ")}>
                  <div className="flex items-start justify-between">
                    <p className={`text-[12px] font-bold leading-tight ${active ? "text-primary" : "text-foreground"}`}>{sec.section}</p>
                    {active && <Check size={14} className="text-primary shrink-0" strokeWidth={2.5} />}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">Adviser: {sec.adviser}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${sec.enrolled / sec.slots >= 0.9 ? "bg-red-400" : "bg-emerald-400"}`} style={{ width: `${(sec.enrolled / sec.slots) * 100}%` }} />
                    </div>
                    <span className={`text-[10px] font-semibold ${rem <= 3 ? "text-red-500" : "text-emerald-600"}`}>{rem} open</span>
                  </div>
                </button>
              );
            })}
            {gradeSections.length === 0 && (
              <div className="col-span-2 py-6 text-center">
                <p className="text-[12px] text-muted-foreground">No sections available for the selected grade and strand.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Step 4: Assessment ─────────────────────────────────────────────────────

function Step4({
  programType,
  selectedProgram,
  selectedSubjects,
  selectedBasicGrade,
  selectedStrand,
}: {
  programType: ProgramType;
  selectedProgram: CollegeProgram | null;
  selectedSubjects: string[];
  selectedBasicGrade: string;
  selectedStrand: string | null;
}) {
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [scholarship, setScholarship] = useState("");
  const { subjects, totalUnits, tuitionRate, tuitionFee, labFee, miscTotal, totalFee } = computeFees(
    programType,
    selectedProgram,
    selectedSubjects,
    selectedBasicGrade,
    selectedStrand
  );
  const scholarshipDiscount = scholarship === "academic" ? totalFee * 0.5 : scholarship === "merit" ? tuitionFee * 0.25 : 0;
  const codeDiscount = discountApplied ? 500 : 0;
  const finalTotal = totalFee - scholarshipDiscount - codeDiscount;

  return (
    <div className="flex flex-col gap-4">
      {/* Selected subjects review */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <p className="text-[13px] font-bold text-foreground">
            {programType === "college" ? "Enrolled Subjects" : "Curriculum Subjects"}
          </p>
          {programType === "college" && (
            <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{totalUnits} units</span>
          )}
        </div>
        <table className="w-full text-[12px]">
          <thead>
            <tr className="bg-muted/60 border-b border-border">
              {programType === "college" ? (
                ["Code", "Subject Title", "Units", "Schedule", "Instructor", "Tuition", "Lab Fee"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{h}</th>
                ))
              ) : (
                ["Code", "Subject Title", "Schedule", "Room", "Instructor", "Lab Fee"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{h}</th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {subjects.map((s, idx) => (
              <tr key={s.code} className={`border-b border-border last:border-0 ${idx % 2 === 1 ? "bg-muted/20" : ""}`}>
                <td className="px-4 py-3 font-bold text-primary font-mono text-[11px]">{s.code}</td>
                <td className="px-4 py-3 font-medium text-foreground">{s.title}</td>
                {programType === "college" && (
                  <td className="px-4 py-3 text-center font-semibold text-foreground">{(s as any).units}</td>
                )}
                <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{s.schedule}</td>
                {programType === "basic" && (
                  <td className="px-4 py-3 text-muted-foreground font-mono text-[11px]">{s.room}</td>
                )}
                <td className="px-4 py-3 text-muted-foreground">{s.instructor}</td>
                {programType === "college" && (
                  <td className="px-4 py-3 font-mono text-foreground">{fmt((s as any).units * tuitionRate)}</td>
                )}
                <td className="px-4 py-3 font-mono text-foreground">{s.hasLab ? fmt(s.labFee ?? (s.code === "S-STEM2" || s.code === "S-TVL1" ? 2000 : 1500)) : <span className="text-muted-foreground">—</span>}</td>
              </tr>
            ))}
            {programType === "college" ? (
              <tr className="bg-muted/40 font-semibold">
                <td colSpan={2} className="px-4 py-3 text-foreground">Subtotals</td>
                <td className="px-4 py-3 text-center font-bold text-foreground">{totalUnits}</td>
                <td colSpan={2}></td>
                <td className="px-4 py-3 font-mono font-bold text-foreground">{fmt(tuitionFee)}</td>
                <td className="px-4 py-3 font-mono font-bold text-foreground">{fmt(labFee)}</td>
              </tr>
            ) : (
              <tr className="bg-muted/40 font-semibold">
                <td colSpan={2} className="px-4 py-3 text-foreground">Subtotals</td>
                <td colSpan={1}></td>
                <td colSpan={2} className="px-4 py-3 text-right text-muted-foreground">Tuition & Lab:</td>
                <td className="px-4 py-3 font-mono font-bold text-foreground">{fmt(tuitionFee + labFee)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Scholarship & discount */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">Scholarship / Grant</p>
          <div className="space-y-2">
            {[
              { id: "none", label: "No Scholarship", desc: "Full payment required", discount: "" },
              { id: "academic", label: "Academic Scholarship", desc: "50% tuition discount for honor students", discount: "50% off tuition" },
              { id: "merit", label: "Merit Grant", desc: "25% tuition discount", discount: "25% off tuition" },
              { id: "sibling", label: "Sibling Discount", desc: "5% if sibling is enrolled", discount: "5% off total" },
            ].map(s => (
              <button key={s.id} onClick={() => setScholarship(s.id === "none" ? "" : s.id)} className={[
                "w-full text-left p-3 rounded-lg border transition-all",
                (scholarship === s.id || (s.id === "none" && !scholarship))
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30 hover:bg-muted/50",
              ].join(" ")}>
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-semibold text-foreground">{s.label}</p>
                  {s.discount && <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">{s.discount}</span>}
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">{s.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5 flex flex-col gap-4">
          <div>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">Discount / Promo Code</p>
            <div className="flex gap-2">
              <input
                value={discountCode}
                onChange={e => setDiscountCode(e.target.value.toUpperCase())}
                placeholder="Enter code (e.g. EARLY2024)"
                className="flex-1 border border-border rounded-lg px-3 py-2 text-[13px] bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition font-mono"
              />
              <button
                onClick={() => { if (discountCode) setDiscountApplied(true); }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-[12px] font-bold hover:bg-primary/90 transition"
              >Apply</button>
            </div>
            {discountApplied && (
              <div className="flex items-center gap-2 mt-2 text-[11px] text-emerald-700">
                <Check size={12} strokeWidth={3} />
                <span>Code applied — ₱500.00 discount</span>
              </div>
            )}
          </div>

          {/* Final fee breakdown */}
          <div className="flex-1 bg-muted/50 rounded-xl p-4 space-y-2.5">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Final Assessment</p>
            <div className="flex justify-between text-[12px]"><span className="text-muted-foreground">Tuition</span><span className="font-mono">{fmt(tuitionFee)}</span></div>
            <div className="flex justify-between text-[12px]"><span className="text-muted-foreground">Miscellaneous</span><span className="font-mono">{fmt(miscTotal)}</span></div>
            {labFee > 0 && <div className="flex justify-between text-[12px]"><span className="text-muted-foreground">Laboratory</span><span className="font-mono">{fmt(labFee)}</span></div>}
            {scholarshipDiscount > 0 && (
              <div className="flex justify-between text-[12px] text-emerald-700"><span className="font-semibold">Scholarship Discount</span><span className="font-mono font-bold">– {fmt(scholarshipDiscount)}</span></div>
            )}
            {codeDiscount > 0 && (
              <div className="flex justify-between text-[12px] text-emerald-700"><span className="font-semibold">Promo Code</span><span className="font-mono font-bold">– {fmt(codeDiscount)}</span></div>
            )}
            <div className="border-t border-border pt-2.5 flex justify-between items-center">
              <span className="font-bold text-foreground text-[13px]">Total Due</span>
              <span className="font-bold text-primary font-mono text-xl">{fmt(finalTotal)}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <Info size={13} className="text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-800">Your assessment has been computed. Proceed to payment to complete enrollment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step 5: Payment ────────────────────────────────────────────────────────

function Step5({
  paymentMethod, setPaymentMethod,
  paymentMode, setPaymentMode,
  programType,
  selectedProgram, selectedSubjects,
  selectedBasicGrade, selectedStrand,
}: {
  paymentMethod: PaymentMethod; setPaymentMethod: (m: PaymentMethod) => void;
  paymentMode: PaymentMode; setPaymentMode: (m: PaymentMode) => void;
  programType: ProgramType;
  selectedProgram: CollegeProgram | null; selectedSubjects: string[];
  selectedBasicGrade: string; selectedStrand: string | null;
}) {
  const { totalFee } = computeFees(
    programType,
    selectedProgram,
    selectedSubjects,
    selectedBasicGrade,
    selectedStrand
  );
  const [referenceNo, setReferenceNo] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const finalTotal = paymentMode === "full" ? totalFee * 0.95 : totalFee;
  const dueNow = paymentMode === "full" ? finalTotal : paymentMode === "2installment" ? totalFee * 0.5 : totalFee * 0.33;

  const methods: { id: PaymentMethod; label: string; desc: string; icon: React.ReactNode; color: string }[] = [
    { id: "cash", label: "Cash Payment", desc: "Pay at the cashier's office", icon: <Wallet size={18} />, color: "blue" },
    { id: "gcash", label: "GCash", desc: "Send to 0917-XXX-XXXX", icon: <Smartphone size={18} />, color: "blue" },
    { id: "bank", label: "Bank Transfer", desc: "BPI / BDO / UnionBank", icon: <Landmark size={18} />, color: "blue" },
    { id: "online", label: "Online Payment", desc: "PayMaya, PayPal, Dragonpay", icon: <CreditCard size={18} />, color: "blue" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Payment mode */}
      <div className="bg-card rounded-xl border border-border p-5">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">Payment Schedule</p>
        <div className="grid grid-cols-3 gap-3">
          {([
            { id: "full", label: "Full Payment", badge: "5% discount", badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200", amount: totalFee * 0.95 },
            { id: "2installment", label: "2 Installments", badge: "50-50 split", badgeColor: "bg-blue-50 text-blue-700 border-blue-200", amount: totalFee * 0.5 },
            { id: "3installment", label: "3 Installments", badge: "33-33-34%", badgeColor: "bg-violet-50 text-violet-700 border-violet-200", amount: totalFee * 0.33 },
          ] as const).map(m => (
            <button key={m.id} onClick={() => setPaymentMode(m.id)} className={[
              "text-left p-4 rounded-xl border-2 transition-all",
              paymentMode === m.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/30 hover:bg-muted/40",
            ].join(" ")}>
              <div className="flex items-start justify-between">
                <p className={`text-[12px] font-bold ${paymentMode === m.id ? "text-primary" : "text-foreground"}`}>{m.label}</p>
                {paymentMode === m.id && <Check size={14} className="text-primary" strokeWidth={2.5} />}
              </div>
              <span className={`inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${m.badgeColor}`}>{m.badge}</span>
              <p className="text-[11px] text-muted-foreground mt-2">Due today: <span className="font-bold text-foreground font-mono">{fmt(m.amount)}</span></p>
            </button>
          ))}
        </div>
      </div>

      {/* Payment method */}
      <div className="bg-card rounded-xl border border-border p-5">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">Payment Method</p>
        <div className="grid grid-cols-4 gap-3">
          {methods.map(m => (
            <button key={m.id} onClick={() => setPaymentMethod(m.id)} className={[
              "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
              paymentMethod === m.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30 hover:bg-muted/50",
            ].join(" ")}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === m.id ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                {m.icon}
              </div>
              <p className={`text-[12px] font-bold text-center ${paymentMethod === m.id ? "text-primary" : "text-foreground"}`}>{m.label}</p>
              <p className="text-[10px] text-muted-foreground text-center leading-tight">{m.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Payment details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border p-5 space-y-4">
          <p className="text-[13px] font-bold text-foreground">Payment Details</p>

          {paymentMethod === "cash" && (
            <div className="space-y-3">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-[12px] font-semibold text-amber-800">Walk-in Payment</p>
                <p className="text-[11px] text-amber-700 mt-1">Proceed to the University Cashier (Finance Office, Building A, Ground Floor) with your enrollment slip and pay the amount due.</p>
                <div className="mt-3 space-y-1">
                  <p className="text-[11px] text-amber-700">Office Hours: Monday–Friday, 8:00 AM – 4:00 PM</p>
                  <p className="text-[11px] text-amber-700">Contact: +63 2 8923-4567 local 101</p>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">OR Number (after payment)</label>
                <input value={referenceNo} onChange={e => setReferenceNo(e.target.value)} placeholder="Enter Official Receipt No." className="w-full border border-border rounded-lg px-3 py-2 text-[13px] bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition font-mono" />
              </div>
            </div>
          )}

          {paymentMethod === "gcash" && (
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
                <p className="text-[11px] text-muted-foreground mb-1">Send to GCash Number</p>
                <p className="text-2xl font-bold text-primary font-mono tracking-widest">0917-834-5600</p>
                <p className="text-[11px] text-muted-foreground mt-1">Account Name: UP Finance Office</p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <p className="text-[12px] font-semibold text-foreground">Amount to send:</p>
                  <p className="text-[14px] font-bold text-primary font-mono">{fmt(dueNow)}</p>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">GCash Reference Number</label>
                <input value={referenceNo} onChange={e => setReferenceNo(e.target.value)} placeholder="13-digit reference number" className="w-full border border-border rounded-lg px-3 py-2 text-[13px] bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition font-mono" />
              </div>
            </div>
          )}

          {paymentMethod === "bank" && (
            <div className="space-y-3">
              {[
                { bank: "BPI", account: "3198-XXXX-XX", name: "UP Main – General Fund" },
                { bank: "BDO", account: "0027-3800-XXXX", name: "UP Finance Office" },
                { bank: "UnionBank", account: "0099-XXXX-5312", name: "University of the Philippines" },
              ].map(b => (
                <div key={b.bank} className="p-3 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-bold text-foreground">{b.bank}</p>
                    <span className="text-[10px] font-mono text-muted-foreground">{b.account}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{b.name}</p>
                </div>
              ))}
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Transaction Reference No.</label>
                <input value={referenceNo} onChange={e => setReferenceNo(e.target.value)} placeholder="Bank transaction reference" className="w-full border border-border rounded-lg px-3 py-2 text-[13px] bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition font-mono" />
              </div>
            </div>
          )}

          {paymentMethod === "online" && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {["PayMaya", "PayPal", "Dragonpay"].map(p => (
                  <div key={p} className="p-3 rounded-lg border border-border text-center bg-muted/30">
                    <p className="text-[12px] font-bold text-foreground">{p}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Available</p>
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Transaction Reference No.</label>
                <input value={referenceNo} onChange={e => setReferenceNo(e.target.value)} placeholder="Enter transaction ID" className="w-full border border-border rounded-lg px-3 py-2 text-[13px] bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition font-mono" />
              </div>
            </div>
          )}

          {/* Proof of payment */}
          {paymentMethod !== "cash" && (
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Proof of Payment</label>
              <div
                onClick={() => setUploaded(true)}
                className={[
                  "border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors",
                  uploaded ? "border-emerald-400 bg-emerald-50" : "border-border hover:border-primary/50 hover:bg-muted/30",
                ].join(" ")}
              >
                {uploaded ? (
                  <div className="flex flex-col items-center gap-1.5">
                    <Check size={20} className="text-emerald-600" strokeWidth={2} />
                    <p className="text-[12px] font-semibold text-emerald-700">payment_proof.jpg uploaded</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1.5">
                    <Upload size={20} className="text-muted-foreground" />
                    <p className="text-[12px] text-muted-foreground">Click to upload screenshot / receipt</p>
                    <p className="text-[10px] text-muted-foreground/70">JPG, PNG or PDF, max 5MB</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Payment summary */}
        <div className="bg-card rounded-xl border border-border p-5 space-y-4">
          <p className="text-[13px] font-bold text-foreground">Payment Summary</p>
          <div className="space-y-2.5">
            <div className="flex justify-between text-[12px]"><span className="text-muted-foreground">Gross Assessment</span><span className="font-mono text-foreground">{fmt(totalFee)}</span></div>
            {paymentMode === "full" && <div className="flex justify-between text-[12px] text-emerald-700"><span className="font-semibold">Full Payment Discount</span><span className="font-mono font-bold">– {fmt(totalFee * 0.05)}</span></div>}
            <div className="border-t border-border pt-2.5 flex justify-between text-[12px]"><span className="font-semibold text-foreground">Net Total</span><span className="font-mono font-bold text-foreground">{fmt(finalTotal)}</span></div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
            <p className="text-[11px] text-muted-foreground">Amount Due Today</p>
            <p className="text-3xl font-bold text-primary font-mono mt-1">{fmt(dueNow)}</p>
            {paymentMode !== "full" && (
              <p className="text-[10px] text-muted-foreground mt-1">
                Remaining {paymentMode === "2installment" ? "50%" : "67%"} ({fmt(finalTotal - dueNow)}) due per schedule
              </p>
            )}
          </div>

          {referenceNo && (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <Check size={14} className="text-emerald-600" strokeWidth={2.5} />
              <div>
                <p className="text-[11px] font-semibold text-emerald-800">Reference Entered</p>
                <p className="text-[11px] font-mono text-emerald-700">{referenceNo}</p>
              </div>
            </div>
          )}

          <div className="space-y-1.5 text-[11px] text-muted-foreground">
            <div className="flex items-start gap-2"><Lock size={11} className="mt-0.5 shrink-0" /><span>All transactions are secured and encrypted.</span></div>
            <div className="flex items-start gap-2"><Info size={11} className="mt-0.5 shrink-0" /><span>Payment verification may take 1–2 business days for bank transfers.</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step 6: Confirmation ───────────────────────────────────────────────────

function Step6({
  form, programType, selectedProgram, selectedSubjects, selectedBasicGrade, selectedStrand, selectedSection,
  paymentMode, paymentMethod,
}: {
  form: StudentForm; programType: ProgramType;
  selectedProgram: CollegeProgram | null; selectedSubjects: string[];
  selectedBasicGrade: string; selectedStrand: string | null;
  selectedSection: string;
  paymentMode: PaymentMode; paymentMethod: PaymentMethod;
}) {
  const { subjects, totalUnits, totalFee } = computeFees(
    programType,
    selectedProgram,
    selectedSubjects,
    selectedBasicGrade,
    selectedStrand
  );
  const finalTotal = paymentMode === "full" ? totalFee * 0.95 : totalFee;
  const dueNow = paymentMode === "full" ? finalTotal : paymentMode === "2installment" ? totalFee * 0.5 : totalFee * 0.33;
  const section = SECTIONS.find(s => s.id === selectedSection);
  const fullName = [form.firstName || "Juan", form.middleName ? form.middleName[0] + "." : "", form.lastName || "Dela Cruz"].filter(Boolean).join(" ");
  const enrollmentNo = "ENR-2024-00847";
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle2 size={40} className="text-emerald-600" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Enrollment Confirmed!</h2>
          <p className="text-muted-foreground mt-2 text-[14px]">Your enrollment has been successfully processed for AY 2025–2026, {programType === "college" ? "1st Semester" : "Full Year"}.</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md text-center space-y-3">
          <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold">Enrollment Number</p>
          <p className="text-2xl font-bold text-primary font-mono tracking-widest">{enrollmentNo}</p>
          <div className="grid grid-cols-2 gap-3 text-left mt-2">
            <div><p className="text-[10px] text-muted-foreground">Student Name</p><p className="text-[12px] font-semibold text-foreground">{fullName}</p></div>
            <div>
              <p className="text-[10px] text-muted-foreground">Level / Program</p>
              <p className="text-[12px] font-semibold text-foreground">
                {programType === "college" ? selectedProgram?.code : selectedBasicGrade}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">{programType === "college" ? "Units Enrolled" : "Enrolled Subjects"}</p>
              <p className="text-[12px] font-semibold text-foreground">
                {programType === "college" ? `${totalUnits} units` : `${subjects.length} subjects`}
              </p>
            </div>
            <div><p className="text-[10px] text-muted-foreground">Amount Paid</p><p className="text-[12px] font-semibold text-primary font-mono">{fmt(dueNow)}</p></div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg text-[13px] font-semibold text-foreground hover:bg-muted transition">
            <Printer size={15} />Print Registration Form
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-[13px] font-bold hover:bg-primary/90 transition">
            <Download size={15} />Download Schedule
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground text-center max-w-sm">
          An email confirmation has been sent to <span className="font-semibold text-foreground">{form.email || "jdelacruz@student.edu.ph"}</span>. Present your enrollment form on the first day of classes.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Enrollment banner */}
      <div className="bg-primary rounded-2xl p-6 flex items-center gap-5">
        <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
          <GraduationCap size={28} className="text-white" />
        </div>
        <div>
          <p className="text-primary-foreground text-[11px] font-semibold uppercase tracking-widest opacity-80">Ready to Submit</p>
          <p className="text-primary-foreground text-xl font-bold mt-0.5">Review & Confirm Enrollment</p>
          <p className="text-primary-foreground/70 text-[12px] mt-0.5">Please review all details before confirming. This action cannot be undone.</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-primary-foreground/70 text-[11px]">Enrollment No.</p>
          <p className="text-primary-foreground font-mono font-bold text-lg">{enrollmentNo}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Student info review */}
        <div className="bg-card rounded-xl border border-border p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-bold text-foreground">Student Information</p>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"><Check size={9} strokeWidth={3} />Verified</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-[12px]">
            {[
              { l: "Full Name", v: fullName },
              { l: "Student No.", v: "2024-00147" },
              { l: "Grade / Year Level", v: programType === "college" ? "Year " + (selectedProgram?.yearLevel ?? 2) : selectedBasicGrade },
              { l: "Academic Year", v: programType === "college" ? "2025–2026, 1st Sem" : "2025–2026, Full Year" },
              { l: "Mobile", v: form.mobile || "+63 917 234 5678" },
              { l: "Email", v: form.email || "jdelacruz@student.edu.ph" },
            ].map(({ l, v }) => (
              <div key={l}>
                <p className="text-[10px] text-muted-foreground font-medium">{l}</p>
                <p className="font-semibold text-foreground break-all">{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Program review */}
        <div className="bg-card rounded-xl border border-border p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-bold text-foreground">Program & Schedule</p>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"><Check size={9} strokeWidth={3} />Confirmed</span>
          </div>
          {programType === "college" ? (
            <div className="space-y-3">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-[11px] text-muted-foreground">Program</p>
                <p className="text-[13px] font-bold text-primary">{selectedProgram?.code}</p>
                <p className="text-[11px] text-foreground">{selectedProgram?.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                <div><p className="text-[10px] text-muted-foreground">Units</p><p className="font-bold text-foreground">{totalUnits}</p></div>
                <div><p className="text-[10px] text-muted-foreground">Subjects</p><p className="font-bold text-foreground">{subjects.length}</p></div>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-muted/50 rounded-lg space-y-2">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Grade Level & Section</p>
                <p className="text-[13px] font-bold text-primary">{selectedBasicGrade} – {(section?.section.split('–')[1]?.trim() || section?.section) ?? "—"}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[12px] pt-1.5 border-t border-border/60">
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium">Adviser</p>
                  <p className="font-semibold text-foreground">{section?.adviser ?? "—"}</p>
                </div>
                {selectedStrand && (
                  <div>
                    <p className="text-[10px] text-muted-foreground font-medium">Strand</p>
                    <p className="font-semibold text-primary">{selectedStrand.toUpperCase()}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subjects table */}
      {subjects.length > 0 && (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-3 border-b border-border flex justify-between items-center bg-muted/20">
            <p className="text-[12px] font-bold text-foreground">
              {programType === "college" ? `Enrolled Subjects (${subjects.length})` : `Curriculum Subjects (${subjects.length})`}
            </p>
            {programType === "college" && (
              <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">{totalUnits} units</span>
            )}
          </div>
          <table className="w-full text-[12px]">
            <thead>
              <tr className="bg-muted/60 border-b border-border">
                {programType === "college" ? (
                  ["Code", "Subject", "Units", "Schedule", "Room", "Instructor"].map(h => (
                    <th key={h} className="px-4 py-2 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{h}</th>
                  ))
                ) : (
                  ["Code", "Subject", "Schedule", "Room", "Instructor"].map(h => (
                    <th key={h} className="px-4 py-2 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{h}</th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {subjects.map((s, i) => (
                <tr key={s.code} className={`border-b border-border last:border-0 ${i % 2 === 1 ? "bg-muted/20" : ""}`}>
                  <td className="px-4 py-2.5 font-bold text-primary font-mono text-[11px]">{s.code}</td>
                  <td className="px-4 py-2.5 font-medium text-foreground">{s.title}</td>
                  {programType === "college" && (
                    <td className="px-4 py-2.5 text-center font-semibold text-foreground">{(s as any).units}</td>
                  )}
                  <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{s.schedule}</td>
                  <td className="px-4 py-2.5 text-muted-foreground font-mono text-[11px]">{s.room}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{s.instructor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Payment summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border p-5 space-y-3">
          <p className="text-[13px] font-bold text-foreground">Payment Details</p>
          <div className="space-y-2 text-[12px]">
            {[
              { l: "Payment Mode", v: paymentMode === "full" ? "Full Payment (5% discount)" : paymentMode === "2installment" ? "2 Installments" : "3 Installments" },
              { l: "Payment Method", v: { cash: "Cash (Walk-in)", gcash: "GCash", bank: "Bank Transfer", online: "Online Payment" }[paymentMethod] },
              { l: "Total Assessment", v: fmt(totalFee) },
              { l: "Due Today", v: fmt(dueNow) },
            ].map(({ l, v }) => (
              <div key={l} className="flex justify-between">
                <span className="text-muted-foreground">{l}</span>
                <span className="font-semibold text-foreground">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5 flex flex-col gap-3">
          <p className="text-[13px] font-bold text-foreground">Agreements</p>
          {[
            "I confirm that all information provided is accurate and complete.",
            "I agree to the University's enrollment policies and academic guidelines.",
            "I understand that falsification of documents is grounds for dismissal.",
          ].map((text, i) => (
            <label key={i} className="flex items-start gap-2.5 cursor-pointer group">
              <div className="w-4 h-4 rounded border-2 border-primary bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={10} className="text-primary" strokeWidth={3} />
              </div>
              <span className="text-[11px] text-foreground leading-relaxed">{text}</span>
            </label>
          ))}
          <button
            onClick={() => setConfirmed(true)}
            className="mt-2 w-full py-3 bg-emerald-600 text-white rounded-xl text-[13px] font-bold hover:bg-emerald-700 active:scale-[0.99] transition-all shadow-sm shadow-emerald-200 flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={16} />
            Confirm & Submit Enrollment
          </button>
          <p className="text-[10px] text-muted-foreground text-center">By confirming, you agree to all terms and conditions of enrollment.</p>
        </div>
      </div>
    </div>
  );
}

// ── Root App ───────────────────────────────────────────────────────────────

const STEP_META: Record<number, { title: string; subtitle: string }> = {
  1: { title: "Student Information", subtitle: "Step 1 of 6 — Fill in your personal, contact, and academic details." },
  2: { title: "Program Selection", subtitle: "Step 2 of 6 — Choose your education level and program." },
  3: { title: "Subject / Section Selection", subtitle: "Step 3 of 6 — Select your subjects or section for this semester." },
  4: { title: "Assessment", subtitle: "Step 4 of 6 — Review your fee assessment and apply discounts." },
  5: { title: "Payment", subtitle: "Step 5 of 6 — Choose your payment method and submit payment details." },
  6: { title: "Confirmation", subtitle: "Step 6 of 6 — Review all information and confirm your enrollment." },
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [programType, setProgramType] = useState<ProgramType>("college");
  const [selectedProgram, setSelectedProgram] = useState<CollegeProgram | null>(COLLEGE_PROGRAMS[0]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["cc101", "cc102", "math101"]);
  const [selectedSection, setSelectedSection] = useState("g7a");
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("full");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("gcash");
  const [form, setForm] = useState<StudentForm>({
    firstName: "Juan", middleName: "Santos", lastName: "Dela Cruz", suffix: "",
    dob: "2004-03-12", gender: "Male", civilStatus: "Single", nationality: "Filipino", religion: "Roman Catholic",
    mobile: "+63 917 234 5678", email: "jdelacruz@student.edu.ph",
    address: "123 Mabini St., Brgy. Holy Spirit", city: "Quezon City", province: "Metro Manila", zip: "1127",
    emergencyName: "Maria Santos Dela Cruz", emergencyRelation: "Parent", emergencyMobile: "+63 918 765 4321",
    prevSchool: "University of the Philippines", prevProgram: "BSCS", prevYearLevel: "1st Year", prevGWA: "1.75",
    lrn: "123456789012", studentType: "Continuing",
  });

  const [selectedBasicGrade, setSelectedBasicGrade] = useState<string>("Grade 7");
  const [selectedStrand, setSelectedStrand] = useState<string | null>(null);

  const handleBasicGradeChange = (grade: string) => {
    setSelectedBasicGrade(grade);
    if (grade === "Grade 11" || grade === "Grade 12") {
      const strand = selectedStrand || "stem";
      if (!selectedStrand) setSelectedStrand("stem");
      const firstSec = SECTIONS.find(s => s.grade === grade && s.id.includes(strand));
      if (firstSec) setSelectedSection(firstSec.id);
    } else {
      setSelectedStrand(null);
      const firstSec = SECTIONS.find(s => s.grade === grade);
      if (firstSec) setSelectedSection(firstSec.id);
    }
  };

  const handleStrandChange = (strand: string | null) => {
    setSelectedStrand(strand);
    if (strand) {
      const firstSec = SECTIONS.find(s => s.grade === selectedBasicGrade && s.id.includes(strand));
      if (firstSec) setSelectedSection(firstSec.id);
    }
  };

  const { totalUnits } = computeFees(
    programType,
    selectedProgram,
    selectedSubjects,
    selectedBasicGrade,
    selectedStrand
  );
  const meta = STEP_META[currentStep];
  const canProceed =
    currentStep !== 3 ||
    (programType === "college" ? totalUnits >= 15 : !!selectedSection);

  function goNext() { if (currentStep < 6) setCurrentStep(s => s + 1); }
  function goBack() { if (currentStep > 1) setCurrentStep(s => s - 1); }

  const showFeePanel = currentStep >= 2 && currentStep <= 5;

  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Top bar */}
      <header className="bg-card border-b border-border px-8 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap size={16} className="text-white" />
          </div>
          <div>
            <p className="text-[13px] font-bold text-foreground leading-tight">University of the Philippines</p>
            <p className="text-[10px] text-muted-foreground leading-tight">Student Enrollment System · AY 2025–2026</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <User size={12} className="text-primary" />
            </div>
            <span className="font-medium text-foreground">{form.firstName} {form.lastName}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200">
            <AlertCircle size={12} className="text-amber-600" />
            <span className="text-[11px] font-semibold text-amber-700">Enrollment Open</span>
          </div>
          <button className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition">
            <RefreshCw size={12} />
            Save Draft
          </button>
        </div>
      </header>

      {/* Progress bar */}
      <StepProgressBar current={currentStep} />

      {/* Page title */}
      <div className="px-8 pt-5 pb-2 max-w-[1400px] w-full mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">{meta.title}</h1>
            <p className="text-[12px] text-muted-foreground mt-0.5">{meta.subtitle}</p>
          </div>
          <div className="text-[11px] text-muted-foreground">
            Enrollment No. <span className="text-primary font-semibold font-mono">ENR-2024-00847</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 px-8 py-4 max-w-[1400px] w-full mx-auto overflow-hidden">
        <div className={`grid gap-5 h-full ${showFeePanel ? "grid-cols-[220px_1fr_280px]" : currentStep === 1 ? "grid-cols-[220px_1fr]" : "grid-cols-1"}`}>
          {/* Left: student card (steps 1–5) */}
          {currentStep <= 5 && (
            <div className="overflow-y-auto">
              <StudentCard
                form={form}
                programType={programType}
                selectedBasicGrade={selectedBasicGrade}
                selectedStrand={selectedStrand}
                selectedProgram={selectedProgram}
              />
            </div>
          )}

          {/* Center: step content */}
          <div className="overflow-y-auto min-h-0 max-h-[calc(100vh-260px)]">
            {currentStep === 1 && <Step1 form={form} setForm={setForm} />}
            {currentStep === 2 && (
              <Step2
                programType={programType} setProgramType={setProgramType}
                selectedProgram={selectedProgram} setSelectedProgram={setSelectedProgram}
                selectedBasicGrade={selectedBasicGrade} setSelectedBasicGrade={handleBasicGradeChange}
                selectedStrand={selectedStrand} setSelectedStrand={handleStrandChange}
              />
            )}
            {currentStep === 3 && (
              <Step3
                programType={programType} selectedProgram={selectedProgram}
                selectedSubjects={selectedSubjects} setSelectedSubjects={setSelectedSubjects}
                selectedSection={selectedSection} setSelectedSection={setSelectedSection}
                selectedBasicGrade={selectedBasicGrade} selectedStrand={selectedStrand}
              />
            )}
            {currentStep === 4 && (
              <Step4
                programType={programType}
                selectedProgram={selectedProgram}
                selectedSubjects={selectedSubjects}
                selectedBasicGrade={selectedBasicGrade}
                selectedStrand={selectedStrand}
              />
            )}
            {currentStep === 5 && (
              <Step5
                paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}
                paymentMode={paymentMode} setPaymentMode={setPaymentMode}
                programType={programType}
                selectedProgram={selectedProgram} selectedSubjects={selectedSubjects}
                selectedBasicGrade={selectedBasicGrade} selectedStrand={selectedStrand}
              />
            )}
            {currentStep === 6 && (
              <Step6
                form={form} programType={programType}
                selectedProgram={selectedProgram} selectedSubjects={selectedSubjects}
                selectedBasicGrade={selectedBasicGrade} selectedStrand={selectedStrand}
                selectedSection={selectedSection} paymentMode={paymentMode} paymentMethod={paymentMethod}
              />
            )}
          </div>

          {/* Right: fee panel (steps 2–5) */}
          {showFeePanel && (
            <div className="overflow-y-auto max-h-[calc(100vh-260px)]">
              <FeePanel
                programType={programType}
                selectedProgram={selectedProgram}
                selectedSubjects={selectedSubjects}
                selectedBasicGrade={selectedBasicGrade}
                selectedStrand={selectedStrand}
                paymentMode={currentStep >= 5 ? paymentMode : undefined}
              />
            </div>
          )}
        </div>
      </main>

      {/* Bottom navigation */}
      <footer className="bg-card border-t border-border px-8 py-4 shrink-0">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={goBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground text-[13px] font-semibold hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={15} />Back
            </button>
            <span className="text-[11px] text-muted-foreground">Step {currentStep} of 6</span>
          </div>

          <div className="flex items-center gap-3">
            {currentStep === 3 && programType === "college" && (
              <div className={`flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-lg border ${totalUnits >= 15 ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-amber-50 border-amber-200 text-amber-700"}`}>
                {totalUnits >= 15
                  ? <><Check size={11} strokeWidth={3} /><span>Valid load: {totalUnits} units</span></>
                  : <><AlertCircle size={11} /><span>Minimum 15 units required ({totalUnits} / 15)</span></>
                }
              </div>
            )}

            {currentStep < 6 && (
              <button
                onClick={goNext}
                disabled={!canProceed}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-[13px] font-bold hover:bg-primary/90 active:scale-[0.98] transition-all shadow-sm shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === 5 ? "Review & Confirm" : "Save & Continue"}
                <ChevronRight size={15} />
              </button>
            )}

            {currentStep < 6 && (
              <button
                onClick={() => setCurrentStep(6)}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-[13px] font-bold hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm shadow-emerald-200"
              >
                Confirm Enrollment
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
