import { NextFunction, Request, Response } from "express";
import ProposalService from "../services/proposal.service";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import ResponseHelper from "../utils/response";
const proposalService = new ProposalService();


/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Get proposal information of all generated invoice
 * @route `/api/v1/proposal/get-proposal`
 * @access Private
 * @type GET
 **/
export const getProposals = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {

    const proposalRecords = await proposalService.getAllProposals(req.user?.id);

    if (!proposalRecords) {
      return next(new AppError("No invoice record not found", ResponseHelper.RESOURCE_NOT_FOUND));
    }

    ResponseHelper.sendSuccessResponse(res,
      {
          data: proposalRecords,
          statusCode: ResponseHelper.OK,
      });

  } catch (error) {
    console.error(error);
    return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR));
  }
});


/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Get one proposal invoice record
 * @route `/api/v1/proposal/one-proposal/:proposalId`
 * @access Private
 * @type GET
 **/
export const getProposalById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {

    const proposalRecords = await proposalService.getProposalById(req.params.proposalId);

    if (!proposalRecords) {
      return next(new AppError("No invoice record not found", ResponseHelper.RESOURCE_NOT_FOUND));
    }

    ResponseHelper.sendSuccessResponse(res,
      {
          data: proposalRecords,
          statusCode: ResponseHelper.OK,
      });

  } catch (error) {
    console.error(error);
    return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR));
  }
});


/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Generate proposal invoice
 * @route `/api/v1/proposal/generate-proposal`
 * @access Private
 * @type PSOT
 **/
export const generateProposal = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {

    const result = await proposalService.generateProposal(req.user?.id, req.body.proposalDetails);

    if (!result) {
      return next(new AppError("No invoice record not found", ResponseHelper.RESOURCE_NOT_FOUND));
    }

    ResponseHelper.sendSuccessResponse(res,
      {
          data: result,
          statusCode: ResponseHelper.OK,
      });
  } catch (error) {
    console.error(error);
    return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR));
  }
});

/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Delete proposal
 * @route `/api/v1/proposal/delete-proposal/:id`
 * @access Private
 * @type DELETE
 **/

export const deleteProposal = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
      const { id } = req.params;

      const deletedProposal = await proposalService.deleteProposal(id);

      if (!deletedProposal) {
          return next(new AppError("Proposal not found", ResponseHelper.RESOURCE_NOT_FOUND));
      }

      ResponseHelper.sendSuccessResponse(res, {
          message: "Proposal deleted successfully",
          statusCode: ResponseHelper.OK
      });

  } catch (error) {
      console.error(error);
      return next(new AppError("An error occurred while trying to delete a proposal. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
});