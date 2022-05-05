import Express from 'express';
import Service from "../services/Service";

class Controller {

    service: Service;

    constructor(service: Service) {
      this.service = service;
      this.getAll = this.getAll.bind(this);
      this.getById = this.getById.bind(this);
      this.insert = this.insert.bind(this);
      this.update = this.update.bind(this);
      this.delete = this.delete.bind(this);
    }
  
    async getAll(req: Express.Request, res: Express.Response) {
        return res.status(200).send(await this.service.getAll());
    }

    async getById(req: Express.Request, res: Express.Response) {
        const { id } = req.params;
        return res.status(200).send(await this.service.getById(id));
    }

    async insert(req: Express.Request, res: Express.Response) {
      const response = await this.service.insert(req.body);
      if (response?.error) return res.status(response.statusCode || 500).send(response);
      return res.status(201).send(response);
    }
  
    async update(req: Express.Request, res: Express.Response) {
      const { id } = req.params;
  
      const response = await this.service.update(id, req.body);
  
      return res.status(response.statusCode).send(response);
    }
  
    async delete(req: Express.Request, res: Express.Response) {
      const { id } = req.params;
  
      const response = await this.service.delete(id);
  
      return res.status(response.statusCode).send(response);
    }
  
  }
  
  export default Controller;