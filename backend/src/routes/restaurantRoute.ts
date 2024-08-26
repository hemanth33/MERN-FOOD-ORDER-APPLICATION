import express from 'express';
import { param } from 'express-validator';
import RestaurantController from '../controllers/RestaurantController';

const router = express.Router();

router.get(
    '/search/:city', 
    param("city")
        .isString()
        .trim()
        .notEmpty()
        .withMessage("City Parameter must be a valid string"),
    RestaurantController.searchRestaurants
);

router.get(
    '/:restaurantId', 
    param("restaurantId")
        .isString()
        .trim()
        .notEmpty()
        .withMessage("Restaurant Id Parameter must be a valid string"),
    RestaurantController.getRestaurant
)

export default router;