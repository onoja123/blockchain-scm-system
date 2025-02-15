import OpenAI from "openai";
import Pricing from "../models/pricing.model";
import User from "../models/user.model";
import { IPricing } from "../types/interfaces/pricing.inter";

export default class PricingService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPEN_API_KEY || ""
    });
  }

  async getAll(userId: string): Promise<IPricing[]> {
    return Pricing.find({ _user: userId });
  }

  async getPricingById(id: string): Promise<IPricing | null> {
    return Pricing.findById(id);
  }

  async generatePricing(userId: string, pricingDetails: IPricing) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const prompt = this.createInvoicePrompt(user, pricingDetails);
    const openaiResponse = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: "You are a helpful AI assistant." }, { role: "user", content: prompt }],
      max_tokens: 700,
    });

    const invoice = openaiResponse.choices[0]?.message?.content?.trim() || "";
    const pricingRange = this.calculatePricingRange(user, pricingDetails);

    const pricing = new Pricing({
      ...pricingDetails,
      _user: userId,
      priceRange: pricingRange,
      generatedInvoice: invoice,
      createdAt: new Date(),
    });

    await pricing.save();

    return { invoice, pricing };
  }

  private createInvoicePrompt(user: any, pricingDetails: IPricing): string {
    return `
      Generate a detailed invoice for the following project with a suggested pricing range:

      Developer Details:
        - Name: ${user.firstname}
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
        ${pricingDetails.estimatedCost ? `- Estimated Cost: ${pricingDetails.estimatedCost}` : ""}

      Please format the invoice neatly and provide a pricing range based on the developer's experience and project complexity.
    `;
  }

  private calculatePricingRange(user: any, pricingDetails: IPricing): string {
    const complexityMultiplier = 1.2;
    const baseRate = user.yearsOfExperience * 50;
    const minPrice = baseRate * complexityMultiplier;
    const maxPrice = minPrice * 1.3;
    return `${pricingDetails.currency} ${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}`;
  }
}
