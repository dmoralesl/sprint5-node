import { Model } from "mongoose";

class Service {

    model: Model<any>;

    constructor (model: Model<any>) {
      this.model = model
      this.getAll = this.getAll.bind(this)
      this.getById = this.getById.bind(this)
      this.insert = this.insert.bind(this)
      this.update = this.update.bind(this)
      this.delete = this.delete.bind(this)
    }
  
    async getAll () {
      try {
        const rows = await this.model.find();
        return {
          error: false,
          statusCode: 200,
          data: rows
        }
      } catch (errors) {
          console.log('errors', errors)
        return {
          error: true,
          statusCode: 400,
          errors
        }
      }
    }
  
    async getById (id: string) {
        try {
          const register = await this.model.findById(id)
    
          return {
            error: false,
            statusCode: 200,
            data: register
          }
        } catch (errors) {
          return {
            error: true,
            statusCode: 400,
            errors
          }
        }
      }

    async getByAttr (field: string, value: any) {
      try {
        const data = await this.model.find({
            [field]: value
        })
        return {
          error: false,
          statusCode: 200,
          data
        }
      } catch (errors) {
        return {
          error: true,
          statusCode: 400,
          errors
        }
      }
    }
  
    async insert (dataInput: object) {
      try {
        const data = await this.model.create(dataInput)
        if (data)
          return {
            error: false,
            data
          }
      } catch (error: any) {
        return {
          error: true,
          statusCode: 400,
          message: error.errmsg || 'Not able to create item',
          errors: error.errors
        }
      }
    }
  
    async update (id: string, dataInput: object) {
      try {
        const data = await this.model.findOneAndUpdate({ _id: id }, dataInput, {
          new: true
        })
        return {
          error: false,
          statusCode: 202,
          data
        }
      } catch (error: any) {
        return {
          error: true,
          statusCode: 400,
          errors: error
        }
      }
    }
  
    async delete (id: string) {
      try {
        const data = await this.model.findByIdAndDelete(id)
        if (!data)
          return {
            error: true,
            statusCode: 404,
            message: 'item not found'
          }
  
        return {
          error: false,
          deleted: true,
          statusCode: 202,
          data
        }
      } catch (error: any) {
        return {
          error: true,
          statusCode: 400,
          errors: error
        }
      }
    }
  
    async deleteByAttr (field: string, value: object) {
      try {
        const data = await this.model.deleteMany({
          [field]: value
        })
        if (!data)
          return {
            error: true,
            statusCode: 404,
            message: 'item not found'
          }
  
        return {
          error: false,
          deleted: true,
          statusCode: 202,
          data
        }
      } catch (error: any) {
        return {
          error: true,
          statusCode: 400,
          errors: error
        }
      }
    }
  }
  
  export default Service
  