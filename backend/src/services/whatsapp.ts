// WhatsApp URL Generator Service for Shine with Shiza

export interface BookingPayload {
  clientName: string;
  phone: string;
  service: string;
  category?: string;
  date: string;
  time: string;
  notes?: string;
}

export interface CourseInquiryPayload {
  studentName: string;
  phone: string;
  courseName: string;
  experienceLevel: string;
  notes?: string;
}

export const SALON_PHONE_NUMBER = "923374262774"; // Salon WhatsApp number format (country code without +)

/**
 * Builds a direct WhatsApp click-to-chat URL with pre-filled message for salon bookings
 */
export function generateBookingWhatsAppUrl(data: BookingPayload, salonPhone: string = SALON_PHONE_NUMBER): string {
  const cleanPhone = salonPhone.replace(/\D/g, "");
  
  const message = [
    `✨ *SALON APPOINTMENT REQUEST* ✨`,
    `*Shine With Shiza (Baby World Basement, Lahore)*`,
    `----------------------------------------`,
    `👑 *Client Name:* ${data.clientName}`,
    `📞 *Phone:* ${data.phone}`,
    `💄 *Selected Service:* ${data.service}`,
    `📅 *Preferred Date:* ${data.date}`,
    `⏰ *Preferred Time:* ${data.time}`,
    data.notes ? `📝 *Special Notes:* ${data.notes}` : ``,
    `----------------------------------------`,
    `_Sent via Shine With Shiza VIP Booking Platform_`
  ].filter(Boolean).join("\n");

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a WhatsApp inquiry link for Beautician Courses
 */
export function generateCourseWhatsAppUrl(data: CourseInquiryPayload, salonPhone: string = SALON_PHONE_NUMBER): string {
  const cleanPhone = salonPhone.replace(/\D/g, "");

  const message = [
    `🎓 *BEAUTICIAN COURSE INQUIRY (50% OFF DEAL)* 🎓`,
    `*Shine With Shiza (Baby World Basement, Lahore)*`,
    `----------------------------------------`,
    `👩‍🎓 *Student Name:* ${data.studentName}`,
    `📱 *Contact:* ${data.phone}`,
    `📚 *Course:* ${data.courseName}`,
    `⭐ *Experience Level:* ${data.experienceLevel}`,
    data.notes ? `💬 *Inquiry Details:* ${data.notes}` : ``,
    `----------------------------------------`,
    `_Requesting curriculum outline, batch dates & discount confirmation._`
  ].filter(Boolean).join("\n");

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates an administrative confirmation or reminder WhatsApp link to send to the client
 */
export function generateAdminFollowUpUrl(clientPhone: string, clientName: string, service: string, date: string, time: string): string {
  const cleanPhone = clientPhone.replace(/\D/g, "");
  
  const message = [
    `Hello ${clientName}! ✨`,
    `This is from *Shine With Shiza (Beauty Salon)* at Baby World Basement, Model Town Link Rd, Lahore.`,
    ``,
    `We are delighted to confirm your upcoming appointment for *${service}* on *${date}* at *${time}*.`,
    ``,
    `📍 Landmark: Baby World Basement, directly opposite Amanah Mall and adjacent to Jalal Sons, Model Town Link Road, Lahore.`,
    `Please arrive 10 minutes prior to your slot. If you have any special requirements, feel free to reply directly here!`,
    ``,
    `With warmth,`,
    `*The Team at Shine With Shiza*`
  ].join("\n");

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
