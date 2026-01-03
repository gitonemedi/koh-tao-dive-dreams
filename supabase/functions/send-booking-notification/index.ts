import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingNotificationRequest {
  name: string;
  email: string;
  phone?: string;
  courseTitle: string;
  preferredDate?: string;
  experienceLevel?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking: BookingNotificationRequest = await req.json();
    const notificationEmail = Deno.env.get("NOTIFICATION_EMAIL");

    if (!notificationEmail) {
      throw new Error("NOTIFICATION_EMAIL not configured");
    }

    console.log("Sending booking notification for:", booking.name, booking.courseTitle);

    // Send notification to dive school
    const adminEmailResponse = await resend.emails.send({
      from: "Koh Tao Diving <onboarding@resend.dev>",
      to: [notificationEmail],
      subject: `New Booking Inquiry: ${booking.courseTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0077be;">New Course Booking Inquiry</h1>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333; margin-top: 0;">Customer Details</h2>
            <p><strong>Name:</strong> ${booking.name}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone || "Not provided"}</p>
          </div>
          <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h2 style="color: #0077be; margin-top: 0;">Course Information</h2>
            <p><strong>Course:</strong> ${booking.courseTitle}</p>
            <p><strong>Preferred Date:</strong> ${booking.preferredDate || "Flexible"}</p>
            <p><strong>Experience Level:</strong> ${booking.experienceLevel || "Not specified"}</p>
          </div>
          ${booking.message ? `
          <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; margin-top: 20px;">
            <h2 style="color: #333; margin-top: 0;">Message</h2>
            <p>${booking.message}</p>
          </div>
          ` : ""}
          <p style="color: #666; margin-top: 20px; font-size: 12px;">
            This inquiry was submitted via the Koh Tao Diving website.
          </p>
        </div>
      `,
    });

    console.log("Admin notification sent:", adminEmailResponse);

    // Send confirmation to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Koh Tao Diving <onboarding@resend.dev>",
      to: [booking.email],
      subject: `Booking Inquiry Received - ${booking.courseTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0077be;">Thank You, ${booking.name}!</h1>
          <p>We've received your booking inquiry for the <strong>${booking.courseTitle}</strong> course.</p>
          <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #0077be; margin-top: 0;">What's Next?</h2>
            <ul style="color: #333;">
              <li>Our team will review your inquiry within 24 hours</li>
              <li>We'll confirm availability for your preferred dates</li>
              <li>You'll receive a detailed course schedule and preparation guide</li>
            </ul>
          </div>
          <p>If you have any questions, feel free to reply to this email or contact us directly.</p>
          <p style="color: #0077be; font-weight: bold;">See you underwater! 🤿</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Koh Tao Diving<br>
            Koh Tao, Thailand
          </p>
        </div>
      `,
    });

    console.log("Customer confirmation sent:", customerEmailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-booking-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
