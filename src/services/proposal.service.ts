import OpenAI from "openai";
import Proposal from "../models/proposal.model";
import User from "../models/user.model";
import { IProposal } from "../types/interfaces/proposal.inter";

export default class ProposalService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPEN_API_KEY || "",
    });
  }

  async getAllProposals(userId: string): Promise<IProposal[]> {
    return Proposal.find({ _user: userId });
  }

  async getProposalById(id: string): Promise<IProposal | null> {
    return Proposal.findById(id);
  }

  async generateProposal(userId: string, proposalDetails: IProposal) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const prompt = this.createInvoicePrompt(user, proposalDetails);
    const openaiResponse = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: "You are a helpful AI assistant." }, { role: "user", content: prompt }],
      max_tokens: 700,
    });

    const invoice = openaiResponse.choices[0]?.message?.content?.trim() || "";
    const proposalRange = this.calculatePricingRange(user, proposalDetails);

    const proposal = new Proposal({
      ...proposalDetails,
      _user: userId,
      priceRange: proposalRange,
      generatedInvoice: invoice,
      createdAt: new Date(),
    });

    await proposal.save();

    return { invoice, proposal };
  }

  async deleteProposal(
    id: string
  ): Promise<IProposal | null> {
      const proposalService = await Proposal.findByIdAndDelete(id, {new: true});
      return proposalService;
  }

  private createInvoicePrompt(user: any, proposalDetails: IProposal): string {
    const developerDetails = `
      Developer Details:
        - Name: ${user.firstname}
        - Title: ${user.developerTitle}
        - Years of Experience: ${user.yearsOfExperience}
        - Stack: ${user.developerStack.join(", ")}
        ${user.certifications ? `- Certifications: ${user.certifications.join(", ")}` : ""}
        ${user.portfolioLink ? `- Portfolio: ${user.portfolioLink}` : ""}
        ${user.cvLink ? `- CV: ${user.cvLink}` : ""}
    `;

    const projectDetails = `
      Project Details:
        - Description: ${proposalDetails.projectDescription}
        - Timeline: ${proposalDetails.requiredTimeline}
        ${proposalDetails.companySize ? `- Company Size: ${proposalDetails.companySize}` : ""}
        ${proposalDetails.approxNumberOfScreens ? `- Approx. Screens: ${proposalDetails.approxNumberOfScreens}` : ""}
        - Currency: ${proposalDetails.currency}
        ${proposalDetails.estimatedCost ? `- Estimated Cost: ${proposalDetails.estimatedCost}` : ""}
    `;

    const prompt = `
      Generate a detailed invoice for the following project with a suggested pricing range:
      ${developerDetails}
      ${projectDetails}
      Please format the invoice neatly and provide a pricing range based on the developer's experience and project complexity.
    `;

    return prompt;
  }

  private calculatePricingRange(user: any, proposalDetails: IProposal): string {
    const complexityMultiplier = 1.2;
    const baseRate = user.yearsOfExperience * 50;
    const minPrice = baseRate * complexityMultiplier;
    const maxPrice = minPrice * 1.3;
    return `${proposalDetails.currency} ${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}`;
  }

}
