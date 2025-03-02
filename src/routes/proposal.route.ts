import express from "express";
import {
    getProposals,
    getProposalById,
    generateProposal,
    deleteProposal
} from "../controllers/proposal.contoller";
import MiddlewareService from "../middlewares/auth.middleware";

const ProposalRouter = express.Router()

ProposalRouter.use(MiddlewareService.protect)

ProposalRouter.get('/get-proposals', getProposals)

ProposalRouter.get('/one-proposal/:proposalId', getProposalById);

ProposalRouter.post('/generate-proposal', generateProposal);

ProposalRouter.delete('/delete-proposal/:id', deleteProposal);

export default ProposalRouter;