import axios from "axios";

export default class ApiService {

  static BASE_URL = "http://localhost:5050/api";

  static generateIdempotencyKey() {
    return crypto.randomUUID();
  }

  static saveToken(token) {
    localStorage.setItem("token", token);
  }

  static getToken() {
    return localStorage.getItem("token");
  }

  static saveRole(role) {
    localStorage.setItem("role", JSON.stringify(role));
  }

  // Get the roles from local storage
  static getRole() {

    const role = localStorage.getItem("role");

    return role ? JSON.parse(role) : null;
  }

  static getHeader() {

    const token = this.getToken();
    
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    };
  }


  /** AUTH AND USERS API */
  static async registerUser(registerData) {

    const response = await axios.post(`${this.BASE_URL}/auth/register`, registerData);

    return response.data;
  }

  static async loginUser(loginData) {

    const response = await axios.post(`${this.BASE_URL}/auth/login`, loginData);

    return response.data;
  }

  static async getAllUsers() {

    const response = await axios.get(`${this.BASE_URL}/users/all`, {
      headers: this.getHeader()
    });

    return response.data;
  }

  static async getUserById(userId) {

    const response = await axios.get(`${this.BASE_URL}/users/${userId}`, {
      headers: this.getHeader()
    });

    return response.data;
  }

  static async updateUser(userId, userData) {

    const response = await axios.put(`${this.BASE_URL}/users/update/${userId}`, userData, {
      headers: this.getHeader()
    });

    return response.data;
  }

  static async deleteUser(userId) {

    const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
      headers: this.getHeader()
    });

    return response.data;
  }

  static async getLoggedInUserInfo() {

    const response = await axios.get(`${this.BASE_URL}/users/current`, {
      headers: this.getHeader()
    });

    return response.data;
  }


  /** PRODUCT ENDPOINT */
  static async addProduct(formData) {

    const response = await axios.post(`${this.BASE_URL}/products/add`, formData, {
      headers: {
        ...this.getHeader(),
        "Content-Type": "multipart/form-data"
      }
    });

    return response.data;
  }

  static async updateProduct(formData) {

    const response = await axios.put(`${this.BASE_URL}/products/update`, formData, {
      headers: {
        ...this.getHeader(),
        "Content-Type": "multipart/form-data"
      }
    });

    return response.data;
  }

  static async getAllProducts() {

    const response = await axios.get(`${this.BASE_URL}/products/all`, {
      headers: this.getHeader()
    });

    return response.data;
  }

  static async getProductById(productId) {

    const response = await axios.get(`${this.BASE_URL}/products/${productId}`, {
      headers: this.getHeader()
    });

    return response.data;
  }

  static async deleteProduct(productId) {

    const response = await axios.delete(`${this.BASE_URL}/products/delete/${productId}`, {
      headers: this.getHeader()
    });

    return response.data;
  }

  static async searchProduct(searchValue) {
    
    const response = await axios.get(`${this.BASE_URL}/products/search`, {
      headers: this.getHeader(),
      params: {searchValue}
    });

    return response.data;
  }


  /** CATEGORY ENDPOINT */
  static async createCategory(categoryData) {
    
    const response = await axios.post(`${this.BASE_URL}/categories/add`, categoryData, {
      headers: this.getHeader()
    });

    return response.data;
  }

  static async getAllCategories() {

    const response = await axios.get(`${this.BASE_URL}/categories/all`, {
      headers: this.getHeader()
    });

    return response.data;
  }

  static async getCategoryById(categoryId) {
  
    const response = await axios.get(`${this.BASE_URL}/categories/${categoryId}`, {
      headers: this.getHeader()
    });

    return response.data;
  }

  static async updateCategory(categoryId, categoryData) {

    const response = await axios.put(`${this.BASE_URL}/categories/update/${categoryId}`, categoryData, {
      headers: this.getHeader()
    });

    return response.data;
  }

  static async deleteCategory(categoryId) {

    const response = await axios.delete(`${this.BASE_URL}/categories/delete/${categoryId}`, {
      headers: this.getHeader()
    });

    return response.data;
  }

  /** SUPPLIER ENDPOINT */
  static async addSupplier(supplierData) {
    
    const response = await axios.post(`${this.BASE_URL}/suppliers/add`, supplierData, {
      headers: this.getHeader()
    });

    return response.data;
  }

  static async updateSupplier(supplierId, supplierData) {

    const response = await axios.put(`${this.BASE_URL}/suppliers/update/${supplierId}`, supplierData, {
      headers: this.getHeader()
    });

    return response.data;
  }

  static async getAllSuppliers() {

    const response = await axios.get(`${this.BASE_URL}/suppliers/all`, {
      headers: this.getHeader()
    });

    return response.data;
  }

  static async getSupplierById(supplierId) {
  
    const response = await axios.get(`${this.BASE_URL}/suppliers/${supplierId}`, {
      headers: this.getHeader()
    });

    return response.data;
  }

  static async deleteSupplier(supplierId) {

    const response = await axios.delete(`${this.BASE_URL}/suppliers/delete/${supplierId}`, {
      headers: this.getHeader()
    });

    return response.data;
  }


  /** TRANSACTION ENDPOINT */
  static async purchaseProduct(transactionData) {

    const idempotencyKey = this.generateIdempotencyKey();
    
    const response = await axios.post(
      `${this.BASE_URL}/transactions/purchase`,
      transactionData,
      {
        headers: {
          ...this.getHeader(),
          "Idempotency-Key": idempotencyKey
        }
      }
    );

    return response.data;
  }

  static async sellProduct(transactionData) {

    const idempotencyKey = this.generateIdempotencyKey();
    
    const response = await axios.post(
      `${this.BASE_URL}/transactions/sell`,
      transactionData,
      {
        headers: {
          ...this.getHeader(),
          "Idempotency-Key": idempotencyKey
        }
      }
    );

    return response.data;
  }

  static async returnToSupplier(transactionData) {

    const idempotencyKey = this.generateIdempotencyKey();
    
    const response = await axios.post(
      `${this.BASE_URL}/transactions/return`,
      transactionData,
      {
        headers: {
          ...this.getHeader(),
          "Idempotency-Key": idempotencyKey
        }
      }
    );

    return response.data;
  }

  static async getAllTransactions(searchValue) {

    const response = await axios.get(`${this.BASE_URL}/transactions/all`, {
      headers: this.getHeader(),
      params: {searchValue}
    });

    return response.data;
  }

  static async getTransactionByMonthAndYear(month, year) {
  
    const response = await axios.get(`${this.BASE_URL}/transactions/by-month-year`, {
      headers: this.getHeader(),
      params: {
        month: month,
        year: year
      }
    });

    return response.data;
  }

  static async getTransactionById(transactionId) {
  
    const response = await axios.get(`${this.BASE_URL}/transactions/${transactionId}`, {
      headers: this.getHeader()
    });

    return response.data;
  }

  static async updateTransactionStatus(transactionId, transactionStatus) {

    const response = await axios.put(`${this.BASE_URL}/transactions/${transactionId}`, transactionStatus, {
      headers: this.getHeader()
    });

    return response.data;
  }

  
  /** AUTHENTICATION CHECKER */
  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated() {
    const token = this.getToken();
    return !!token;
  }

  static isAdmin() {
    const role = this.getRole();
    return role === "ADMIN";
  }

}