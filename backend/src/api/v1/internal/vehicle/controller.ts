import { Request, Response, NextFunction } from 'express';
import { vehicleList, getFilterOptions, getModelosByMarcas } from '@/services/vehicle';
import { VehicleListParams, SortOrder } from '@/services/vehicle/vehicleTypes';
import { successResponse, errorResponse } from '@/utils/response';

/**
 * @api {get} /internal/vehicle List Vehicles
 * @apiName ListVehicles
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves paginated vehicle list with filtering and sorting options
 *
 * @apiParam {Number} [page=1] Page number
 * @apiParam {Number} [pageSize=12] Items per page (12, 24, 36, 48)
 * @apiParam {String} [marcas] Comma-separated brand names
 * @apiParam {String} [modelos] Comma-separated model names
 * @apiParam {Number} [anoMin] Minimum year filter
 * @apiParam {Number} [anoMax] Maximum year filter
 * @apiParam {Number} [precoMin] Minimum price filter
 * @apiParam {Number} [precoMax] Maximum price filter
 * @apiParam {String} [cambios] Comma-separated transmission types
 * @apiParam {String} [sortOrder] Sort order (relevancia, preco_asc, preco_desc, ano_desc, ano_asc, modelo_asc, modelo_desc)
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Response data
 * @apiSuccess {Array} data.vehicles Array of vehicles
 * @apiSuccess {Number} data.total Total number of vehicles
 * @apiSuccess {Number} data.page Current page
 * @apiSuccess {Number} data.pageSize Items per page
 * @apiSuccess {Number} data.totalPages Total pages
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} ServerError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 12;

    /**
     * @validation Validate page size
     * @throw {ValidationError}
     */
    if (![12, 24, 36, 48].includes(pageSize)) {
      res.status(400).json(errorResponse('pageSizeMustBe12_24_36_or48', 'VALIDATION_ERROR'));
      return;
    }

    /**
     * @validation Validate page number
     * @throw {ValidationError}
     */
    if (page < 1) {
      res.status(400).json(errorResponse('pageMustBeGreaterThanZero', 'VALIDATION_ERROR'));
      return;
    }

    const params: VehicleListParams = {
      page,
      pageSize,
      filters: {},
      sortOrder: (req.query.sortOrder as SortOrder) || SortOrder.Relevancia,
    };

    if (req.query.marcas) {
      params.filters!.marcas = (req.query.marcas as string).split(',');
    }

    if (req.query.modelos) {
      params.filters!.modelos = (req.query.modelos as string).split(',');
    }

    if (req.query.anoMin) {
      params.filters!.anoMin = parseInt(req.query.anoMin as string);
    }

    if (req.query.anoMax) {
      params.filters!.anoMax = parseInt(req.query.anoMax as string);
    }

    if (req.query.precoMin) {
      params.filters!.precoMin = parseFloat(req.query.precoMin as string);
    }

    if (req.query.precoMax) {
      params.filters!.precoMax = parseFloat(req.query.precoMax as string);
    }

    if (req.query.cambios) {
      params.filters!.cambios = (req.query.cambios as string).split(',');
    }

    /**
     * @validation Validate year range
     * @throw {ValidationError}
     */
    if (
      params.filters!.anoMin &&
      params.filters!.anoMax &&
      params.filters!.anoMin > params.filters!.anoMax
    ) {
      res.status(400).json(errorResponse('anoMinCannotBeGreaterThanAnoMax', 'VALIDATION_ERROR'));
      return;
    }

    /**
     * @validation Validate price range
     * @throw {ValidationError}
     */
    if (
      params.filters!.precoMin &&
      params.filters!.precoMax &&
      params.filters!.precoMin > params.filters!.precoMax
    ) {
      res
        .status(400)
        .json(errorResponse('precoMinCannotBeGreaterThanPrecoMax', 'VALIDATION_ERROR'));
      return;
    }

    const data = await vehicleList(params);

    res.json(
      successResponse(data, {
        page: data.page,
        pageSize: data.pageSize,
        total: data.total,
      })
    );
  } catch (error: any) {
    next(error);
  }
}

/**
 * @api {get} /internal/vehicle/filter-options Get Filter Options
 * @apiName GetFilterOptions
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves available filter options based on current catalog
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Response data
 * @apiSuccess {Array} data.marcas Available brands
 * @apiSuccess {Array} data.modelos Available models
 * @apiSuccess {Array} data.anos Available years
 * @apiSuccess {Array} data.cambios Available transmission types
 *
 * @apiError {String} ServerError Internal server error
 */
export async function filterOptionsHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await getFilterOptions();
    res.json(successResponse(data));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @api {get} /internal/vehicle/modelos-by-marcas Get Models by Brands
 * @apiName GetModelosByMarcas
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves available models filtered by selected brands
 *
 * @apiParam {String} [marcas] Comma-separated brand names
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Response data
 * @apiSuccess {Array} data.modelos Available models for selected brands
 *
 * @apiError {String} ServerError Internal server error
 */
export async function modelosByMarcasHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const marcas = req.query.marcas ? (req.query.marcas as string).split(',') : [];
    const modelos = await getModelosByMarcas(marcas);
    res.json(successResponse({ modelos }));
  } catch (error: any) {
    next(error);
  }
}
