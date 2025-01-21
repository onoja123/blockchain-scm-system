import OpenAI from "openai";
import User from "../models/user.model";
import Pricing from "../models/pricing.model";
import { IPricing } from "../types/interfaces/pricing.inter";

export default class PricingService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "",
    });
  }

  async getAll(userId: string): Promise<IPricing[]> {
    const pricing = await Pricing.find({ _user: userId })
    .populate('_user')
    return pricing;
  }

  async getPricingById(
      id: string
  ): Promise<IPricing | null> {
      const priicng = await Pricing.findById(id)
      .populate('_user')
      return priicng;
  }

  async generatePricing(userId: string, pricingDetails: IPricing) {
    // Fetch the user details from the database
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Construct the invoice prompt for OpenAI
    const prompt = this.createInvoicePrompt(user, pricingDetails);

    // Use OpenAI API to generate an invoice
    const openaiResponse = await this.openai.completions.create({
      model: "text-davinci-003",
      prompt,
      max_tokens: 500,
    });

    const invoice = openaiResponse.choices[0].text?.trim();

    // Save the pricing details to the database
    const pricing = new Pricing({
      ...pricingDetails,
      _user: userId,
      createdAt: new Date(),
    });
    await pricing.save();

    return {
      invoice,
      pricing,
    };
  }

  private createInvoicePrompt(user: any, pricingDetails: IPricing): string {
    return `
      Generate a detailed invoice for the following project:
      Developer Details:
        - Name: ${user.developerName}
        - Title: ${user.developerTitle}
        - Years of Experience: ${user.yearsOfExperience}
        - Stack: ${user.developerStack.join(", ")}
        ${user.certifications ? `- Certifications: ${user.certifications.join(", ")}` : ""}
        ${user.portfolioLink ? `- Portfolio: ${user.portfolioLink}` : ""}
        ${user.cvLink ? `- CV: ${user.cvLink}` : ""}
        
      Project Details:
        - Description: ${pricingDetails.projectDescription}
        - Timeline: ${pricingDetails.requiredTimeline}
        ${pricingDetails.companySize ? `- Company Size: ${pricingDetails.companySize}` : ""}
        ${pricingDetails.approxNumberOfScreens ? `- Approx. Screens: ${pricingDetails.approxNumberOfScreens}` : ""}
        - Currency: ${pricingDetails.currency}
        - Estimated Cost: ${pricingDetails.estimatedCost}

      Please format the invoice neatly.
    `;
  }
}
