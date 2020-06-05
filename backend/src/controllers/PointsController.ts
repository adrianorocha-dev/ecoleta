import { Request, Response } from 'express';

import database from '../database/connection';

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems =
      items
        ?.toString()
        .split(',')
        .map(item => Number(item.trim())) || [];

    const points = await database('point')
      .join('point_item', 'point.id', '=', 'point_item.point_id')
      .whereIn('point_item.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('point.*');

    const serializedPoints = points.map(point => ({
      ...point,
      image: `http://192.168.0.105:3333/uploads/${point.image}`,
    }));

    return response.json(serializedPoints);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await database('point').where('id', id).first();

    if (!point) {
      return response.status(400).json({ error: 'Point not found.' });
    }

    const serializedPoint = {
      ...point,
      image: `http://192.168.0.105:3333/uploads/${point.image}`,
    };

    const items = await database('item')
      .join('point_item', 'item.id', '=', 'point_item.item_id')
      .where('point_item.point_id', id)
      .select('item.name');

    return response.json({ point: serializedPoint, items });
  }

  async create(request: Request, response: Response) {
    const { name, email, whatsapp, latitude, longitude, city, uf, items } = request.body;

    const trx = await database.transaction();

    const point = {
      name,
      image: request.file.filename,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const [point_id] = await trx('point').insert(point);

    const point_items = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => ({ item_id, point_id: point_id }));

    await trx('point_item').insert(point_items);

    await trx.commit();

    return response.json({ id: point_id, ...point });
  }
}

export default PointsController;
