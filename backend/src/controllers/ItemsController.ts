import { Request, Response } from 'express';
import database from '../database/connection';

class ItemsController {
  async index(request: Request, response: Response) {
    const items = await database('item').select('*');

    const serializedItems = items.map(item => ({
      id: item.id,
      name: item.name,
      image_url: `http://192.168.0.105:3333/uploads/${item.icon}`,
    }));

    return response.json(serializedItems);
  }
}

export default ItemsController;
