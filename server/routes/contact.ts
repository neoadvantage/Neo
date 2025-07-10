import { RequestHandler } from "express";
import { z } from "zod";

const ContactFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  company: z.string().optional(),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: ContactFormData;
}

export const handleContactSubmission: RequestHandler = async (req, res) => {
  try {
    // Validate the request body
    const validatedData = ContactFormSchema.parse(req.body);

    // In a real application, you would:
    // 1. Save to database (e.g., Supabase, PostgreSQL)
    // 2. Send email notification
    // 3. Add to CRM system
    // 4. Send confirmation email to user

    // For now, we'll just log the data and return success
    console.log("Contact form submission:", validatedData);

    // Simulate async processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response: ContactResponse = {
      success: true,
      message:
        "Thank you for your inquiry! We'll get back to you within 24 hours.",
      data: validatedData,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      const response: ContactResponse = {
        success: false,
        message:
          "Please check your form data: " +
          error.errors.map((e) => e.message).join(", "),
      };
      return res.status(400).json(response);
    }

    const response: ContactResponse = {
      success: false,
      message: "Something went wrong. Please try again later.",
    };

    res.status(500).json(response);
  }
};
