import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';

/**
 * @author
 * @description Create a transaction
 * @route `/api/v1/blockchain/`
 * @access Public
 * @type POST
 */
export const recordTransaction = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description get all blockchain transaction
 * @route `/api/v1/blockchain/`
 * @access Public
 * @type POST
 */
export const getAllTransactions = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description get a blockchain transaction by id
 * @route `/api/v1/blockchain/`
 * @access Public
 * @type POST
 */
export const getTransactionById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description Verify blockchain transaction hash
 * @route `/api/v1/blockchain/`
 * @access Public
 * @type POST
 */
export const verifyTransactionHash = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description Get a blockchain transaction by type
 * @route `/api/v1/blockchain/`
 * @access Public
 * @type POST
 */
export const getTransactionsByType = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})