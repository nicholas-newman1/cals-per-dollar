import db from "../config/db";
import { RestaurantEntity } from "../types/restaurant";

export const getRestaurantById = async (id: string) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM restaurants WHERE id = ?", [id], (err, results) =>
      err ? reject(err) : resolve((results as RestaurantEntity[])[0])
    );
  });
};

export const getAllRestaurants = async () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM restaurants", (err, results) =>
      err ? reject(err) : resolve(results as RestaurantEntity[])
    );
  });
};
