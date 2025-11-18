import { Request, Response, NextFunction } from 'express';
import { vehicleGet } from '@/services/vehicleDetail';
import { successResponse, errorResponse } from '@/utils/response';

/**
 * @api {get} /internal/vehicle-detail/:id Get Vehicle Details
 * @apiName GetVehicleDetails
 * @apiGroup VehicleDetail
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves complete vehicle details including photos, specifications,
 * items, maintenance history, payment conditions, and documentation
 *
 * @apiParam {String} id Vehicle identifier
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Response data
 * @apiSuccess {Object} data.vehicle Vehicle basic information
 * @apiSuccess {Array} data.photos Vehicle photo gallery
 * @apiSuccess {Array} data.items Vehicle items and optionals
 * @apiSuccess {Array} data.revisoes Maintenance history
 * @apiSuccess {Array} data.sinistros Accident history
 * @apiSuccess {Object} data.laudoTecnico Technical inspection report
 * @apiSuccess {Array} data.formasPagamento Payment methods
 * @apiSuccess {Object} data.condicaoFinanciamento Financing conditions
 * @apiSuccess {Array} data.documentacao Required documentation
 * @apiSuccess {Object} data.situacaoDocumental Document status
 *
 * @apiError {String} ValidationError Invalid vehicle ID
 * @apiError {String} NotFoundError Vehicle not found
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const idVehicle = parseInt(req.params.id);

    /**
     * @validation Validate vehicle ID
     * @throw {ValidationError}
     */
    if (isNaN(idVehicle) || idVehicle <= 0) {
      res.status(400).json(errorResponse('invalidVehicleId', 'VALIDATION_ERROR'));
      return;
    }

    const data = await vehicleGet(idVehicle);

    res.json(successResponse(data));
  } catch (error: any) {
    if (error.message === 'vehicleNotFound') {
      res.status(404).json(errorResponse('vehicleNotFound', 'NOT_FOUND'));
      return;
    }
    next(error);
  }
}
