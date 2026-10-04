import React from 'react';
import { CourseInquiry } from '../services/api';
import { MessageCircle, GraduationCap, Clock, Award } from 'lucide-react';

interface CourseInquiriesTableProps {
  inquiries: CourseInquiry[];
  onUpdateStatus: (id: string, status: CourseInquiry['status']) => void;
}

export const CourseInquiriesTable: React.FC<CourseInquiriesTableProps> = ({
  inquiries,
  onUpdateStatus
}) => {
  const handleOpenStudentWhatsApp = (inq: CourseInquiry) => {
    const cleanPhone = inq.phone.replace(/\D/g, '');
    const message = [
      `Assalam-o-Alaikum ${inq.student_name}! 🎓✨`,
      `Thank you for applying for the *${inq.course_name}* at *Shine With Shiza*, Baby World Basement, Model Town Link Rd, Lahore.`,
      ``,
      `We have received your application for the *50% OFF Special Batch*.`,
      `Your registered experience level: ${inq.experience_level}`,
      ``,
      `Would you like to visit our studio in Baby World Basement (opposite Amanah Mall) for a campus walkthrough and student practice kit preview this week?`,
      ``,
      `Warm regards,`,
      `*Shine With Shiza Admissions Team*`
    ].join('\n');

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="luxury-card rounded-2xl border border-zinc-800 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-playfair text-xl font-bold text-champagne-100 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-gold-400" />
            <span>Academy Course Inquiries (50% Off Applicants)</span>
          </h3>
          <p className="text-xs text-champagne-300/70 font-light mt-0.5">
            Prospective beauticians and bridal masterclass students
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 text-[11px] font-semibold uppercase tracking-wider text-gold-300/80">
              <th className="py-3 px-4">Student Name &amp; Contact</th>
              <th className="py-3 px-4">Selected Course</th>
              <th className="py-3 px-4">Experience Level</th>
              <th className="py-3 px-4">Admission Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs">
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-zinc-500">
                  No academy inquiries registered yet.
                </td>
              </tr>
            ) : (
              inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-salon-900/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-champagne-100 text-sm">
                      {inq.student_name}
                    </p>
                    <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                      {inq.phone}
                    </p>
                    {inq.notes && (
                      <p className="text-[10px] text-zinc-500 italic mt-0.5 max-w-xs truncate">
                        "{inq.notes}"
                      </p>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-medium text-gold-200">
                    {inq.course_name}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[11px]">
                      {inq.experience_level}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <select
                      value={inq.status}
                      onChange={(e) => onUpdateStatus(inq.id, e.target.value as CourseInquiry['status'])}
                      className="bg-salon-900 border border-zinc-700 text-xs px-2.5 py-1 rounded-lg focus:outline-none text-champagne-100"
                    >
                      <option value="new">New Lead</option>
                      <option value="contacted">Contacted via WA</option>
                      <option value="enrolled">Enrolled / Paid</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleOpenStudentWhatsApp(inq)}
                      className="p-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-950 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 transition-colors inline-flex items-center gap-1.5 text-xs"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp Student</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
