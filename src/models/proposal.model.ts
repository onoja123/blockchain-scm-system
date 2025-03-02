import mongoose from 'mongoose';
import { IProposal } from '../types/interfaces/proposal.inter';

const ProposalSchema = new mongoose.Schema<IProposal>(
	{},
	{ strict: false, timestamps: true }
  );

  const Proposal = mongoose.model<IProposal>('Proposal', ProposalSchema);

  export default Proposal;