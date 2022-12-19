import instance from './api';

export default class ExhibitsService {
  static async getAll() {
    try {
      return await instance.get('exhibits');
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getById(id) {
    try {
      return await instance.get(`exhibits/${id}`);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
